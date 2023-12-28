import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { Account } from "./model";
import * as entrypointAbi from "./abi/entrypoint";
import {
  BlockHeader,
  Log as _Log,
  Transaction as _Transaction,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  assertNotNull,
} from "@subsquid/evm-processor";
import { lookupArchive } from "@subsquid/archive-registry";

export const ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".toLowerCase();

export const processorHandler = async (ctx: Context, networkName: string) => {
  const accounts: Account[] = [];

  for (let c of ctx.blocks) {
    for (let log of c.logs) {
      if (
        log.address !== ENTRYPOINT_ADDRESS ||
        log.topics[0] !== entrypointAbi.events.AccountDeployed.topic
      )
        continue;
      let { sender, factory } =
        entrypointAbi.events.AccountDeployed.decode(log);
      const account = new Account({
        id: log.id,
        network: networkName,
        address: sender,
        factory: factory,
        block: c.header.height,
        timestamp: new Date(c.header.timestamp),
        txHash: log.transactionHash,
      });

      accounts.push(account);
    }
  }
  await ctx.store.upsert(accounts);
};

interface GetProcessorParams {
  networkName: string;
  fromBlock: number;
  rpcUrl: string;
}

export const getProcessor = (params: GetProcessorParams) => {
  return new EvmBatchProcessor()
    .setDataSource({
      archive: lookupArchive(params.networkName),
      chain: {
        url: assertNotNull(params.rpcUrl),
        rateLimit: 10,
      },
    })
    .setFinalityConfirmation(75)
    .setFields({
      log: { transactionHash: true },
    })
    .setBlockRange({
      from: params.fromBlock,
    })
    .addLog({
      address: [ENTRYPOINT_ADDRESS],
      topic0: [entrypointAbi.events.AccountDeployed.topic],
    });
};

export type Fields = EvmBatchProcessorFields<ReturnType<typeof getProcessor>>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
