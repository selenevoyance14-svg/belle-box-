import type { CatalogProduct } from "./catalog";

export const PRICE_RANGES = [
  { value: "all", label: "Tous les budgets", min: 0, max: Infinity },
  { value: "under-20", label: "20 € maximum", min: 0, max: 20 },
  { value: "20-50", label: "20 à 50 €", min: 20.01, max: 50 },
  { value: "50-100", label: "50 à 100 €", min: 50.01, max: 100 },
  { value: "over-100", label: "Plus de 100 €", min: 100.01, max: Infinity },
] as const;
export type GiftFilters = { recipient: string; occasion: string; interest: string; budget: string; query: string; sort: string };
export const DEFAULT_FILTERS: GiftFilters = { recipient: "all", occasion: "all", interest: "all", budget: "all", query: "", sort: "recommended" };
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export function filterGifts(products: CatalogProduct[], filters: GiftFilters): CatalogProduct[] {
  const range = PRICE_RANGES.find((item) => item.value === filters.budget) ?? PRICE_RANGES[0];
  const words = normalize(filters.query).trim().split(/\s+/).filter(Boolean);
  const result = products.filter((p) =>
    p.price >= range.min && p.price <= range.max &&
    (filters.recipient === "all" || p.recipients.includes(filters.recipient)) &&
    (filters.occasion === "all" || p.occasions.includes(filters.occasion)) &&
    (filters.interest === "all" || p.interests?.includes(filters.interest)) &&
    words.every((word) => normalize(`${p.title} ${p.reason ?? ""}`).includes(word))
  );
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}
