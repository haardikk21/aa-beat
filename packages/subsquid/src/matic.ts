import { TypeormDatabase } from "@subsquid/typeorm-store";
import { getProcessor, processorHandler } from "./processor";

const processor = getProcessor({
  networkName: "polygon",
  fromBlock: 41_335_185,
  rpcUrl: process.env.RPC_ENDPOINT_MATIC as string,
});

processor.run(
  new TypeormDatabase({
    supportHotBlocks: true,
    stateSchema: "matic_processor",
  }),
  (ctx) => processorHandler(ctx, "matic")
);
