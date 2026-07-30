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
  return {
    title: `Idée cadeau ${recipient.name.toLowerCase()} en 2026 | Kado-Box`,
    description: `Trouvez un cadeau ${recipient.name.toLowerCase()} vraiment adapté : idées Amazon sélectionnées selon les envies, l’occasion et votre budget.`,
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
      title={`Idées cadeau ${recipient.name.toLowerCase()}`}
      description="Des idées ciblées pour faire plaisir sans tomber dans le cadeau générique, du petit prix au cadeau qui marque."
      emoji={recipient.emoji}
      products={getProductsByRecipient(slug)}
      editorial={RECIPIENT_EDITORIAL[slug]}
      related={RECIPIENTS.filter((item) => item.slug !== slug).slice(0, 4).map((item) => ({
        href: `/destinataire/${item.slug}`,
        label: item.name,
      }))}
    />
  );
}
