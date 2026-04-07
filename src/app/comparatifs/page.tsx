import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparatifs — Kado Box",
  other: {
    "refresh": "0;url=/categorie/comparatif",
  },
};

export default function ComparatifRedirect() {
  return (
    <head>
      <meta httpEquiv="refresh" content="0;url=/categorie/comparatif" />
    </head>
  );
}
