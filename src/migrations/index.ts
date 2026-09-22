import * as migration_20260922_125246_initial_neon_schema from './20260922_125246_initial_neon_schema';

export const migrations = [
  {
    up: migration_20260922_125246_initial_neon_schema.up,
    down: migration_20260922_125246_initial_neon_schema.down,
    name: '20260922_125246_initial_neon_schema'
  },
];
