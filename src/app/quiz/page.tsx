import { getAllBoxes, getAffiliateUrl } from "@/lib/affiliate";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz — Quelle box beauté est faite pour toi ? | Kado",
  description: "Réponds à 3 questions et découvre la box beauté idéale selon ton budget, tes priorités et tes valeurs.",
};

export default function QuizPage() {
  const boxes = getAllBoxes();

  return (
    <>
      <Header activePage="/quiz" />

      <main>
        <section className="section" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div className="hero-badge" style={{ display: "inline-flex" }}>
                3 questions · 30 secondes
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", margin: "16px 0 12px" }}>
                Quelle box beauté est faite pour toi ?
              </h1>
              <p style={{ color: "var(--text-muted, #6b6b6b)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
                Réponds à 3 questions et on te trouve ta match parmi les {boxes.length} box qu'on a testées.
              </p>
            </div>

            <QuizClient
              boxes={boxes}
              affiliateUrls={Object.fromEntries(
                boxes.map((b) => [b.slug, getAffiliateUrl(b.slug)])
              )}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Kado — Certains liens sont affiliés.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
