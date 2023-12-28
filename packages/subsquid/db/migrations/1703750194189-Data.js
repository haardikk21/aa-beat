module.exports = class Data1703750194189 {
    name = 'Data1703750194189'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "network" text NOT NULL, "address" text NOT NULL, "factory" text NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_70324c99f1bbf273d84ee833ea" ON "account" ("network") `)
        await db.query(`CREATE INDEX "IDX_83603c168bc00b20544539fbea" ON "account" ("address") `)
        await db.query(`CREATE INDEX "IDX_ac3e002d68fc535199cf366f1d" ON "account" ("factory") `)
        await db.query(`CREATE INDEX "IDX_d4828423b208935d40142ffefd" ON "account" ("block") `)
        await db.query(`CREATE INDEX "IDX_d14b5f9cbfb2159367f384c906" ON "account" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_a238c969ac648c1fb20538cccc" ON "account" ("tx_hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_70324c99f1bbf273d84ee833ea"`)
        await db.query(`DROP INDEX "public"."IDX_83603c168bc00b20544539fbea"`)
        await db.query(`DROP INDEX "public"."IDX_ac3e002d68fc535199cf366f1d"`)
        await db.query(`DROP INDEX "public"."IDX_d4828423b208935d40142ffefd"`)
        await db.query(`DROP INDEX "public"."IDX_d14b5f9cbfb2159367f384c906"`)
        await db.query(`DROP INDEX "public"."IDX_a238c969ac648c1fb20538cccc"`)
    }
}
