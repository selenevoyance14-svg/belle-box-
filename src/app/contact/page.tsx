import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact | Kado-Box",
  description:
    "Une question, une correction ou une proposition de partenariat ? Contactez l'équipe Kado-Box par email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Contact</h1>

          <section className="static-section">
            <p>
              Une question sur une sélection, une information à corriger ou une
              proposition de partenariat ? Écrivez-nous directement. Nous lisons
              chaque message et répondons généralement sous quelques jours ouvrés.
            </p>
          </section>

          <section className="static-section" style={{ marginTop: "32px" }}>
            <div className="static-icon-header">
              <Mail size={24} />
              <h2>Adresse de contact</h2>
            </div>
            <p>
              <a href="mailto:bonsplansmania@gmail.com" style={{ color: "var(--primary)", fontWeight: 600 }}>
                bonsplansmania@gmail.com
              </a>
            </p>
            <p>Précisez l&apos;URL concernée lorsqu&apos;il s&apos;agit d&apos;une correction.</p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
