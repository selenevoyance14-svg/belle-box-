"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Heart, RotateCcw, Search, Share2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useFavorites } from "./FavoritesProvider";
import type { CatalogProduct } from "@/lib/catalog";
import { INTERESTS } from "@/lib/gift-selection";
import { DEFAULT_FILTERS, filterGifts, PRICE_RANGES, type GiftFilters } from "@/lib/gift-filters";

const PEOPLE = [{ value: "femme", label: "Pour elle" }, { value: "homme", label: "Pour lui" }, { value: "ado", label: "Ado" }, { value: "enfant", label: "Enfant" }, { value: "couple", label: "Couple" }, { value: "bebe", label: "Bébé" }];
const OCCASIONS = [{ value: "noel", label: "Noël" }, { value: "anniversaire", label: "Anniversaire" }, { value: "naissance", label: "Naissance" }, { value: "saint-valentin", label: "Saint-Valentin" }, { value: "fete-des-meres", label: "Fête des mères" }, { value: "fete-des-peres", label: "Fête des pères" }, { value: "paques", label: "Pâques" }];
export default function FilterableProductGrid({ products, favoritesOnly = false, fixedRecipient, fixedOccasion }: { products: CatalogProduct[]; favoritesOnly?: boolean; fixedRecipient?: string; fixedOccasion?: string }) {
  const [filters, setFilters] = useState<GiftFilters>(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(12);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(false);
  const { favorites, ready } = useFavorites();
  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const next = { ...DEFAULT_FILTERS };
      for (const key of Object.keys(next) as (keyof GiftFilters)[]) {
        const value = params.get(key);
        if (value && value.length <= 150) next[key] = value;
      }
      // Une URL modifiée à la main ne doit pas créer des filtres invisibles.
      if (!PEOPLE.some((p) => p.value === next.recipient)) next.recipient = "all";
      if (!OCCASIONS.some((p) => p.value === next.occasion)) next.occasion = "all";
      if (!INTERESTS.some((p) => p.value === next.interest)) next.interest = "all";
      if (!PRICE_RANGES.some((p) => p.value === next.budget)) next.budget = "all";
      if (!["price-asc", "price-desc"].includes(next.sort)) next.sort = "recommended";
      if (fixedRecipient) next.recipient = "all";
      if (fixedOccasion) next.occasion = "all";
      setFilters(next);
      setVisible(12);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [fixedRecipient, fixedOccasion]);
  function update(next: GiftFilters) {
    setFilters(next);
    setVisible(12);
    setCopied(false);
    setShareError(false);
    const params = new URLSearchParams();
    for (const key of Object.keys(next) as (keyof GiftFilters)[]) if (next[key] !== DEFAULT_FILTERS[key]) params.set(key, next[key]);
    window.history.replaceState(null, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
  }
  function set(key: keyof GiftFilters, value: string) { update({ ...filters, [key]: value }); }
  const base = useMemo(() => favoritesOnly ? products.filter((p) => favorites.includes(p.asin)) : products, [favoritesOnly, products, favorites]);
  const results = useMemo(() => filterGifts(base, filters), [base, filters]);
  const active = Object.keys(filters).some((key) => filters[key as keyof GiftFilters] !== DEFAULT_FILTERS[key as keyof GiftFilters]);
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); }
    catch { setShareError(true); }
  }
  if (favoritesOnly && !ready) return <p role="status">Chargement de votre liste…</p>;
  if (favoritesOnly && base.length === 0) return <div className="catalog-empty"><Heart size={30} /><h2>Votre prochaine bonne idée commence ici.</h2><p>Touchez le cœur sur un cadeau pour le retrouver dans cette liste, sur cet appareil.</p><Link className="kb-button kb-button-primary" href="/trouver-cadeau">Trouver mes cadeaux →</Link></div>;
  return (
    <>
      <div className="catalog-filters gift-filters">
        <label className="gift-search"><Search size={19} aria-hidden /><span className="sr-only">Rechercher une idée cadeau</span><input type="search" placeholder="Un jeu, une liseuse, des LEGO…" value={filters.query} onChange={(e) => set("query", e.target.value)} /></label>
        <div className="catalog-filter-grid">
          {!fixedRecipient ? <label><span>Pour qui ?</span><select value={filters.recipient} onChange={(e) => set("recipient", e.target.value)}><option value="all">Tout le monde</option>{PEOPLE.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label> : null}
          <label><span>Budget indicatif</span><select value={filters.budget} onChange={(e) => set("budget", e.target.value)}>{PRICE_RANGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label>
          <label><span>Ses envies</span><select value={filters.interest} onChange={(e) => set("interest", e.target.value)}><option value="all">Toutes les envies</option>{INTERESTS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label>
          {!fixedOccasion ? <label><span>Occasion</span><select value={filters.occasion} onChange={(e) => set("occasion", e.target.value)}><option value="all">Toutes les occasions</option>{OCCASIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label> : null}
        </div>
        <div className="gift-results-bar" aria-live="polite">
          <strong>{results.length} {results.length > 1 ? "idées" : "idée"}</strong>
          <label className="gift-sort"><span className="sr-only">Trier les résultats</span><select value={filters.sort} onChange={(e) => set("sort", e.target.value)}><option value="recommended">Ordre de la sélection</option><option value="price-asc">Budget croissant</option><option value="price-desc">Budget décroissant</option></select></label>
          {active ? <button type="button" onClick={() => update(DEFAULT_FILTERS)}><RotateCcw size={14} /> Effacer</button> : null}
          {!favoritesOnly ? <button type="button" onClick={share}>{copied ? <Check size={15} /> : <Share2 size={15} />}{copied ? "Lien copié" : "Partager la recherche"}</button> : null}
        </div>
        {shareError ? <p role="status">Copiez l’adresse de cette page pour partager votre recherche.</p> : null}
      </div>
      {results.length ? <>
        <div className="product-grid kb-product-grid">{results.slice(0, visible).map((product) => <ProductCard key={product.asin} product={product} />)}</div>
        {results.length > visible ? <div className="gift-load-more"><button type="button" className="kb-button kb-button-secondary" onClick={() => setVisible((n) => n + 12)}>Voir {Math.min(12, results.length - visible)} autres idées</button><p>{Math.min(visible, results.length)} sur {results.length} idées</p></div> : null}
      </> : <div className="catalog-empty"><h2>Pas encore de cadeau pour cette combinaison.</h2><p>Essayez un autre budget ou retirez un critère pour découvrir d’autres idées.</p><button type="button" className="kb-button kb-button-primary" onClick={() => update(DEFAULT_FILTERS)}>Élargir ma recherche</button></div>}
      <p className="gift-price-note">Liens affiliés : une commission peut nous être versée, sans surcoût. Les budgets reposent sur le dernier prix enregistré et peuvent avoir changé. Vérifiez le prix et la disponibilité sur Amazon.</p>
    </>
  );
}
