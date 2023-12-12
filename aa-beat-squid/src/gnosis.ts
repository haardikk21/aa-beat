import { TypeormDatabase } from "@subsquid/typeorm-store";
import { getProcessor, processorHandler } from "./processor";

const processor = getProcessor({
  networkName: "gnosis-mainnet",
  fromBlock: 27_364_185,
  rpcUrl: process.env.RPC_ENDPOINT_GNO as string,
});

processor.run(
  new TypeormDatabase({ supportHotBlocks: true, stateSchema: "eth_processor" }),
  processorHandler
);
