import { TypeormDatabase } from "@subsquid/typeorm-store";
import { getProcessor, processorHandler } from "./processor";

const processor = getProcessor({
  networkName: "optimism-mainnet",
  fromBlock: 88_234_528,
  rpcUrl: process.env.RPC_ENDPOINT_OP as string,
});

processor.run(
  new TypeormDatabase({ supportHotBlocks: true, stateSchema: "eth_processor" }),
  processorHandler
);
