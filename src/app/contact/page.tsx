/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Heart, Mail, Send } from "lucide-react";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Contact | Kado",
  description:
    "Une question, une suggestion ou une proposition de partenariat ? Contacte l'équipe Kado. On répond à tous les messages.",
};

export default function ContactPage() {
  return (
    <>
      <Header activePage="/contact" />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Contact</h1>

          <section className="static-section">
            <p>
              Une question sur une box beauté ? Une suggestion d&apos;article ?
              Une proposition de partenariat ? N&apos;hésite pas à nous écrire,
              on répond à tous les messages.
            </p>
          </section>

          <form className="contact-form" action="#" method="POST">
            <div className="form-group">
              <label htmlFor="contact-name">Ton prénom</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Marie"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Ton email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="marie@exemple.fr"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Sujet</label>
              <select id="contact-subject" name="subject" required>
                <option value="">Choisis un sujet...</option>
                <option value="question">Question sur une box</option>
                <option value="suggestion">Suggestion d&apos;article</option>
                <option value="partenariat">Partenariat / Presse</option>
                <option value="bug">Signaler un problème</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Ton message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Écris ton message ici..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Send size={16} /> Envoyer
            </button>
          </form>

          <section className="static-section" style={{ marginTop: "48px" }}>
            <div className="static-icon-header">
              <Mail size={24} />
              <h2>Autre moyen de contact</h2>
            </div>
            <p>
              Tu peux aussi nous écrire directement à{" "}
              <a href="mailto:hello@kado.fr" style={{ color: "var(--primary)", fontWeight: 600 }}>
                hello@kado.fr
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <img src="/kado-logo.svg" alt="Kado" className="logo-img" />
              </div>
              <p>
                Unboxing happiness, delivered monthly. Tests honnêtes,
                comparatifs détaillés et codes promo exclusifs sur les box beauté
                depuis 2026.
              </p>
            </div>

            <div>
              <h4>Rubriques</h4>
              <ul className="footer-links">
                <li><a href="/#box-beaute">Box Beauté</a></li>
                <li><a href="/#comparatifs">Comparatifs</a></li>
                <li><a href="/#codes-promo">Codes Promo</a></li>
                <li><a href="/#articles">Derniers Articles</a></li>
              </ul>
            </div>

            <div>
              <h4>Infos</h4>
              <ul className="footer-links">
                <li><a href="/a-propos">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              © 2026 Kado — Fait avec <Heart size={14} fill="var(--primary)" color="var(--primary)" /> par Nathalie. Certains liens sont
              des liens affiliés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
