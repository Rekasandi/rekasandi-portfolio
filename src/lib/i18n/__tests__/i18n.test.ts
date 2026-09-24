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

assert.equal(dictEn.nav.work, "WORK");
assert.equal(dictId.nav.work, "KARYA");
assert.equal(dictEn.nav.services, "SERVICES");
assert.equal(dictId.nav.services, "LAYANAN");
assert.equal(dictEn.nav.cta, "START A PROJECT");
assert.equal(dictId.nav.cta, "MULAI PROYEK");

assert.equal(dictEn.footer.rights, "ALL RIGHTS RESERVED");
assert.equal(dictId.footer.rights, "HAK CIPTA DILINDUNGI");

assert.equal(dictEn.home.hero.headlineLine1, "WE BUILD");
assert.equal(dictId.home.hero.headlineLine1, "KAMI MEMBANGUN");

// 3. Verify key parity between EN and ID dictionaries
function verifyKeyParity(objA: Record<string, any>, objB: Record<string, any>, path = "") {
  for (const key of Object.keys(objA)) {
    const currentPath = path ? `${path}.${key}` : key;
    assert.ok(key in objB, `Missing key in target dictionary: ${currentPath}`);
    if (typeof objA[key] === "object" && objA[key] !== null && !Array.isArray(objA[key])) {
      assert.equal(typeof objB[key], "object", `Mismatch type at ${currentPath}`);
      verifyKeyParity(objA[key], objB[key], currentPath);
    }
  }
}

verifyKeyParity(en, id);
verifyKeyParity(id, en);

console.log("✓ All i18n checks passed successfully!");
