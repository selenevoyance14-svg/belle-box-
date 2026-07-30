import Link from "next/link";
import { Gift, Search } from "lucide-react";

const NAVIGATION = [
  { href: "/occasion/anniversaire", label: "Anniversaire" },
  { href: "/occasion/naissance", label: "Naissance" },
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
        <Link href="/budget/moins-de-20-euros" className="kb-header-action">
          <Search size={16} />
          Petit budget
        </Link>
      </div>
      <nav className="kb-mobile-nav" aria-label="Navigation mobile">
        {NAVIGATION.slice(0, 4).map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
}
