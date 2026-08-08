export interface GuideSection {
    heading: string;
    paragraphs: string[];
}

export interface Guide {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    intro: string;
    publishedAt: string;
    readingMinutes: number;
    occasionSlug?: string;
    recipientSlug?: string;
    sections: GuideSection[];
    faq?: Array<{ q: string; a: string }>;
}

export const GUIDES: Guide[] = [
    {
        slug: "idees-cadeaux-fete-des-meres-2026",
        title: "Fête des mères 2026 : 20 idées cadeaux qui font vraiment plaisir",
        metaTitle: "Cadeau fête des mères 2026 : 20 idées originales | Kado-Box",
        metaDescription: "Notre sélection de cadeaux fête des mères 2026 : du petit prix à l'idée d'exception, avec des critères utiles pour choisir.",
        intro: "La fête des mères tombe cette année le dimanche 7 juin 2026. Pas d'idée ? Pas de panique : on a réuni les 20 cadeaux les plus offerts cette saison, classés par budget et par profil de maman. Tous sont disponibles sur Amazon avec livraison rapide.",
        publishedAt: "2026-05-16",
        readingMinutes: 6,
        occasionSlug: "fete-des-meres",
        recipientSlug: "femme",
        sections: [
            {
                heading: "Le cadeau qui ne déçoit jamais : un coffret beauté",
                paragraphs: [
                    "Les coffrets parfum, soin du visage ou maquillage restent le cadeau n°1 pour la fête des mères. Pourquoi ? Parce qu'ils combinent plusieurs produits que maman utilisera au quotidien, dans une présentation soignée qui fait son petit effet à l'ouverture.",
                    "Pour bien choisir : privilégiez une marque que votre maman connaît déjà (regardez sa salle de bain !) plutôt qu'une nouveauté qu'elle ne testera peut-être pas. Les coffrets entre 30 et 60 € offrent le meilleur rapport contenu/prix.",
                ],
            },
            {
                heading: "Petits budgets : la bougie parfumée ou le mug personnalisé",
                paragraphs: [
                    "À moins de 25 €, la bougie reste une valeur sûre. Choisissez une cire végétale (soja ou colza) plutôt que de la paraffine, et un parfum doux : vanille, fleur d'oranger, monoï. Évitez les senteurs trop fortes (musc, ambre) qui ne plaisent pas à tout le monde.",
                    "Autre piste : le mug ou le tote bag personnalisé avec une photo ou un message. Le rapport émotion/prix est imbattable, surtout si vous y ajoutez un sachet de thé ou de café de qualité.",
                ],
            },
            {
                heading: "Pour les mamans gourmandes : chocolat, thé d'exception",
                paragraphs: [
                    "Un coffret de chocolats artisanaux ou une sélection de thés rares font toujours plaisir. Pensez aux maisons qui proposent des assortiments dégustation : c'est une expérience à étaler dans le temps, pas juste un objet posé sur l'étagère.",
                    "Astuce : associez le cadeau à un moment partagé. \"Maman, je t'ai pris ces chocolats, on les goûte ensemble dimanche ?\" — c'est ce souvenir qu'elle retiendra.",
                ],
            },
            {
                heading: "Le cadeau d'exception : bijou ou parfum signature",
                paragraphs: [
                    "Au-delà de 80 €, on entre dans le cadeau qui marque vraiment. Un bijou discret (collier fin, boucles d'oreilles en or) ou un flacon de parfum d'une marque qu'elle aime. Évitez les nouveautés olfactives non testées : un parfum c'est très personnel.",
                    "Si vous hésitez sur le parfum, optez pour la version eau de toilette plutôt qu'eau de parfum : plus légère, elle déplaît rarement.",
                ],
            },
            {
                heading: "Le mot qui change tout",
                paragraphs: [
                    "Quel que soit le cadeau, ce qui reste à la fin c'est la carte manuscrite qui l'accompagne. Trois lignes sincères valent dix fois un objet à 100 €. Prenez 5 minutes pour l'écrire à la main, votre maman la gardera.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel budget moyen pour un cadeau fête des mères ?",
                a: "En France, le budget moyen oscille entre 35 et 55 € selon l'âge de la personne qui offre. Les enfants en bas âge offrent souvent un bricolage + un petit cadeau (10-20 €), les adultes actifs montent en gamme.",
            },
            {
                q: "Quand commander pour être livré à temps ?",
                a: "Pour la fête des mères 2026 (7 juin), vérifiez directement sur Amazon la date de livraison annoncée pour votre adresse avant de commander.",
            },
            {
                q: "Quel cadeau pour une maman qui dit \"ne rien vouloir\" ?",
                a: "C'est souvent une maman qui veut un cadeau \"utile\" ou un moment partagé. Optez pour quelque chose qu'elle utiliserait quotidiennement mais ne s'achèterait pas : une belle parure de lit, un soin du visage haut de gamme, un livre attendu, un atelier ou un brunch à partager.",
            },
        ],
    },
    {
        slug: "idees-cadeaux-fete-des-peres-2026",
        title: "Fête des pères 2026 : 15 cadeaux originaux et utiles",
        metaTitle: "Cadeau fête des pères 2026 : 15 idées originales | Kado-Box",
        metaDescription: "Notre sélection de cadeaux fête des pères 2026 : tech, gourmet, bricolage, mode. Des idées originales testées et approuvées.",
        intro: "La fête des pères 2026 a lieu le dimanche 21 juin. Voici 15 cadeaux qui sortent du polo bleu marine et de la cravate : des idées concrètes selon ses passions, son âge et votre budget.",
        publishedAt: "2026-05-16",
        readingMinutes: 5,
        occasionSlug: "fete-des-peres",
        recipientSlug: "homme",
        sections: [
            {
                heading: "Le papa tech : casque audio, station de charge, gadget connecté",
                paragraphs: [
                    "Un casque à réduction de bruit transforme les trajets en train ou les pauses télétravail. Comptez 80-150 € pour un modèle qui tient la route, 250 € et plus pour le très haut de gamme.",
                    "Plus abordable : une station de charge sans fil multi-appareils (téléphone, montre, écouteurs en même temps). C'est l'objet qu'on n'achète jamais pour soi mais dont on se sert tous les jours.",
                ],
            },
            {
                heading: "Le papa cuisine : couteau japonais, planche en bois massif",
                paragraphs: [
                    "Si votre père aime cuisiner, un bon couteau santoku change littéralement sa façon de préparer les repas. Évitez les sets de 12 couteaux à 50 € : un seul bon outil vaut mieux qu'une caisse de mauvais.",
                    "Une planche à découper en bois massif (chêne, noyer) à huiler : c'est l'objet de cuisine qui vieillit bien, et qui rappelle votre cadeau pendant des années.",
                ],
            },
            {
                heading: "Le papa gourmet : whisky, café de spécialité, coffret épicerie fine",
                paragraphs: [
                    "Un coffret de dégustation (whisky tourbé vs. non tourbé, cafés d'origine, huiles d'olive du monde) propose une expérience plutôt qu'un simple produit. C'est aussi un cadeau qui se partage.",
                    "Astuce : si votre père a déjà tout, partez sur du local et raconté. Un produit d'un petit producteur avec une histoire vaut souvent mieux qu'une grande marque générique.",
                ],
            },
            {
                heading: "Le papa bricoleur : outils, accessoires atelier",
                paragraphs: [
                    "Un visseuse-perceuse compacte sur batterie, un tournevis multifonction de qualité, ou un coffret d'embouts spéciaux : ce sont des cadeaux qui servent tout de suite, et qui font plaisir au pragmatique.",
                ],
            },
            {
                heading: "Le papa sportif : montre connectée, accessoires running ou vélo",
                paragraphs: [
                    "Une montre connectée orientée sport (cardio, GPS, suivi de sommeil) coûte entre 100 et 300 €. Vérifiez la compatibilité avec son téléphone et son sport principal (running, vélo, natation, marche).",
                ],
            },
        ],
        faq: [
            {
                q: "Combien dépenser pour un cadeau fête des pères ?",
                a: "Le budget moyen tourne autour de 40-60 €. C'est un peu moins que la fête des mères, mais les écarts sont plus grands selon le type de cadeau (un coffret gourmet à 30 €, un casque audio à 200 €).",
            },
            {
                q: "Quel cadeau pour un papa qui a tout ?",
                a: "Misez sur l'expérience plutôt que sur l'objet : un coffret dégustation, un atelier, un livre d'art ou de photo qu'il ne s'achèterait pas seul. Ou sur un objet artisanal local avec une histoire.",
            },
        ],
    },
    {
        slug: "idees-cadeaux-anniversaire-femme",
        title: "Cadeau anniversaire pour une femme : 30 idées par âge et budget",
        metaTitle: "Cadeau anniversaire femme : 30 idées par âge | Kado-Box",
        metaDescription: "Trouvez le cadeau d'anniversaire parfait pour une femme : idées par tranche d'âge (20, 30, 40, 50 ans) et par budget. Sélection 2026.",
        intro: "Anniversaire d'une amie, d'une sœur, d'une collègue ou d'une compagne : trouver le bon cadeau dépend autant de la personne que de l'âge. Voici 30 idées triées par tranche d'âge et par budget, du petit prix à l'idée d'exception.",
        publishedAt: "2026-05-16",
        readingMinutes: 7,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Cadeau anniversaire femme 20-30 ans",
                paragraphs: [
                    "À cet âge, les goûts évoluent vite : on quitte les cadeaux \"jeunes ados\" mais on n'est pas encore dans le cadeau \"adulte installé\". Bijoux fins (collier minimaliste, anneau argent), accessoires mode (sac à main casual, foulard de saison), tech utile (enceinte portable, station de charge) sont des valeurs sûres.",
                    "À éviter : les cadeaux \"maison\" trop matures (set de torchons, vaisselle) sauf si vous savez qu'elle vient d'emménager et adore ça.",
                ],
            },
            {
                heading: "Cadeau anniversaire femme 30-40 ans",
                paragraphs: [
                    "Cette tranche apprécie les cadeaux qui combinent qualité et utilité : un bon parfum, une montre élégante, un livre attendu, un coffret de soin du visage haut de gamme. Si elle vient d'avoir un enfant, pensez à un cadeau qui lui soit destiné à elle (pas au bébé).",
                    "Idée originale : un atelier ou une expérience (cours de pâtisserie, dégustation de vin, massage) à faire ensemble ou en solo.",
                ],
            },
            {
                heading: "Cadeau anniversaire femme 40-50 ans",
                paragraphs: [
                    "On vise la qualité plus que la quantité. Un bijou en or fin, une pièce de maroquinerie (sac, portefeuille en cuir véritable), un objet déco signé, un parfum d'auteur. Le packaging compte autant que le contenu : si c'est livré dans une jolie boîte, l'effet est multiplié.",
                ],
            },
            {
                heading: "Cadeau anniversaire femme 50 ans et plus",
                paragraphs: [
                    "Privilégiez ce qui apporte du confort et du plaisir au quotidien : un châle en cachemire, une bougie de grande maison, un livre photo personnalisé avec des souvenirs, un coffret thé/café d'exception. Évitez les cadeaux \"techno\" sauf si elle est elle-même passionnée — sinon ça fait \"cadeau du fils\" plutôt que vrai cadeau.",
                ],
            },
            {
                heading: "Petits budgets (moins de 25 €) qui font de l'effet",
                paragraphs: [
                    "Une bougie parfumée, un mug avec un message personnalisé, un carnet en cuir, un coffret de thé Mariage Frères ou Dammann, un livre de poche d'une autrice qu'elle aime, un foulard en soie. L'emballage soigné fait 50 % du cadeau à ce budget.",
                ],
            },
            {
                heading: "Le cadeau qui marque : moins de 100 €",
                paragraphs: [
                    "Un bijou délicat (or rose, perles fines), un sac à main d'une marque française, une montre quartz d'entrée de gamme, un coffret parfum + crème pour le corps d'une grande maison. C'est le budget qui sépare le cadeau \"sympa\" du cadeau \"on s'en souvient\".",
                ],
            },
        ],
        faq: [
            {
                q: "Quel cadeau original éviter le côté \"cadeau de collègue\" ?",
                a: "Évitez les objets génériques (carnet sans rien dedans, mug neutre, plante d'intérieur). Préférez quelque chose de très personnalisé : soit en lien avec un souvenir partagé, soit en référence à une passion (lecture, voyage, cuisine).",
            },
            {
                q: "Comment savoir quel parfum choisir ?",
                a: "Si vous ne connaissez pas ses goûts précis, demandez discrètement à un proche, ou regardez les flacons posés chez elle. À défaut, partez sur des familles olfactives plutôt qu'une note précise : floral pour les jeunes, hespéridé pour les actives, oriental doux pour les femmes plus mûres.",
            },
            {
                q: "Cadeau de dernière minute : quoi faire ?",
                a: "Pour un anniversaire proche, vérifiez la date de livraison affichée par Amazon pour votre adresse. Pour le jour J, une carte cadeau numérique peut être une solution immédiate.",
            },
        ],
    },
    {
        slug: "idees-cadeaux-noel-2026",
        title: "Noël 2026 : 40 idées cadeaux pour toute la famille",
        metaTitle: "Cadeaux Noël 2026 : 40 idées par profil et budget | Kado-Box",
        metaDescription: "40 idées cadeaux de Noël 2026 classées par âge, budget et passion, pour préparer sa liste sans se disperser.",
        intro: "Préparer Noël en avance permet de mieux répartir son budget et d'éviter les achats faits dans l'urgence. Voici 40 idées triées par profil (enfants, ados, adultes, grands-parents) et par budget. Vérifiez le prix, le stock et le délai chez le marchand avant de commander.",
        publishedAt: "2026-05-20",
        readingMinutes: 8,
        occasionSlug: "noel",
        sections: [
            {
                heading: "Les indémodables qui font toujours plaisir",
                paragraphs: [
                    "Certains cadeaux ne se démodent jamais à Noël : un beau livre, un coffret beauté, un jeu de société, un puzzle, un pull en cachemire. Si vous hésitez, partez sur ces valeurs sûres plutôt que sur la fausse bonne idée originale.",
                    "Astuce : pour le coffret beauté ou parfum, regardez la salle de bain du destinataire pour repérer ses marques préférées. Un coffret d'une marque qu'il/elle aime déjà fonctionne mieux qu'une nouveauté inconnue.",
                ],
            },
            {
                heading: "Pour les enfants : LEGO, jeux de société, peluches",
                paragraphs: [
                    "LEGO reste le cadeau roi sous le sapin : les sets Classic à partir de 15 € sont parfaits dès 4-5 ans, les sets Friends, City, Star Wars ou Harry Potter prennent le relais ensuite. Vérifiez l'âge recommandé sur la boîte avant d'acheter.",
                    "Pour les jeux de société, pensez aux classiques qui se jouent en famille (Dobble, Uno, Monopoly Junior) plutôt qu'aux nouveautés que personne ne connaît. Le succès se joue souvent dès la première partie.",
                ],
            },
            {
                heading: "Pour les ados : tech, gaming, mode",
                paragraphs: [
                    "Les ados sont la tranche la plus difficile à satisfaire. Plutôt que de deviner leurs goûts, deux options : la carte cadeau (Steam, PlayStation, Amazon — autour de 25-50 €) ou l'accessoire tech qui plaît à 90 % d'entre eux (écouteurs sans fil, enceinte Bluetooth portable, manette de jeu).",
                ],
            },
            {
                heading: "Pour les adultes : expérience, gourmandise, déco",
                paragraphs: [
                    "À partir de 30-40 ans, on apprécie les cadeaux qui apportent du plaisir au quotidien : un beau plaid, une bougie de marque, un coffret thé ou café d'exception, un livre photo. La règle d'or : qualité plutôt que quantité.",
                    "Idée originale : un coffret d'expérience (cours de cuisine, atelier, dégustation) à partager. C'est un cadeau qui crée un souvenir plutôt qu'un objet de plus.",
                ],
            },
            {
                heading: "Pour les grands-parents : confort et souvenirs",
                paragraphs: [
                    "Les grands-parents ont souvent tout ce qu'il leur faut. Misez sur ce qui rappelle la famille : un livre photo personnalisé, un calendrier avec les photos des petits-enfants, un cadre numérique sur lequel envoyer des photos à distance.",
                    "Côté plaisir, un coffret de thé ou café haut de gamme, une bonne bouteille, un châle ou un beau plaid. Évitez les objets connectés trop complexes sauf si vous savez qu'ils s'en serviront.",
                ],
            },
            {
                heading: "Petit budget : moins de 25 € qui font de l'effet",
                paragraphs: [
                    "Un coffret de chocolats artisanal, une bougie parfumée de qualité, un livre de poche d'un auteur qu'on aime, un mug personnalisé avec une photo. À ce budget, c'est l'emballage soigné qui fait passer le cadeau d'« obligatoire » à « touchant ».",
                ],
            },
        ],
        faq: [
            {
                q: "Quand commander pour être livré à temps pour Noël ?",
                a: "Les délais changent selon le produit et le marchand. Vérifiez la date annoncée au moment de commander et gardez une marge, surtout en décembre.",
            },
            {
                q: "Comment éviter de se tromper sur un cadeau ?",
                a: "Trois questions simples : qu'est-ce qu'il/elle utilise tous les jours ? Qu'est-ce qu'il/elle aime mais ne s'achèterait pas ? Y a-t-il un sujet dont il/elle parle souvent ? Les réponses pointent presque toujours vers le bon cadeau.",
            },
            {
                q: "Faut-il privilégier un gros cadeau ou plusieurs petits ?",
                a: "Plusieurs petits si vous voulez créer l'effet « il y a beaucoup à déballer » (idéal pour les enfants). Un gros pour marquer le coup (couples, anniversaires de mariage, grands-parents). Mélangez les deux si vous offrez à plusieurs personnes d'un même foyer.",
            },
        ],
    },
    {
        slug: "cadeau-saint-valentin-femme",
        title: "Saint-Valentin : 20 idées cadeaux pour elle (sans cliché)",
        metaTitle: "Cadeau Saint-Valentin femme : 20 idées originales | Kado-Box",
        metaDescription: "Notre sélection de cadeaux Saint-Valentin pour elle : romantique, original, gourmand ou design. 20 idées testées qui sortent du bouquet de roses.",
        intro: "La Saint-Valentin tombe le 14 février, et chaque année la même question : roses + chocolats, ou on tente autre chose ? Voici 20 idées qui sortent du cliché, classées par budget et par style de couple.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        occasionSlug: "saint-valentin",
        recipientSlug: "femme",
        sections: [
            {
                heading: "Romantique mais pas niais : bougie, parfum, bijou délicat",
                paragraphs: [
                    "Une bougie parfumée d'une grande maison (Diptyque, Jo Malone, Trudon en entrée de gamme), un parfum qu'elle convoite depuis longtemps, un collier ou bracelet en argent fin : ces cadeaux disent « j'ai pensé à toi » sans tomber dans le cliché.",
                    "Évitez les bijoux trop voyants ou les parfums trop sucrés/imposants si vous n'êtes pas sûr de ses goûts. La discrétion paie toujours à la Saint-Valentin.",
                ],
            },
            {
                heading: "Gourmand : chocolats fins, vin, coffret dégustation",
                paragraphs: [
                    "Les chocolats artisanaux d'une vraie maison (pas les boîtes de supermarché) restent une valeur sûre. Comptez 25-40 € pour un assortiment soigné. À partager, c'est encore mieux.",
                    "Coffret dégustation thé, vin pétillant, champagne (même petit format) : si elle aime le vin, un demi de Champagne ou un crémant de qualité accompagne très bien un dîner maison.",
                ],
            },
            {
                heading: "Le cadeau expérience : une soirée plutôt qu'un objet",
                paragraphs: [
                    "Une box restaurant, un coffret spa, un cours de cuisine, une dégustation, un week-end : ces expériences créent un souvenir à long terme. Vérifiez bien la validité (souvent 1-2 ans) et la zone géographique.",
                    "Pour les couples qui « ont tout », c'est souvent le meilleur choix.",
                ],
            },
            {
                heading: "Mode et beauté : pyjama soyeux, coffret cosmétique",
                paragraphs: [
                    "Un pyjama en soie ou en satin, un kimono d'intérieur, un coffret cosmétique d'une marque qu'elle aime (Caudalie, Nuxe, Clarins). Évitez la lingerie sexy si ce n'est pas un terrain dont vous avez l'habitude, c'est l'écueil classique de la Saint-Valentin.",
                ],
            },
            {
                heading: "Petits budgets (moins de 30 €) qui marquent",
                paragraphs: [
                    "Une fleur unique mais belle (pivoine, lys, branche de cerisier en saison) accompagnée d'une carte manuscrite. Un mug avec une photo perso. Un livre dont on a parlé ensemble. La sincérité fait passer le budget au second plan.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel budget moyen pour la Saint-Valentin ?",
                a: "Le budget moyen tourne autour de 40-70 €. Mais l'effet ne dépend pas du prix : un cadeau à 25 € bien choisi marque plus qu'un cadeau à 100 € générique.",
            },
            {
                q: "Faut-il offrir le 14 ou peut-on décaler ?",
                a: "Le 14 reste la date attendue. Si vous le décalez (le week-end après par exemple), prévenez à l'avance pour éviter l'effet « tu m'as oubliée ». Un mot le 14 + le « vrai » cadeau plus tard fonctionne très bien.",
            },
        ],
    },
    {
        slug: "cadeau-saint-valentin-homme",
        title: "Saint-Valentin : 15 idées cadeaux pour lui (qui ne servent vraiment)",
        metaTitle: "Cadeau Saint-Valentin homme : 15 idées utiles | Kado-Box",
        metaDescription: "Cadeaux Saint-Valentin pour lui : tech, gourmand, expérience, accessoires. 15 idées concrètes qui sortent du parfum et de la cravate.",
        intro: "Offrir à un homme pour la Saint-Valentin reste un casse-tête : on veut éviter le cliché du parfum-cravate-bouteille sans tomber dans le cadeau « gadget vite oublié ». Voici 15 idées qui marquent vraiment, par profil et budget.",
        publishedAt: "2026-05-20",
        readingMinutes: 5,
        occasionSlug: "saint-valentin",
        recipientSlug: "homme",
        sections: [
            {
                heading: "L'homme tech : casque, montre connectée, gadget utile",
                paragraphs: [
                    "Un casque à réduction de bruit pour les transports ou le télétravail, une montre connectée avec suivi d'activité, un chargeur sans fil multi-appareils : ces cadeaux servent au quotidien et rappellent l'attention pendant des mois.",
                    "Vérifiez la compatibilité avec son téléphone et son écosystème (Apple, Android, Garmin) avant d'acheter.",
                ],
            },
            {
                heading: "L'homme gourmet : whisky, café de spécialité, épicerie fine",
                paragraphs: [
                    "Un coffret de dégustation (whisky tourbé/non tourbé, cafés d'origine, huiles d'olive du monde) propose une expérience plutôt qu'un objet. Et ça se partage.",
                    "Pour un budget plus modeste, une bouteille bien choisie + deux beaux verres font souvent plus d'effet qu'un coffret générique.",
                ],
            },
            {
                heading: "L'homme sportif : équipement, accessoires running",
                paragraphs: [
                    "Une paire d'écouteurs de sport étanches, un tapis de yoga premium, une gourde isotherme, un coffret de récupération musculaire. Évitez les vêtements de sport sauf si vous connaissez très précisément sa taille et ses préférences.",
                ],
            },
            {
                heading: "Expérience à deux : ce qui fonctionne à tous les coups",
                paragraphs: [
                    "Une box restaurant gastronomique, un cours de cuisine en duo, une dégustation, un week-end hors saison : le cadeau-expérience reste le plus marquant à la Saint-Valentin. À partir de 80-100 € pour quelque chose de qualité.",
                ],
            },
            {
                heading: "Petits budgets : la carte qui change tout",
                paragraphs: [
                    "Trois lignes manuscrites sincères + un petit cadeau (un livre dont vous avez parlé, un objet en lien avec un souvenir partagé, un coffret café haut de gamme) battent un cadeau cher mais générique. Toujours.",
                ],
            },
        ],
        faq: [
            {
                q: "Faut-il offrir si on est en couple récent ?",
                a: "Oui mais raisonnable. Trop cher dès le départ crée un déséquilibre. Un petit cadeau bien pensé (20-40 €) et une attention sincère suffisent largement lors d'une première Saint-Valentin.",
            },
            {
                q: "Que faire si on ne sait vraiment pas quoi offrir ?",
                a: "Carte cadeau Amazon + une attention personnelle (une lettre, un dîner cuisiné, une activité à faire ensemble). Ce n'est pas la solution la plus glamour, mais c'est mieux qu'un objet qui ne servira pas.",
            },
        ],
    },
    {
        slug: "cadeau-anniversaire-homme",
        title: "Cadeau anniversaire pour un homme : 30 idées par âge",
        metaTitle: "Cadeau anniversaire homme : 30 idées par âge | Kado-Box",
        metaDescription: "Idées cadeaux anniversaire pour un homme : par tranche d'âge (20, 30, 40, 50 ans) et par passion. Sélection 2026 testée et triée par avis.",
        intro: "Anniversaire d'un ami, frère, mari, collègue : trouver le bon cadeau pour un homme dépend autant de ses passions que de son âge. Voici 30 idées triées par tranche d'âge et par profil, du petit prix au cadeau d'exception.",
        publishedAt: "2026-05-20",
        readingMinutes: 7,
        recipientSlug: "homme",
        sections: [
            {
                heading: "Anniversaire homme 20-30 ans",
                paragraphs: [
                    "À cet âge, on aime les cadeaux tech, gaming, mode urbaine. Un casque Bluetooth, une enceinte portable, un jeu vidéo très attendu, une carte cadeau Steam ou PlayStation, un sac à dos design, une montre connectée d'entrée de gamme.",
                    "Évitez les cadeaux « adulte installé » (set de cravates, livre de bricolage maison) sauf s'il vient d'emménager et adore décorer.",
                ],
            },
            {
                heading: "Anniversaire homme 30-40 ans",
                paragraphs: [
                    "On vise plus la qualité et l'utilité quotidienne. Un bon couteau de cuisine, un coffret de dégustation (vin, whisky, café), un livre de référence sur sa passion, un portefeuille en cuir véritable. Si nouveau papa : un cadeau pour lui (pas pour le bébé), c'est important.",
                ],
            },
            {
                heading: "Anniversaire homme 40-50 ans",
                paragraphs: [
                    "Privilégiez la qualité plus que la quantité. Une belle montre quartz, un set de couteaux japonais, un coffret spiritueux haut de gamme, un livre photo ou un objet de collection lié à sa passion (vélo, musique, voitures).",
                ],
            },
            {
                heading: "Anniversaire homme 50 ans et plus",
                paragraphs: [
                    "À cet âge, on apprécie ce qui apporte du confort et du plaisir au quotidien. Un beau plaid, un coffret café de spécialité, un livre signé d'un auteur qu'il aime, une expérience (atelier de menuiserie, journée pilotage, dégustation premium). Évitez les cadeaux tech compliqués sauf passionné.",
                ],
            },
            {
                heading: "Petits budgets (moins de 30 €) qui marquent",
                paragraphs: [
                    "Un coffret de bières artisanales locales, un livre dont vous avez parlé ensemble, un tee-shirt d'une marque de niche qu'il aime, une figurine de collection. L'astuce : faire un cadeau qui montre que vous connaissez la personne, pas un objet générique.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel cadeau pour un homme qui dit ne rien vouloir ?",
                a: "C'est souvent un homme qui veut un cadeau utile ou un moment partagé. Optez pour quelque chose qu'il utiliserait quotidiennement (rasoir haut de gamme, casque audio) ou une expérience à partager (restaurant, atelier, sortie).",
            },
            {
                q: "Cadeau de dernière minute ?",
                a: "Vérifiez la date de livraison affichée par Amazon pour votre adresse. Pour le jour J, une carte cadeau numérique peut être une solution immédiate ; ajoutez un mot personnel.",
            },
        ],
    },
    {
        slug: "cadeau-grand-mere",
        title: "Cadeau pour grand-mère : 25 idées qui font vraiment plaisir",
        metaTitle: "Cadeau grand-mère : 25 idées tendres et utiles | Kado-Box",
        metaDescription: "Idées cadeaux pour grand-mère : confort, souvenirs, gourmandise, technologie simple. 25 idées testées qui touchent vraiment mamie.",
        intro: "Trouver un cadeau pour sa grand-mère, c'est trouver l'équilibre entre confort, plaisir et émotion. Voici 25 idées qui marchent, que mamie ait 70, 80 ou 90 ans, et selon votre budget.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Le cadeau émotion : livre photo personnalisé",
                paragraphs: [
                    "C'est presque imbattable. Un album photo de famille, sur 30-60 pages, avec les enfants, petits-enfants, vacances récentes. À faire sur les services en ligne (livraison sous 1 à 2 semaines, parfait quand on a le temps).",
                    "Comptez 25-50 € pour un livre de qualité, 60-90 € pour un grand format relié. C'est le cadeau qu'elle relit, montre aux voisines, garde sur la table du salon.",
                ],
            },
            {
                heading: "Confort au quotidien : plaid, chaussons, lampe",
                paragraphs: [
                    "Un plaid en grosse maille ou en polaire douce, une paire de chaussons orthopédiques de qualité (vraie marque, pas générique), une lampe de lecture qui s'attache au livre. Ce sont les cadeaux qu'elle utilisera tous les jours.",
                ],
            },
            {
                heading: "Gourmandise : thé, chocolat, confiserie",
                paragraphs: [
                    "Un coffret de thés Mariage Frères ou Dammann, des chocolats fins d'un chocolatier local ou d'une grande maison, une boîte de calissons ou de marrons glacés selon ses préférences. Évitez les sucreries industrielles, vraiment pas à la hauteur du cadeau.",
                ],
            },
            {
                heading: "Tech simple : cadre numérique connecté",
                paragraphs: [
                    "Un cadre photo numérique qui se connecte au Wi-Fi : vous lui envoyez les photos depuis votre téléphone, elles s'affichent automatiquement chez elle. C'est l'un des cadeaux les plus touchants pour une grand-mère qui voit peu ses petits-enfants.",
                    "Choisissez un modèle avec interface ultra simple. Configurez-le vous-même avant de l'offrir, pour qu'elle n'ait rien à faire.",
                ],
            },
            {
                heading: "Beauté douce : crèmes mains, soins",
                paragraphs: [
                    "Une bonne crème mains nourrissante, un baume à lèvres de qualité, un coffret de soins corps. Les peaux matures apprécient les textures riches et les parfums doux (rose, fleur d'oranger, monoï).",
                ],
            },
        ],
        faq: [
            {
                q: "Que offrir à une grand-mère qui dit avoir tout ?",
                a: "Misez sur l'émotion plutôt que l'objet : album photo personnalisé, cadre connecté, expérience partagée (un après-midi pâtisserie ensemble, une sortie). C'est presque toujours mieux qu'un nouvel objet.",
            },
            {
                q: "Cadeau pour une grand-mère en EHPAD ?",
                a: "Privilégiez ce qui se garde près d'elle : plaid doux, cadre photo, petit coffret de chocolats, livre grands caractères. Évitez les objets fragiles ou très encombrants.",
            },
        ],
    },
    {
        slug: "cadeau-grand-pere",
        title: "Cadeau pour grand-père : 20 idées qui touchent vraiment papy",
        metaTitle: "Cadeau grand-père : 20 idées utiles et touchantes | Kado-Box",
        metaDescription: "Idées cadeaux pour grand-père : gourmandise, confort, passions et souvenirs, classées du petit prix au cadeau d'exception.",
        intro: "Offrir à son grand-père, c'est souvent se heurter au fameux « j'ai besoin de rien ». Voici 20 idées qui font vraiment plaisir, par budget et par passion, pour gâter papy à coup sûr.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "homme",
        sections: [
            {
                heading: "Le cadeau-souvenir : album photo, vidéo personnalisée",
                paragraphs: [
                    "Comme pour grand-mère, l'album photo personnalisé est presque imbattable. Compilez les photos de famille des dernières années, ajoutez des légendes manuscrites scannées ou des anecdotes courtes. C'est le cadeau qu'il relira souvent.",
                ],
            },
            {
                heading: "Gourmandise : vin, alcool d'exception, café",
                paragraphs: [
                    "Une bonne bouteille de son vin préféré, un coffret de dégustation whisky/cognac/armagnac, un café de spécialité. Le cadeau qui marque : une bouteille millésimée sur son année de naissance ou celle d'un événement marquant (mariage, naissance d'un enfant).",
                ],
            },
            {
                heading: "Confort : pull, plaid, chaussons",
                paragraphs: [
                    "Un beau pull en laine mérinos, un plaid pour le canapé, une paire de chaussons cuir/laine de qualité. Le confort prime à cet âge, et un bon textile dure des années.",
                ],
            },
            {
                heading: "Cadeau lié à sa passion : pêche, jardinage, bricolage",
                paragraphs: [
                    "Si votre grand-père a une passion identifiée, c'est le moment d'en profiter. Pour le pêcheur : un nouveau leurre haut de gamme ou un livre de référence. Pour le jardinier : un sécateur professionnel ou une serre miniature. Pour le bricoleur : un outil de précision.",
                ],
            },
            {
                heading: "Tech simple : tablette adaptée, montre connectée senior",
                paragraphs: [
                    "Une tablette avec interface simplifiée (idéale pour les appels vidéo en famille), une montre connectée senior avec alerte chute. À configurer entièrement avant de l'offrir, c'est crucial.",
                ],
            },
        ],
        faq: [
            {
                q: "Que offrir à un grand-père de plus de 80 ans ?",
                a: "Confort + souvenirs : plaid doux, album photo, bon livre grands caractères, coffret gourmand qu'il appréciera vraiment. Évitez les objets compliqués à utiliser.",
            },
            {
                q: "Cadeau commun avec ses frères/sœurs : quel budget ?",
                a: "Plus on est, plus on peut viser haut : un cadeau d'exception à 150-300 € (montre, fauteuil de jardin, expérience) marque davantage que cinq petits cadeaux dispersés.",
            },
        ],
    },
    {
        slug: "cadeau-ado-fille",
        title: "Cadeau pour une ado fille : 20 idées par âge (12-17 ans)",
        metaTitle: "Cadeau ado fille : 20 idées qui plaisent vraiment | Kado-Box",
        metaDescription: "Idées cadeaux pour ado fille de 12 à 17 ans : tech, mode, beauté, créatif. 20 idées testées triées par âge et budget.",
        intro: "Offrir à une ado fille, c'est marcher sur des œufs : trop « petite fille » elle déteste, trop « adulte » c'est gênant. Voici 20 idées qui ont fait leurs preuves, classées par âge et par budget, pour ne pas se louper.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "ado",
        sections: [
            {
                heading: "12-14 ans : entre enfance et ado",
                paragraphs: [
                    "On commence à quitter les jouets sans pour autant être dans le cadeau « grande fille ». Trousse de maquillage débutante, kit créatif (perles, scrapbooking, peinture), enceinte Bluetooth colorée, journal intime avec serrure, livre de la collection qu'elle suit.",
                    "Évitez les peluches géantes et tout ce qui ressemble trop à un cadeau « petite enfance » : elle veut sentir qu'on la traite en grande.",
                ],
            },
            {
                heading: "14-16 ans : tech, mode, beauté",
                paragraphs: [
                    "Écouteurs Bluetooth (les vrais sans-fil), montre connectée d'entrée de gamme, accessoires beauté (palette d'ombres, set de pinceaux, parfum jeune), sac à dos design, bijou minimaliste. Les marques comptent : faites-vous discrètement guider par une copine de classe.",
                ],
            },
            {
                heading: "16-17 ans : presque adulte",
                paragraphs: [
                    "À cet âge on entre dans le cadeau « adulte ». Un parfum de marque, un sac à main casual, un bijou en argent fin, une carte cadeau dans sa boutique préférée. Le permis de conduire approche : kit auto, batterie de secours téléphone, abonnement Spotify ou Netflix prépayé peuvent aussi marcher.",
                ],
            },
            {
                heading: "Petits budgets qui marquent (moins de 30 €)",
                paragraphs: [
                    "Une trousse de maquillage avec quelques produits choisis, un coffret de chouchous et accessoires cheveux, un bullet journal avec stylos, une coque de téléphone design, un livre populaire chez les ados (TikTok inspirations).",
                ],
            },
            {
                heading: "Le piège à éviter : le cadeau « tendance hier »",
                paragraphs: [
                    "Les tendances ados changent vite. Avant d'acheter, vérifiez sur TikTok ou Instagram ce qui est dans le top du moment. Un produit « branché » il y a six mois peut faire ringard aujourd'hui.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment savoir ce qui lui ferait plaisir sans gâcher l'effet de surprise ?",
                a: "Demandez discrètement à une amie proche, ou à un frère/sœur. Ou regardez son fil Instagram/TikTok : les vidéos likées révèlent souvent ses envies du moment.",
            },
            {
                q: "Carte cadeau, est-ce un cadeau « cheap » ?",
                a: "Plus à cet âge. Une carte Amazon, Sephora ou Zalando bien présentée (avec une carte manuscrite + un petit complément type bijou ou bougie) est souvent ce qu'elle préfère vraiment.",
            },
        ],
    },
    {
        slug: "cadeau-ado-garcon",
        title: "Cadeau pour un ado garçon : 20 idées par âge (12-17 ans)",
        metaTitle: "Cadeau ado garçon : 20 idées qui marchent | Kado-Box",
        metaDescription: "Idées cadeaux pour ado garçon de 12 à 17 ans : films, séries, gaming, sport et créativité, triées par âge et budget.",
        intro: "Offrir à un ado garçon, c'est souvent miser sur l'évident (gaming + tech) sans tomber dans le générique. Voici 20 idées concrètes par tranche d'âge et par budget pour éviter le « ouais, merci » poli.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "ado",
        sections: [
            {
                heading: "12-14 ans : LEGO grand format, gaming débutant",
                paragraphs: [
                    "On garde un pied dans le jouet de qualité : LEGO Technic, sets Star Wars ou Harry Potter grand format, jeu vidéo type Mario, Minecraft, Fortnite (vérifier l'âge PEGI). Une manette de console supplémentaire pour jouer avec un copain.",
                ],
            },
            {
                heading: "14-16 ans : gaming, écouteurs, accessoires tech",
                paragraphs: [
                    "Un jeu très attendu, une carte cadeau Steam/PlayStation/Xbox (25-50 €), des écouteurs gaming, une manette ergonomique, un repose-poignet, une enceinte Bluetooth pour sa chambre. La SSD externe ou une carte microSD pour étendre sa Switch peut aussi faire mouche.",
                ],
            },
            {
                heading: "Pour un ado fan de films et de séries",
                paragraphs: [
                    "Partez de son univers préféré plutôt que d'un objet générique : beau livre illustré, LEGO ou jeu lié à la licence, affiche encadrée, sweat officiel ou édition collector d'une saga. Demandez d'abord quelle série ou quel film il suit en ce moment pour éviter une licence qu'il aimait il y a trois ans.",
                ],
            },
            {
                heading: "16-17 ans : tech adulte, accessoires mode",
                paragraphs: [
                    "Casque audio (Sony, Bose, JBL), montre connectée orientée sport, sac à dos design, sneakers (attention à la taille). Une carte cadeau dans sa boutique de vêtements préférée fonctionne bien à cet âge.",
                ],
            },
            {
                heading: "Le sportif : équipement, accessoires",
                paragraphs: [
                    "Identifiez son sport : ballon de qualité (foot, basket), gourde isotherme, écouteurs étanches pour le sport, sac de sport, raquette ou accessoire spécifique. Évitez les vêtements de sport sauf si vous connaissez la marque et la taille exactes.",
                ],
            },
            {
                heading: "Petits budgets (moins de 30 €) qui marchent",
                paragraphs: [
                    "Carte cadeau gaming, accessoire pour sa console, coque de téléphone, support pour bureau, batterie externe, casque filaire de qualité moyenne, livre BD/manga d'une série qu'il suit.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel jeu vidéo offrir si on ne s'y connaît pas ?",
                a: "Demandez-lui directement quel jeu il attend (les ados ont presque toujours un Steam ou PlayStation wishlist). À défaut, une carte cadeau de la console qu'il utilise est la solution la plus sûre.",
            },
            {
                q: "Cadeau pour un ado qu'on ne voit pas souvent ?",
                a: "Carte cadeau Amazon ou de sa console + un mot manuscrit qui montre l'attention. C'est mieux qu'un objet mal ciblé.",
            },
        ],
    },
    {
        slug: "cadeau-enfant-3-6-ans",
        title: "Cadeau pour un enfant de 3 à 6 ans : 20 idées par âge",
        metaTitle: "Cadeau enfant 3-6 ans : 20 idées éducatives et fun | Kado-Box",
        metaDescription: "Idées cadeaux pour enfant de 3 à 6 ans : jouets, jeux, livres, créatif. 20 idées triées par âge et par développement.",
        intro: "Entre 3 et 6 ans, les enfants évoluent vite : ce qui amuse à 3 ans ennuie à 5 ans. Voici 20 idées de cadeaux triées par âge précis et par type de jeu, pour éviter le doudou en double et le jouet trop avancé.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "enfant",
        sections: [
            {
                heading: "3 ans : jeux symboliques, premiers jouets éducatifs",
                paragraphs: [
                    "À 3 ans, place aux jeux d'imitation (cuisine en bois, dînette, garage avec petites voitures), aux puzzles 12-24 pièces, aux premiers Duplo ou gros LEGO. Les livres animés (à toucher, à pop-up) fonctionnent encore très bien.",
                ],
            },
            {
                heading: "4-5 ans : construction, créatif, premiers jeux de société",
                paragraphs: [
                    "LEGO Classic, Kapla, Magformers, pâte à modeler grand format, kit de peinture aquarelle. Premiers jeux de société coopératifs ou simples (memory, loto, Verger de Haba). C'est l'âge des grands sets de figurines (Playmobil, Schleich, Sylvanian Families).",
                ],
            },
            {
                heading: "6 ans : début de l'autonomie",
                paragraphs: [
                    "L'enfant lit ou s'y met. Premiers livres en autonomie (Mes premières lectures), LEGO Friends ou City avec petites instructions, jeux de société plus structurés (Dobble, Monopoly Junior), kit scientifique d'éveil (volcan, microscope enfant).",
                ],
            },
            {
                heading: "Hors écran : ce qui marche presque toujours",
                paragraphs: [
                    "Trottinette, vélo (vérifier la taille selon l'âge), déguisement de son personnage préféré, peluche d'éveil (sons, lumières) à 3-4 ans, instrument de musique d'éveil (xylophone, ukulélé enfant).",
                ],
            },
            {
                heading: "Petits budgets (moins de 20 €)",
                paragraphs: [
                    "Un livre album (Tomi Ungerer, l'Éloi Recoura, Beatrice Alemagna), une boîte de pâte à modeler grand format, un puzzle 24-48 pièces, un set de feutres lavables grands modèles, un petit jeu de société.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment éviter d'offrir un jouet en double ?",
                a: "Demandez aux parents avant d'acheter. La plupart sont ravis qu'on demande et orientent volontiers. À défaut, privilégiez le créatif consommable (pâte à modeler, feutres, papiers) qui se complète toujours.",
            },
            {
                q: "Faut-il offrir un jouet électronique à cet âge ?",
                a: "Avec parcimonie. Les jouets « son et lumière » sont vite saturants pour les parents, et leur intérêt éducatif est limité. Préférez les jouets simples qui sollicitent l'imagination.",
            },
        ],
    },
    {
        slug: "cadeau-enfant-7-10-ans",
        title: "Cadeau pour un enfant de 7 à 10 ans : 20 idées par passion",
        metaTitle: "Cadeau enfant 7-10 ans : 20 idées par passion | Kado-Box",
        metaDescription: "Idées cadeaux pour enfant de 7 à 10 ans : LEGO avancés, lecture, sport, créatif, science. 20 idées qui correspondent vraiment à leurs centres d'intérêt.",
        intro: "Entre 7 et 10 ans, l'enfant développe de vraies passions : science, sport, lecture, construction, animaux. Voici 20 idées de cadeaux triées par centre d'intérêt, pour viser juste plutôt que générique.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "enfant",
        sections: [
            {
                heading: "Le passionné de construction : LEGO avancés, modélisme",
                paragraphs: [
                    "LEGO City, Friends, Star Wars, Harry Potter en grands formats (300-700 pièces), LEGO Technic d'initiation, premier modèle de modélisme (avion en bois, maquette voiture).",
                    "Vérifiez l'âge minimum sur la boîte : un set 9+ peut être frustrant pour un enfant de 7 ans, et inversement.",
                ],
            },
            {
                heading: "Le lecteur : romans jeunesse, BD, mangas",
                paragraphs: [
                    "Les Royaumes de Feu, Tom Gates, Mortelle Adèle (pour les filles comme les garçons), Astérix, Lucky Luke, Naruto en version jeunesse. Une bibliothèque cadeau avec 2-3 tomes d'une même série fait un superbe cadeau.",
                ],
            },
            {
                heading: "Le scientifique : kit chimie, microscope, télescope",
                paragraphs: [
                    "Microscope enfant (vraiment fonctionnel), kit chimie ou électronique d'initiation, télescope d'astronomie pour débutant, kit de fouille de fossile. Choisissez des marques sérieuses (Buki, Clementoni) pour de vrais outils, pas des gadgets.",
                ],
            },
            {
                heading: "Le sportif : équipement, accessoires",
                paragraphs: [
                    "Ballon de qualité (foot, basket, rugby), kit raquettes badminton, vélo (attention à la taille), trottinette à vitesses, casque vélo design. Le sport bien équipé devient une vraie passion à cet âge.",
                ],
            },
            {
                heading: "Le créatif : peinture, perles, couture débutante",
                paragraphs: [
                    "Kit aquarelle Faber-Castell, set de perles à repasser, premier kit de couture (machine enfant ou main), kit de loisirs créatifs Djeco, carnet de dessin manga + feutres adaptés.",
                ],
            },
        ],
        faq: [
            {
                q: "Cadeau commun parents/grands-parents : quel budget ?",
                a: "Quand plusieurs adultes cotisent, on peut viser 80-150 € : un vélo de qualité, une grosse boîte LEGO, une trottinette électrique enfant (avec accord parental), un instrument de musique débutant.",
            },
            {
                q: "Faut-il offrir un téléphone ou une console à cet âge ?",
                a: "Question délicate à valider avec les parents avant tout. Sans accord, vous risquez de mettre tout le monde mal à l'aise. Si feu vert : console portable simple ou montre connectée enfant restent les options les plus raisonnables.",
            },
        ],
    },
    {
        slug: "cadeau-naissance",
        title: "Cadeau de naissance : 20 idées utiles (et qui sortent du doudou)",
        metaTitle: "Cadeau naissance : 20 idées originales et utiles | Kado-Box",
        metaDescription: "Idées de cadeau de naissance : pour bébé et pour les parents. 20 idées testées qui sortent du énième doudou et du grenouillère générique.",
        intro: "Un cadeau de naissance, c'est l'art d'aider sans encombrer. Voici 20 idées qui font vraiment plaisir aux parents épuisés et qui serviront à bébé, en sortant des classiques peluche-grenouillère.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "bebe",
        occasionSlug: "naissance",
        sections: [
            {
                heading: "Les cadeaux utiles que les parents apprécient vraiment",
                paragraphs: [
                    "Un coffret de soin bébé (Mustela, Weleda, Cattier), un thermomètre frontal infrarouge, une veilleuse projecteur d'étoiles, un mobile musical, des langes en mousseline grande taille (jamais trop). Ce sont les indispensables qu'on utilise tous les jours.",
                    "Évitez les vêtements en taille naissance (souvent déjà offerts en double) ; privilégiez le 6, 9 ou 12 mois — bébé y arrivera vite et les parents seront ravis d'avoir des rechanges.",
                ],
            },
            {
                heading: "L'éveil sensoriel : tapis, livres tissus, jouets de dentition",
                paragraphs: [
                    "Un tapis d'éveil de bonne marque (Lilliputiens, Skip Hop), des livres en tissu, des jouets de dentition en silicone alimentaire, des hochets en bois. Ce sont les objets utilisés des premières semaines aux 6 mois.",
                ],
            },
            {
                heading: "Pour les parents : ce dont ils ont vraiment besoin",
                paragraphs: [
                    "Une box repas livrée (Frichti, Cookeat ou équivalent) pour quelques jours, une carte cadeau pour une séance massage post-accouchement, un panier de petit-déjeuner livré le matin de la sortie maternité. Les parents épuisés s'en souviendront longtemps.",
                ],
            },
            {
                heading: "Le cadeau souvenir : empreinte, livre photo",
                paragraphs: [
                    "Kit d'empreinte de pied/main en argile à durcir, premier livre photo de famille (à compléter au fil des mois), gourmette ou collier de baptême gravé. Pensez à graver le prénom + la date de naissance pour personnaliser.",
                ],
            },
            {
                heading: "Petits budgets (moins de 30 €)",
                paragraphs: [
                    "Doudou de qualité (Doudou et Compagnie, Kaloo), bavoirs en coton bio, petit livre cartonné de référence (Que d'émotions ! ou Tchoupi), bonnet et chaussons en laine. Présentez le tout joliment, l'emballage compte beaucoup à cette occasion.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel budget moyen pour un cadeau de naissance ?",
                a: "Entre 30 et 60 € pour un proche, 60-100 € pour un cadeau commun en famille proche. Au-delà, on entre dans le cadeau « parrain/marraine » ou « grands-parents ».",
            },
            {
                q: "Faut-il attendre la naissance pour offrir ?",
                a: "C'est la coutume française : on offre quand bébé est arrivé. Vous pouvez préparer le cadeau à l'avance mais le présenter à la sortie de maternité ou lors de la première visite.",
            },
        ],
    },
    {
        slug: "cadeau-couple",
        title: "Cadeau pour un couple : 20 idées originales (mariage, crémaillère, anniversaire)",
        metaTitle: "Cadeau pour un couple : 20 idées originales | Kado-Box",
        metaDescription: "Idées cadeaux pour un couple : déco, expérience, gastronomie, technologie. 20 idées qui plaisent à deux, pour mariage, crémaillère ou anniversaire de couple.",
        intro: "Offrir à un couple, c'est trouver quelque chose qui parle aux deux. Voici 20 idées qui dépassent le cliché « set de torchons assortis », classées par occasion (mariage, crémaillère, anniversaire de couple) et par budget.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "couple",
        sections: [
            {
                heading: "Le cadeau-expérience : ce qui marche le mieux",
                paragraphs: [
                    "Box restaurant gastronomique, week-end hors saison, dégustation à deux, cours de cuisine en duo, soin spa en duo. C'est presque toujours le cadeau préféré d'un couple : il crée un souvenir partagé plutôt qu'un objet de plus.",
                    "Budget : 80-200 € pour quelque chose de qualité. À partir de 150 €, on accède aux box week-end ou aux dîners gastronomiques étoilés.",
                ],
            },
            {
                heading: "Déco utile : pour qu'ils pensent à vous chez eux",
                paragraphs: [
                    "Un beau plaid en grosse maille, une lampe design (Tom Dixon, Muuto en entrée de gamme), un vase de marque, un tableau ou une affiche encadrée signée. Évitez les objets trop personnels (statuettes, déco bibelot) qui ne correspondent pas forcément à leur style.",
                ],
            },
            {
                heading: "Gastronomie : épicerie fine, cave",
                paragraphs: [
                    "Une bonne bouteille (champagne, vin de garde, whisky), un coffret épicerie fine (huile d'olive d'auteur, vinaigre balsamique millésimé, sels du monde), un service de cave à vin par abonnement de 3-6 mois.",
                ],
            },
            {
                heading: "Pour la crémaillère : aux choses utiles mais jolies",
                paragraphs: [
                    "Une planche à découper en bois massif, un service de couteaux d'office, une corbeille à fruits design, un set de verres à vin de qualité, un porte-bougies arc. La règle : un objet utile + esthétique, jamais purement utilitaire.",
                ],
            },
            {
                heading: "Petits budgets : un cadeau personnalisé",
                paragraphs: [
                    "Un cadre photo gravé avec leurs prénoms, un livre photo de leurs voyages (à demander discrètement aux proches), une bouteille millésimée sur l'année où ils se sont rencontrés. La personnalisation transforme un cadeau modeste en cadeau qu'on garde.",
                ],
            },
        ],
        faq: [
            {
                q: "Cadeau de mariage : quel budget par convive ?",
                a: "La règle informelle française tourne autour du « coût du couvert » : 60-100 € par invité dans une noce classique, 100-150 € pour un mariage proche/famille. Une enveloppe ou un cadeau d'égale valeur.",
            },
            {
                q: "Comment éviter le cadeau en double à un mariage ?",
                a: "Demandez s'il existe une liste de mariage (Mille mercis, Zankyou, ou directement chez l'enseigne). C'est aussi possible de cotiser à plusieurs pour un cadeau d'expérience.",
            },
        ],
    },
    {
        slug: "cadeau-anniversaire-mariage",
        title: "Anniversaire de mariage : 15 idées par nombre d'années",
        metaTitle: "Cadeau anniversaire de mariage : 15 idées par année | Kado-Box",
        metaDescription: "Idées cadeaux pour anniversaire de mariage : noces de coton, bois, perle, argent, or, diamant. 15 idées par durée du couple et par budget.",
        intro: "Chaque année de mariage a son thème : coton, cuir, perle, argent, or, diamant. Voici 15 idées de cadeaux qui respectent la tradition tout en restant modernes, par nombre d'années et par budget.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "couple",
        sections: [
            {
                heading: "1 à 5 ans : papier, coton, cuir, bois, fleur",
                paragraphs: [
                    "1 an (noces de coton) : parure de lit en coton bio, t-shirts assortis personnalisés. 2 ans (cuir) : portefeuille ou ceinture en cuir. 3 ans (cuir/froment) : trousse de toilette cuir. 4 ans (cire) : bougie haut de gamme. 5 ans (bois) : planche à découper en bois massif gravée.",
                ],
            },
            {
                heading: "10 à 20 ans : étain, perle, porcelaine, cristal",
                paragraphs: [
                    "10 ans (étain) : carafe ou verres en étain. 13 ans (muguet) : bouquet de muguet + bijou floral. 15 ans (cristal) : verres ou vase en cristal. 20 ans (porcelaine) : service de table en porcelaine (Limoges, Bernardaud).",
                ],
            },
            {
                heading: "25 ans : noces d'argent",
                paragraphs: [
                    "Le grand cap. Un bijou en argent (collier, montre, bracelet), un cadre photo en argent, un service de couverts en argent ou plaqué argent. C'est le moment de marquer le coup avec un vrai cadeau d'exception.",
                ],
            },
            {
                heading: "50 ans : noces d'or",
                paragraphs: [
                    "Le sommet. Bijou en or (alliance renouvelée, médaille gravée), montre en or, voyage d'exception. Beaucoup de familles cotisent à cette occasion pour offrir un cadeau marquant : album photo de toute la vie du couple, voyage organisé, soirée privée.",
                ],
            },
            {
                heading: "60 ans et plus : diamant, platine",
                paragraphs: [
                    "60 ans (diamant) : pierre précieuse, gravure exceptionnelle. 70 ans (platine) : bijou platine. À ce stade, on est plus dans la célébration familiale (album, vidéo souvenir, rassemblement) que dans l'objet matériel.",
                ],
            },
        ],
        faq: [
            {
                q: "Faut-il respecter strictement le thème de l'année ?",
                a: "Non, c'est une jolie inspiration mais pas une obligation. Si le couple n'aime pas le cuir, ne forcez pas pour ses noces de cuir. L'important : marquer l'année, pas suivre une règle.",
            },
            {
                q: "Quel cadeau pour leur anniversaire si on est leurs enfants ?",
                a: "Cadeau de famille : un album photo retraçant leur vie ensemble (avec photos d'enfants/petits-enfants), une vidéo souvenir, un voyage payé en famille, un weekend dans le lieu où ils se sont rencontrés. L'émotion prime largement.",
            },
        ],
    },
    {
        slug: "cadeau-cremaillere",
        title: "Cadeau de pendaison de crémaillère : 15 idées qui ne finissent pas au placard",
        metaTitle: "Cadeau pendaison de crémaillère : 15 idées utiles | Kado-Box",
        metaDescription: "Idées cadeaux pour une crémaillère : déco, cuisine, plantes, accessoires. 15 idées qui plaisent vraiment, du petit budget au cadeau d'exception.",
        intro: "Une pendaison de crémaillère, c'est l'occasion de marquer l'emménagement sans encombrer leur nouvelle déco. Voici 15 idées qui passent toutes les déco et tous les goûts, par budget et par style.",
        publishedAt: "2026-05-20",
        readingMinutes: 5,
        recipientSlug: "couple",
        sections: [
            {
                heading: "La valeur sûre : la plante d'intérieur",
                paragraphs: [
                    "Une plante d'intérieur d'une vraie marque (Bergamotte, Plantes pour Tous, ou pépinière locale), dans un beau cache-pot. Pothos, monstera, sansevieria : ce sont les trois plantes qui survivent même à des propriétaires distraits.",
                    "Évitez les plantes capricieuses (fittonia, calathea) sans connaître les goûts/expérience de la personne.",
                ],
            },
            {
                heading: "Pour la cuisine : utile et esthétique",
                paragraphs: [
                    "Planche à découper en bois massif, set d'épices d'auteur, huile d'olive premium, vinaigre balsamique millésimé, set de verres à vin. La règle : utile + beau, jamais purement utilitaire ou purement déco.",
                ],
            },
            {
                heading: "Le coffret apéro : à partager le soir même",
                paragraphs: [
                    "Une bouteille de bulles (champagne, crémant, prosecco), un coffret de tapas/épicerie fine, deux beaux verres. C'est le cadeau qui s'ouvre directement à la soirée et qui fait toujours sensation.",
                ],
            },
            {
                heading: "Déco intemporelle : ce qui passe partout",
                paragraphs: [
                    "Une bougie de grande maison, un cadre photo design, un vase minimaliste (verre soufflé ou céramique). Évitez les objets trop personnels ou trop colorés qui ne s'accorderont pas à leur déco.",
                ],
            },
            {
                heading: "Petits budgets : le mot et l'attention",
                paragraphs: [
                    "Un bon livre de cuisine (Olia Hercules, Yotam Ottolenghi, Anissa Helou), un coffret café/thé, des chocolats d'une bonne maison. Avec une carte manuscrite qui leur souhaite plein de bons moments dans leur nouveau chez-eux.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel budget pour un cadeau de crémaillère ?",
                a: "Entre 20 et 50 € pour un ami, 50-100 € pour un proche. Au-delà, c'est plus l'enveloppe en cash ou la liste cadeau pour un gros achat (canapé, électroménager).",
            },
            {
                q: "Doit-on apporter quelque chose à boire en plus du cadeau ?",
                a: "Une bouteille en plus du cadeau principal est toujours apprécié, surtout si la soirée s'éternise. C'est aussi une façon discrète de remercier les hôtes.",
            },
        ],
    },
    {
        slug: "cadeau-secret-santa",
        title: "Secret Santa : 20 idées de cadeaux à moins de 25 €",
        metaTitle: "Secret Santa : 20 idées originales à moins de 25 € | Kado-Box",
        metaDescription: "Idées de cadeaux Secret Santa au bureau ou entre amis : 20 idées originales, fun ou utiles à moins de 25 €. Pour ne pas se louper avec un collègue.",
        intro: "Le Secret Santa, c'est le casse-tête : il faut trouver un cadeau à moins de 25 € pour une personne qu'on connaît peu, sans tomber dans le gadget de mauvais goût. Voici 20 idées qui passent à tous les coups.",
        publishedAt: "2026-05-20",
        readingMinutes: 5,
        sections: [
            {
                heading: "Les cadeaux gourmands : le pari le plus sûr",
                paragraphs: [
                    "Une boîte de chocolats d'une vraie maison (Lindt grand cru, Jeff de Bruges, ou un chocolatier local), un coffret de thés Mariage Frères ou Dammann en petit format, un coffret de mignonnettes d'alcool (gin, rhum, whisky), un panier petit format épicerie fine.",
                    "Pourquoi ça marche : tout le monde aime, ça se consomme, ça ne traîne pas dans un tiroir.",
                ],
            },
            {
                heading: "Détente et bien-être",
                paragraphs: [
                    "Une bougie parfumée d'une marque correcte (Yankee Candle, Bougies La Française), un coffret de soins (crème mains + baume lèvres + savon), un masque de sommeil en soie, un coffret bain (bombe + huile).",
                ],
            },
            {
                heading: "Pour le bureau (sans être cliché)",
                paragraphs: [
                    "Un mug isotherme de qualité, un carnet en cuir avec stylo, une lampe de bureau à pince, un repose-poignet ergonomique pour clavier, un cactus ou succulente dans un joli pot.",
                ],
            },
            {
                heading: "Drôle mais classe (à manier avec précaution)",
                paragraphs: [
                    "Un kit cocktails (livre + accessoires), un coffret de bières du monde, un livre humour bien choisi (BD), une plante humoristique (cactus en forme rigolote). Évitez tout ce qui pourrait être ambigu ou maladroit en environnement pro.",
                ],
            },
            {
                heading: "À éviter absolument en Secret Santa pro",
                paragraphs: [
                    "Tout ce qui touche au physique (parfum, beauté en cosmétique personnelle, vêtement), les blagues à connotation sexuelle ou politique, le très bon marché qui paraît bâclé, l'objet inutile genre gadget de bureau gimmick. La règle d'or : « si ça met mal à l'aise dans 1 cas sur 20, on évite ».",
                ],
            },
        ],
        faq: [
            {
                q: "Doit-on présenter le cadeau de manière soignée ?",
                a: "Oui absolument. L'emballage joli + une carte manuscrite anonyme transforment un cadeau modeste en cadeau soigné. Comptez 5-10 minutes pour bien emballer.",
            },
            {
                q: "Le destinataire doit-il deviner qui offre ?",
                a: "Variable selon les groupes. Si on garde l'anonymat, on évite les références trop personnelles. Si on révèle à la fin, on peut être un peu plus ciblé/clin d'œil sans être indiscret.",
            },
        ],
    },
    {
        slug: "cadeau-noel-petit-budget",
        title: "Cadeaux de Noël à petit budget : 25 idées à moins de 20 €",
        metaTitle: "Cadeau de Noël petit budget : 25 idées à -20 € | Kado-Box",
        metaDescription: "Idées cadeaux de Noël à moins de 20 € : pour la famille, les collègues, les amis. 25 idées qui ne sentent pas le cadeau cheap.",
        intro: "Noël avec un petit budget, c'est tout à fait possible sans tomber dans le cadeau qui sent l'économie forcée. Voici 25 idées à moins de 20 € qui font vraiment plaisir, par destinataire et par type.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        occasionSlug: "noel",
        sections: [
            {
                heading: "Pour les femmes : moins de 20 €",
                paragraphs: [
                    "Une bougie de qualité moyenne mais joliment présentée, un coffret de thé Damman ou Kusmi, un bijou minimaliste en argent plaqué, un livre de poche d'une autrice qu'elle aime, un mug + sachet de chocolat chaud premium.",
                ],
            },
            {
                heading: "Pour les hommes : moins de 20 €",
                paragraphs: [
                    "Un coffret de bières artisanales, un porte-clés en cuir véritable, une paire de chaussettes de marque, un livre BD/manga d'une série qu'il suit, un mug isotherme.",
                ],
            },
            {
                heading: "Pour les enfants : moins de 20 €",
                paragraphs: [
                    "Un livre album, un puzzle 100-500 pièces (selon l'âge), un set créatif Djeco, un petit jeu de société, une boîte de Kapla petit format, une figurine Schleich.",
                ],
            },
            {
                heading: "Pour les ados : moins de 20 €",
                paragraphs: [
                    "Une carte cadeau Steam/PlayStation/Spotify (10-15 €), des chouchous + accessoires cheveux pour fille, des chaussettes à motifs marrants pour garçon, un livre populaire (TikTok, manga), une coque de téléphone design.",
                ],
            },
            {
                heading: "L'astuce qui change tout : l'emballage",
                paragraphs: [
                    "À ce budget, c'est l'emballage qui sépare le cadeau « cheap » du cadeau « pensé ». Papier kraft + ficelle + une branche de sapin ou un bâton de cannelle : effet maximal, coût minimal. Plus la carte manuscrite, et le cadeau passe à un autre niveau.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment expliquer un petit budget sans malaise ?",
                a: "Pas besoin de l'expliquer : un cadeau bien choisi et bien emballé ne se justifie pas par son prix. Si vraiment vous voulez en parler, dites simplement « j'ai voulu faire quelque chose de personnel cette année ».",
            },
            {
                q: "Faut-il mettre plusieurs petits cadeaux ou un seul ?",
                a: "Plusieurs petits (chocolats + livre de poche + bougie par exemple) donnent un effet « il y a beaucoup à déballer » qui dépasse souvent un seul cadeau à 25 €. À tester en cadeau Noël familial.",
            },
        ],
    },
    {
        slug: "cadeau-gourmand",
        title: "Cadeaux gourmands : 25 idées chocolat, thé, café, épicerie fine",
        metaTitle: "Cadeau gourmand : 25 idées chocolat, thé, café | Kado-Box",
        metaDescription: "Idées de cadeaux gourmands : chocolats artisanaux, thés rares, cafés de spécialité, coffrets épicerie fine. 25 idées triées par occasion et budget.",
        intro: "Le cadeau gourmand, c'est la valeur sûre : il fait plaisir à tout le monde, il ne traîne pas dans un placard, et il se partage. Voici 25 idées triées par type (chocolat, thé, café, épicerie fine) et par budget.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        sections: [
            {
                heading: "Chocolats : les bonnes maisons à connaître",
                paragraphs: [
                    "Sortez du Ferrero Rocher de supermarché. Pour 25-50 €, vous accédez à de vrais chocolatiers : Jeff de Bruges (entrée de gamme correcte), Léonidas (classique belge), Patrick Roger (haut de gamme français), La Maison du Chocolat (cadeau marquant). Les coffrets d'assortiment fonctionnent toujours.",
                    "Pour les petits budgets : un assortiment Lindt grand cru ou Côte d'Or Noir 70 % bien présenté fait mieux qu'un gros volume de chocolats moyens.",
                ],
            },
            {
                heading: "Thé : Mariage Frères, Dammann, Kusmi",
                paragraphs: [
                    "Mariage Frères pour le côté maison parisienne raffinée (coffret 4 thés autour de 40 €), Dammann pour la qualité accessible (20-30 €), Kusmi pour le côté design boîtes colorées (20-35 €). Vérifiez s'il/elle aime plutôt vert/noir/rouge avant d'acheter.",
                ],
            },
            {
                heading: "Café : les torréfacteurs de spécialité",
                paragraphs: [
                    "Le café de spécialité (Coutume, Belleville Brûlerie, Lomi à Paris ; nombreux torréfacteurs locaux ailleurs) propose une expérience très différente du café de supermarché. Un coffret de 3-4 cafés d'origine + une cafetière à piston à 25-35 € fait un superbe cadeau.",
                ],
            },
            {
                heading: "Épicerie fine : les coffrets dégustation",
                paragraphs: [
                    "Coffret d'huiles d'olive du monde, de vinaigres, de sels, de moutardes d'auteur. Maisons comme Maille (moutardes), Huilerie Beaujolaise, ou des coffrets spécialisés. Comptez 35-60 € pour un coffret de qualité.",
                ],
            },
            {
                heading: "Alcools : les coffrets qui marquent",
                paragraphs: [
                    "Un coffret de dégustation whisky (3-4 origines), gin avec tonics premium, rhum vieux + verres adaptés, ou une bonne bouteille millésimée. Pour 50-80 €, vous offrez une vraie expérience plutôt qu'un cadeau générique.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment savoir ce qu'il/elle aime côté gourmand ?",
                a: "Regardez sa cuisine, ce qu'il/elle commande au resto, posez la question à un proche. Si vraiment vous ne savez pas : le chocolat noir 70 % et le thé Earl Grey ou Russian Caravan plaisent à 90 % des adultes.",
            },
            {
                q: "Comment éviter que le cadeau gourmand fasse « cadeau de Noël obligatoire » ?",
                a: "Préférez une vraie maison à un coffret de supermarché, ajoutez une petite carte manuscrite qui explique pourquoi vous avez choisi ce produit (« j'ai goûté ce thé chez X, il m'a fait penser à toi »).",
            },
        ],
    },
    {
        slug: "cadeau-beaute-femme",
        title: "Cadeaux beauté pour femme : 20 idées par marque et budget",
        metaTitle: "Cadeau beauté femme : 20 idées par marque | Kado-Box",
        metaDescription: "Idées cadeaux beauté pour femme : coffrets soin, parfum, maquillage. 20 idées triées par marque, budget et type de peau.",
        intro: "Offrir de la beauté à une femme, c'est marcher sur un terrain personnel : il faut bien viser ses goûts, son type de peau, ses marques. Voici 20 idées triées par budget et par type de produit pour ne pas se louper.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Les coffrets qui plaisent à presque toutes",
                paragraphs: [
                    "Coffret Caudalie (vinothérapie, parfait pour peaux sensibles), coffret Nuxe (Huile Prodigieuse, classique français), coffret Clarins Double Sérum, coffret Yves Rocher (rapport qualité-prix imbattable). Ces marques font des coffrets de Noël/fête des mères entre 35 et 60 €.",
                ],
            },
            {
                heading: "Le parfum : la règle absolue",
                paragraphs: [
                    "N'offrez jamais un parfum « surprise » sauf si vous connaissez très bien la personne. Une seule règle : choisir un parfum qu'elle porte déjà. Comment ? Regardez le flacon sur sa coiffeuse, demandez discrètement à un proche, ou offrez la version coffret de ce qu'elle achète déjà.",
                    "Si vraiment vous voulez la faire découvrir : optez pour une eau de toilette (plus légère, déplaît rarement) plutôt qu'une eau de parfum. Et joignez le ticket de caisse, qu'elle puisse échanger.",
                ],
            },
            {
                heading: "Maquillage : les marques sûres",
                paragraphs: [
                    "Charlotte Tilbury (palette Pillow Talk, légendaire), Mac (rouges à lèvres iconiques), Urban Decay (palettes ombres), NARS (blush Orgasm). Pour les peaux sensibles : Sensai ou Sisley. Évitez d'offrir un fond de teint sans connaître son carnation exacte.",
                ],
            },
            {
                heading: "Soin du corps : huile, baume, gommage",
                paragraphs: [
                    "Une huile sèche pour le corps (Nuxe Huile Prodigieuse, L'Occitane), un gommage de qualité (Coffret SOL de Janeiro Brazilian Bum Bum, Sabon), un baume mains de marque française (Diptyque, L'Occitane). Ces produits durent et marquent.",
                ],
            },
            {
                heading: "Le cadeau cheveux : à offrir avec prudence",
                paragraphs: [
                    "Un masque hydratant (Olaplex N°8, Kérastase), une huile capillaire (Moroccanoil, Ouai), une brosse Tangle Teezer ou Mason Pearson. Évitez les produits coiffants techniques (mousse, gel) sans connaître ses cheveux.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment savoir son type de peau ?",
                a: "Sèche, mixte, grasse, sensible : observez ses produits actuels, regardez les étiquettes. À défaut, partez sur des marques larges et universelles (Caudalie, Nuxe) qui conviennent à la majorité.",
            },
            {
                q: "Faut-il offrir bio ou conventionnel ?",
                a: "Si elle achète bio (vous le verrez dans sa salle de bain), restez bio (Weleda, Sanoflore, Patyka, Avril). Sinon, conventionnel de qualité passe partout. Le pire serait d'offrir bio à quelqu'un qui aime les textures luxe Lancôme/Dior.",
            },
        ],
    },
    {
        slug: "cadeau-tech-utile",
        title: "Cadeaux tech utiles : 20 idées qui ne finissent pas au tiroir",
        metaTitle: "Cadeau tech utile : 20 idées qui servent vraiment | Kado-Box",
        metaDescription: "Idées cadeaux tech utiles : casque audio, montre connectée, station de charge, accessoires bureau. 20 idées qui servent au quotidien, par budget.",
        intro: "La tech-cadeau, c'est l'éternel risque du gadget qui finit oublié dans un tiroir. Voici 20 idées d'objets tech qui servent vraiment au quotidien, par budget et par profil utilisateur.",
        publishedAt: "2026-05-20",
        readingMinutes: 6,
        sections: [
            {
                heading: "Audio : casque, écouteurs, enceintes",
                paragraphs: [
                    "Casque à réduction de bruit (Sony WH-1000XM5 = référence, Bose QuietComfort, AirPods Max). Écouteurs sans fil (AirPods Pro, Bose QuietComfort Earbuds, Sony WF-1000XM5). Enceinte Bluetooth portable (JBL Charge, Bose SoundLink). C'est probablement la catégorie tech la plus utilisée au quotidien.",
                ],
            },
            {
                heading: "Charge : stations multi-appareils",
                paragraphs: [
                    "Une station de charge sans fil multi-appareils (téléphone + montre + écouteurs en simultané) résout un problème quotidien que personne ne s'occupe d'acheter pour soi. Anker, Belkin, OnePlus font des modèles de qualité entre 40 et 90 €.",
                ],
            },
            {
                heading: "Montre connectée : par profil",
                paragraphs: [
                    "Pour Apple : Apple Watch (SE pour budget contenu, Series pour standard). Pour Android : Samsung Galaxy Watch. Pour sportif intensif : Garmin Forerunner ou Fenix. Pour santé/sommeil : Whoop ou Oura Ring. Vérifiez la compatibilité système avant d'acheter.",
                ],
            },
            {
                heading: "Bureau / télétravail",
                paragraphs: [
                    "Hub USB-C multi-ports, support d'ordinateur ergonomique, lampe de bureau à intensité réglable, repose-pied, clavier mécanique compact (Keychron, Logitech MX Keys), souris ergonomique. Ces objets améliorent vraiment le quotidien télétravail.",
                ],
            },
            {
                heading: "Maison connectée : prudence",
                paragraphs: [
                    "Ampoules connectées (Philips Hue d'entrée de gamme), enceinte Echo/Google Nest, caméra Tapo ou Eufy. Attention : la maison connectée nécessite une configuration et un écosystème. Ne l'offrez que si vous savez que la personne s'en servira.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment savoir si la personne a déjà un produit similaire ?",
                a: "Question difficile à poser directement. Astuce : observez son sac, ses écouteurs actuels, son téléphone. Ou demandez à un proche. À défaut : carte cadeau Apple/Amazon, qui lui permet de choisir.",
            },
            {
                q: "Faut-il offrir le tout dernier modèle ?",
                a: "Pas forcément. Un modèle de la génération précédente offre souvent 90 % de l'expérience à 60-70 % du prix. La référence absolue n'est pas toujours la dernière sortie.",
            },
        ],
    },
    {
        slug: "cadeau-livre-par-profil",
        title: "Quel livre offrir : 20 idées par profil de lecteur",
        metaTitle: "Quel livre offrir : 20 idées par profil de lecteur | Kado-Box",
        metaDescription: "Idées de livres à offrir par profil de lecteur : roman, polar, essai, BD, beau livre. 20 idées qui touchent vraiment, du best-seller au cadeau précieux.",
        intro: "Le livre, c'est le cadeau qui dit « j'ai pensé à toi précisément ». Encore faut-il viser juste : voici 20 idées triées par profil de lecteur, du fan de polar au curieux d'essais en passant par l'amateur de beaux livres.",
        publishedAt: "2026-05-20",
        readingMinutes: 7,
        sections: [
            {
                heading: "Le lecteur de romans contemporains",
                paragraphs: [
                    "Pour qui aime les grands récits actuels : « Veiller sur elle » de Jean-Baptiste Andrea (Goncourt 2023), « Le mage du Kremlin » de Giuliano da Empoli, « Le bal des folles » de Victoria Mas, ou tout Sorj Chalandon. Le Prix Goncourt de l'année est presque toujours un bon pari.",
                ],
            },
            {
                heading: "Le passionné de polars / thrillers",
                paragraphs: [
                    "Pierre Lemaitre (« Au revoir là-haut »), Mickaël Mention pour le noir français, Jean-Christophe Grangé pour le thriller à grande échelle, Olivier Norek (ex-flic et romancier), ou les classiques anglo-saxons : Donna Leon, Henning Mankell, Andrea Camilleri.",
                ],
            },
            {
                heading: "Le curieux d'essais et de sciences humaines",
                paragraphs: [
                    "« Sapiens » de Yuval Noah Harari pour qui ne l'a pas lu, les ouvrages de Cynthia Fleury (« Ci-gît l'amer »), Hartmut Rosa pour la sociologie de l'accélération, ou les essais courts (« Hors-Sol ») pour découvrir.",
                ],
            },
            {
                heading: "L'amateur de bande dessinée",
                paragraphs: [
                    "Au-delà des classiques (Astérix, Lucky Luke, Tintin), pensez aux séries qui marquent : Lastman, Blacksad, Le Tour de Gaule (Bastien Vivès), L'Arabe du futur, Persepolis. Pour les BD jeunesse : Aldobrando, Mortelle Adèle, Géronimo Stilton selon l'âge.",
                ],
            },
            {
                heading: "Le passionné de beaux livres (cuisine, art, photo)",
                paragraphs: [
                    "Beaux livres de cuisine : Yotam Ottolenghi, Anissa Helou, Olia Hercules, ou les livres Marabout / Phaidon de référence. Photo : les monographies Taschen, les portraits d'auteurs (Sebastião Salgado, Annie Leibovitz). Art : les catalogues d'expo récents, les éditions Phaidon ou Hazan.",
                ],
            },
            {
                heading: "Petits budgets : la collection « poche »",
                paragraphs: [
                    "Un Folio, Livre de Poche ou J'ai Lu d'un grand classique remis au goût du jour. Un Tracts Gallimard (essai très court, 4-5 €) sur un sujet qui colle à ses centres d'intérêt. Une carte cadeau Fnac de 30 € le laisse choisir.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment savoir ce qu'il/elle a déjà lu ?",
                a: "Regardez sa bibliothèque, demandez à un proche, ou fonctionnez par valeur sûre : la rentrée littéraire ou le Prix Goncourt récent ont peu de chance d'être déjà chez la personne. À défaut, une carte cadeau Fnac/librairie.",
            },
            {
                q: "Faut-il dédicacer le livre ?",
                a: "Oui mais avec discrétion : votre prénom + la date sur la page de garde, éventuellement une phrase courte sincère. Pas une longue dédicace qui s'imposerait à chaque future relecture.",
            },
        ],
    },
    {
        slug: "cadeau-noel-femme",
        title: "Cadeau de Noël pour une femme : 18 idées qui font mouche",
        metaTitle: "Cadeau de Noël femme : 18 idées qui plaisent | Kado-Box",
        metaDescription: "Que offrir à une femme à Noël ? Notre sélection d'idées cadeaux par budget et par personnalité, du petit prix au cadeau d'exception.",
        intro: "Trouver le cadeau de Noël parfait pour une femme — sa compagne, sa mère, sa sœur, une amie — peut vite tourner au casse-tête. Pour vous épargner les heures de recherche, on a réuni les idées qui plaisent vraiment, classées par budget et par profil. Toutes sont disponibles sur Amazon avec livraison avant les fêtes.",
        publishedAt: "2026-06-10",
        readingMinutes: 6,
        occasionSlug: "noel",
        recipientSlug: "femme",
        sections: [
            {
                heading: "La valeur sûre : un coffret beauté ou un parfum",
                paragraphs: [
                    "C'est le cadeau de Noël n°1 pour une femme, et pour une bonne raison : il fait toujours plaisir. Un coffret soin, maquillage ou un parfum qu'elle aime déjà combine plusieurs produits dans une présentation soignée qui fait son effet au pied du sapin.",
                    "L'astuce qui ne trompe pas : regardez ce qu'elle utilise déjà dans sa salle de bain et restez dans la même gamme ou la même marque. On offre rarement le bon parfum « au hasard » — mais on ne se trompe jamais en complétant ce qu'elle aime.",
                ],
            },
            {
                heading: "Pour la touche émotion : un bijou délicat",
                paragraphs: [
                    "Un bracelet fin, un collier discret ou une paire de boucles d'oreilles restent des cadeaux qui marquent. Inutile de viser le diamant : un bijou en argent 925 ou plaqué or, choisi avec goût, a bien plus de valeur sentimentale que de prix.",
                    "Privilégiez les pièces sobres qu'elle pourra porter au quotidien plutôt qu'une pièce voyante réservée aux grandes occasions. Et gardez le ticket : pour les bijoux, mieux vaut prévoir l'échange de taille.",
                ],
            },
            {
                heading: "Petits budgets (moins de 25 €) : la bougie ou le thé d'exception",
                paragraphs: [
                    "À petit prix, une belle bougie parfumée en cire végétale (soja ou colza) reste imbattable. Choisissez un parfum doux et consensuel — vanille, fleur d'oranger, bois de santal — plutôt qu'une senteur trop marquée.",
                    "Autre piste : un coffret de thés rares ou une sélection d'infusions. C'est un cadeau qui se déguste dans le temps, parfait pour les longues soirées d'hiver.",
                ],
            },
            {
                heading: "Pour la cocooning : confort et bien-être",
                paragraphs: [
                    "Plaid en maille épaisse, chaussons douillets, coffret de soins relaxants ou diffuseur d'huiles essentielles : tout ce qui évoque le réconfort fonctionne particulièrement bien à Noël.",
                    "Ce type de cadeau dit « prends soin de toi » sans en faire trop — un message qui touche, surtout après une année chargée.",
                ],
            },
            {
                heading: "Pour marquer le coup (plus de 100 €)",
                paragraphs: [
                    "Si vous voulez frapper fort : une montre élégante, un sac en cuir, un bijou de marque ou un appareil tech qu'elle convoite depuis longtemps. Le secret d'un gros cadeau réussi, c'est qu'il réponde à un désir qu'elle a déjà exprimé — pas à ce que vous imaginez qu'elle aimerait.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel budget prévoir pour un cadeau de Noël femme ?",
                a: "Tout dépend du lien : 15 à 30 € pour une collègue ou une amie, 40 à 80 € pour une sœur ou une mère, et au-delà de 100 € pour une compagne si vous le souhaitez. L'attention compte plus que le montant.",
            },
            {
                q: "Comment éviter de me tromper ?",
                a: "Restez dans ce qu'elle aime déjà (sa marque de parfum, son style de bijou) plutôt que de tenter une surprise risquée, et gardez toujours le ticket de caisse pour permettre un échange discret.",
            },
        ],
    },
    {
        slug: "cadeau-noel-homme",
        title: "Cadeau de Noël pour un homme : 18 idées sans cliché",
        metaTitle: "Cadeau de Noël homme : 18 idées qui plaisent | Kado-Box",
        metaDescription: "Idées cadeaux de Noël pour un homme : tech, montre, gastronomie, loisirs. Notre sélection par budget pour ne plus offrir la énième paire de chaussettes.",
        intro: "Chaussettes, cravate, eau de toilette achetée en panique le 24 décembre… On peut faire beaucoup mieux pour le Noël des hommes de votre vie. Voici nos idées testées et classées par budget, pour offrir un cadeau qui sera vraiment utilisé.",
        publishedAt: "2026-06-10",
        readingMinutes: 6,
        occasionSlug: "noel",
        recipientSlug: "homme",
        sections: [
            {
                heading: "La tech utile : le cadeau qui ne déçoit jamais",
                paragraphs: [
                    "Casque audio, enceinte connectée, traceur d'objets, liseuse : la tech reste une valeur sûre pour un homme à Noël, à condition de viser l'usage réel plutôt que le gadget. Un objet qu'il utilisera tous les jours bat toujours le dernier accessoire à la mode.",
                    "Repérez ce qu'il possède déjà pour rester dans son écosystème (Apple, Amazon, Android) et éviter le doublon ou l'incompatibilité.",
                ],
            },
            {
                heading: "Pour l'élégant : montre ou maroquinerie",
                paragraphs: [
                    "Une montre sobre transforme une tenue et accompagne un homme des années durant. Pas besoin du modèle de luxe : une montre au design soigné, dans un budget raisonnable, fait largement l'affaire.",
                    "Côté maroquinerie, un portefeuille en cuir, une ceinture ou une trousse de voyage sont des cadeaux qui durent et qui se remarquent.",
                ],
            },
            {
                heading: "Pour le gourmand : coffret gastronomie",
                paragraphs: [
                    "Coffret de chocolats fins, sélection de cafés d'exception, panier d'épicerie fine : la gourmandise est une valeur sûre à Noël. C'est un cadeau qui se partage et se savoure, idéal quand on connaît mal les goûts de la personne.",
                    "Pour les amateurs de café, une cafetière à piston ou un moulin manuel transforme le rituel du matin en petit plaisir.",
                ],
            },
            {
                heading: "Petits budgets (moins de 25 €)",
                paragraphs: [
                    "Un beau carnet en cuir, un jeu de société pour les soirées, un livre choisi selon ses passions ou un accessoire pour son hobby (cuisine, jardin, musique, sport) : on peut faire un cadeau qui a du sens sans se ruiner.",
                ],
            },
            {
                heading: "Pour le passionné : jouez la carte de son hobby",
                paragraphs: [
                    "Le meilleur cadeau pour un homme, c'est souvent celui qui parle directement de ce qu'il aime : matériel pour le bricoleur, accessoire de cuisine pour le cuisinier du dimanche, équipement pour le sportif. Vous montrez ainsi que vous l'avez vraiment écouté.",
                ],
            },
        ],
        faq: [
            {
                q: "Que offrir à un homme « qui a déjà tout » ?",
                a: "Misez sur le consommable haut de gamme (café, chocolat, épicerie fine) ou sur une expérience plutôt qu'un objet. Ce sont des cadeaux qui ne créent pas de doublon.",
            },
            {
                q: "La tech, n'est-ce pas un cadeau impersonnel ?",
                a: "Pas si vous choisissez en fonction de son usage réel. Une liseuse pour un grand lecteur ou un casque pour un mélomane est tout sauf impersonnel : c'est la preuve que vous connaissez ses habitudes.",
            },
        ],
    },
    {
        slug: "cadeau-meilleure-amie",
        title: "Cadeau pour sa meilleure amie : 20 idées qui touchent",
        metaTitle: "Cadeau meilleure amie : 20 idées qui touchent | Kado-Box",
        metaDescription: "Idées cadeaux pour votre meilleure amie : bijou, beauté, cocooning, cadeau personnalisé. Notre sélection pour lui montrer qu'elle compte.",
        intro: "Pour sa meilleure amie, on veut un cadeau qui dit « je te connais par cœur » — pas le énième bon d'achat impersonnel. Voici nos idées préférées, du clin d'œil complice au cadeau qui marque, selon votre budget et sa personnalité.",
        publishedAt: "2026-06-11",
        readingMinutes: 5,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Le cadeau complice : personnalisé ou plein de sens",
                paragraphs: [
                    "Rien ne touche plus une amie qu'un cadeau qui rappelle votre histoire commune : un bijou gravé, un objet personnalisé, un album de vos souvenirs. La valeur sentimentale prime largement sur le prix.",
                    "Si vous manquez d'idées personnalisées, un bijou délicat reste une valeur sûre : il se porte au quotidien et lui rappellera votre amitié à chaque fois.",
                ],
            },
            {
                heading: "Pour la cocooning : bien-être et détente",
                paragraphs: [
                    "Coffret de soins, bougie parfumée, plaid douillet, thé d'exception : tout ce qui évoque le réconfort fait mouche. C'est le cadeau « prends du temps pour toi » qui touche toujours, surtout pour une amie qui en fait beaucoup pour les autres.",
                ],
            },
            {
                heading: "Pour la coquette : beauté et parfum",
                paragraphs: [
                    "Vous connaissez ses goûts mieux que personne : un coffret maquillage de sa marque préférée, un soin qu'elle adore mais ne s'offre jamais, ou son parfum signature. L'avantage d'être proche, c'est de viser juste.",
                ],
            },
            {
                heading: "Petits budgets : l'attention qui compte",
                paragraphs: [
                    "Une jolie bougie, un mug original, un carnet pour ses listes et ses idées, ou un livre qui lui ressemble : à moins de 20 €, on peut faire un cadeau qui a du cœur. Ajoutez un petit mot manuscrit, c'est ce qu'elle gardera.",
                ],
            },
        ],
        faq: [
            {
                q: "Cadeau personnalisé ou cadeau « utile » ?",
                a: "Pour une meilleure amie, le personnalisé l'emporte presque toujours : c'est la preuve de l'attention. Mais un cadeau utile qu'elle adore (sa marque de soin, son parfum) fonctionne aussi très bien si vous connaissez ses goûts.",
            },
            {
                q: "Combien dépenser pour sa meilleure amie ?",
                a: "Entre 20 et 50 € convient dans la plupart des cas. Au-delà, le geste peut mettre mal à l'aise si elle ne peut pas rendre la pareille : misez plutôt sur l'originalité que sur le montant.",
            },
        ],
    },
    {
        slug: "cadeau-anniversaire-femme-40-ans",
        title: "Cadeau d'anniversaire 40 ans femme : 18 idées d'exception",
        metaTitle: "Cadeau 40 ans femme : 18 idées d'exception | Kado-Box",
        metaDescription: "Les 40 ans d'une femme, ça se fête. Nos idées cadeaux pour marquer le coup : bijou, beauté, expérience, cadeau d'exception.",
        intro: "Les 40 ans, c'est un cap qui se célèbre comme il se doit. Pour cette femme — votre compagne, sœur, mère ou amie — il faut un cadeau à la hauteur de l'occasion. Voici nos idées pour marquer durablement cet anniversaire, du cadeau symbolique à la belle pièce.",
        publishedAt: "2026-06-11",
        readingMinutes: 5,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Le cadeau qui marque : un beau bijou",
                paragraphs: [
                    "Un anniversaire rond appelle un cadeau qui dure. Un bijou — bracelet, collier, bague — traverse les années et se charge de souvenir. C'est l'occasion idéale pour offrir une pièce un peu plus belle que d'habitude.",
                    "Si le budget le permet, une montre élégante coche les mêmes cases : objet précieux, intemporel, porté au quotidien.",
                ],
            },
            {
                heading: "L'expérience plutôt que l'objet",
                paragraphs: [
                    "À 40 ans, beaucoup de femmes ont déjà l'essentiel. Un coffret expérience — soin en institut, week-end, dégustation, activité qu'elle rêve d'essayer — crée un souvenir plutôt qu'un objet de plus. C'est souvent le cadeau dont on se souvient le plus longtemps.",
                ],
            },
            {
                heading: "Beauté et bien-être premium",
                paragraphs: [
                    "Un coffret de soins haut de gamme, un parfum d'exception ou un rituel beauté complet : on monte en gamme par rapport au cadeau habituel. Restez dans ses goûts connus pour ne pas vous tromper sur un produit aussi personnel.",
                ],
            },
            {
                heading: "La touche personnalisée et émotion",
                paragraphs: [
                    "Un bijou gravé d'une date, un objet personnalisé, un album retraçant 40 ans de souvenirs : l'émotion fait toute la différence sur un anniversaire rond. À combiner avec un cadeau plus « matériel » pour un effet complet.",
                ],
            },
        ],
        faq: [
            {
                q: "Faut-il un gros cadeau pour les 40 ans ?",
                a: "Pas forcément un cadeau cher, mais un cadeau qui marque. Un bijou symbolique, une expérience mémorable ou un cadeau très personnel valent mieux qu'un objet onéreux mais sans signification particulière.",
            },
            {
                q: "Quelle idée pour une femme « qui a tout » ?",
                a: "Misez sur l'expérience (week-end, soin, activité) ou sur le personnalisé : ce sont les seuls cadeaux qui échappent au doublon et créent un vrai souvenir.",
            },
        ],
    },
    {
        slug: "cadeau-anniversaire-homme-50-ans",
        title: "Cadeau d'anniversaire 50 ans homme : 18 idées marquantes",
        metaTitle: "Cadeau 50 ans homme : 18 idées qui marquent | Kado-Box",
        metaDescription: "Un homme fête ses 50 ans ? Nos idées cadeaux pour célébrer ce demi-siècle : montre, tech, gastronomie, expérience et cadeaux d'exception.",
        intro: "Cinquante ans, c'est un anniversaire qu'on ne fête qu'une fois — autant viser juste. Pour cet homme qui compte, on a réuni des idées qui marquent le coup sans tomber dans le cliché de la « crise de la cinquantaine ». À chaque budget, son cadeau mémorable.",
        publishedAt: "2026-06-12",
        readingMinutes: 5,
        recipientSlug: "homme",
        sections: [
            {
                heading: "L'intemporel : une belle montre",
                paragraphs: [
                    "Pour un cap aussi symbolique, la montre reste le cadeau de référence. Elle accompagne au quotidien, se transmet, et marque le passage du temps avec élégance. Choisissez un modèle sobre qui colle à son style plutôt qu'une pièce tape-à-l'œil.",
                ],
            },
            {
                heading: "La gastronomie haut de gamme",
                paragraphs: [
                    "Coffret de spécialités fines, sélection de cafés rares, accessoires de cuisine pour le gastronome : à 50 ans, on apprécie le bon plus que le clinquant. Un beau coffret gourmand est une valeur sûre, surtout pour un homme difficile à surprendre.",
                ],
            },
            {
                heading: "La tech qu'il n'oserait pas s'offrir",
                paragraphs: [
                    "Casque audio premium, liseuse, enceinte de qualité, accessoire connecté : la tech fonctionne bien si vous visez un objet qu'il convoite sans se l'autoriser. L'effet « je n'aurais jamais osé l'acheter » fait toute la valeur du cadeau.",
                ],
            },
            {
                heading: "L'expérience pour créer un souvenir",
                paragraphs: [
                    "Plutôt qu'un objet de plus, offrez-lui un moment : une activité qui le sort de son quotidien, un week-end, une dégustation. À cet âge, les souvenirs valent souvent plus que les objets — surtout pour un homme qui a déjà l'essentiel.",
                ],
            },
        ],
        faq: [
            {
                q: "Comment éviter le cadeau « cliché des 50 ans » ?",
                a: "Fuyez tout ce qui blague sur l'âge ou la vieillesse. Misez sur un cadeau valorisant — belle montre, expérience, objet lié à sa passion — qui célèbre l'homme plutôt que de souligner les années.",
            },
            {
                q: "Quel budget pour les 50 ans ?",
                a: "Pour un anniversaire rond, on monte généralement en gamme : 80 à 150 € pour un proche, davantage si plusieurs personnes participent à un cadeau commun comme une montre ou une expérience.",
            },
        ],
    },
    {
        slug: "cadeau-collegue-depart",
        title: "Cadeau de départ d'un collègue : 16 idées qui font plaisir",
        metaTitle: "Cadeau départ collègue : 16 idées sûres | Kado-Box",
        metaDescription: "Pot de départ, retraite, mutation : nos idées cadeaux pour un collègue, faciles à offrir en groupe et qui font toujours plaisir.",
        intro: "Départ à la retraite, changement de poste, fin de contrat : le cadeau de départ d'un collègue est un grand classique de la vie de bureau. L'enjeu : trouver une idée qui plaît sans être trop personnelle, facile à financer en groupe. Voici nos valeurs sûres.",
        publishedAt: "2026-06-12",
        readingMinutes: 5,
        recipientSlug: "femme",
        sections: [
            {
                heading: "La valeur sûre : un coffret gourmand",
                paragraphs: [
                    "Coffret de chocolats, sélection de cafés ou thés, panier d'épicerie fine : le cadeau gourmand est parfait pour un collègue dont on connaît mal les goûts personnels. Il se partage, se savoure, et ne risque pas de tomber à côté.",
                    "Avantage pratique : c'est facile à financer à plusieurs et à présenter joliment lors du pot de départ.",
                ],
            },
            {
                heading: "Pour un départ à la retraite : le cadeau « temps libre »",
                paragraphs: [
                    "C'est le moment d'offrir ce qui accompagnera ses nouveaux loisirs : matériel de jardinage, accessoire de cuisine, beau livre, équipement pour son futur hobby. Le cadeau qui dit « profite enfin » a toujours du succès.",
                    "Une expérience (week-end, activité, dégustation) marque aussi joliment cette nouvelle étape de vie.",
                ],
            },
            {
                heading: "Le cadeau collectif qui marque",
                paragraphs: [
                    "Quand toute l'équipe participe, on peut viser plus haut : une belle montre, un bagage de qualité, un objet déco ou tech. Désignez une personne pour centraliser la cagnotte et choisir, afin d'éviter le cadeau « comité » sans cohérence.",
                ],
            },
            {
                heading: "À éviter pour un collègue",
                paragraphs: [
                    "Restez sur du neutre : pas de parfum (trop personnel), pas de vêtement (question de taille et de goût), pas d'humour qui pourrait mal passer. Un cadeau consensuel et soigné vaut mieux qu'une idée originale risquée dans un cadre professionnel.",
                ],
            },
        ],
        faq: [
            {
                q: "Combien donner pour un cadeau de départ collectif ?",
                a: "En général 5 à 15 € par personne selon la proximité et la taille de l'équipe. L'organisateur fixe une fourchette pour que chacun participe à l'aise, sans pression.",
            },
            {
                q: "Faut-il une carte avec le cadeau ?",
                a: "Oui, c'est même souvent ce qui touche le plus : une carte signée par toute l'équipe, avec quelques mots de chacun, accompagne idéalement le cadeau et devient un souvenir à part entière.",
            },
        ],
    },
    {
        slug: "cadeau-femme-qui-a-tout",
        title: "Quoi offrir à une femme qui a déjà tout : 16 idées malignes",
        metaTitle: "Cadeau femme qui a tout : 16 idées malignes | Kado-Box",
        metaDescription: "Elle a déjà tout ? Nos idées cadeaux pour surprendre une femme difficile : expérience, personnalisé, consommable premium, plaisir rare.",
        intro: "Il y a les cadeaux faciles, et il y a la femme « qui a déjà tout ». Pas de panique : quand l'objet ne suffit plus, on change d'angle. Voici nos idées pour surprendre celle qui semble n'avoir besoin de rien — l'émotion, l'expérience et le plaisir rare prennent le relais.",
        publishedAt: "2026-06-13",
        readingMinutes: 5,
        recipientSlug: "femme",
        sections: [
            {
                heading: "Misez sur l'expérience, pas l'objet",
                paragraphs: [
                    "Quand on a déjà tout, ce qui manque, c'est du temps et des moments. Un soin en institut, un atelier, une dégustation, un week-end : l'expérience crée un souvenir au lieu d'ajouter un objet à une étagère déjà pleine.",
                ],
            },
            {
                heading: "Le consommable premium qu'elle ne s'offre jamais",
                paragraphs: [
                    "Une femme qui a tout possède l'essentiel, mais s'offre rarement le superflu de qualité : un thé rare, un soin haut de gamme, une bougie de créateur, un chocolat d'exception. Ces petits luxes qu'on n'achète pas pour soi font des cadeaux parfaits.",
                ],
            },
            {
                heading: "Le personnalisé : impossible à avoir en double",
                paragraphs: [
                    "Un bijou gravé, un objet à son prénom, un cadeau qui rappelle un souvenir commun : par définition, le personnalisé est unique. C'est l'arme imparable contre le « elle l'a déjà ».",
                ],
            },
            {
                heading: "Surprenez avec un domaine inexploré",
                paragraphs: [
                    "Et si vous l'emmeniez vers quelque chose qu'elle n'a jamais essayé ? Un loisir créatif, un accessoire pour une activité qu'elle évoque sans jamais franchir le pas. Vous offrez une porte d'entrée vers une nouvelle passion — le plus beau des cadeaux.",
                ],
            },
        ],
        faq: [
            {
                q: "Quel est le cadeau le plus sûr pour quelqu'un de difficile ?",
                a: "L'expérience et le consommable premium. Impossible de faire doublon avec un week-end ou un thé rare, contrairement à un objet du quotidien qu'elle possède probablement déjà.",
            },
            {
                q: "Comment trouver une idée si elle ne demande rien ?",
                a: "Écoutez ses « j'aimerais bien un jour… » lâchés en passant, observez ses petits plaisirs, ou demandez discrètement à un proche. Le bon cadeau est souvent un désir qu'elle a exprimé sans y prêter attention.",
            },
        ],
    },
    {
        slug: "cadeau-homme-qui-a-tout",
        title: "Quoi offrir à un homme qui a déjà tout : 16 idées futées",
        metaTitle: "Cadeau homme qui a tout : 16 idées futées | Kado-Box",
        metaDescription: "Impossible à surprendre ? Nos idées cadeaux pour un homme qui a déjà tout : expérience, gastronomie premium, gadget malin, personnalisé.",
        intro: "Le casse-tête classique : un homme qui s'achète tout ce qu'il veut, quand il le veut. Pour le surprendre, on abandonne l'objet « utile » au profit du plaisir, de l'expérience et du détail malin. Voici nos meilleures idées pour celui qui « n'a besoin de rien ».",
        publishedAt: "2026-06-13",
        readingMinutes: 5,
        recipientSlug: "homme",
        sections: [
            {
                heading: "L'expérience qui sort du quotidien",
                paragraphs: [
                    "Pilotage, dégustation, activité sportive ou sensation forte : un homme qui a tout n'a souvent pas pris le temps de vivre certaines expériences. Offrez-lui le moment plutôt que l'objet, c'est ce dont il se souviendra.",
                ],
            },
            {
                heading: "La gastronomie d'exception",
                paragraphs: [
                    "Café rare, coffret de spécialités fines, accessoire pour le cuisinier amateur : le bon goût se savoure même quand on a déjà tout. C'est le consommable haut de gamme qu'on ne s'offre pas soi-même qui fait mouche.",
                ],
            },
            {
                heading: "Le gadget malin qu'il n'a pas vu venir",
                paragraphs: [
                    "Même un homme suréquipé peut être surpris par un objet astucieux : un accessoire connecté bien pensé, un outil ingénieux pour son hobby, un gadget qui résout un petit tracas du quotidien. La surprise vaut autant que l'objet.",
                ],
            },
            {
                heading: "Le personnalisé : la carte de l'émotion",
                paragraphs: [
                    "Un objet gravé, un cadeau qui rappelle un souvenir partagé, une pièce unique à son image : impossible d'avoir ça en double. Pour un homme qui a tout, c'est souvent le geste le plus touchant et le plus inattendu.",
                ],
            },
        ],
        faq: [
            {
                q: "Quelle idée quand il s'achète tout lui-même ?",
                a: "Visez ce qu'il ne s'offre jamais : une expérience marquante ou un consommable premium (café, gastronomie). Ce sont les cadeaux qui échappent au réflexe « je l'ai déjà » et créent la surprise.",
            },
            {
                q: "Un gadget, n'est-ce pas trop risqué ?",
                a: "Pas si vous restez dans l'un de ses centres d'intérêt. Un accessoire malin pour une passion qu'il pratique déjà a toutes les chances de plaire — c'est le gadget hors sujet qu'il faut éviter.",
            },
        ],
    },
    {
        slug: "cadeau-ado-fille-15-ans",
        title: "Cadeau pour une ado de 15 ans : 18 idées qui plaisent vraiment",
        metaTitle: "Cadeau ado fille 15 ans : 18 idées sûres | Kado-Box",
        metaDescription: "Que offrir à une adolescente de 15 ans ? Tech, beauté, déco, accessoires tendance : nos idées cadeaux validées par les ados, par budget.",
        intro: "Offrir à une ado de 15 ans, c'est marcher sur un fil : ni trop « bébé », ni à côté des tendances du moment. Bonne nouvelle, certaines valeurs sûres font toujours mouche. Voici nos idées pour viser juste, classées par budget et par centre d'intérêt.",
        publishedAt: "2026-06-14",
        readingMinutes: 5,
        recipientSlug: "ado",
        sections: [
            {
                heading: "La tech : valeur sûre absolue",
                paragraphs: [
                    "Écouteurs, enceinte bluetooth, accessoires pour smartphone, liseuse pour les lectrices : la tech est presque toujours un succès à cet âge. Visez l'usage qu'elle en aura vraiment plutôt que le modèle le plus cher.",
                    "Renseignez-vous discrètement sur ce qu'elle possède déjà pour éviter le doublon et rester compatible avec son téléphone.",
                ],
            },
            {
                heading: "Beauté et soin : la découverte en douceur",
                paragraphs: [
                    "À 15 ans, l'univers beauté attire : coffret de soins doux, palette de maquillage festive, kit de cosmétiques pour débuter. Privilégiez des produits adaptés à une peau jeune et des marques qu'elle connaît via ses réseaux.",
                ],
            },
            {
                heading: "Déco et personnalisation de sa chambre",
                paragraphs: [
                    "La chambre, c'est son territoire. Guirlande lumineuse, coussin original, déco murale, objet à personnaliser : tout ce qui rend son espace plus « à elle » a beaucoup de succès à cet âge.",
                ],
            },
            {
                heading: "Petits budgets et carte cadeau",
                paragraphs: [
                    "Un accessoire tendance, un carnet créatif, un livre de sa saga préférée : on trouve de belles idées à moins de 20 €. Et en cas de doute total, la carte cadeau reste une option respectée par les ados — elle choisit, vous ne vous trompez pas.",
                ],
            },
        ],
        faq: [
            {
                q: "La carte cadeau, est-ce un cadeau « paresseux » ?",
                a: "Pas pour une ado : à cet âge, choisir soi-même fait partie du plaisir. Une carte cadeau accompagnée d'un petit présent symbolique est souvent la combinaison gagnante.",
            },
            {
                q: "Comment connaître ses goûts du moment ?",
                a: "Les tendances vont vite à 15 ans. Le plus simple : jeter un œil à ce qu'elle suit sur les réseaux, ou demander à un frère, une sœur ou une amie proche pour viser la bonne marque.",
            },
        ],
    },
    {
        slug: "cadeau-fiancailles",
        title: "Cadeau de fiançailles : 16 idées pour féliciter le couple",
        metaTitle: "Cadeau de fiançailles : 16 idées pour le couple | Kado-Box",
        metaDescription: "Des fiançailles à célébrer ? Nos idées cadeaux pour le couple : objet déco, expérience à deux, gastronomie, cadeau personnalisé.",
        intro: "Entre la demande et le mariage, les fiançailles méritent leur propre célébration — et donc leur cadeau. L'idée : féliciter le couple et marquer cette étape, sans empiéter sur la future liste de mariage. Voici nos suggestions pour faire plaisir aux deux.",
        publishedAt: "2026-06-14",
        readingMinutes: 5,
        recipientSlug: "couple",
        sections: [
            {
                heading: "L'expérience à deux : le cadeau qui crée un souvenir",
                paragraphs: [
                    "Un dîner, un week-end, une activité à partager : pour des fiancés, le plus beau cadeau est souvent un moment à vivre ensemble. Ça change de l'objet et ça colle parfaitement à l'esprit de cette étape qui célèbre leur couple.",
                ],
            },
            {
                heading: "Pour leur futur foyer",
                paragraphs: [
                    "Bel objet déco, accessoire de cuisine de qualité, machine à café : un cadeau pour leur intérieur accompagne leur projet de vie commune. Attention toutefois à ne pas anticiper la liste de mariage — visez l'objet plaisir plutôt que l'électroménager utilitaire.",
                ],
            },
            {
                heading: "Le gourmand à partager",
                paragraphs: [
                    "Coffret de spécialités fines, sélection de chocolats, panier gourmand à déguster en amoureux : c'est un cadeau consensuel, facile à offrir même quand on connaît mal leurs goûts déco, et qui se savoure à deux.",
                ],
            },
            {
                heading: "Le personnalisé pour l'émotion",
                paragraphs: [
                    "Objet gravé à leurs initiales et à la date des fiançailles, cadre photo, présent unique à leur image : la touche personnalisée transforme un joli cadeau en souvenir qu'ils garderont. Parfait pour des proches qui veulent marquer le coup.",
                ],
            },
        ],
        faq: [
            {
                q: "Faut-il offrir un cadeau pour des fiançailles ?",
                a: "Ce n'est pas obligatoire, mais c'est un geste apprécié, surtout pour les proches. Un cadeau plus modeste qu'au mariage suffit : l'idée est de féliciter le couple, pas de rivaliser avec la liste de mariage.",
            },
            {
                q: "Quel budget pour un cadeau de fiançailles ?",
                a: "Comptez généralement 30 à 60 € pour un proche, moins pour une simple connaissance. On garde une marge pour le cadeau de mariage, qui reste le moment fort des célébrations.",
            },
        ],
    },
];

export function getGuideBySlug(slug: string): Guide | undefined {
    return GUIDES.find((g) => g.slug === slug);
}
