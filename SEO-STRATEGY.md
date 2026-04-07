# 🎯 Stratégie SEO & Monétisation — Kado

**Site :** kado-box.fr (ou similaire)
**Niche :** Comparatif box beauté France
**Date :** 2026-02-14

---

## 1. Architecture SEO en Silos

```
HOMEPAGE (kado-box.fr)
│
├── 🌿 SILO 1 : Tests & Avis (intent: navigationnel → affiliation)
│   ├── PILIER : "Les Meilleures Box Beauté 2026" (3000+ mots)
│   ├── → "Biotyfull Box avis février 2026"
│   ├── → "Blissim avis février 2026"
│   ├── → "Lookfantastic avis février 2026"
│   └── → "Prescription Lab avis février 2026"
│       (× 12 mois × 8 boxes = ~96 articles/an ← AUTOMATISABLE)
│
├── 📊 SILO 2 : Comparatifs (intent: commercial → affiliation)
│   ├── PILIER : "Comparatif Box Beauté : Guide Complet"
│   ├── → "Biotyfull Box vs Blissim"
│   ├── → "Blissim vs Lookfantastic"
│   ├── → "My Little Box vs Blissim"
│   └── → toutes les paires (~28 articles ← AUTOMATISABLE)
│
├── 🏷️ SILO 3 : Codes Promo (intent: transactionnel → affiliation directe)
│   ├── PILIER : "Tous les Codes Promo Box Beauté"
│   ├── → "Code promo Biotyfull Box février 2026"
│   ├── → "Code promo Blissim février 2026"
│   └── → (× 12 mois × N marques = ~144 articles/an ← AUTOMATISABLE)
│
├── 📖 SILO 4 : Guides (intent: informationnel → pub/AdSense)
│   ├── PILIER : "Comment Choisir sa Box Beauté"
│   ├── → "Box beauté bio : le guide complet"
│   ├── → "Box beauté pas cher : les meilleures à moins de 15€"
│   ├── → "Quelle box beauté offrir ?"
│   └── → "Box beauté pour ado"
│
└── 📬 NEWSLETTER + LEADS
    └── Capture email sur chaque page
```

---

## 2. Keywords Prioritaires

### Priorité 1 — Les "Money Keywords" (à publier en premier)

| Keyword | Volume/mois | Difficulté | Type article | Monétisation |
|---------|-------------|------------|-------------|-------------|
| meilleure box beauté 2026 | 5 400 | Moyen | Pilier | Affiliation multi |
| biotyfull box avis | 1 300 | Facile | Test | Affiliation directe |
| blissim avis | 2 200 | Facile | Test | Affiliation directe |
| comparatif box beauté | 2 900 | Moyen | Comparatif | Affiliation multi |
| code promo biotyfull box | 800 | Facile | Promo | Affiliation directe |
| box beauté pas cher | 1 900 | Moyen | Guide | Affiliation |
| lookfantastic avis | 800 | Facile | Test | Affiliation directe |

### Priorité 2 — Longue traîne (générés automatiquement)

| Pattern | Volume unitaire | Nb pages | Total volume |
|---------|----------------|----------|-------------|
| "avis [box] [mois] [année]" | 200-800 | 96/an | ~30K/an |
| "code promo [marque] [mois] [année]" | 300-1500 | 144/an | ~100K/an |
| "[box A] vs [box B]" | 200-500 | 28 | ~10K/an |

---

## 3. 🔗 Liens d'Affiliation — Comment ça Marche

### Réponse courte : OUI, donne-moi tes liens !

Voici comment on va les intégrer :

### Étape 1 : Créer un fichier de données centralisé

