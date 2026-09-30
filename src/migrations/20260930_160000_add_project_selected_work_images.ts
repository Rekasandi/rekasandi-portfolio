import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "projects_selected_work_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "alt" varchar
    );
    CREATE INDEX IF NOT EXISTS "projects_selected_work_images_order_idx"
      ON "projects_selected_work_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "projects_selected_work_images_parent_id_idx"
      ON "projects_selected_work_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "projects_selected_work_images_image_idx"
      ON "projects_selected_work_images" USING btree ("image_id");
    DO $$ BEGIN
      ALTER TABLE "projects_selected_work_images"
        ADD CONSTRAINT "projects_selected_work_images_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "projects_selected_work_images"
        ADD CONSTRAINT "projects_selected_work_images_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "_projects_v_version_selected_work_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "image_id" integer,
      "alt" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_projects_v_version_selected_work_images_order_idx"
      ON "_projects_v_version_selected_work_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_projects_v_version_selected_work_images_parent_id_idx"
      ON "_projects_v_version_selected_work_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_projects_v_version_selected_work_images_image_idx"
      ON "_projects_v_version_selected_work_images" USING btree ("image_id");
    DO $$ BEGIN
      ALTER TABLE "_projects_v_version_selected_work_images"
        ADD CONSTRAINT "_projects_v_version_selected_work_images_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_projects_v_version_selected_work_images"
        ADD CONSTRAINT "_projects_v_version_selected_work_images_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_projects_v_version_selected_work_images" CASCADE;
    DROP TABLE IF EXISTS "projects_selected_work_images" CASCADE;
  `);
}
