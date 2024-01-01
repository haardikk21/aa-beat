module.exports = class Data1703795957558 {
    name = 'Data1703795957558'

    async up(db) {
        await db.query(`CREATE TABLE "user_operation" ("id" character varying NOT NULL, "network" text NOT NULL, "sender" text NOT NULL, "paymaster" text NOT NULL, "bundler" text NOT NULL, "user_op_hash" text NOT NULL, "success" boolean NOT NULL, "actual_gas_cost" numeric NOT NULL, "actual_gas_used" numeric NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_daae96c3cc5ba909299a40d0e42" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0c4a89ab1681c26193982d086e" ON "user_operation" ("network") `)
        await db.query(`CREATE INDEX "IDX_4a24c447292900b2759221a516" ON "user_operation" ("sender") `)
        await db.query(`CREATE INDEX "IDX_6c0d2eda3db9a917ddc131bfc2" ON "user_operation" ("paymaster") `)
        await db.query(`CREATE INDEX "IDX_c1b5f34a03acca011a280b37c8" ON "user_operation" ("bundler") `)
        await db.query(`CREATE INDEX "IDX_db6e909c23eefc261fe984c2bc" ON "user_operation" ("success") `)
        await db.query(`CREATE INDEX "IDX_26c7834b2996d8a3180567a5e6" ON "user_operation" ("block") `)
        await db.query(`CREATE INDEX "IDX_a64a8d418e9521d379b898b231" ON "user_operation" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_9972bbf67ef2e2637db5a2e90a" ON "user_operation" ("tx_hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "user_operation"`)
        await db.query(`DROP INDEX "public"."IDX_0c4a89ab1681c26193982d086e"`)
        await db.query(`DROP INDEX "public"."IDX_4a24c447292900b2759221a516"`)
        await db.query(`DROP INDEX "public"."IDX_6c0d2eda3db9a917ddc131bfc2"`)
        await db.query(`DROP INDEX "public"."IDX_c1b5f34a03acca011a280b37c8"`)
        await db.query(`DROP INDEX "public"."IDX_db6e909c23eefc261fe984c2bc"`)
        await db.query(`DROP INDEX "public"."IDX_26c7834b2996d8a3180567a5e6"`)
        await db.query(`DROP INDEX "public"."IDX_a64a8d418e9521d379b898b231"`)
        await db.query(`DROP INDEX "public"."IDX_9972bbf67ef2e2637db5a2e90a"`)
    }
}
