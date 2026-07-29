import { getProductsByRecipient, RECIPIENTS } from "@/lib/catalog";
import { RECIPIENT_EDITORIAL } from "@/lib/editorial";
import { EditorialIntro, EditorialBody } from "@/app/components/EditorialContent";
import { ProductCard } from "@/app/components/ProductCard";
import { Menu, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return RECIPIENTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = RECIPIENTS.find((x) => x.slug === slug);
  if (!r) return { title: "Destinataire introuvable" };
  return {
    title: `Cadeaux ${r.name.toLowerCase()} — Kado-Box`,
    description: `Idées cadeaux ${r.name.toLowerCase()} classées par envie et par budget.`,
    alternates: { canonical: `https://kado-box.fr/destinataire/${slug}` },
  };
}

export default async function RecipientPage({ params }: Props) {
  const { slug } = await params;
  const r = RECIPIENTS.find((x) => x.slug === slug);
  if (!r) notFound();
  const products = getProductsByRecipient(slug)
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
  const editorial = RECIPIENT_EDITORIAL[slug];

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Kado<span style={{ color: 'var(--primary)' }}>-Box</span>
          </a>
          <nav className="nav">
            {RECIPIENTS.slice(0, 4).map((x) => (
              <a key={x.slug} href={`/destinataire/${x.slug}`}>{x.name}</a>
            ))}
          </nav>
          <button className="mobile-menu-btn" aria-label="Menu"><Menu size={20} /></button>
        </div>
      </header>

      <section className="static-page">
        <div className="container">
          <a href="/" className="breadcrumb-back">
            <ArrowLeft size={14} /> Retour à l'accueil
          </a>
          <div className="occasion-header">
            <div className="occasion-header-emoji">{r.emoji}</div>
            <div>
              <h1>Cadeaux {r.name.toLowerCase()}</h1>
              <p className="occasion-header-desc">Notre sélection ciblée pour faire mouche.</p>
              <span className="muted">{products.length} idées sélectionnées sur Amazon</span>
            </div>
          </div>

          {editorial && <EditorialIntro editorial={editorial} />}

          {products.length === 0 ? (
            <p style={{ textAlign: "center", padding: "60px 0" }}>
              Aucun produit pour ce destinataire pour l'instant.
            </p>
          ) : (
            <div className="product-grid" style={{ marginTop: "40px" }}>
              {products.map((p, i) => (
                <ProductCard
                  key={p.asin}
                  product={p}
                  badge={i === 0 ? "À découvrir" : i === 1 ? "Autre idée" : undefined}
                />
              ))}
            </div>
          )}

          {editorial && <EditorialBody editorial={editorial} />}
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 Kado-Box. En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
