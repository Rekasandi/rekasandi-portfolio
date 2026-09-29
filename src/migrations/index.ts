import * as migration_20260922_125246_initial_neon_schema from './20260922_125246_initial_neon_schema';
import * as migration_20260922_210000_update_projects_upload_fields from './20260922_210000_update_projects_upload_fields';
import * as migration_20260929_000000_add_localized_metadata_tables from './20260929_000000_add_localized_metadata_tables';
import * as migration_20260929_104455_localize_public_content from './20260929_104455_localize_public_content';
import * as migration_20260929_110000_add_version_locale_fields from './20260929_110000_add_version_locale_fields';

export const migrations = [
  {
    up: migration_20260922_125246_initial_neon_schema.up,
    down: migration_20260922_125246_initial_neon_schema.down,
    name: '20260922_125246_initial_neon_schema',
  },
  {
    up: migration_20260922_210000_update_projects_upload_fields.up,
    down: migration_20260922_210000_update_projects_upload_fields.down,
    name: '20260922_210000_update_projects_upload_fields',
  },
  {
    up: migration_20260929_000000_add_localized_metadata_tables.up,
    down: migration_20260929_000000_add_localized_metadata_tables.down,
    name: '20260929_000000_add_localized_metadata_tables',
  },
  {
    up: migration_20260929_104455_localize_public_content.up,
    down: migration_20260929_104455_localize_public_content.down,
    name: '20260929_104455_localize_public_content'
  },
  {
    up: migration_20260929_110000_add_version_locale_fields.up,
    down: migration_20260929_110000_add_version_locale_fields.down,
    name: '20260929_110000_add_version_locale_fields'
  },
];
