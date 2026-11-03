import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getCatalog, getGiftCatalog, getProductsByOccasion, getProductsByRecipient } from "../src/lib/catalog";
import { GIFT_SELECTION, INTERESTS } from "../src/lib/gift-selection";
import { DEFAULT_FILTERS, filterGifts } from "../src/lib/gift-filters";
import { getProductsForGuide } from "../src/lib/guide-products";
import { GUIDES } from "../src/lib/guides";

test("chaque cadeau choisi existe, a une image et conserve le suivi affilié", () => {
  const source = getCatalog();
  const gifts = getGiftCatalog();
  assert.equal(new Set(GIFT_SELECTION.map((g) => g.asin)).size, GIFT_SELECTION.length);
  assert.equal(gifts.length, GIFT_SELECTION.length, "Une sélection manuelle a disparu du catalogue source");
  for (const p of gifts) {
    const original = source.find((item) => item.asin === p.asin)!;
    assert.equal(p.affiliate_url, original.affiliate_url);
    assert.match(p.affiliate_url, /tag=lebrunnathali-21/);
    if (p.image.startsWith("/")) assert.ok(fs.existsSync(`public${p.image}`), p.image);
    else assert.equal(new URL(p.image).hostname, "m.media-amazon.com");
    assert.ok(p.reason && p.caution);
    assert.ok(p.interests?.length);
  }
  for (const i of INTERESTS) assert.ok(gifts.some((p) => p.interests?.includes(i.value)), `Envie sans résultat : ${i.value}`);
});
test("le parcours combine budget, personne et envie sans élargir silencieusement", () => {
  const results = filterGifts(getGiftCatalog(), { ...DEFAULT_FILTERS, recipient: "ado", budget: "under-20", interest: "jeux" });
  assert.ok(results.length > 0);
  for (const p of results) { assert.ok(p.price <= 20); assert.ok(p.recipients.includes("ado")); assert.ok(p.interests?.includes("jeux")); }
  assert.equal(filterGifts(getGiftCatalog(), { ...DEFAULT_FILTERS, recipient: "bebe", interest: "tech" }).length, 0);
  assert.ok(filterGifts(getGiftCatalog(), { ...DEFAULT_FILTERS, query: "creatives" }).some((p) => p.asin === "B00NVDP3ZU"));
});
test("les sélections naissance et adultes ne mélangent pas leurs destinataires", () => {
  assert.ok(getProductsByOccasion("naissance").every((p) => p.recipients.includes("bebe")));
  assert.ok(getProductsByRecipient("femme").every((p) => p.category !== "bebe"));
  assert.ok(!getGiftCatalog().some((p) => /cartouche|lanoline|couches-culottes|crédence/i.test(p.title)));
});
test("les guides respectent simultanément leur sujet, leur destinataire et leur budget", () => {
  for (const guide of GUIDES) {
    for (const p of getProductsForGuide(guide)) {
      if (guide.recipientSlug) assert.ok(p.recipients.includes(guide.recipientSlug), guide.slug);
      if (guide.occasionSlug) assert.ok(p.occasions.includes(guide.occasionSlug), guide.slug);
      if (/petit-budget|secret-santa/.test(guide.slug)) assert.ok(p.price <= 20, guide.slug);
      if (guide.slug === "cadeau-livre-par-profil") assert.equal(p.category, "livre");
    }
  }
});
