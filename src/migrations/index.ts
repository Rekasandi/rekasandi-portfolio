import * as migration_20260922_125246_initial_neon_schema from './20260922_125246_initial_neon_schema';
import * as migration_20260922_210000_update_projects_upload_fields from './20260922_210000_update_projects_upload_fields';
import * as migration_20260929_000000_add_localized_metadata_tables from './20260929_000000_add_localized_metadata_tables';
import * as migration_20260929_104455_localize_public_content from './20260929_104455_localize_public_content';
import * as migration_20260929_110000_add_version_locale_fields from './20260929_110000_add_version_locale_fields';
import * as migration_20260930_110000_add_home_faq_items from './20260930_110000_add_home_faq_items';
import * as migration_20260930_120000_nested_home_tech_groups from './20260930_120000_nested_home_tech_groups';
import * as migration_20260930_130000_add_home_hero_image from './20260930_130000_add_home_hero_image';
import * as migration_20260930_140000_home_hero_images from './20260930_140000_home_hero_images';
import * as migration_20260930_150000_add_team_member_photo from './20260930_150000_add_team_member_photo';
import * as migration_20260930_160000_add_project_selected_work_images from './20260930_160000_add_project_selected_work_images';
import * as migration_20260930_170000_home_logo_arrays from './20260930_170000_home_logo_arrays';
import * as migration_20260930_180000_home_logo_copy_fields from './20260930_180000_home_logo_copy_fields';
import * as migration_20260930_190000_add_service_card_image from './20260930_190000_add_service_card_image';

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
  {
    up: migration_20260930_110000_add_home_faq_items.up,
    down: migration_20260930_110000_add_home_faq_items.down,
    name: '20260930_110000_add_home_faq_items'
  },
  {
    up: migration_20260930_120000_nested_home_tech_groups.up,
    down: migration_20260930_120000_nested_home_tech_groups.down,
    name: '20260930_120000_nested_home_tech_groups'
  },
  {
    up: migration_20260930_130000_add_home_hero_image.up,
    down: migration_20260930_130000_add_home_hero_image.down,
    name: '20260930_130000_add_home_hero_image'
  },
  {
    up: migration_20260930_140000_home_hero_images.up,
    down: migration_20260930_140000_home_hero_images.down,
    name: '20260930_140000_home_hero_images'
  },
  {
    up: migration_20260930_150000_add_team_member_photo.up,
    down: migration_20260930_150000_add_team_member_photo.down,
    name: '20260930_150000_add_team_member_photo'
  },
  {
    up: migration_20260930_160000_add_project_selected_work_images.up,
    down: migration_20260930_160000_add_project_selected_work_images.down,
    name: '20260930_160000_add_project_selected_work_images'
  },
  {
    up: migration_20260930_170000_home_logo_arrays.up,
    down: migration_20260930_170000_home_logo_arrays.down,
    name: '20260930_170000_home_logo_arrays'
  },
  {
    up: migration_20260930_180000_home_logo_copy_fields.up,
    down: migration_20260930_180000_home_logo_copy_fields.down,
    name: '20260930_180000_home_logo_copy_fields'
  },
  {
    up: migration_20260930_190000_add_service_card_image.up,
    down: migration_20260930_190000_add_service_card_image.down,
    name: '20260930_190000_add_service_card_image'
  },
];
