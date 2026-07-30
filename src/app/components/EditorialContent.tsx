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
  return (
    <div className="editorial-body">
      {editorial.sections.map((s, i) => (
        <section key={i}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </section>
      ))}

      {editorial.faq.length > 0 && (
        <section className="editorial-faq">
          <h2>Questions fréquentes</h2>
          {editorial.faq.map((item, i) => (
            <div key={i}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
