import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kado-box.fr"),
  title: "Kado-Box — Idées cadeaux Amazon par occasion (2026)",
  description:
    "Trouvez le cadeau parfait : Fête des mères, Noël, anniversaire, Saint-Valentin, Pâques. Sélection des meilleurs cadeaux Amazon avec prix et avis vérifiés.",
  alternates: {
    canonical: "https://kado-box.fr",
  },
  keywords: [
    "idées cadeaux",
    "cadeau Amazon",
    "fête des mères",
    "fête des pères",
    "cadeau Noël",
    "cadeau Saint-Valentin",
    "cadeau Pâques",
    "cadeau anniversaire",
    "cadeau femme",
    "cadeau homme",
    "cadeau enfant",
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
    title: "Kado-Box — Idées cadeaux Amazon",
    description: "Trouvez le cadeau parfait pour chaque occasion : sélection des meilleurs produits Amazon.",
    type: "website",
    locale: "fr_FR",
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