```yaml
# data/affiliate-links.yaml — TU REMPLIS CE FICHIER

boxes:
  - name: "Biotyfull Box"
    slug: "biotyfull-box"
    price: 23.90
    affiliate_url: "https://ton-lien-awin.com/biotyfull"  # ← TON LIEN
    logo: "/images/logos/biotyfull.png"
    rating: 4.8
    category: "bio"
    description: "Box beauté 100% bio et naturelle, 5-6 produits full-size"
    pros:
      - "100% bio et cruelty-free"
      - "Produits full-size"
      - "Valeur ~80€"
    cons:
      - "Peu de maquillage"

  - name: "Blissim"
    slug: "blissim"
    price: 16.90
    affiliate_url: "https://ton-lien.com/blissim"  # ← TON LIEN
    logo: "/images/logos/blissim.png"
    rating: 4.3
    category: "mixte"
    description: "Mix soin + maquillage, 5 produits variés"
    pros:
      - "Meilleur rapport qualité/prix"
      - "Marques connues"
    cons:
      - "Parfois des mini-tailles"

  - name: "Lookfantastic"
    slug: "lookfantastic"
    price: 16.50
    affiliate_url: ""  # ← À REMPLIR
    # ...

  - name: "My Little Box"
    slug: "my-little-box"
    price: 17.90
    affiliate_url: ""
    # ...

  - name: "Prescription Lab"
    slug: "prescription-lab"
    price: 25.90
    affiliate_url: ""
    # ...

promo_codes:
  - box: "biotyfull-box"
    code: "KADO20"
    discount: "-20%"
    conditions: "Sur la 1ère box"
    expires: "2026-03-31"
    url: "https://ton-lien.com/biotyfull?code=KADO20"

  - box: "blissim"
    code: "BLISS5"
    discount: "1ère box à 5€"
    conditions: "Nouvel abonné"
    expires: "2026-02-28"
    url: "https://ton-lien.com/blissim?code=BLISS5"
```

### Étape 2 : Les liens sont injectés automatiquement

Chaque article MDX généré par Antigravity :
- Lit `affiliate-links.yaml`
- Insère les bons liens dans les boutons CTA
- Ajoute le disclaimer "liens affiliés" en bas
- Met les `rel="nofollow sponsored"` automatiquement (requis par Google)

### Où trouver tes liens affiliés ?

