# Database migrations

`node-flyway` runs the SQL files in `src/migrations`. Payload remains the CMS, with `push: false` in `payload.config.ts`. Do not run Payload's migration commands on this database. Never edit a migration after it has been applied; add the next version instead.

| Version | Purpose |
| --- | --- |
| V1 | Original collections and globals |
| V2 | Upload relationships and contact submissions |
| V3 | Draft/version tables, page globals, and missing Payload fields and indexes |

`npm run payload:migrate` handles the one-time baseline from the two known legacy Payload migrations, then calls Flyway `migrate()`. It never baselines an unknown history. `npm run payload:verify` calls Flyway `validate()` and checks the recorded versions against the SQL filenames. `npm run payload:seed` seeds initial content without overwriting edited globals. `npm run payload:db-init` runs all three in order.

The installed `node-flyway` 0.0.13 can return an empty parsed result from `info()` with its bundled Flyway 9.22.3. Migration and validation work, so verification reads the `flyway_schema_history` table directly after `validate()`. `node-flyway` also writes `report.html` and `report.json` locally; those generated files are ignored by Git.

Run `npm run check:publishing` against development or staging to verify that Payload can upload media and complete the draft, publish, edit, and unpublish flow. It removes its temporary records. Production needs a configured S3-compatible store for uploaded project images.
