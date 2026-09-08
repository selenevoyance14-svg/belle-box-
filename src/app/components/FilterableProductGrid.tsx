"use client";

import { useMemo, useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/app/components/ProductCard";
import { CATEGORY_LABELS } from "@/lib/catalog-labels";
import type { CatalogProduct } from "@/lib/catalog";

type SortOrder = "recommended" | "price-asc" | "price-desc" | "rating";

const PRICE_RANGES = [
  { value: "all", label: "Tous les prix", min: 0, max: Infinity },
  { value: "under-20", label: "Moins de 20 €", min: 0, max: 20 },
  { value: "20-50", label: "20 à 50 €", min: 20.01, max: 50 },
  { value: "50-100", label: "50 à 100 €", min: 50.01, max: 100 },
  { value: "over-100", label: "Plus de 100 €", min: 100.01, max: Infinity },
] as const;

function decodeTitle(title: string) {
  return title
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

function getBrand(product: CatalogProduct) {
  const title = decodeTitle(product.title).trim();
  const beforeSeparator = title.split(/\s[-–—|:]\s/)[0].trim();
  const words = beforeSeparator.split(/\s+/);
  return words.slice(0, beforeSeparator.length < 28 ? 3 : 1).join(" ");
}

export default function FilterableProductGrid({ products }: { products: CatalogProduct[] }) {
  const [sort, setSort] = useState<SortOrder>("recommended");
  const [priceRange, setPriceRange] = useState("all");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category)))
    .sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b, "fr")), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(getBrand)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "fr")), [products]);

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES.find((item) => item.value === priceRange) ?? PRICE_RANGES[0];
    const result = products.filter((product) =>
      product.price >= range.min &&
      product.price <= range.max &&
      (category === "all" || product.category === category) &&
      (brand === "all" || getBrand(product) === brand)
    );

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return result;
  }, [brand, category, priceRange, products, sort]);

  const hasFilters = sort !== "recommended" || priceRange !== "all" || category !== "all" || brand !== "all";
  const resetFilters = () => {
    setSort("recommended");
    setPriceRange("all");
    setCategory("all");
    setBrand("all");
  };

  return (
    <>
      <div className="catalog-filters" aria-label="Filtrer et trier les idées cadeaux">
        <div className="catalog-filters-title">
          <SlidersHorizontal size={18} aria-hidden />
          <span>Filtrer les cadeaux</span>
        </div>
        <div className="catalog-filter-grid">
          <label>
            <span>Trier par</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
              <option value="recommended">Notre sélection</option>
              <option value="price-asc">Prix : moins cher</option>
              <option value="price-desc">Prix : plus cher</option>
              <option value="rating">Mieux notés</option>
            </select>
          </label>
          <label>
            <span>Budget</span>
            <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
              {PRICE_RANGES.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
            </select>
          </label>
          <label>
            <span>Type d’objet</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Tous les objets</option>
              {categories.map((value) => <option key={value} value={value}>{CATEGORY_LABELS[value] ?? value}</option>)}
            </select>
          </label>
          <label>
            <span>Marque</span>
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              <option value="all">Toutes les marques</option>
              {brands.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </div>
        <div className="catalog-filter-status" aria-live="polite">
          <strong>{filteredProducts.length}</strong> {filteredProducts.length > 1 ? "cadeaux trouvés" : "cadeau trouvé"}
          {hasFilters && (
            <button type="button" onClick={resetFilters}>
              <RotateCcw size={14} aria-hidden /> Réinitialiser
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid kb-product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.asin}
              product={product}
              badge={sort === "recommended" && index === 0 ? "Notre choix" : sort === "recommended" && index === 1 ? "Très apprécié" : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <p>Aucun cadeau ne correspond à ces critères.</p>
          <button type="button" className="btn btn-primary" onClick={resetFilters}>Voir tous les cadeaux</button>
        </div>
      )}
    </>
  );
}
