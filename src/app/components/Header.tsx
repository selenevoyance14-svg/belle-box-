import Link from "next/link";
import FavoritesLink from "./FavoritesLink";
import { Gift, Search } from "lucide-react";

const NAVIGATION = [
  { href: "/occasion/anniversaire", label: "Anniversaire" },
  { href: "/destinataire/homme", label: "Pour lui" },
  { href: "/occasion/noel", label: "Noël" },
  { href: "/destinataire/femme", label: "Pour elle" },
  { href: "/guide", label: "Guides" },
];

export default function Header() {
  return (
    <header className="kb-header">
      <div className="kb-container kb-header-main">
        <Link href="/" className="kb-logo" aria-label="Kado-Box, accueil">
          <span className="kb-logo-mark"><Gift size={19} strokeWidth={2.2} /></span>
          <span>Kado<span>Box</span></span>
        </Link>
        <nav className="kb-nav" aria-label="Navigation principale">
          {NAVIGATION.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <FavoritesLink />
        <Link href="/trouver-cadeau" className="kb-header-action">
          <Search size={16} />
          Trouver un cadeau
        </Link>
      </div>
      <nav className="kb-mobile-nav" aria-label="Navigation mobile">
        {NAVIGATION.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
}
