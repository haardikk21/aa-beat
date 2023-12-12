import { TypeormDatabase } from "@subsquid/typeorm-store";
import { getProcessor, processorHandler } from "./processor";

const processor = getProcessor({
  networkName: "eth-mainnet",
  fromBlock: 17_012_204,
  rpcUrl: process.env.RPC_ENDPOINT_ETH as string,
});

processor.run(
  new TypeormDatabase({ supportHotBlocks: true, stateSchema: "eth_processor" }),
  processorHandler
);
