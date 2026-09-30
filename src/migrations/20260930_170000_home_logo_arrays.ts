import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "page_home_client_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer NOT NULL,
      "invert_in_dark" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "page_home_client_logos_order_idx"
      ON "page_home_client_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_client_logos_parent_id_idx"
      ON "page_home_client_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_client_logos_logo_idx"
      ON "page_home_client_logos" USING btree ("logo_id");
    DO $$ BEGIN
      ALTER TABLE "page_home_client_logos"
        ADD CONSTRAINT "page_home_client_logos_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "page_home_client_logos"
        ADD CONSTRAINT "page_home_client_logos_logo_id_media_id_fk"
        FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "page_home_tech_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer NOT NULL,
      "invert_in_dark" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "page_home_tech_logos_order_idx"
      ON "page_home_tech_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_tech_logos_parent_id_idx"
      ON "page_home_tech_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_tech_logos_logo_idx"
      ON "page_home_tech_logos" USING btree ("logo_id");
    DO $$ BEGIN
      ALTER TABLE "page_home_tech_logos"
        ADD CONSTRAINT "page_home_tech_logos_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "page_home_tech_logos"
        ADD CONSTRAINT "page_home_tech_logos_logo_id_media_id_fk"
        FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "page_home_tech_logos" CASCADE;
    DROP TABLE IF EXISTS "page_home_client_logos" CASCADE;
  `);
}
