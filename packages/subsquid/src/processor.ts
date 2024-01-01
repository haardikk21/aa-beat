import { lookupArchive } from "@subsquid/archive-registry";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
  assertNotNull,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as entrypointAbi from "./abi/entrypoint";
import { Account, UserOperation } from "./model";

export const ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789".toLowerCase();

export const processorHandler = async (ctx: Context, networkName: string) => {
  const accounts: Account[] = [];
  const userOperations: UserOperation[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address !== ENTRYPOINT_ADDRESS) continue;

      if (log.topics[0] === entrypointAbi.events.AccountDeployed.topic) {
        let { sender, factory } =
          entrypointAbi.events.AccountDeployed.decode(log);

        const account = new Account({
          id: log.id,
          network: networkName,
          address: sender,
          factory: factory,
          block: block.header.height,
          timestamp: new Date(block.header.timestamp),
          txHash: log.transactionHash,
        });

        accounts.push(account);
      }

      if (log.topics[0] === entrypointAbi.events.UserOperationEvent.topic) {
        const bundlerAddress = log.transaction?.from;
        if (!bundlerAddress) continue;

        let decodedUserOp = entrypointAbi.events.UserOperationEvent.decode(log);

        const userOperation = new UserOperation({
          id: log.id,
          network: networkName,

          sender: decodedUserOp.sender,
          paymaster: decodedUserOp.paymaster,
          bundler: bundlerAddress,

          userOpHash: decodedUserOp.userOpHash,
          actualGasCost: decodedUserOp.actualGasCost,
          actualGasUsed: decodedUserOp.actualGasUsed,

          success: decodedUserOp.success,

          block: block.header.height,
          timestamp: new Date(block.header.timestamp),
          txHash: log.transactionHash,
        });

        userOperations.push(userOperation);
      }
    }
  }
  await ctx.store.upsert(accounts);
  await ctx.store.upsert(userOperations);
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
      log: {
        transactionHash: true,
      },
      transaction: {
        from: true,
      },
    })
    .setBlockRange({
      from: params.fromBlock,
    })
    .addLog({
      address: [ENTRYPOINT_ADDRESS],
      transaction: true,
      topic0: [
        entrypointAbi.events.AccountDeployed.topic,
        entrypointAbi.events.UserOperationEvent.topic,
      ],
    });
};

export type Fields = EvmBatchProcessorFields<ReturnType<typeof getProcessor>>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
