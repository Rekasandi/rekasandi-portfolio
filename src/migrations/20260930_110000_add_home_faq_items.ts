import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "page_home_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "page_home_faq_items_order_idx"
      ON "page_home_faq_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_faq_items_parent_id_idx"
      ON "page_home_faq_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_faq_items_locale_idx"
      ON "page_home_faq_items" USING btree ("_locale");
    DO $$ BEGIN
      ALTER TABLE "page_home_faq_items"
        ADD CONSTRAINT "page_home_faq_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "page_home_faq_items" CASCADE;`);
}
