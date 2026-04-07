import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kado — Comparatif box beauté 2026 : Biotyfull, Blissim, LookFantastic…",
  description:
    "Comparatif complet et honnête des 10 meilleures box beauté en France : Biotyfull, Blissim, LookFantastic, Prescription Lab, Glowria, My Little Box, Belle au Naturel, Nuoo, Mademoiselle Confettis, L'Aroma Box.",
  alternates: {
    canonical: "https://kado-box.fr",
  },
  keywords: [
    "comparatif box beauté",
    "meilleure box beauté 2026",
    "box beauté avis",
    "Biotyfull Box",
    "Blissim",
    "Lookfantastic box",
    "Prescription Lab box",
    "Glowria box",
    "My Little Box",
    "Belle au Naturel box",
    "Nuoo box",
    "Mademoiselle Confettis",
    "Aroma Box",
    "Kado",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-48x48.png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kado — Comparatif box beauté 2026",
    description:
      "Comparatif honnête des 10 meilleures box beauté françaises : prix, produits, notes et avis détaillés.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-adsense-account" content="ca-pub-5064203547863113" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5064203547863113"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
