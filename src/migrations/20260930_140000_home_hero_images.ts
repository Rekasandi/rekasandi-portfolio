import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "page_home_hero_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "alt" varchar
    );
    CREATE INDEX IF NOT EXISTS "page_home_hero_images_order_idx"
      ON "page_home_hero_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_home_hero_images_parent_id_idx"
      ON "page_home_hero_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_home_hero_images_image_idx"
      ON "page_home_hero_images" USING btree ("image_id");
    DO $$ BEGIN
      ALTER TABLE "page_home_hero_images"
        ADD CONSTRAINT "page_home_hero_images_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "page_home_hero_images"
        ADD CONSTRAINT "page_home_hero_images_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    INSERT INTO "page_home_hero_images" ("_order", "_parent_id", "id", "image_id")
    SELECT 1, "id", md5(random()::text || clock_timestamp()::text), "hero_image_id"
    FROM "page_home"
    WHERE "hero_image_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM "page_home_hero_images" AS existing
        WHERE existing."_parent_id" = "page_home"."id"
          AND existing."image_id" = "page_home"."hero_image_id"
      );

    ALTER TABLE "page_home" DROP CONSTRAINT IF EXISTS "page_home_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "page_home_hero_image_idx";
    ALTER TABLE "page_home" DROP COLUMN IF EXISTS "hero_image_id";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_home" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
    UPDATE "page_home" AS home
    SET "hero_image_id" = first_image."image_id"
    FROM (
      SELECT DISTINCT ON ("_parent_id") "_parent_id", "image_id"
      FROM "page_home_hero_images"
      WHERE "image_id" IS NOT NULL
      ORDER BY "_parent_id", "_order"
    ) AS first_image
    WHERE home."id" = first_image."_parent_id";
    CREATE INDEX IF NOT EXISTS "page_home_hero_image_idx"
      ON "page_home" USING btree ("hero_image_id");
    DO $$ BEGIN
      ALTER TABLE "page_home" ADD CONSTRAINT "page_home_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DROP TABLE IF EXISTS "page_home_hero_images" CASCADE;
  `);
}
