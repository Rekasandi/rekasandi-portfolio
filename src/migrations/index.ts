import * as migration_20260922_125246_initial_neon_schema from './20260922_125246_initial_neon_schema';
import * as migration_20260922_210000_update_projects_upload_fields from './20260922_210000_update_projects_upload_fields';

export const migrations = [
  {
    up: migration_20260922_125246_initial_neon_schema.up,
    down: migration_20260922_125246_initial_neon_schema.down,
    name: '20260922_125246_initial_neon_schema'
  },
  {
    up: migration_20260922_210000_update_projects_upload_fields.up,
    down: migration_20260922_210000_update_projects_upload_fields.down,
    name: '20260922_210000_update_projects_upload_fields'
  },
];
