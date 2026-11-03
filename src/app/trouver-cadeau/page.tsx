import type { Metadata } from "next";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import FilterableProductGrid from "@/app/components/FilterableProductGrid";
import { getGiftCatalog } from "@/lib/catalog";
export const metadata: Metadata = { title: "Trouver un cadeau par envie et budget | Kado-Box", description: "Croisez personne, budget, occasion et centres d’intérêt pour trouver un cadeau adapté. Enregistrez vos favoris sans créer de compte.", alternates: { canonical: "/trouver-cadeau" } };
export default function FinderPage() {
  return <><Header /><main><section className="collection-hero collection-hero-compact"><div className="kb-container"><p className="kb-eyebrow">Moins d’hésitation, plus d’idées</p><h1>Trouvez un cadeau qui lui ressemble.</h1></div></section><section className="kb-section collection-products"><div className="kb-container"><FilterableProductGrid products={getGiftCatalog()} /></div></section></main><SiteFooter /></>;
}
