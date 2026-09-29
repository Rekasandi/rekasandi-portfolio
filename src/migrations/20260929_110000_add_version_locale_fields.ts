import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM ('en', 'id'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM ('en', 'id'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM ('en', 'id'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "snapshot" boolean;
    ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "published_locale" "public"."enum__projects_v_published_locale";
    CREATE INDEX IF NOT EXISTS "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
    CREATE INDEX IF NOT EXISTS "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");

    ALTER TABLE "_services_v" ADD COLUMN IF NOT EXISTS "snapshot" boolean;
    ALTER TABLE "_services_v" ADD COLUMN IF NOT EXISTS "published_locale" "public"."enum__services_v_published_locale";
    CREATE INDEX IF NOT EXISTS "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
    CREATE INDEX IF NOT EXISTS "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");

    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "snapshot" boolean;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "published_locale" "public"."enum__posts_v_published_locale";
    CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
    CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "_projects_v_snapshot_idx";
    DROP INDEX IF EXISTS "_projects_v_published_locale_idx";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "snapshot", DROP COLUMN IF EXISTS "published_locale";

    DROP INDEX IF EXISTS "_services_v_snapshot_idx";
    DROP INDEX IF EXISTS "_services_v_published_locale_idx";
    ALTER TABLE "_services_v" DROP COLUMN IF EXISTS "snapshot", DROP COLUMN IF EXISTS "published_locale";

    DROP INDEX IF EXISTS "_posts_v_snapshot_idx";
    DROP INDEX IF EXISTS "_posts_v_published_locale_idx";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "snapshot", DROP COLUMN IF EXISTS "published_locale";

    DROP TYPE IF EXISTS "public"."enum__projects_v_published_locale";
    DROP TYPE IF EXISTS "public"."enum__services_v_published_locale";
    DROP TYPE IF EXISTS "public"."enum__posts_v_published_locale";
  `);
}
