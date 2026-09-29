import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_page_home_tech_groups_category" AS ENUM (
        'FRONTEND & RUNTIME', 'MOTION & CRAFT', 'BACKEND & DATA', 'INTELLIGENCE & CLOUD'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "page_home_tech_groups" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "category" "public"."enum_page_home_tech_groups_category" NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "page_home_tech_groups_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "desc" varchar NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_order_idx" ON "page_home_tech_groups" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_parent_id_idx" ON "page_home_tech_groups" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_locale_idx" ON "page_home_tech_groups" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_items_order_idx" ON "page_home_tech_groups_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_items_parent_id_idx" ON "page_home_tech_groups_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_tech_groups_items_locale_idx" ON "page_home_tech_groups_items" USING btree ("_locale");

    DO $$ BEGIN
      ALTER TABLE "page_home_tech_groups" ADD CONSTRAINT "page_home_tech_groups_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "page_home_tech_groups_items" ADD CONSTRAINT "page_home_tech_groups_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_tech_groups"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    INSERT INTO "page_home_tech_groups" ("_order", "_parent_id", "_locale", "id", "category")
    SELECT row_number() OVER (PARTITION BY old."_parent_id", old."_locale" ORDER BY min(old."_order")) - 1,
      old."_parent_id", old."_locale",
      md5(old."_parent_id"::text || old."_locale" || old."category"::text),
      old."category"::text::"public"."enum_page_home_tech_groups_category"
    FROM "page_home_tech_items" old
    GROUP BY old."_parent_id", old."_locale", old."category"
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "page_home_tech_groups_items" ("_order", "_parent_id", "_locale", "id", "name", "desc")
    SELECT row_number() OVER (
        PARTITION BY old."_parent_id", old."_locale", old."category" ORDER BY old."_order"
      ) - 1,
      md5(old."_parent_id"::text || old."_locale" || old."category"::text),
      old."_locale", old."id", old."name", old."desc"
    FROM "page_home_tech_items" old
    ON CONFLICT ("id") DO NOTHING;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "page_home_tech_groups_items" CASCADE;
    DROP TABLE IF EXISTS "page_home_tech_groups" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_page_home_tech_groups_category";
  `);
}
