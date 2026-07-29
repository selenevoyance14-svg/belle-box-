import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kado-box.fr"),
  title: "Kado-Box — Des idées cadeaux utiles pour chaque budget",
  description:
    "Des idées cadeaux utiles et abordables pour Noël, un anniversaire ou une attention : sélections par budget et par destinataire.",
  alternates: {
    canonical: "https://kado-box.fr",
  },
  keywords: [
    "idées cadeaux",
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
    title: "Kado-Box — Des idées cadeaux utiles",
    description: "Trouvez une idée cadeau adaptée à la personne, à l'occasion et à votre budget.",
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
