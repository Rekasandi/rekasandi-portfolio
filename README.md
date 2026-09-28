# Rekasandi portfolio

Next.js 16 and Payload CMS use PostgreSQL for content and S3-compatible storage for uploads. Database schema changes are applied by `node-flyway` from SQL files in `src/migrations`; Payload's schema push is disabled.

## Setup

1. Install with `pnpm install --frozen-lockfile` (or `npm ci`).
2. Copy `.env.example` to `.env` and set `DATABASE_URI`, `PAYLOAD_SECRET` (at least 32 characters), `NEXT_PUBLIC_SERVER_URL`, and all S3 settings. Production needs durable PostgreSQL and object storage; the local example points to development services.
3. Run `npm run payload:db-init` to migrate, seed content, and verify the Flyway history.
4. Run `npm run build` and `npm run start`.
5. Open `/admin`. On a fresh database, create the first admin account there. No default password is installed.

## Editing and publishing

Use the Payload admin to upload media, create a project with hero and thumbnail images, save a draft, then publish it. Posts and services also support drafts. Published content is returned by the public APIs; drafts are hidden. Home, About, Services, navigation, footer, and site settings are editable under Globals. Re-running the seed leaves edited globals alone. The sample project illustrations in `public/images/projects` are fallback content until real projects are published.

`npm run check:publishing` creates temporary post, media, and project records, checks draft/publish/edit/unpublish behavior, then deletes them. Run it against a development or staging database. `npm run lint` checks the source.

For deployment, run migration and verification with development dependencies installed before switching traffic to the new build; Flyway and `tsx` are build tools, not runtime dependencies. Keep `src/migrations` SQL-only and add a new `V<number>__description.sql` for each schema change. See [migration details](docs/DATABASE_MIGRATIONS.md).

Before public launch, connect a Payload email adapter for password-reset delivery and replace the sample portfolio content with approved projects. Any admin account created by an older seed used a published default password and must have its password rotated.
