import type { Editorial } from "@/lib/editorial";

/** Intro éditoriale affichée juste sous le titre de la page (avant la grille produits). */
export function EditorialIntro({ editorial }: { editorial: Editorial }) {
  return (
    <p style={{ fontSize: "1.05rem", lineHeight: "1.7", marginTop: "24px", maxWidth: "760px" }}>
      {editorial.intro}
    </p>
  );
}

/** Sections de conseils + FAQ affichées sous la grille produits, avec données structurées FAQ. */
export function EditorialBody({ editorial }: { editorial: Editorial }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: editorial.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div style={{ maxWidth: "760px", marginTop: "56px" }}>
      {editorial.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: "32px" }}>
          <h2 style={{ marginTop: "32px" }}>{s.heading}</h2>
          {s.paragraphs.map((p, j) => (
            <p key={j} style={{ lineHeight: "1.7" }}>{p}</p>
          ))}
        </section>
      ))}

      {editorial.faq.length > 0 && (
        <section style={{ marginTop: "48px" }}>
          <h2>Questions fréquentes</h2>
          {editorial.faq.map((item, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>{item.q}</h3>
              <p style={{ lineHeight: "1.7", margin: 0 }}>{item.a}</p>
            </div>
          ))}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        </section>
      )}
    </div>
  );
}
