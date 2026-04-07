"use client";
import { useState } from "react";
import { Check, ExternalLink, RotateCcw, ChevronRight } from "lucide-react";
import type { BoxData } from "@/lib/affiliate";

interface QuizClientProps {
  boxes: BoxData[];
  affiliateUrls: Record<string, string>;
}

const steps = [
  {
    id: "budget",
    question: "Quel est ton budget mensuel ?",
    options: [
      { value: "low", label: "Moins de 20€", emoji: "💚" },
      { value: "mid", label: "20€ à 30€", emoji: "💛" },
      { value: "high", label: "Plus de 30€", emoji: "💜" },
    ],
  },
  {
    id: "priority",
    question: "Qu'est-ce qui compte le plus pour toi ?",
    options: [
      { value: "bio", label: "100% bio & naturel", emoji: "🌿" },
      { value: "makeup", label: "Maquillage inclus", emoji: "💄" },
      { value: "premium", label: "Marques premium", emoji: "✨" },
      { value: "discovery", label: "Découverte & variété", emoji: "🎁" },
    ],
  },
  {
    id: "certif",
    question: "Les certifications, c'est important pour toi ?",
    options: [
      { value: "yes", label: "Oui, cruelty-free au minimum", emoji: "🐰" },
      { value: "vegan", label: "Vegan obligatoire", emoji: "🌱" },
      { value: "no", label: "Non, peu importe", emoji: "🤷" },
    ],
  },
];

type Answers = Record<string, string>;

function scoreBox(box: BoxData, answers: Answers): number {
  let score = 0;

  // Budget
  if (answers.budget === "low" && box.price < 20) score += 3;
  else if (answers.budget === "mid" && box.price >= 20 && box.price <= 30) score += 3;
  else if (answers.budget === "high" && box.price > 30) score += 3;
  else if (answers.budget === "low" && box.price < 25) score += 1;
  else if (answers.budget === "mid" && box.price < 35) score += 1;

  // Priority
  if (answers.priority === "bio" && box.category === "bio") score += 4;
  if (answers.priority === "bio" && box.certifications?.includes("bio")) score += 2;
  if (answers.priority === "makeup" && box.category === "mixte") score += 3;
  if (answers.priority === "makeup" && box.category === "lifestyle") score += 2;
  if (answers.priority === "premium" && box.category === "premium") score += 4;
  if (answers.priority === "discovery" && box.nb_products && parseInt(String(box.nb_products)) >= 5) score += 2;
  if (answers.priority === "discovery" && box.category === "mixte") score += 2;

  // Certifications
  if (answers.certif === "yes" && box.certifications?.includes("cruelty-free")) score += 2;
  if (answers.certif === "vegan" && box.certifications?.includes("vegan")) score += 3;
  if (answers.certif === "no") score += 1; // léger bonus neutre

  // Bonus rating
  score += (box.rating || 0) * 0.5;

  return score;
}

export default function QuizClient({ boxes, affiliateUrls }: QuizClientProps) {
  const getAffiliateUrl = (slug: string) => affiliateUrls[slug] ?? "#";
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const step = steps[currentStep];

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setCurrentStep(0);
    setDone(false);
  }

  // Calculer les résultats
  const scored = boxes
    .map((box) => ({ box, score: scoreBox(box, answers) }))
    .sort((a, b) => b.score - a.score);

  const top3 = scored.slice(0, 3);

  if (done) {
    return (
      <div className="quiz-results">
        <div className="quiz-results-header">
          <h2>Tes box idéales ✨</h2>
          <p>Sur la base de tes réponses, voici les meilleures options pour toi :</p>
        </div>

        <div className="quiz-results-grid">
          {top3.map(({ box }, i) => {
            const affiliateUrl = getAffiliateUrl(box.slug);
            const hasCta = affiliateUrl && affiliateUrl !== "#";
            const ctaUrl = hasCta ? affiliateUrl : box.website;

            return (
              <div key={box.slug} className={`quiz-result-card${i === 0 ? " quiz-result-top" : ""}`}>
                {i === 0 && <div className="quiz-result-badge">Meilleur match</div>}
                <div className="quiz-result-rank">#{i + 1}</div>
                <img
                  src={box.logo || `/images/logos/${box.slug}.svg`}
                  alt={box.name}
                  className="quiz-result-logo"
                  width={100}
                  height={50}
                />
                <h3>{box.name}</h3>
                <p className="quiz-result-price">
                  {box.price.toFixed(2).replace(".", ",")}€/mois
                </p>
                <p className="quiz-result-desc">{box.verdict || box.description}</p>

                <ul className="quiz-result-pros">
                  {box.pros?.slice(0, 2).map((pro, j) => (
                    <li key={j}>
                      <Check size={12} color="var(--success)" />
                      {pro}
                    </li>
                  ))}
                </ul>

                <a
                  href={ctaUrl}
                  target="_blank"
                  rel={hasCta ? "nofollow noopener sponsored" : "noopener noreferrer"}
                  className="btn btn-primary btn-sm"
                  style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
                >
                  {hasCta ? "Voir l'offre" : "Voir le site"}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="quiz-results-actions">
          <button className="btn btn-secondary" onClick={reset}>
            <RotateCcw size={15} />
            Recommencer le quiz
          </button>
          <a href="/#comparatif" className="btn btn-secondary">
            Voir toutes les box
            <ChevronRight size={15} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      {/* Progress */}
      <div className="quiz-progress">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`quiz-progress-dot${i < currentStep ? " done" : ""}${i === currentStep ? " active" : ""}`}
          />
        ))}
        <span className="quiz-progress-label">
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Question */}
      <div className="quiz-card">
        <h2 className="quiz-question">{step.question}</h2>

        <div className="quiz-options">
          {step.options.map((opt) => (
            <button
              key={opt.value}
              className="quiz-option"
              onClick={() => handleAnswer(opt.value)}
            >
              <span className="quiz-option-emoji">{opt.emoji}</span>
              <span className="quiz-option-label">{opt.label}</span>
              <ChevronRight size={16} className="quiz-option-arrow" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
