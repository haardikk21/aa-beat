import { TypeormDatabase } from "@subsquid/typeorm-store";
import { getProcessor, processorHandler } from "./processor";

const processor = getProcessor({
  networkName: "arbitrum",
  fromBlock: 78_720_307,
  rpcUrl: process.env.RPC_ENDPOINT_ARB as string,
});

processor.run(
  new TypeormDatabase({ supportHotBlocks: true, stateSchema: "eth_processor" }),
  processorHandler
);
