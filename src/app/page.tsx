import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import GiftFinderForm from "./components/GiftFinderForm";
import { ProductCard } from "./components/ProductCard";
import { BUDGETS, getGiftCatalog, RECIPIENTS } from "@/lib/catalog";
import { INTERESTS } from "@/lib/gift-selection";

export const metadata: Metadata = pageMetadata(
  "Idées cadeaux 2026 par envie et budget | Kado-Box",
  "Jeux à partager, cadeaux créatifs, lecture ou tech : trouvez une idée qui lui ressemble, comparez vos favoris et vérifiez le prix sur Amazon.",
  "/",
);
const PICKS = ["B0BHZ94WC9", "B01N6CJ1QW", "B0BHTJLFVP", "B084HD9FSQ"];
const SMALL_GIFTS = ["B0CQP9RPGS", "B0DWDZ44TK", "2290391174", "B07KFPCGFC"];
const INTEREST_ICONS: Record<string, string> = { jeux: "♠", creatif: "✂", lecture: "↗", musique: "♫", tech: "⌘", cocooning: "☀", sport: "↟", eveil: "✦" };
export default function Home() {
  const gifts = getGiftCatalog();
  const picks = (asins: string[]) => asins.flatMap((asin) => gifts.find((p) => p.asin === asin) ?? []);
  return <>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", name: "Kado-Box", url: "https://kado-box.fr", inLanguage: "fr-FR" },
          { "@type": "Organization", name: "Kado-Box", url: "https://kado-box.fr", logo: "https://kado-box.fr/kado-logo.png" },
        ],
      }) }} />
      <section className="gift-home-hero"><div className="kb-container gift-home-grid">
        <div className="gift-home-copy"><p className="kb-eyebrow"><Sparkles size={15} /> Bien trouvé. Bien offert.</p><h1>Il y a cadeau.<br />Et <em>le bon cadeau.</em></h1><p>Celui qui parle de ses passions, qui donne envie de jouer, de créer ou de partager. Trouvons le sien.</p><div className="gift-home-proof"><span>{gifts.length} idées choisies une par une</span><span>Aucun compte à créer</span></div><Link href="/occasion/noel" className="gift-season-link">🎄 Préparer les cadeaux de Noël <ArrowRight size={16} /></Link></div>
        <GiftFinderForm />
      </div></section>
      <section className="gift-shortcuts"><div className="kb-container"><span>Une idée pour…</span>{RECIPIENTS.map((r) => <Link key={r.slug} href={`/destinataire/${r.slug}`}>{r.name} <ArrowRight size={14} /></Link>)}</div></section>
      <section className="kb-section gift-home-products"><div className="kb-container">
        <div className="kb-section-head"><div><p className="kb-eyebrow">Quatre pistes pour commencer</p><h2>Des cadeaux avec une bonne raison.</h2></div><Link className="gift-text-link" href="/trouver-cadeau">Toute la sélection <ArrowRight size={17} /></Link></div>
        <div className="product-grid kb-product-grid kb-product-grid-four">{picks(PICKS).map((p) => <ProductCard key={p.asin} product={p} />)}</div>
        <p className="gift-price-note">Liens affiliés : Kado-Box peut recevoir une commission sur vos achats, sans surcoût. Prix et disponibilité à vérifier sur Amazon.</p>
      </div></section>
      <section className="gift-interests"><div className="kb-container"><div className="kb-section-head"><div><p className="kb-eyebrow">Les passions avant les clichés</p><h2>Qu’est-ce qui lui plaît ?</h2></div><p>Un centre d’intérêt en dit souvent plus que l’âge ou le prénom.</p></div><div className="gift-interest-grid">{INTERESTS.map((i) => <Link key={i.value} href={`/trouver-cadeau?interest=${i.value}`}><span aria-hidden>{INTEREST_ICONS[i.value]}</span><strong>{i.label}</strong><ArrowRight size={18} /></Link>)}</div></div></section>
      <section className="kb-section gift-home-products"><div className="kb-container"><div className="kb-section-head"><div><p className="kb-eyebrow">Les petites attentions</p><h2>Un petit budget. Une vraie idée.</h2></div><Link href="/budget/moins-de-20-euros" className="gift-text-link">Explorer les petits budgets <ArrowRight size={17} /></Link></div><div className="product-grid kb-product-grid kb-product-grid-four">{picks(SMALL_GIFTS).map((p) => <ProductCard key={p.asin} product={p} />)}</div><p className="gift-price-note">Idées classées à 20 € maximum au dernier relevé. Le prix actuel peut avoir changé.</p></div></section>
      <section className="gift-budget-strip"><div className="kb-container"><h2>Votre budget, votre rythme.</h2><div>{BUDGETS.map((b) => <Link href={`/budget/${b.slug}`} key={b.slug}>{b.name}<ArrowRight size={17} /></Link>)}</div></div></section>
      <section className="kb-section"><div className="kb-container"><div className="kb-section-head"><div><p className="kb-eyebrow">Préparer Noël 2026</p><h2>Des conseils avant de choisir.</h2></div><Link href="/guide" className="gift-text-link">Tous les guides cadeaux <ArrowRight size={17} /></Link></div><div className="related-link-grid">{["cadeau-noel-homme", "cadeau-noel-femme", "cadeau-noel-petit-budget"].map((slug) => { const guide = GUIDES.find((item) => item.slug === slug)!; return <Link key={slug} href={`/guide/${slug}`}>{guide.title}<ArrowRight size={18} /></Link>; })}</div></div></section>
      <section className="gift-method"><div className="kb-container gift-method-grid"><div className="gift-method-image"><Image src="/images/kado-hero-gifts.png" alt="Des cadeaux emballés avec attention" fill sizes="(max-width: 700px) 100vw, 40vw" /></div><div><p className="kb-eyebrow">Une sélection qui vous aide à décider</p><h2>Pas juste un lien.<br />Un conseil avant d’offrir.</h2><p>Chaque idée précise à qui elle peut plaire et ce qu’il faut vérifier : âge, compatibilité, place ou goûts personnels. Nos sélections ne remplacent pas un test du produit.</p><div className="gift-method-steps"><span>01 <strong>Repérez une envie</strong></span><span>02 <strong><Heart size={15} /> Gardez vos favoris</strong></span><span>03 <strong>Vérifiez chez le marchand</strong></span></div><Link href="/a-propos" className="gift-text-link">Comment nous choisissons <ArrowRight size={17} /></Link></div></div></section>
    </main><SiteFooter />
  </>;
}
