export interface EditorialSection {
  heading: string;
  paragraphs: string[];
}

export interface Editorial {
  intro: string;
  sections: EditorialSection[];
  faq: Array<{ q: string; a: string }>;
}

export const BUDGET_EDITORIAL: Record<string, Editorial> = {
  "moins-de-20-euros": {
    intro: "Un budget serré ne veut pas dire un cadeau au rabais. Sous la barre des 20 €, le secret tient en un mot : la précision. Mieux vaut un petit objet parfaitement choisi, qui colle vraiment à la personne, qu'un cadeau plus gros mais générique. On vise ici le plaisir immédiat et l'utile : une belle bougie parfumée, un mug qui deviendra le préféré du matin, un carnet de qualité, un thé rare ou une petite douceur gourmande. L'idée est de faire sourire, pas d'impressionner. Le piège classique dans cette fourchette, c'est le gadget qui finit au fond d'un tiroir : le porte-clés amusant deux minutes, l'accessoire high-tech bas de gamme qui tombe en panne. Fuyez tout ce qui semble jetable. Concentrez-vous plutôt sur une matière agréable, une jolie couleur, un parfum qu'on aime. Pensez aussi aux petits plaisirs consommables (chocolat, savon artisanal, épices) : ils font toujours mouche parce qu'ils ne demandent pas de place et ne créent pas d'obligation. Enfin, à petit prix, la présentation change tout : un joli papier, un ruban, une carte manuscrite transforment un objet à 12,90 € en attention qui touche. Prenez le temps de bien emballer, c'est souvent ce dont on se souvient le plus.",
    sections: [
      {
        heading: "Les valeurs sûres à moins de 20 €",
        paragraphs: [
          "Certaines catégories fonctionnent presque à tous les coups dans cette gamme. Les objets du quotidien montés en gamme d'abord : un mug en céramique bien épais, une gourde isotherme, des chaussettes chaudes et douces, un carnet à la couverture soignée. Ce sont des cadeaux qu'on utilise vraiment, et l'usage répété crée l'attachement.",
          "Viennent ensuite les plaisirs sensoriels : une bougie parfumée, un savon artisanal, un coffret de thés ou d'infusions, une petite boîte de chocolats de qualité. Ces cadeaux ont l'avantage de ne jamais encombrer et de convenir à presque tout le monde, même quand on connaît peu les goûts précis de la personne.",
        ],
      },
      {
        heading: "Éviter le piège du gadget",
        paragraphs: [
          "Le réflexe, quand le budget est petit, c'est de chercher l'objet rigolo. Le problème : l'effet de surprise dure une soirée, puis l'objet devient encombrant. Avant d'acheter, posez-vous une question simple : est-ce que je verrais bien cette personne s'en servir dans un mois ? Si la réponse est non, passez votre chemin. Un cadeau utile ou joli battra toujours un cadeau drôle.",
        ],
      },
      {
        heading: "Soigner l'emballage pour valoriser le cadeau",
        paragraphs: [
          "À petit prix, la présentation fait une vraie différence. Un papier kraft avec un brin de verdure, une ficelle de couleur, une étiquette écrite à la main : l'ensemble donne instantanément un air soigné et pensé.",
          "N'hésitez pas non plus à regrouper deux ou trois petites choses cohérentes dans un même paquet (par exemple un thé, un mug et un biscuit). Cette mini-composition à moins de 20 € au total paraît beaucoup plus généreuse qu'un objet seul, tout en restant dans votre budget.",
        ],
      },
    ],
    faq: [
      {
        q: "Quel budget moyen prévoir pour un cadeau à petit prix ?",
        a: "Comptez entre 10 et 20 € pour un cadeau qui reste soigné sans se ruiner. En dessous de 10 €, privilégiez un consommable de qualité (chocolat, savon, thé) plutôt qu'un objet, qui risquerait de faire bon marché. La bonne fourchette pour faire vraiment plaisir se situe souvent autour de 15 €.",
      },
      {
        q: "Comment faire plaisir sans dépenser beaucoup ?",
        a: "Misez sur la justesse plutôt que sur le prix. Un objet qui correspond précisément à un goût ou à une habitude de la personne aura toujours plus de valeur qu'un cadeau plus cher mais générique. Une jolie présentation et un mot manuscrit ajoutent une touche personnelle qui ne coûte rien et qui compte énormément.",
      },
      {
        q: "Un cadeau à moins de 20 € fait-il vraiment plaisir ?",
        a: "Oui, à condition qu'il soit bien pensé. Ce n'est pas le montant qui touche, mais l'attention. Une bougie qu'on aime, un thé qu'on savoure ou un carnet agréable à utiliser marquent souvent plus qu'un cadeau coûteux choisi sans réflexion. L'essentiel est de montrer qu'on a pensé à la personne.",
      },
    ],
  },
  "20-50-euros": {
    intro: "C'est sans doute la fourchette la plus confortable pour offrir : assez large pour proposer un vrai cadeau, assez raisonnable pour ne pas se mettre en difficulté. Entre 20 et 50 €, vous quittez le registre de la petite attention pour entrer dans celui du cadeau qui a de la présence. On peut y viser un joli coffret, un accessoire de qualité, un objet du quotidien nettement monté en gamme ou une expérience à partager. L'enjeu ici, c'est de bien répartir la valeur : mieux vaut un seul bel objet cohérent qu'une accumulation de petites choses qui donnent l'impression d'un budget dispersé. Pensez matières durables, finitions soignées, marques dont la qualité se voit et se sent. C'est aussi la gamme idéale pour la personnalisation : gravure, coloris choisi, coffret thématique construit autour d'une passion. Le piège à éviter, c'est le cadeau qui fait illusion en rayon mais déçoit à l'usage : le gros coffret rempli d'échantillons minuscules, l'appareil bon marché déguisé en produit premium. Prenez le temps de regarder ce qu'il y a vraiment dans la boîte. Dans cette fourchette, on attend un cadeau qui dure et qui se garde, alors privilégiez toujours le solide et l'authentique au tape-à-l'œil.",
    sections: [
      {
        heading: "Les idées phares entre 20 et 50 €",
        paragraphs: [
          "Cette gamme ouvre de belles possibilités. Côté objets, on trouve de vrais accessoires de qualité : un beau portefeuille en cuir, une écharpe douce, une trousse de toilette bien conçue, un accessoire de cuisine qui durera des années. Ce sont des cadeaux qui accompagnent longtemps et qui reflètent un vrai choix.",
          "Les coffrets thématiques fonctionnent aussi très bien ici : une sélection de soins autour d'un rituel, un assortiment de spécialités gourmandes, un ensemble pour amateur de café ou de thé. À condition qu'il soit bien garni, le coffret combine l'effet volume et le plaisir de la découverte.",
        ],
      },
      {
        heading: "Personnaliser pour marquer les esprits",
        paragraphs: [
          "C'est le budget parfait pour aller au-delà du cadeau standard. Une gravure d'initiales, un coloris choisi selon les goûts, un coffret assemblé autour d'une passion précise transforment un objet correct en cadeau qui semble fait pour la personne. Cette attention supplémentaire ne coûte souvent que quelques euros mais change complètement la perception. Renseignez-vous simplement sur les délais, car la personnalisation demande parfois quelques jours de plus.",
        ],
      },
      {
        heading: "Repérer les faux bons cadeaux",
        paragraphs: [
          "Dans cette tranche de prix, certains produits misent sur l'apparence plus que sur le contenu. Un coffret impressionnant peut cacher des formats minuscules, un objet au look premium peut être fabriqué à l'économie.",
          "Le bon réflexe : vérifier ce que l'on paie réellement. Une seule pièce de belle qualité vaut mieux qu'un lot de dix éléments anecdotiques. Fiez-vous à la matière, à la finition et à la marque plutôt qu'à la taille de la boîte ou au nombre d'articles annoncés.",
        ],
      },
    ],
    faq: [
      {
        q: "Le budget de 20 à 50 € convient-il pour quelle occasion ?",
        a: "C'est la fourchette la plus polyvalente : anniversaire, remerciement, invitation à dîner, fête des mères ou des pères, petit événement entre amis. Autour de 30 à 40 €, vous offrez un cadeau qui a de la tenue sans que cela paraisse démesuré, ce qui la rend idéale quand on veut faire plaisir sans en faire trop.",
      },
      {
        q: "Comment obtenir le meilleur rapport qualité-prix ?",
        a: "Concentrez le budget sur un seul bel objet plutôt que de le disperser. Privilégiez les matières durables et les marques dont la qualité se voit à l'usage. Un accessoire en cuir, un ustensile solide ou un soin de bonne composition à 40 € rendra plus service qu'un assortiment de petites choses vite oubliées.",
      },
      {
        q: "Faut-il prévoir un délai de livraison particulier ?",
        a: "Pour un cadeau standard, comptez les délais habituels de quelques jours. En revanche, si vous optez pour une gravure ou une personnalisation, prévoyez une marge supplémentaire, souvent de trois à sept jours. Commandez au moins une semaine avant la date pour éviter tout stress de dernière minute.",
      },
    ],
  },
  "50-100-euros": {
    intro: "À partir de 50 €, on entre dans le cadeau qui marque le coup. Ce n'est plus une attention parmi d'autres : c'est un présent qu'on choisit pour une occasion qui compte, un anniversaire important, un grand merci, un événement à célébrer. Le mot d'ordre devient la qualité perçue et réelle. Dans cette fourchette, on peut viser une belle pièce d'une marque reconnue, un objet technique fiable, un coffret généreux ou une expérience mémorable. Le destinataire attend, consciemment ou non, un cadeau soigné, alors chaque détail compte : la marque, la finition, l'emballage, la cohérence avec ses goûts. Le principal piège ici, c'est de payer surtout un nom ou un packaging spectaculaire au détriment du contenu. Un budget de 50 à 100 € mérite un produit qui tient ses promesses à l'usage, pas seulement en vitrine. Renseignez-vous, lisez ce que valent vraiment les produits, comparez les caractéristiques. C'est aussi une gamme où l'on peut se permettre de viser juste et grand à la fois : un objet dont la personne rêve mais qu'elle ne s'offrirait pas elle-même. C'est souvent là que se cache le cadeau parfait. Enfin, à ce niveau de prix, une présentation soignée et un mot personnel restent indispensables pour donner toute sa valeur au geste.",
    sections: [
      {
        heading: "Les cadeaux qui font vraiment plaisir",
        paragraphs: [
          "Entre 50 et 100 €, on peut offrir des pièces qui font envie : un sac ou un accessoire en cuir de belle facture, un objet de décoration signé, un appareil de cuisine performant, un coffret de soins d'une gamme haut de gamme. Ce sont des cadeaux qu'on garde et qu'on montre, avec la satisfaction d'avoir reçu quelque chose de qualité.",
          "Les expériences ont aussi toute leur place dans cette fourchette : un atelier, un repas, une activité à deux. Elles offrent un souvenir plutôt qu'un objet, et conviennent particulièrement à ceux qui ont déjà tout ou qui privilégient le vécu au matériel.",
        ],
      },
      {
        heading: "Payer pour la qualité, pas pour l'étiquette",
        paragraphs: [
          "À ce niveau de budget, la tentation est de se laisser guider par le prestige d'une marque ou par un emballage impressionnant. Mais un logo réputé ne garantit pas toujours le meilleur produit à ce prix. Comparez ce que contient réellement le cadeau, regardez les caractéristiques concrètes et la durabilité. Un objet un peu moins clinquant mais irréprochable à l'usage sera un bien meilleur choix qu'un produit choisi uniquement pour son nom.",
        ],
      },
      {
        heading: "Offrir ce dont la personne n'oserait pas s'offrir",
        paragraphs: [
          "La force de cette fourchette, c'est de pouvoir combler une petite envie que la personne repousse toujours pour elle-même. Ce parfum qu'elle adore mais trouve trop cher, ce bel outil dont il rêve, cet accessoire qu'elle regarde sans franchir le pas.",
          "Écoutez les indices glissés au fil des conversations, ou demandez discrètement à un proche. Viser précisément ce désir non assouvi transforme un cadeau coûteux en cadeau inoubliable, parce qu'il touche exactement là où il fallait.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment justifier un budget de 50 à 100 € ?",
        a: "Ce montant se réserve aux occasions marquantes : un anniversaire rond, un grand remerciement, un cadeau commun à plusieurs. À ce prix, on n'offre pas une simple attention mais un cadeau qui restera. Le justifier, c'est surtout choisir un produit de vraie qualité, dont l'usage et la durabilité confirmeront que la dépense en valait la peine.",
      },
      {
        q: "Vaut-il mieux un objet ou une expérience à ce prix ?",
        a: "Les deux fonctionnent, tout dépend de la personne. Un objet durable convient à ceux qui aiment garder un souvenir concret ; une expérience (atelier, repas, activité) ravira ceux qui préfèrent vivre les choses plutôt qu'accumuler. Si la personne semble déjà tout avoir, l'expérience est souvent le choix le plus juste.",
      },
      {
        q: "Comment être sûr de ne pas se tromper avec un budget élevé ?",
        a: "Renseignez-vous avant d'acheter : caractéristiques concrètes, qualité réelle, avis fiables sur la tenue dans le temps. Fiez-vous aux goûts déjà exprimés par la personne plutôt qu'à une intuition. En cas de doute, un cadeau qui correspond précisément à une envie connue prend toujours moins de risques qu'un pari sur une nouveauté.",
      },
    ],
  },
  "plus-de-100-euros": {
    intro: "Au-delà de 100 €, on entre dans le cadeau d'exception, celui des grandes occasions et des liens qui comptent vraiment. Ce n'est plus un achat qu'on fait sur un coup de tête : c'est un geste réfléchi, souvent chargé d'émotion. À ce niveau, l'exigence est totale. On attend un produit irréprochable, une marque en qui on a confiance, un objet fait pour durer des années, parfois toute une vie. C'est le budget des beaux bijoux, du maroquinier, de l'électroménager haut de gamme, du grand coffret d'expérience, du cadeau qui se transmet. La règle d'or : viser la justesse absolue. Plus la somme est importante, plus le cadeau doit correspondre précisément à la personne, car une erreur se ressent davantage. Le piège serait de choisir le plus cher ou le plus voyant simplement pour impressionner ; l'authenticité et l'utilité réelle priment toujours sur l'esbroufe. Prenez le temps de vous renseigner sérieusement, de vérifier la qualité et le service après-vente, et n'hésitez pas à privilégier un intemporel plutôt qu'une tendance passagère. Un cadeau de cette valeur mérite aussi une remise à la hauteur : un bel écrin, un moment choisi, un mot sincère. Car à ce prix, ce n'est pas la dépense qui touche, mais l'attention profonde qu'elle traduit.",
    sections: [
      {
        heading: "Les cadeaux d'exception qui durent",
        paragraphs: [
          "Au-dessus de 100 €, on privilégie les valeurs sûres et intemporelles : un bijou en or ou en argent, un sac ou une pièce de maroquinerie de belle facture, une montre élégante, un appareil haut de gamme qui rendra service pendant des années. Ce sont des cadeaux qui traversent le temps et se gardent précieusement.",
          "L'idée n'est pas d'acheter la nouveauté du moment, mais un objet dont la qualité et le style ne se démoderont pas. Un intemporel bien choisi devient parfois un objet auquel on tient toute sa vie, voire qui se transmet.",
        ],
      },
      {
        heading: "La justesse avant la démesure",
        paragraphs: [
          "Avec un gros budget, la tentation d'en mettre plein la vue est forte. Pourtant, le plus impressionnant n'est pas toujours le plus juste. Un cadeau d'exception réussi est celui qui touche parce qu'il correspond profondément à la personne, pas celui qui affiche le prix le plus élevé. Écoutez ses goûts réels, ses envies évoquées, son mode de vie. Mieux vaut un bel objet parfaitement adapté qu'un produit prestigieux mais à côté de la plaque, qui restera au placard.",
        ],
      },
      {
        heading: "Sécuriser un achat important",
        paragraphs: [
          "Sur un cadeau à plusieurs centaines d'euros, la prudence est de mise. Vérifiez la fiabilité du vendeur, la garantie, les conditions de retour et le service après-vente. Pour un bijou ou un objet de valeur, assurez-vous de l'authenticité et de la qualité réelle.",
          "Pensez aussi au délai : les produits haut de gamme ou personnalisés demandent parfois plus de temps de préparation et d'expédition. Commandez avec une bonne avance pour recevoir le cadeau dans les meilleures conditions, sans stress ni mauvaise surprise.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment justifier un cadeau de plus de 100 € ?",
        a: "Ce budget se réserve aux grandes occasions et aux personnes qui comptent vraiment : un anniversaire majeur, un événement de vie, un cadeau commun entre plusieurs proches. Il se justifie par le caractère durable et exceptionnel du présent : à ce prix, on offre un objet qui restera et qui a une vraie valeur affective autant que matérielle.",
      },
      {
        q: "Comment éviter de se tromper sur un achat aussi important ?",
        a: "Renseignez-vous soigneusement avant de vous décider : qualité, authenticité, garantie et service après-vente. Appuyez-vous sur les goûts clairement exprimés par la personne plutôt que sur une supposition. En cas d'hésitation, un classique intemporel prend moins de risques qu'une pièce très marquée par une mode ou un style particulier.",
      },
      {
        q: "Quel délai de livraison prévoir pour un cadeau d'exception ?",
        a: "Les produits haut de gamme, personnalisés ou artisanaux demandent souvent plus de temps que les articles courants, parfois une à deux semaines. Pour un bijou gravé ou une pièce sur commande, le délai peut être plus long encore. Anticipez largement, idéalement deux semaines avant la date, pour recevoir le cadeau sereinement et vérifier qu'il est parfait.",
      },
    ],
  },
};

export const OCCASION_EDITORIAL: Record<string, Editorial> = {
  "fete-des-meres": {
    intro: "La fête des mères, c'est l'occasion de dire merci autrement qu'avec un simple mot. En France, elle tombe le dimanche 7 juin 2026, ce qui laisse le temps de bien s'y prendre. Le meilleur cadeau n'est pas forcément le plus cher : c'est celui qui montre que vous avez pensé à ce qu'elle aime vraiment. Une maman jardinière, une gourmande, une lectrice, une passionnée de cosmétiques : chaque profil appelle une idée différente. Côté budget, on trouve de très jolies attentions autour de 20,00 € à 30,00 €, un cadeau confortable entre 40,00 € et 70,00 €, et une belle pièce au-delà de 80,00 € si vous voulez marquer le coup. Le piège classique, c'est le cadeau « fonctionnel » qui ressemble à une corvée déguisée : évitez l'électroménager utilitaire ou le énième objet de cuisine, sauf s'il est vraiment désiré. Fuyez aussi les bouquets achetés à la dernière minute qui fanent en trois jours. Le petit plus qui change tout : un mot manuscrit, même court. Prenez cinq minutes pour écrire pourquoi vous l'aimez, ce détail rend n'importe quel cadeau inoubliable. Et si vous hésitez, misez sur une expérience à vivre ensemble plutôt qu'un objet de plus.",
    sections: [
      {
        heading: "Les valeurs sûres",
        paragraphs: [
          "Certains cadeaux plaisent presque à coup sûr : un coffret de soins d'une marque qu'elle apprécie, une belle bougie parfumée, un bijou discret ou un accessoire de qualité comme un foulard ou une petite maroquinerie. L'idée est de choisir un objet qu'elle utilisera au quotidien et qui lui rappellera votre attention.",
          "Pour ne pas se tromper, partez de ses habitudes. Si elle prend soin de sa peau, un soin visage bien choisi vaut mieux qu'un parfum au hasard. Si elle adore le thé ou le café, un joli coffret de dégustation autour de 25,00 € à 35,00 € fait toujours mouche. On reste sur du concret, du sensoriel, du réutilisable.",
        ],
      },
      {
        heading: "Les idées qui sortent du lot",
        paragraphs: [
          "Pour surprendre, pensez expérience plutôt qu'objet : un atelier créatif, un soin en institut, un brunch ou une place de spectacle. Vous pouvez aussi personnaliser un cadeau simple, comme un tote bag, un mug ou un album photo, avec une image ou une phrase qui a du sens pour vous deux. Le côté sur-mesure touche toujours plus que le prix affiché.",
        ],
      },
      {
        heading: "Le petit budget qui fait plaisir",
        paragraphs: [
          "Sous les 20,00 €, on peut faire très fort à condition de soigner l'intention. Une jolie plante d'intérieur facile à entretenir, un carnet raffiné, un savon artisanal ou un livre bien choisi sur un sujet qu'elle aime feront un cadeau sincère et durable.",
          "Le secret d'un petit budget réussi, c'est la présentation. Un emballage soigné, un ruban, une étiquette écrite à la main transforment un cadeau modeste en attention précieuse. Ce n'est pas le montant qui compte, c'est le soin que vous y mettez.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget prévoir pour la fête des mères ?", a: "La plupart des gens dépensent entre 25,00 € et 60,00 €. Une attention sincère autour de 20,00 € à 30,00 € suffit largement ; réservez les budgets au-delà de 80,00 € pour un bijou ou une pièce que vous savez qu'elle désire vraiment." },
      { q: "Quand commander pour être livré à temps le 7 juin 2026 ?", a: "Comptez une marge de sécurité : commandez idéalement une semaine à dix jours avant, soit avant le 28 mai 2026. Pour un cadeau personnalisé ou gravé, prévoyez encore plus tôt, car la fabrication ajoute souvent quelques jours." },
      { q: "Quelle idée quand ma mère dit qu'elle ne veut rien ?", a: "Optez pour du consommable ou une expérience : des fleurs, un bon soin, un repas partagé, une sortie tous les deux. Elle n'aura pas l'impression d'accumuler un objet, et le moment passé ensemble reste le cadeau qui compte le plus." },
    ],
  },
  "fete-des-peres": {
    intro: "La fête des pères tombe le dimanche 21 juin 2026, deux semaines après celle des mères. C'est le moment idéal pour gâter un papa qui, souvent, dit ne rien vouloir. Le bon réflexe : partir de ses passions plutôt que d'un cadeau générique. Bricoleur, cuisinier, sportif, amateur de belles montres, fan de high-tech ou de grands crus sans alcool : chaque univers a ses pépites. Côté budget, une attention sympathique se situe entre 20,00 € et 35,00 €, un cadeau confortable entre 40,00 € et 80,00 €, et une belle pièce au-delà de 90,00 € pour les grandes occasions. Le piège le plus courant, c'est le cadeau cliché déjà reçu dix fois : la cravate, le énième gadget, la mousse à raser dont il ne se servira pas. Mieux vaut un objet utile et durable qu'un accessoire posé sur une étagère. Autre écueil : attendre le dernier moment et se rabattre sur ce qui reste. Anticipez d'une semaine pour avoir le choix. Enfin, n'oubliez pas le mot qui accompagne : un papa est souvent plus touché par une phrase sincère que par l'objet lui-même. Un souvenir partagé, une petite reconnaissance écrite, et le cadeau prend une tout autre dimension.",
    sections: [
      {
        heading: "Les valeurs sûres",
        paragraphs: [
          "Un bon cadeau pour un papa, c'est souvent un objet qu'il utilisera vraiment : un outil de qualité pour le bricoleur, un accessoire de cuisine pour le gourmet, une belle gourde ou un sac pour le sportif. On mise sur la robustesse et le côté « il va s'en servir des années ».",
          "Si vous connaissez sa marque préférée, foncez : un accessoire de la bonne enseigne fait toujours plaisir. À défaut, un coffret dégustation de café, un beau porte-cartes en cuir autour de 30,00 € à 50,00 € ou un livre sur sa passion sont des choix sûrs qui se trompent rarement.",
        ],
      },
      {
        heading: "Les idées originales",
        paragraphs: [
          "Pour sortir des sentiers battus, pensez expérience : un stage de conduite, une session de sport insolite, un atelier cuisine ou une dégustation. Vous pouvez aussi personnaliser un objet du quotidien, comme un mug, un tablier ou une plaque gravée, avec un clin d'œil qui n'appartient qu'à vous deux. Ce genre d'attention crée un vrai souvenir.",
        ],
      },
      {
        heading: "Le cadeau petit budget",
        paragraphs: [
          "Sous les 20,00 €, on trouve de belles idées : un accessoire pratique, un jeu de société pour les soirées en famille, un carnet de qualité ou une gourmandise qu'il adore. L'important est de viser juste sur ses goûts plutôt que de multiplier les objets sans âme.",
          "Là encore, la présentation fait la différence. Un emballage soigné et une petite carte manuscrite transforment un cadeau modeste en attention qui compte. Un papa retient souvent le geste et l'intention bien plus que le prix.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour la fête des pères ?", a: "La fourchette la plus fréquente se situe entre 25,00 € et 55,00 €. Une attention bien ciblée autour de 20,00 € à 35,00 € suffit ; gardez les budgets au-delà de 90,00 € pour un objet durable comme une montre ou un outil haut de gamme qu'il désire." },
      { q: "Quand commander pour être livré avant le 21 juin 2026 ?", a: "Prévoyez une marge et commandez avant le 12 juin 2026, soit une bonne semaine avant. Pour un cadeau gravé ou personnalisé, comptez quelques jours de plus de fabrication et lancez la commande dès le début du mois." },
      { q: "Quelle idée quand mon père ne veut rien ?", a: "Misez sur le consommable ou le partagé : un bon repas, une sortie, un produit qu'il finira par utiliser. Beaucoup de papas préfèrent un moment ensemble à un objet ; une activité à faire tous les deux est souvent le cadeau le plus apprécié." },
    ],
  },
  "noel": {
    intro: "Noël, le 25 décembre, c'est le grand rendez-vous des cadeaux de l'année, et aussi celui où l'on se met le plus de pression. Bonne nouvelle : un cadeau réussi n'est pas une question de budget, mais d'attention. L'idéal est de commencer sa liste dès la fin novembre pour éviter la panique de dernière minute et profiter d'un large choix. Pensez à équilibrer selon les personnes : un cadeau symbolique et sincère pour les collègues ou les amis autour de 15,00 € à 25,00 €, un cadeau plus généreux pour les proches entre 40,00 € et 80,00 €, et une belle surprise au-delà de 100,00 € pour la personne la plus importante. Le piège numéro un, c'est d'acheter dans l'urgence des objets « pour cocher la case » : mieux vaut un petit cadeau juste qu'un gros cadeau à côté de la plaque. Attention aussi aux ruptures de stock et aux délais de livraison qui s'allongent en décembre. Enfin, ne négligez pas l'emballage et le mot glissé dessous : à Noël, l'ambiance compte autant que le contenu. Un paquet soigné, une étiquette manuscrite, et la magie opère avant même l'ouverture. Prenez le temps, faites-vous une liste, et étalez vos achats pour éviter le stress.",
    sections: [
      {
        heading: "Les valeurs sûres pour toute la famille",
        paragraphs: [
          "Certains cadeaux fédèrent à tous les âges : un jeu de société pour les soirées d'hiver, un beau livre, un coffret de soins ou de gourmandises, une bougie ou un plaid douillet. On mise sur le réconfort et le côté chaleureux qui colle parfaitement à l'esprit de Noël.",
          "Pour choisir sans se tromper, partez des habitudes de chacun. Un gourmand sera ravi d'un coffret dégustation autour de 25,00 € à 40,00 €, un casanier d'un accessoire cosy, un curieux d'un livre sur sa passion. L'idée est d'offrir quelque chose qui prolonge un plaisir qu'il a déjà.",
        ],
      },
      {
        heading: "Les idées qui surprennent",
        paragraphs: [
          "Pour marquer les esprits, pensez expérience ou personnalisation : un abonnement à un magazine ou une box thématique, un atelier, un objet gravé au prénom, un album photo de l'année écoulée. Ces cadeaux racontent une histoire et se démarquent de la pile de paquets classiques.",
        ],
      },
      {
        heading: "Le petit budget et le cadeau collectif",
        paragraphs: [
          "Pour un budget serré ou un tirage au sort entre amis, visez juste autour de 15,00 € à 25,00 € : une belle édition d'un livre, un accessoire pratique, un savon artisanal, une plante d'intérieur. La sincérité prime sur le montant, surtout à Noël.",
          "Si vous êtes plusieurs, le cadeau groupé permet d'offrir une plus belle pièce sans se ruiner : chacun met 15,00 € à 20,00 € et l'ensemble finance un cadeau vraiment marquant. C'est souvent la meilleure option pour gâter un proche sans exploser son budget.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen prévoir par cadeau de Noël ?", a: "Cela dépend du lien : autour de 15,00 € à 25,00 € pour un collègue ou un ami, 40,00 € à 80,00 € pour un proche, et davantage pour la personne la plus importante. L'essentiel est d'ajuster selon la relation plutôt que de viser un montant unique pour tous." },
      { q: "Quand commander pour être livré avant le 25 décembre ?", a: "Anticipez : passez vos commandes idéalement avant la mi-décembre, car les délais s'allongent fortement en fin d'année et les stocks se raréfient. Pour un cadeau personnalisé ou gravé, commandez dès début décembre pour être tranquille." },
      { q: "Quelle idée pour quelqu'un qui ne veut rien ?", a: "Tournez-vous vers le consommable ou l'expérience : de belles gourmandises, une bougie, une sortie ou un moment partagé. Ces cadeaux ne s'accumulent pas et font plaisir sans encombrer ; le temps passé ensemble reste la plus jolie attention de Noël." },
    ],
  },
  "paques": {
    intro: "Pâques, le dimanche 5 avril 2026, rime avec chocolat, mais l'occasion se prête à bien plus que ça. C'est une fête douce, familiale, parfaite pour gâter les enfants comme les grands sans se ruiner. Le cœur du sujet reste gourmand : un bel œuf, une poule ou un assortiment de chocolats de qualité fait toujours plaisir. Mais on peut aussi glisser une petite attention non comestible, surtout pour les enfants qui croulent déjà sous le chocolat. Côté budget, une gourmandise sympathique se trouve entre 8,00 € et 20,00 €, un joli coffret de chocolatier entre 25,00 € et 45,00 €, et une belle pièce artisanale au-delà de 50,00 €. Le piège classique, c'est le chocolat industriel sans saveur acheté à la va-vite : mieux vaut un petit ballotin de qualité qu'un gros œuf fade. Pensez aussi aux intolérances et aux régimes : chocolat sans lactose, sans sucre ajouté ou vegan pour ceux qui en ont besoin. Pour les enfants, la traditionnelle chasse aux œufs dans le jardin reste le meilleur des cadeaux : préparez quelques cachettes et un petit panier. Enfin, une carte joyeuse ou un mot glissé dans le paquet ajoute cette touche personnelle qui fait toute la différence.",
    sections: [
      {
        heading: "Le chocolat, mais bien choisi",
        paragraphs: [
          "Le chocolat reste la star de Pâques, à condition de viser la qualité plutôt que la quantité. Un ballotin d'un bon chocolatier, un œuf garni de pralinés ou un assortiment de moulages fins autour de 25,00 € à 40,00 € fera bien plus d'effet qu'un gros volume industriel.",
          "Pensez aux goûts de chacun : chocolat noir intense pour les puristes, lait praliné pour les gourmands, sans sucre ajouté ou vegan pour ceux qui en ont besoin. Un chocolat choisi selon la personne montre une attention que le format géant ne remplacera jamais.",
        ],
      },
      {
        heading: "Au-delà du chocolat",
        paragraphs: [
          "Pour changer, ou pour compléter, glissez une attention non comestible : un petit jouet ou un livre pour les enfants, une jolie plante de saison, une décoration de printemps ou un accessoire léger pour les adultes. Cela évite l'overdose de sucre et prolonge le plaisir bien après la fête.",
        ],
      },
      {
        heading: "La chasse aux œufs et le petit budget",
        paragraphs: [
          "Rien ne remplace la traditionnelle chasse aux œufs pour émerveiller les enfants. Avec quelques œufs colorés, un petit panier et des cachettes dans le jardin ou la maison, on crée un moment de jeu inoubliable pour un budget minime, souvent sous les 15,00 €.",
          "Pour les petits budgets adultes, un carré de bon chocolat accompagné d'une carte de printemps ou d'un bouquet de saison suffit à marquer le coup. Pâques n'appelle pas de grandes dépenses : c'est la convivialité et le partage qui font tout le charme de cette fête.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget prévoir pour un cadeau de Pâques ?", a: "Restez raisonnable : entre 8,00 € et 20,00 € pour une gourmandise, 25,00 € à 45,00 € pour un beau coffret de chocolatier. Pâques est une fête simple et gourmande, inutile de viser de gros montants pour faire plaisir." },
      { q: "Quand commander pour être livré avant le 5 avril 2026 ?", a: "Le chocolat craint la chaleur, alors commandez quelques jours avant, idéalement autour du 30 mars 2026, et vérifiez que la livraison est adaptée aux produits frais. Évitez de trop anticiper pour garder le chocolat dans les meilleures conditions." },
      { q: "Quelle idée pour un adulte qui ne mange pas de chocolat ?", a: "Optez pour une attention de saison non comestible : une plante printanière, une bougie, un accessoire léger ou un beau livre. Vous pouvez aussi choisir une gourmandise alternative comme des fruits secs enrobés ou une pâtisserie artisanale de circonstance." },
    ],
  },
  "saint-valentin": {
    intro: "La Saint-Valentin, le 14 février, célèbre l'amour sous toutes ses formes, et le cadeau parfait n'est pas une question de prix mais de justesse. L'idée est de montrer que vous connaissez l'autre : ses goûts, ses envies, ce qui le fait sourire. Un cadeau trop cliché peut sonner faux, tandis qu'une petite attention bien pensée touche en plein cœur. Côté budget, une attention sincère se situe entre 20,00 € et 40,00 €, un cadeau romantique confortable entre 50,00 € et 90,00 €, et une belle pièce au-delà de 100,00 € si vous voulez marquer une étape. Le piège numéro un, c'est le cadeau générique acheté par réflexe : les fleurs anonymes, la peluche géante ou le parfum choisi au hasard. Mieux vaut un objet plus modeste mais personnel. Autre écueil, la pression du « toujours plus » : la Saint-Valentin n'est pas un concours, un dîner à la maison bien préparé vaut souvent mieux qu'une grosse dépense. Pensez aussi à l'expérience à deux, souvent plus marquante qu'un objet. Et surtout, n'oubliez pas le mot : quelques lignes sincères écrites de votre main resteront bien après que le cadeau aura été rangé. C'est le message qui donne toute sa valeur au geste.",
    sections: [
      {
        heading: "Les valeurs sûres du romantisme",
        paragraphs: [
          "Certains cadeaux disent « je t'aime » avec élégance : un bijou discret, un parfum qu'il ou elle aime déjà, un coffret de soins, une belle édition d'un livre qui compte pour vous deux. On privilégie la qualité et le sens plutôt que le volume ou le tape-à-l'œil.",
          "Le secret est de partir de la personne, pas des clichés. Si votre moitié adore le thé, le café ou le chocolat, un beau coffret dégustation autour de 30,00 € à 50,00 € sera plus juste qu'un cadeau imposé par la tradition. L'attention personnalisée fait toute la différence.",
        ],
      },
      {
        heading: "L'expérience à deux",
        paragraphs: [
          "Plutôt qu'un objet, offrez un moment : un dîner, une escapade, un atelier à faire ensemble, une séance bien-être en duo. Ces cadeaux créent des souvenirs partagés qui durent bien plus longtemps qu'un présent matériel. Un week-end simple ou une soirée soignée à la maison peut valoir tous les grands gestes.",
        ],
      },
      {
        heading: "Le cadeau petit budget et le mot qui compte",
        paragraphs: [
          "Sous les 20,00 €, on peut être très romantique : une lettre manuscrite, une playlist personnalisée, un petit objet symbolique, une gourmandise préférée. L'intention prime largement sur le montant en cette occasion où c'est le cœur qui parle.",
          "Quel que soit le budget, le mot qui accompagne fait la magie. Prenez quelques minutes pour écrire ce que vous ressentez, un souvenir commun, une promesse. Ces quelques lignes transforment n'importe quel cadeau en attention inoubliable et sincère.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour la Saint-Valentin ?", a: "La fourchette la plus courante se situe entre 30,00 € et 70,00 €. Une attention sincère autour de 20,00 € à 40,00 € suffit largement ; réservez les budgets au-delà de 100,00 € pour un bijou ou une étape importante dans votre relation." },
      { q: "Quand commander pour être livré avant le 14 février ?", a: "La demande est forte à cette période, alors commandez au moins une semaine avant, soit avant le 7 février, pour éviter les ruptures et les retards. Pour un cadeau gravé ou personnalisé, prévoyez encore quelques jours supplémentaires." },
      { q: "Quelle idée quand mon ou ma partenaire ne veut rien ?", a: "Privilégiez l'expérience ou le geste : un dîner préparé avec soin, une sortie, une lettre sincère, un moment rien qu'à deux. Beaucoup de personnes préfèrent la présence et l'attention à un objet ; le temps partagé est le plus beau des cadeaux." },
    ],
  },
  "anniversaire": {
    intro: "Un anniversaire, c'est l'occasion la plus personnelle qui soit : contrairement aux fêtes du calendrier, il célèbre une seule personne, avec ses goûts et son univers. Le meilleur cadeau est donc celui qui lui ressemble vraiment. Avant d'acheter, posez-vous la question : qu'est-ce qui le ou la fait vibrer en ce moment ? Une passion, un projet, une envie qu'il a mentionnée : c'est là que se cache la bonne idée. Côté budget, tout dépend du lien : une attention amicale se situe entre 15,00 € et 30,00 €, un cadeau pour un proche entre 40,00 € et 80,00 €, et une belle pièce au-delà de 100,00 € pour une personne très chère ou un âge symbolique. Le piège le plus fréquent, c'est le cadeau générique qui pourrait convenir à n'importe qui : mieux vaut un petit présent ciblé qu'un gros cadeau impersonnel. Attention aussi aux doublons, surtout pour les passionnés qui possèdent déjà beaucoup dans leur domaine ; un accessoire complémentaire est souvent plus malin. Pensez à la carte : un mot drôle ou tendre personnalise le moment. Et si vous manquez de temps, une expérience ou une sortie à partager reste une valeur sûre qui marque durablement les esprits.",
    sections: [
      {
        heading: "Partir de la personne",
        paragraphs: [
          "Le meilleur point de départ, ce sont les centres d'intérêt : un cuisinier appréciera un bel ustensile ou un coffret d'épices, un lecteur un livre attendu, un sportif un accessoire de qualité, un amateur de beauté un soin bien choisi. On offre quelque chose qui prolonge une passion existante.",
          "Écoutez les petites phrases lâchées dans l'année : « j'aimerais bien essayer », « le mien est usé », « il me faudrait ». Ces indices valent de l'or et évitent le cadeau à côté de la plaque. Un présent qui répond à une envie exprimée fait toujours mouche.",
        ],
      },
      {
        heading: "Les idées originales",
        paragraphs: [
          "Pour surprendre, misez sur l'expérience ou la personnalisation : un atelier, un concert, une activité insolite, ou un objet gravé à son prénom. Ces cadeaux sortent du lot et créent un souvenir. Pour un âge symbolique, un cadeau qui marque le coup avec une petite dimension sentimentale touche particulièrement.",
        ],
      },
      {
        heading: "Le cadeau petit budget",
        paragraphs: [
          "Sous les 20,00 €, il y a de très belles idées à condition de viser juste : un accessoire pratique lié à sa passion, un jeu, un livre, une gourmandise qu'il adore. La précision du choix compte plus que le montant dépensé.",
          "Si le budget est vraiment serré ou si vous êtes plusieurs, le cadeau groupé est idéal : chacun participe et l'on offre ensemble une plus belle pièce. Accompagné d'une carte signée par tous, il devient un présent collectif chaleureux et mémorable.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour un cadeau d'anniversaire ?", a: "Cela varie selon la proximité : autour de 15,00 € à 30,00 € pour un ami ou un collègue, 40,00 € à 80,00 € pour un proche, davantage pour une personne très chère ou un âge symbolique. Ajustez selon le lien plutôt que selon une règle unique." },
      { q: "Quand commander pour être livré à temps ?", a: "Prévoyez une marge de sécurité et commandez au moins une semaine avant la date pour absorber les aléas de livraison. Pour un cadeau personnalisé ou gravé, comptez quelques jours de fabrication supplémentaires et anticipez d'autant." },
      { q: "Quelle idée quand la personne dit ne rien vouloir ?", a: "Tournez-vous vers le consommable ou l'expérience : une gourmandise qu'elle aime, une sortie, un moment partagé, un bon pour une activité. Ces cadeaux ne s'accumulent pas et font plaisir sans encombrer ; le temps passé ensemble reste précieux." },
    ],
  },
  "naissance": {
    intro: "L'arrivée d'un bébé est un moment unique, et le cadeau de naissance a une double mission : faire plaisir aux parents épuisés et accompagner les débuts du tout-petit. Le bon réflexe, c'est de penser autant à l'enfant qu'à ceux qui vont l'élever. Un cadeau vraiment utile soulage le quotidien, un cadeau tendre marque l'événement, et l'idéal réunit les deux. Côté budget, une jolie attention se situe entre 20,00 € et 40,00 €, un cadeau confortable entre 50,00 € et 90,00 €, et un présent d'exception, souvent collectif, au-delà de 100,00 €. Le piège classique, c'est d'offrir de la layette en taille naissance : les bébés grandissent vite et les parents en reçoivent beaucoup. Préférez des vêtements en 6, 9 ou 12 mois qui serviront plus tard. Attention aussi aux normes de sécurité pour tout ce qui touche au sommeil et aux jouets : misez sur des produits fiables et adaptés à l'âge. Un cadeau souvenir, comme un objet personnalisé au prénom, plaît beaucoup et traverse les années. Enfin, glissez un mot doux aux parents : ce sont eux qui vivent ce grand chamboulement, et une attention à leur égard, comme un petit plaisir pour souffler, est toujours la bienvenue.",
    sections: [
      {
        heading: "Les cadeaux vraiment utiles",
        paragraphs: [
          "Les parents apprécient ce qui simplifie le quotidien : un lot de vêtements en tailles à venir, une gigoteuse de qualité, une sortie de bain, des articles de soin pour bébé. On vise le pratique et le durable, en pensant aux mois qui suivent plutôt qu'aux premiers jours déjà bien pourvus.",
          "Pour ne pas faire doublon, un cadeau utile mais consommable est une valeur sûre : produits de soin adaptés, lingettes lavables, ou un bon d'achat dans une enseigne de puériculture qui laisse les parents choisir ce qui leur manque vraiment.",
        ],
      },
      {
        heading: "Le cadeau souvenir",
        paragraphs: [
          "Pour marquer l'événement, rien ne vaut un objet qui traverse le temps : un doudou brodé au prénom, une gourmette, un livre personnalisé, un cadre ou une jolie boîte à souvenirs. Ces cadeaux tendres se gardent des années et deviennent des trésors de famille que l'enfant retrouvera plus tard avec émotion.",
        ],
      },
      {
        heading: "Petit budget et cadeau groupé",
        paragraphs: [
          "Sous les 25,00 €, on trouve de belles attentions : un joli livre d'éveil, un bavoir de qualité, une paire de chaussons, un mobile pour la chambre. L'essentiel est de choisir un article soigné et sûr plutôt que de multiplier les petits objets.",
          "Pour un présent marquant sans se ruiner, le cadeau collectif est idéal : plusieurs proches réunissent leur participation pour offrir une pièce importante, comme un équipement de puériculture. Accompagné d'une carte signée par tous, il devient un beau geste commun pour accueillir le bébé.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour un cadeau de naissance ?", a: "La fourchette la plus fréquente se situe entre 30,00 € et 60,00 €. Une attention soignée autour de 20,00 € à 40,00 € convient très bien ; pour un cadeau plus important, le présent collectif au-delà de 100,00 € permet d'offrir une belle pièce sans effort individuel." },
      { q: "Faut-il offrir des vêtements en taille naissance ?", a: "Mieux vaut l'éviter : les bébés grandissent très vite et les parents reçoivent beaucoup de layette en petite taille. Choisissez plutôt du 6, 9 ou 12 mois, qui servira dans les mois à venir et sera réellement utile plus tard." },
      { q: "Quel cadeau quand les parents disent avoir déjà tout ?", a: "Optez pour le consommable ou le souvenir : des produits de soin, un bon d'achat en puériculture, ou un objet personnalisé au prénom qui restera. Vous pouvez aussi gâter les parents eux-mêmes avec une petite attention pour les aider à souffler un peu." },
    ],
  },
};

export const RECIPIENT_EDITORIAL: Record<string, Editorial> = {
  femme: {
    intro: "Pour trouver une idée cadeau pour une femme, commencez par son âge, ses goûts et votre budget. Une lectrice, une sportive, une passionnée de beauté ou une femme qui préfère les expériences n'attendent pas le même présent. À moins de 20 €, misez sur une attention précise et bien présentée ; entre 20 € et 50 €, un accessoire durable ou un coffret de qualité ; au-delà, une expérience, un bijou ou une pièce qu'elle n'oserait pas s'offrir. Repensez à ses dernières semaines : de quoi a-t-elle parlé avec envie, quel objet utilise-t-elle tous les jours, quelle passion délaisse-t-elle faute de temps ? C'est souvent là que se cache le bon cadeau. Fuyez les clichés comme l'électroménager ou les produits minceur non demandés. Le prix compte moins que la preuve que vous l'avez écoutée.",
    sections: [
      {
        heading: "Idées cadeaux pour femme selon ses goûts",
        paragraphs: [
          "Certaines catégories plaisent presque toujours parce qu'elles se glissent dans le quotidien : un bijou discret et bien choisi, un accessoire de qualité comme un joli sac ou une écharpe en belle matière, un coffret de soins d'une marque qu'elle apprécie déjà. L'astuce, c'est de rester dans ses codes à elle. Si elle porte surtout de l'argenté, évitez l'or ; si elle aime le minimalisme, oubliez les modèles très ornés.",
          "Les expériences fonctionnent aussi remarquablement bien : un atelier de cuisine, une séance dans un spa, un concert de l'artiste qu'elle écoute en boucle. On offre alors un souvenir plutôt qu'un objet, et c'est souvent ce dont on se rappelle le plus longtemps. Comptez entre 40,00 € et 90,00 € pour une expérience à deux, ce qui reste raisonnable pour un moment marquant.",
        ],
      },
      {
        heading: "Quel cadeau choisir selon votre budget ?",
        paragraphs: [
          "À moins de 20 €, choisissez un petit plaisir précis : un livre lié à ses goûts, une bougie de qualité, un joli carnet ou un coffret de thé. Entre 20 € et 50 €, privilégiez un accessoire durable, un soin d'une marque qu'elle utilise déjà ou une création personnalisée sobre.",
          "Entre 50 € et 100 €, une expérience à deux, un bijou discret ou une belle pièce de maroquinerie marquent davantage. Au-delà de 100 €, vérifiez ses préférences exactes et les conditions de retour : plus le budget monte, plus la justesse doit primer sur l'effet de surprise.",
        ],
      },
      {
        heading: "Personnaliser sans en faire trop",
        paragraphs: [
          "La personnalisation transforme un cadeau correct en cadeau mémorable, à condition de rester léger. Une initiale gravée, une date qui compte, une couleur qu'elle adore suffisent. Inutile de couvrir l'objet d'inscriptions : la sobriété fait plus chic et se garde plus longtemps. Un mot manuscrit glissé dans le paquet a souvent plus d'effet que n'importe quel supplément payant.",
        ],
      },
      {
        heading: "L'erreur classique à éviter",
        paragraphs: [
          "Le piège le plus courant, c'est d'offrir un cadeau qui ressemble à une remarque déguisée : un appareil de sport quand elle n'a rien demandé, un parfum très différent de ce qu'elle porte, un ustensile de ménage. Même bien intentionné, ce type de présent peut laisser une impression amère.",
          "L'autre écueil, c'est le cadeau générique acheté à la dernière minute sans lien avec elle. Mieux vaut assumer un petit budget bien pensé qu'un objet coûteux mais impersonnel. Si vous hésitez entre deux idées, choisissez celle qui raconte quelque chose de votre relation plutôt que la plus impressionnante en apparence.",
        ],
      },
    ],
    faq: [
      { q: "Quel cadeau offrir à une femme qui a déjà tout ?", a: "Préférez une expérience, un objet personnalisé lié à un souvenir ou un consommable haut de gamme. Un atelier, un repas partagé ou un album photo évitent d'ajouter un objet inutile et créent un souvenir durable." },
      { q: "Quel budget moyen prévoir pour un cadeau qui fait plaisir ?", a: "Pour un cadeau à la fois soigné et raisonnable, visez entre 30,00 € et 60,00 €. Cette fourchette permet un bel accessoire, un coffret de soins de qualité ou une expérience simple. Au-delà, réservez plutôt les gros budgets aux grandes occasions comme un anniversaire rond ou un événement important." },
      { q: "Une idée de dernière minute qui reste élégante ?", a: "Un coffret de thés ou de soins d'une marque qu'elle aime, accompagné d'une carte manuscrite, se trouve facilement et fait toujours son effet. Une carte cadeau vers une boutique qu'elle fréquente déjà, autour de 40,00 €, est aussi une valeur sûre si vous manquez de temps pour choisir." },
      { q: "Que faire quand on la connaît encore peu ?", a: "Restez sur un cadeau universel et de bon goût plutôt que très personnel : une bougie parfumée de qualité, un joli carnet, un coffret gourmand. Ces options font plaisir sans risquer le faux pas, et laissent transparaître de l'attention même quand on ignore encore ses préférences précises." },
    ],
  },
  homme: {
    intro: "Trouver un cadeau pour un homme passe souvent pour un casse-tête, alors que la clé est la même que pour tout le monde : observer avant d'acheter. Écoutez ce dont il parle avec enthousiasme, repérez l'objet qu'il utilise tous les jours et qui commence à fatiguer, notez la passion à laquelle il consacre son temps libre. Un homme bricoleur, un amateur de café, un passionné de rando ou de jeux vidéo n'attend pas le même présent, et c'est justement cette précision qui fait mouche. Oubliez les cadeaux par défaut du type cravate, gadget vite oublié ou coffret de rasage acheté en vitesse : ils sentent l'obligation. Cherchez plutôt à améliorer quelque chose qu'il fait déjà. S'il boit un café chaque matin, un bon moulin ou une tasse isotherme de qualité changera son quotidien. S'il aime cuisiner, un bel outil durable lui servira des années. L'idée est de viser l'usage réel plutôt que l'effet de surprise sur le moment. Méfiez-vous aussi de projeter vos propres goûts : ce n'est pas parce qu'un objet vous plaît qu'il correspond à sa vie. Un budget de 30,00 € à 60,00 € permet déjà de belles choses de qualité, et c'est souvent le soin apporté au choix, pas le montant, qui marque la différence.",
    sections: [
      {
        heading: "Miser sur ce qu'il utilise déjà",
        paragraphs: [
          "Le cadeau le plus apprécié est souvent la version améliorée d'un objet qu'il manipule tous les jours. Un portefeuille en cuir qui remplace celui qui s'effiloche, un couteau de qualité pour l'amateur de cuisine, un sac résistant pour ses trajets. En partant de ses habitudes réelles, vous êtes quasiment sûr de tomber juste, et l'objet trouvera sa place immédiatement.",
          "Cette logique marche aussi pour les passions. Un accessoire bien choisi pour son loisir principal, sport, musique, photo ou jeu, montre que vous vous intéressez vraiment à ce qui l'anime. Renseignez-vous un peu sur le matériel qu'il possède déjà pour éviter le doublon, quitte à demander discrètement à un proche.",
        ],
      },
      {
        heading: "Les expériences plutôt que les objets",
        paragraphs: [
          "Beaucoup d'hommes disent ne rien vouloir, tout en gardant un excellent souvenir des cadeaux qui les font vivre quelque chose. Un stage de pilotage, une dégustation, un billet pour un match ou un concert, une sortie que vous partagez à deux : ces présents créent un souvenir durable et évitent d'encombrer la maison. Comptez entre 40,00 € et 100,00 € selon l'activité.",
        ],
      },
      {
        heading: "L'erreur classique à éviter",
        paragraphs: [
          "L'écueil numéro un, c'est le cadeau générique choisi à la dernière minute parce qu'on manque d'idées : le coffret de gel douche, le gadget rigolo qui finira au fond d'un tiroir, l'énième mug humoristique. Ces objets donnent l'impression d'un achat par obligation, même quand l'intention est bonne.",
          "Évitez aussi de vouloir le transformer avec votre cadeau : lui offrir un abonnement à la salle de sport ou un objet censé corriger une habitude peut être mal reçu. Restez sur ce qui lui fait plaisir à lui, pas sur ce que vous aimeriez qu'il devienne.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen est raisonnable ?", a: "Entre 30,00 € et 60,00 €, on trouve déjà de très beaux objets durables ou une expérience simple. Pour une grande occasion, monter jusqu'à 100,00 € permet un cadeau plus marquant comme une activité à sensations ou un accessoire haut de gamme lié à sa passion." },
      { q: "Une idée de dernière minute qui tient la route ?", a: "Une carte cadeau vers une enseigne qu'il fréquente, ou un produit lié à son loisir principal qu'on trouve facilement, feront l'affaire. Ajoutez un mot personnel : c'est souvent ce détail qui sauve un cadeau choisi dans l'urgence et le rend sincère." },
      { q: "Quoi offrir quand on le connaît à peine ?", a: "Privilégiez le consommable de qualité et universel : un bon café en grains, un coffret d'épices, une belle bouteille d'huile d'olive artisanale, un carnet solide. Ces cadeaux font plaisir sans risque de fausse note, même quand on ignore ses goûts précis." },
    ],
  },
  enfant: {
    intro: "Offrir à un enfant, c'est retrouver une part de spontanéité, mais aussi éviter quelques pièges. Le premier réflexe utile est de tenir compte de son âge réel plutôt que de son âge affiché : un jouet trop simple lasse en deux jours, un jeu trop complexe finit oublié. Renseignez-vous auprès des parents sur ce qu'il possède déjà et sur ses passions du moment, car elles changent vite à cet âge. Un enfant fou de dinosaures aujourd'hui adorera un cadeau sur ce thème, même modeste, bien plus qu'un jouet cher hors sujet. Cherchez à nourrir sa curiosité : jeux de construction, kits créatifs, livres, jeux de société qui grandissent avec lui. Ces cadeaux durent parce qu'ils se réinventent à chaque partie. Attention aussi à respecter les choix éducatifs de la famille, notamment sur les écrans et le marketing agressif de certaines marques. Un budget de 15,00 € à 40,00 € couvre l'immense majorité des belles idées, et l'enfant se moque totalement du prix : ce qui l'emballe, c'est l'objet lui-même et le moment du déballage. Évitez enfin de multiplier les petits gadgets vite cassés : un seul cadeau bien choisi et solide marque davantage qu'une pile de jouets qui s'oublient en une semaine.",
    sections: [
      {
        heading: "Adapter au bon âge",
        paragraphs: [
          "L'âge est le premier critère, et il vaut mieux le prendre au sérieux. Un enfant de 3 ans a besoin de jouets solides et sûrs, sans petites pièces ; un enfant de 8 ans réclame du défi et de l'autonomie. Fiez-vous aux tranches d'âge indiquées, elles évitent la déception d'un jeu trop dur ou trop facile. En cas de doute entre deux âges, visez légèrement au-dessus : l'enfant grandira dans le jouet plutôt que de s'en lasser.",
          "Pensez aussi au tempérament. Un petit calme appréciera un kit créatif ou un livre animé, tandis qu'un enfant très actif préférera un jeu d'extérieur ou de construction. Le meilleur cadeau épouse sa manière à lui de jouer, pas une idée générale de ce qui plaît aux enfants.",
        ],
      },
      {
        heading: "Les cadeaux qui durent",
        paragraphs: [
          "Certains cadeaux traversent les mois parce qu'ils se renouvellent : jeux de construction, jeux de société familiaux, kits d'activités, beaux livres. L'enfant y revient, invente de nouvelles règles, progresse. C'est un bien meilleur investissement qu'un jouet à la mode qui perd son intérêt une fois la surprise passée. Comptez souvent entre 20,00 € et 40,00 € pour ce type de valeur sûre.",
        ],
      },
      {
        heading: "L'erreur classique à éviter",
        paragraphs: [
          "Le piège le plus fréquent, c'est de céder à l'objet spectaculaire mais creux : le gros jouet qui clignote, plaît dix minutes puis dort dans un coin. Autre travers, offrir en doublon ce qu'il a déjà, faute d'avoir demandé aux parents.",
          "Enfin, méfiez-vous des cadeaux qui contournent les règles de la maison, comme un jeu très sonore ou un objet lié aux écrans que les parents limitent. Un cadeau vraiment réussi fait plaisir à l'enfant sans créer de tension à la maison, alors un petit mot aux parents en amont ne coûte rien.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour un cadeau d'enfant ?", a: "Entre 15,00 € et 40,00 €, on trouve déjà d'excellentes idées, des livres aux jeux de société en passant par les kits créatifs. Inutile de surenchérir : à cet âge, l'enfant apprécie le jouet pour ce qu'il est, pas pour son prix, et un cadeau bien choisi vaut mieux qu'un cadeau cher." },
      { q: "Une idée de dernière minute qui plaît à coup sûr ?", a: "Un beau livre adapté à son âge ou un jeu de société familial se trouve facilement et ravit presque tous les enfants. Si vous ignorez ses goûts précis, un kit d'activité créative autour de 20,00 € est une valeur sûre qui l'occupera un bon moment." },
      { q: "Quoi offrir à un enfant qu'on connaît peu ?", a: "Restez sur un cadeau universel et adapté à son âge : un livre illustré, un jeu de construction, un jeu de société coopératif. Demandez si possible aux parents ce qu'il aime en ce moment, cela évite le doublon et vous oriente vers ce qui le passionne vraiment." },
    ],
  },
  ado: {
    intro: "Les ados ont la réputation d'être difficiles à gâter, mais c'est surtout qu'ils ont des goûts très affirmés et sensibles au regard des autres. Le bon réflexe, c'est de les prendre au sérieux : un ado n'est plus un enfant, il déteste qu'on lui offre un cadeau trop jeune pour lui ou choisi à sa place sans le connaître. Observez ce qui compte pour lui en ce moment, sa musique, son style, ses centres d'intérêt, ses créateurs de contenu préférés, et partez de là. Attention toutefois aux marques et aux modèles précis : se tromper de référence peut ruiner un cadeau pourtant bien intentionné. Quand vous hésitez, la carte cadeau vers une enseigne qu'il aime n'a rien d'un aveu de paresse : elle lui laisse le choix, ce qui est exactement ce qu'un ado apprécie. Évitez de vouloir absolument le surprendre au risque de tomber à côté ; mieux vaut viser juste. Un budget de 25,00 € à 50,00 € couvre la plupart des belles idées, sans entrer dans la surenchère technologique. Enfin, respectez son autonomie naissante : un cadeau qui reconnaît qu'il grandit, plutôt qu'un objet infantilisant, aura toujours plus de valeur à ses yeux.",
    sections: [
      {
        heading: "Partir de sa passion du moment",
        paragraphs: [
          "L'ado vit souvent à fond une passion : un sport, un jeu, un style musical, le dessin, une série. Un cadeau qui s'y rattache montre que vous le voyez tel qu'il est. Le secret, c'est la précision : la bonne équipe, le bon artiste, la bonne plateforme. Un accessoire lié à ce qu'il aime déjà fait bien plus d'effet qu'un objet cher mais hors sujet.",
          "Si sa passion demande du matériel spécifique, renseignez-vous discrètement pour éviter le doublon ou la mauvaise référence. En cas de doute, une carte cadeau ciblée sur sa boutique ou sa plateforme préférée le laissera choisir l'article exact qui lui manque, autour de 30,00 € à 50,00 €.",
        ],
      },
      {
        heading: "Le style et l'autonomie",
        paragraphs: [
          "Beaucoup d'ados construisent leur identité à travers leur style. Un accessoire tendance, un vêtement qui colle à ses codes, un objet déco pour sa chambre qu'il veut personnaliser, tout cela le touche parce que ça respecte qui il devient. Restez dans SES goûts, pas dans les vôtres, et évitez de vouloir corriger son style : le cadeau doit l'accompagner, pas le rééduquer.",
        ],
      },
      {
        heading: "L'erreur classique à éviter",
        paragraphs: [
          "Le faux pas le plus courant, c'est le cadeau trop enfantin ou le clin d'œil qui le renvoie à un âge qu'il veut quitter. Autre travers, choisir une marque ou un modèle à côté de la plaque, surtout en technologie ou en vêtements, où les références comptent énormément.",
          "Évitez aussi le cadeau qui juge, comme un objet censé le pousser à moins jouer ou à changer ses habitudes. À cet âge, l'ado a besoin de sentir qu'on lui fait confiance. Un présent qui reconnaît son autonomie et ses goûts vaudra toujours mieux qu'un cadeau imposé pour son bien.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen prévoir pour un ado ?", a: "Entre 25,00 € et 50,00 €, on couvre la plupart des envies sans tomber dans la surenchère. Pour un anniversaire important, monter un peu plus haut permet un accessoire lié à sa passion. L'essentiel reste de viser juste sur ses goûts plutôt que d'impressionner par le montant." },
      { q: "Une idée de dernière minute qui ne fait pas paresseux ?", a: "Une carte cadeau vers une enseigne ou une plateforme qu'il utilise vraiment est parfaite : loin d'être un pis-aller, elle lui laisse choisir exactement ce qu'il veut. Comptez autour de 30,00 € et glissez un mot personnel pour l'accompagner." },
      { q: "Quoi offrir à un ado qu'on connaît mal ?", a: "Optez pour un cadeau qui laisse le choix ou reste universel chez les jeunes : une carte cadeau, un accessoire tech simple et utile, un article autour d'une passion très répandue. Si un proche peut vous souffler ses goûts du moment, vous éviterez le hors-sujet." },
    ],
  },
  couple: {
    intro: "Offrir à un couple demande un petit changement de regard : le cadeau doit plaire à deux personnes à la fois, et surtout renforcer ce qu'elles partagent. Le meilleur angle n'est donc pas l'objet, mais le moment vécu ensemble. Pensez à ce que ce couple aime faire à deux, ou à ce qu'il n'a jamais pris le temps de s'offrir. Un dîner, un week-end, une activité complice créent un souvenir commun bien plus fort qu'un objet posé sur une étagère. Si vous préférez un cadeau matériel, visez ce qui se vit à deux : un jeu de société pour leurs soirées, un beau plaid pour leur canapé, des accessoires pour recevoir leurs amis. Évitez de trancher pour l'un des deux au détriment de l'autre, ou d'offrir un objet trop personnel qui n'inclut qu'une seule personne. Attention aussi au stade de la relation : un cadeau très romantique pour de jeunes amoureux peut gêner un couple installé depuis vingt ans, et inversement. Un budget de 40,00 € à 80,00 € permet une belle expérience à deux ou un joli objet partagé. Le vrai cadeau, ici, c'est de leur offrir un temps ensemble, ce dont les couples manquent souvent le plus.",
    sections: [
      {
        heading: "Offrir une expérience à deux",
        paragraphs: [
          "C'est sans doute la voie la plus sûre. Un atelier de cuisine, une dégustation, une nuit dans un joli lieu, une activité qu'ils n'auraient pas osé s'offrir seuls : vous leur donnez une parenthèse rien qu'à eux. Ce type de cadeau crée un souvenir partagé qui dure bien après la date, et il évite d'encombrer leur intérieur.",
          "Adaptez l'expérience à leur rythme et à leurs goûts communs. Un couple casanier appréciera une box gastronomique à savourer chez eux, tandis que des aventuriers préféreront une sortie sportive. Comptez entre 50,00 € et 90,00 € pour une belle expérience à deux, un budget très raisonnable au regard du souvenir créé.",
        ],
      },
      {
        heading: "Un objet qui se partage",
        paragraphs: [
          "Si vous tenez à un cadeau matériel, choisissez ce qui se vit ensemble : un jeu de société pour leurs soirées, un beau service pour recevoir, un plaid douillet, une plante pour leur intérieur, un coffret gourmand à déguster à deux. L'objet devient alors le support d'un moment commun, et non la possession de l'un ou de l'autre, ce qui est exactement l'esprit d'un cadeau de couple.",
        ],
      },
      {
        heading: "Adapter au stade de la relation",
        paragraphs: [
          "Un couple qui débute et un couple marié de longue date n'attendent pas la même chose. Pour de jeunes amoureux, un cadeau romantique et symbolique fait sens ; pour un couple installé, misez plutôt sur le confort, le plaisir partagé ou une expérience originale qui casse la routine.",
          "Tenez compte aussi de l'occasion : emménagement, mariage, anniversaire de rencontre. Un cadeau qui colle au moment de leur vie touchera bien plus qu'un présent générique. Dans le doute, l'expérience à deux reste la valeur la plus universelle, quel que soit l'âge de leur histoire.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour un cadeau de couple ?", a: "Entre 40,00 € et 80,00 €, on offre déjà une belle expérience à deux ou un joli objet partagé. Comme le cadeau bénéficie à deux personnes, ce budget se justifie facilement, surtout pour une occasion marquante comme un mariage ou un emménagement." },
      { q: "Une idée de dernière minute pour un couple ?", a: "Une carte cadeau vers un restaurant ou une plateforme d'expériences leur laisse choisir leur moment à deux, ce qui est idéal quand le temps manque. Un coffret gourmand à partager, autour de 40,00 €, fait aussi toujours plaisir et se trouve facilement." },
      { q: "Quoi offrir à un couple qu'on connaît peu ?", a: "Misez sur un cadeau partagé et universel : un coffret d'expérience à deux, un beau jeu de société, un panier gourmand de qualité. Ces options plaisent aux deux sans risquer de favoriser l'un ou l'autre, même quand on ignore leurs goûts précis." },
    ],
  },
  bebe: {
    intro: "Offrir à un bébé, c'est surtout penser aux parents autant qu'à l'enfant, car ce sont eux qui vivront avec le cadeau au quotidien. Le premier réflexe est la sécurité : privilégiez des articles conformes aux normes, sans petites pièces, dans des matières saines et lavables. Ensuite, pensez utile. Un tout-petit grandit très vite, et les parents apprécient énormément ce qui les accompagne vraiment, du body en belle matière au jouet d'éveil en passant par le livre en tissu. Renseignez-vous sur l'âge exact et la saison à venir : un vêtement doit tomber au bon moment, ni trop petit ni trop chaud pour la période. Demandez aussi ce que les parents possèdent déjà pour éviter le doublon, fréquent sur les premiers mois. Côté goûts, respectez leurs choix, notamment sur les couleurs, les matières naturelles ou les marques qu'ils privilégient. Évitez les peluches géantes peu pratiques et les objets purement décoratifs qui ne servent pas. Un budget de 20,00 € à 50,00 € suffit largement pour un cadeau de qualité et durable. Et si vous voulez marquer le coup, un cadeau qui grandira avec l'enfant ou un souvenir personnalisé sobre touchera bien plus les parents qu'un présent tape-à-l'œil vite mis de côté.",
    sections: [
      {
        heading: "La sécurité avant tout",
        paragraphs: [
          "Pour un bébé, la sécurité prime sur l'esthétique. Vérifiez que le jouet est adapté à son âge, sans petites pièces détachables, dans des matières non toxiques et faciles à nettoyer. Les articles portés à la bouche, très nombreux à cet âge, doivent être irréprochables. Fiez-vous aux mentions d'âge du fabricant, elles ne sont pas là par hasard.",
          "Pensez aussi au confort d'usage pour les parents : un objet lavable en machine, solide et sans entretien compliqué sera bien plus utilisé qu'un article fragile. Un cadeau sûr et pratique est toujours mieux reçu qu'un objet joli mais inadapté au quotidien d'un nourrisson.",
        ],
      },
      {
        heading: "Utile et durable",
        paragraphs: [
          "Les parents apprécient particulièrement les cadeaux qui servent vraiment : un joli body en coton doux, une gigoteuse, un jouet d'éveil, un livre en tissu, un doudou de qualité. Ces objets accompagnent le bébé au fil des mois et trouvent leur place immédiatement. Pour un vêtement, prenez une taille un peu au-dessus et pensez à la saison : mieux vaut un habit qui servira dans trois mois qu'un cadeau déjà trop petit. Comptez souvent entre 20,00 € et 40,00 € pour ce type de valeur sûre.",
        ],
      },
      {
        heading: "L'erreur classique à éviter",
        paragraphs: [
          "Le piège le plus courant, c'est la peluche géante : impressionnante à offrir, mais encombrante et peu utile au quotidien. Autre travers, le vêtement à la bonne taille pile au moment du cadeau, qui sera trop petit avant même d'avoir été porté.",
          "Évitez aussi de multiplier les petits objets décoratifs qui ne servent pas et le doublon sur les indispensables déjà achetés par les parents. Un simple message avant d'acheter permet de viser juste et d'offrir ce qui manque vraiment, plutôt que d'ajouter à une pile de cadeaux redondants.",
        ],
      },
    ],
    faq: [
      { q: "Quel budget moyen pour un cadeau de naissance ?", a: "Entre 20,00 € et 50,00 €, on offre déjà un cadeau de qualité et durable, du beau textile au jouet d'éveil. Pour une naissance dans la famille proche, monter un peu plus haut se justifie, mais un présent bien choisi compte davantage que son prix aux yeux des parents." },
      { q: "Une idée de dernière minute qui reste utile ?", a: "Un livre en tissu, un doudou de qualité ou un lot de bodies en belle matière se trouve facilement et sert toujours. Une carte cadeau vers une enseigne de puériculture, autour de 30,00 €, laisse aussi les parents choisir ce qui leur manque vraiment." },
      { q: "Quoi offrir quand on connaît peu les parents ?", a: "Restez sur un cadeau utile et neutre : textile en coton doux, jouet d'éveil, livre pour tout-petit dans des tons passe-partout. Évitez le très personnalisé si vous ignorez leurs goûts, et privilégiez une taille un peu au-dessus pour que le vêtement serve plus longtemps." },
    ],
  },
};
