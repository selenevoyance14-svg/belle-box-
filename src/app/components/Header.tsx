import { OCCASIONS } from "@/lib/catalog";
import { Menu } from "lucide-react";

export default function Header(_props?: { activePage?: string }) {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Kado<span style={{ color: "var(--primary)" }}>-Box</span>
        </a>
        <nav className="nav">
          {OCCASIONS.slice(0, 4).map((o) => (
            <a key={o.slug} href={`/occasion/${o.slug}`}>{o.name}</a>
          ))}
        </nav>
        <button className="mobile-menu-btn" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
