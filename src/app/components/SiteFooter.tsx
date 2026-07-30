import Link from "next/link";
import { Gift } from "lucide-react";
import { BUDGETS, OCCASIONS, RECIPIENTS } from "@/lib/catalog";

export default function SiteFooter() {
  return (
    <footer className="kb-footer">
      <div className="kb-container kb-footer-grid">
        <div className="kb-footer-brand">
          <Link href="/" className="kb-logo kb-logo-footer">
            <span className="kb-logo-mark"><Gift size={19} /></span>
            <span>Kado<span>Box</span></span>
          </Link>
          <p>
            Des idées cadeaux choisies pour être offertes, classées par occasion,
            destinataire et budget.
          </p>
          <small>
            En tant que Partenaire Amazon, Kado-Box réalise un bénéfice sur les
            achats remplissant les conditions requises.
          </small>
        </div>
        <div>
          <h2>Occasions</h2>
          <ul>{OCCASIONS.slice(0, 5).map((item) => (
            <li key={item.slug}><Link href={`/occasion/${item.slug}`}>{item.name}</Link></li>
          ))}</ul>
        </div>
        <div>
          <h2>Pour qui</h2>
          <ul>{RECIPIENTS.slice(0, 5).map((item) => (
            <li key={item.slug}><Link href={`/destinataire/${item.slug}`}>{item.name}</Link></li>
          ))}</ul>
        </div>
        <div>
          <h2>Budget</h2>
          <ul>{BUDGETS.map((item) => (
            <li key={item.slug}><Link href={`/budget/${item.slug}`}>{item.name}</Link></li>
          ))}</ul>
        </div>
      </div>
      <div className="kb-container kb-footer-bottom">
        <span>© 2026 Kado-Box</span>
        <nav>
          <Link href="/a-propos">Notre méthode</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-de-confidentialite">Confidentialité</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
