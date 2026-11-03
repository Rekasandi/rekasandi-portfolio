import assert from "node:assert/strict";
import { isValidLocale, defaultLocale, locales } from "../config";
import { getDictionary } from "../dictionaries";
import { en } from "../dictionaries/en";
import { id } from "../dictionaries/id";

// 1. Verify locales configuration
assert.equal(defaultLocale, "en");
assert.deepEqual(locales, ["en", "id"]);
assert.equal(isValidLocale("en"), true);
assert.equal(isValidLocale("id"), true);
assert.equal(isValidLocale("fr"), false);
assert.equal(isValidLocale(""), false);
assert.equal(isValidLocale(null), false);

// 2. Verify dictionary loading
const dictEn = getDictionary("en");
const dictId = getDictionary("id");

assert.equal(dictEn.nav.work, "Work");
assert.equal(dictId.nav.work, "Karya");
assert.equal(dictEn.nav.services, "Services");
assert.equal(dictId.nav.services, "Layanan");
assert.equal(dictEn.nav.cta, "Start a project");
assert.equal(dictId.nav.cta, "Mulai proyek");

assert.equal(dictEn.footer.rights, "All rights reserved");
assert.equal(dictId.footer.rights, "Hak cipta dilindungi");

assert.equal(dictEn.home.hero.headlineLine1, "We build");
assert.equal(dictId.home.hero.headlineLine1, "Kami membangun");

// 3. Verify key parity between EN and ID dictionaries
function verifyKeyParity(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
  path = ""
) {
  for (const key of Object.keys(objA)) {
    const currentPath = path ? `${path}.${key}` : key;
    assert.ok(key in objB, `Missing key in target dictionary: ${currentPath}`);
    const valA = objA[key];
    const valB = objB[key];
    if (typeof valA === "object" && valA !== null && !Array.isArray(valA)) {
      assert.equal(typeof valB, "object", `Mismatch type at ${currentPath}`);
      verifyKeyParity(
        valA as Record<string, unknown>,
        valB as Record<string, unknown>,
        currentPath
      );
    }
  }
}

verifyKeyParity(en, id);
verifyKeyParity(id, en);

console.log("✓ All i18n checks passed successfully!");