| Plateforme | Inscription | Marques beauté |
|-----------|-------------|----------------|
| **Awin** | [awin.com](https://www.awin.com/fr) | Lookfantastic, Sephora |
| **CJ Affiliate** | [cj.com](https://www.cj.com) | Biotyfull, Prescription Lab |
| **Rakuten** | [rakutenadvertising.com](https://rakutenadvertising.com) | Nocibé, marques US |
| **Amazon Partenaires** | [partenaires.amazon.fr](https://partenaires.amazon.fr) | Tous les produits Amazon |
| **Direct (marques)** | Contacter chaque box | Souvent les meilleures commissions |
| **Blissim** | Sur leur site (programme référence) | Blissim uniquement |

---

## 4. 📅 Calendrier de Lancement

### Semaine 1 (maintenant → 21 février)

| Jour | Action | Qui |
|------|--------|-----|
| Aujourd'hui | ✅ Site créé, branding Kado, images, copywriting | Fait |
| Sam 15 | Créer `affiliate-links.yaml` avec les liens que tu as | **Nathalie** |
| Sam 15 | Setup MDX + routing articles + sitemap | Antigravity |
| Dim 16 | **Déployer v1 sur Vercel** | Antigravity |
| Lun 17 | Écrire article pilier #1 : "Meilleures Box Beauté 2026" | Antigravity |
| Mar 18 | Écrire 3 tests box (Biotyfull, Blissim, Lookfantastic) | Antigravity |
| Mer 19 | Générer 6 pages "code promo [marque] février 2026" | Antigravity (auto) |
| Jeu 20 | Soumettre sitemap à Google Search Console | Antigravity |
| Ven 21 | Installer Google Analytics + AdSense | **Nathalie** (compte) |

### Semaine 2-4 (février → mars)

| Tâche | Volume | Méthode |
|-------|--------|---------|
| Tests box mensuels | 6 articles | Nathalie donne ses notes → Antigravity rédige |
| Codes promo mars 2026 | 8 pages | Programmatic SEO (auto) |
| Comparatifs croisés | 6 articles | Programmatic SEO (auto) |
| Guides informationnels | 3 articles | Antigravity + copywriting skill |
| **Total mois 1** | **~23 articles** | |

### Mois 2-3 : Montée en puissance

- 12 articles/mois minimum (calendrier éditorial)
- Inscription aux programmes affiliés (Awin, CJ, Amazon)
- Premier audit SEO avec le skill `seo-audit`
- Premières positions Google (long-tail en premier)

### Mois 4-6 : Monétisation

- Traffic cible : 5-15K visites/mois
- Activation AdSense → Ezoic quand 10K visites
- Première estimation revenus : **200-500€/mois**

---

## 5. 🚀 Déploiement Vercel

### Quand déployer ?

**Dès demain/ce weekend !** Voici pourquoi :

1. Le site est déjà fonctionnel et beau
2. Google met 2-4 semaines pour indexer un nouveau site
3. Plus tôt on déploie, plus tôt Google nous connaît
4. On peut continuer à ajouter du contenu après le déploiement

### Comment déployer ?

```bash
# 1. Push le code sur GitHub
cd belle-box
git add .
git commit -m "🚀 Kado v1 — launch"
git push origin main

# 2. Connecter Vercel
# → vercel.com → Import Git Repository → sélectionner le repo
# → Framework: Next.js (auto-détecté)
# → Deploy

# 3. Domaine custom (optionnel maintenant)
# → Settings → Domains → ajouter ton domaine
```

> **💡 Gratuit sur Vercel** jusqu'à 100K visites/mois. Parfait pour démarrer.

---

## 6. 🤖 Automatisation — Ce que je fais vs ce que tu fais

### Ce que Antigravity automatise :

| Tâche | Fréquence | Comment |
|-------|-----------|---------|
| Générer articles MDX | À la demande | Tu dis "écris un article sur X" |
| Pages codes promo | Mensuel | Programmatic SEO depuis `affiliate-links.yaml` |
| Comparatifs croisés | À la demande | Auto-généré depuis les données |
| Sitemap XML | Automatique | Next.js le fait tout seul |
| Structured Data (JSON-LD) | Par article | Intégré dans le template |
| Images (Gemini) | À la demande | Je les génère et intègre |
| Déploiement | Auto | Push GitHub → Vercel deploy |
| SEO on-page | Par article | Title, meta, H1, alt texts |

### Ce que Nathalie doit faire :

| Tâche | Fréquence | Temps |
|-------|-----------|-------|
| Fournir les liens affiliés | 1 fois (+ MAJ) | 30 min |
| Donner ses notes/photos quand elle reçoit une box | 1×/mois par box | 15 min |
| Créer ses comptes (AdSense, Awin, GSC) | 1 fois | 1h |
| Acheter un nom de domaine | 1 fois | 10 min |
| Valider les articles avant publication | À la demande | 5 min/article |

---

## 7. ⚡ Actions Immédiates

### Pour toi (Nathalie) :

1. [ ] **Inscris-toi sur Awin** → [awin.com/fr](https://www.awin.com/fr) (gratuit)
2. [ ] **Inscris-toi sur Amazon Partenaires** → [partenaires.amazon.fr](https://partenaires.amazon.fr)
3. [ ] **Note tes liens affiliés** que tu as déjà (ou dis-moi lesquels)
4. [ ] **Crée un compte Vercel** → [vercel.com](https://vercel.com) (gratuit)
5. [ ] **Crée un compte Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console)
6. [ ] **Choisis ton nom de domaine** (kado-box.fr ? kado-beaute.fr ?)

### Pour Antigravity (moi) :

1. [ ] Setup MDX + routing dynamique pour les articles
2. [ ] Créer le template article avec structured data (JSON-LD)
3. [ ] Créer `affiliate-links.yaml` (structure prête, tu remplis les URLs)
4. [ ] Configurer le sitemap Next.js
5. [ ] Déployer v1 sur Vercel
6. [ ] Générer les 10 premiers articles

---

*Stratégie créée le 2026-02-14 — Kado by Oracle*
