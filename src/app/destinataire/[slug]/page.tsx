import { pageMetadata } from "@/lib/seo";
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
  const labels: Record<string, string> = {
    femme: "pour une femme", homme: "pour un homme", enfant: "pour un enfant",
    ado: "pour un ado", couple: "pour un couple", bebe: "pour bébé",
  };
  return pageMetadata(
    `Idées cadeaux ${labels[slug]} en 2026 | Kado-Box`,
    `Trouvez un cadeau ${labels[slug]} selon ses envies, l’occasion et votre budget. Des pistes concrètes et les points à vérifier avant d’offrir.`,
    `/destinataire/${slug}`,
  );
}

export default async function RecipientPage({ params }: Props) {
  const { slug } = await params;
  const recipient = RECIPIENTS.find((item) => item.slug === slug);
  if (!recipient) notFound();
  return (
    <CollectionPage
      path={`/destinataire/${slug}`}
      recipient={slug}
      eyebrow="Choisir par destinataire"
      title={slug === "femme" ? "Idées cadeaux pour une femme" : `Idées cadeaux ${recipient.name.toLowerCase()}`}
      description={slug === "femme"
        ? "Des cadeaux pour une femme classés par goûts, occasion et budget, de moins de 20 € au cadeau d’exception."
        : "Des idées ciblées pour faire plaisir sans tomber dans le cadeau générique, du petit prix au cadeau qui marque."}
      emoji={recipient.emoji}
      image={recipient.image}
      products={getProductsByRecipient(slug)}
      editorial={RECIPIENT_EDITORIAL[slug]}
      related={slug === "femme" ? [
        { href: "/guide/idees-cadeaux-anniversaire-femme", label: "Cadeau d’anniversaire pour une femme" },
        { href: "/guide/cadeau-noel-petit-budget", label: "Cadeaux de Noël à moins de 20 €" },
        { href: "/trouver-cadeau?recipient=femme&budget=under-20", label: "Cadeaux pour femme à petit prix" },
        { href: "/occasion/noel", label: "Idées cadeaux de Noël" },
      ] : RECIPIENTS.filter((item) => item.slug !== slug).slice(0, 4).map((item) => ({
        href: `/destinataire/${item.slug}`,
        label: item.name,
      }))}
    />
  );
}
