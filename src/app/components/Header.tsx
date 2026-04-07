"use client";
import { useState } from "react";

export default function Header({ activePage }: { activePage?: string }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#comparatif", label: "Comparatif" },
    { href: "/#tableau", label: "Tableau" },
    { href: "/#codes-promo", label: "Promos" },
    { href: "/blog", label: "Blog" },
    { href: "/quiz", label: "Quiz" },
    { href: "/a-propos", label: "À propos" },
  ];

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            <img src="/kado-logo.svg" alt="Kado" className="logo-img" />
          </a>
          <nav className="nav">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={activePage === l.href ? { color: "var(--primary)", fontWeight: 700 } : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="mobile-menu-btn"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-nav" role="navigation" aria-label="Menu mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
