import type { Metadata } from "next";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import FilterableProductGrid from "@/app/components/FilterableProductGrid";
import { getGiftCatalog } from "@/lib/catalog";
export const metadata: Metadata = { title: "Mes idées à garder | Kado-Box", robots: { index: false, follow: true }, alternates: { canonical: "/favoris" } };
export default function FavoritesPage() {
  return <><Header /><main><section className="collection-hero collection-hero-compact"><div className="kb-container"><h1>Mes idées à garder.</h1><p>Votre liste est enregistrée dans ce navigateur, sans compte.</p></div></section><section className="kb-section collection-products"><div className="kb-container"><FilterableProductGrid products={getGiftCatalog()} favoritesOnly /></div></section></main><SiteFooter /></>;
}
