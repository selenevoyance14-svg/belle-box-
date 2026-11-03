import { getGiftCatalog, type CatalogProduct } from "./catalog";
import type { Guide } from "./guides";

/** Un guide ne doit pas recycler une sélection sans rapport avec son sujet. */
export function getProductsForGuide(guide: Guide): CatalogProduct[] {
  let products = getGiftCatalog().filter((p) =>
    (!guide.recipientSlug || p.recipients.includes(guide.recipientSlug)) &&
    (!guide.occasionSlug || p.occasions.includes(guide.occasionSlug))
  );
  if (/beaute|gourmand/.test(guide.slug)) return [];
  if (/petit-budget|secret-santa/.test(guide.slug)) products = products.filter((p) => p.price <= 20 && p.category !== "bebe");
  if (guide.slug === "cadeau-tech-utile") products = products.filter((p) => ["tech", "montre", "jeu_video"].includes(p.category));
  if (guide.slug === "cadeau-livre-par-profil") products = products.filter((p) => p.category === "livre");
  if (guide.slug === "cadeau-enfant-3-6-ans") products = products.filter((p) => ["B00NVDP3ZU", "B0DPJ86GWS", "B0CP417FBD", "B07C8CDF7F", "B09YYT7M92"].includes(p.asin));
  if (guide.slug === "cadeau-enfant-7-10-ans") products = products.filter((p) => !["B0CP417FBD", "B0DB23WCXK"].includes(p.asin));
  if (/cremaillere|fiancailles|anniversaire-mariage/.test(guide.slug)) products = products.filter((p) => p.interests?.includes("cocooning") || p.category === "jeu_societe");
  // Diversifier les premières pistes plutôt qu'afficher six jeux de cartes.
  const seen = new Map<string, number>();
  const selected: CatalogProduct[] = [];
  for (const p of products) {
    if ((seen.get(p.category) ?? 0) >= 2 && products.some((other) => !seen.has(other.category))) continue;
    selected.push(p);
    seen.set(p.category, (seen.get(p.category) ?? 0) + 1);
    if (selected.length === 6) break;
  }
  return selected;
}
