import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/app/components/CollectionPage";
import { getProductsByRecipient, RECIPIENTS } from "@/lib/catalog";
import { RECIPIENT_EDITORIAL } from "@/lib/editorial";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return RECIPIENTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipient = RECIPIENTS.find((item) => item.slug === slug);
  if (!recipient) return { title: "Destinataire introuvable" };
  const metadataBySlug: Record<string, { title: string; description: string }> = {
    femme: {
      title: "Idée cadeau femme : 40 cadeaux originaux en 2026",
      description: "Trouvez une idée cadeau pour une femme selon son âge, ses goûts et votre budget : cadeaux originaux, utiles et personnalisés dès 10 €.",
    },
  };
  const customMetadata = metadataBySlug[slug];
  return {
    title: customMetadata?.title ?? `Idée cadeau ${recipient.name.toLowerCase()} en 2026 | Kado-Box`,
    description: customMetadata?.description ?? `Trouvez un cadeau ${recipient.name.toLowerCase()} vraiment adapté : idées Amazon sélectionnées selon les envies, l’occasion et votre budget.`,
    alternates: { canonical: `/destinataire/${slug}` },
  };
}

export default async function RecipientPage({ params }: Props) {
  const { slug } = await params;
  const recipient = RECIPIENTS.find((item) => item.slug === slug);
  if (!recipient) notFound();
  return (
    <CollectionPage
      eyebrow="Choisir par destinataire"
      title={slug === "femme" ? "40 idées cadeaux pour une femme en 2026" : `Idées cadeau ${recipient.name.toLowerCase()}`}
      description={slug === "femme"
        ? "Des cadeaux pour une femme classés par goûts, occasion et budget, de moins de 20 € au cadeau d’exception."
        : "Des idées ciblées pour faire plaisir sans tomber dans le cadeau générique, du petit prix au cadeau qui marque."}
      emoji={recipient.emoji}
      products={getProductsByRecipient(slug)}
      editorial={RECIPIENT_EDITORIAL[slug]}
      related={slug === "femme" ? [
        { href: "/guide/idees-cadeaux-anniversaire-femme", label: "Cadeau d’anniversaire pour une femme" },
        { href: "/guide/cadeau-noel-petit-budget", label: "Cadeaux de Noël à moins de 20 €" },
        { href: "/budget/moins-de-20-euros", label: "Cadeaux pour femme à petit prix" },
        { href: "/occasion/noel", label: "Idées cadeaux de Noël" },
      ] : RECIPIENTS.filter((item) => item.slug !== slug).slice(0, 4).map((item) => ({
        href: `/destinataire/${item.slug}`,
        label: item.name,
      }))}
    />
  );
}
