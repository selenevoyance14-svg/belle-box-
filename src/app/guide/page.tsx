import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides cadeaux 2026 : mieux choisir sans se tromper | Kado-Box",
  description: "Guides cadeaux par âge, occasion et profil : budgets conseillés, erreurs à éviter et idées pertinentes pour offrir juste.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndex() {
  return (
    <>
      <Header />
      <main>
        <section className="collection-hero">
          <div className="kb-container">
            <nav className="kb-breadcrumb"><Link href="/">Accueil</Link><span>/</span><span>Guides</span></nav>
            <p className="kb-eyebrow">Le conseil avant le cadeau</p>
            <h1>Nos guides pour<br />offrir juste</h1>
            <p className="collection-lead">Des réponses concrètes par âge, personnalité et occasion, pour choisir avec attention plutôt que par défaut.</p>
          </div>
        </section>
        <section className="kb-section">
          <div className="kb-container guide-index-grid">
            {GUIDES.map((guide, index) => (
              <Link key={guide.slug} href={`/guide/${guide.slug}`} className="guide-index-card">
                <span className="occasion-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{guide.title}</h2>
                  <p>{guide.metaDescription}</p>
                  <small><Clock size={12} /> {guide.readingMinutes} min de lecture</small>
                </div>
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
