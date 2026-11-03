/** Sélection manuelle : aucun produit importé ne devient un cadeau automatiquement. */
export interface GiftSelection {
  asin: string;
  title: string;
  reason: string;
  caution: string;
  category: string;
  recipients: string[];
  interests: string[];
  occasions: string[];
  family?: string;
}
export const INTERESTS = [
  { value: "jeux", label: "Jeux & soirées" },
  { value: "creatif", label: "Créer & construire" },
  { value: "lecture", label: "Lecture" },
  { value: "musique", label: "Musique" },
  { value: "tech", label: "Tech & gaming" },
  { value: "cocooning", label: "Déco & cocooning" },
  { value: "sport", label: "Sport & plein air" },
  { value: "eveil", label: "Éveil & imagination" },
];
const adults = ["femme", "homme"];
const shared = [...adults, "couple", "ado"];
const usual = ["noel", "anniversaire"];
function gift(asin: string, title: string, category: string, recipients: string[], interests: string[], reason: string, caution: string, extra: string[] = [], family?: string): GiftSelection {
  return { asin, title, category, recipients, interests, reason, caution, occasions: [...usual, ...extra], family };
}
export const GIFT_SELECTION: GiftSelection[] = [
  gift("B0BHZ94WC9", "CRACK LIST — le petit bac en cartes", "jeu_societe", shared, ["jeux"], "Pour les soirées où l’on veut lancer un jeu de mots sans longue installation.", "Version française. Dès 10 ans ; moins adapté si les jeux de vocabulaire ne lui plaisent pas."),
  gift("B07NS9QJFN", "Flip 7 — jeu de cartes", "jeu_societe", shared, ["jeux"], "Pour qui aime tenter sa chance et partager une partie de cartes.", "Vérifiez la langue de l’édition et le nombre de joueurs sur la fiche."),
  gift("B0BFCD5FLZ", "Hitster — le jeu des hits", "jeu_societe", [...adults, "couple"], ["jeux", "musique"], "Pour les amis qui reconnaissent une chanson dès les premières notes.", "Dès 16 ans. Vérifiez les besoins en smartphone, application et service musical."),
  gift("B0FBMDZY83", "PILI PILI — jeu de cartes", "jeu_societe", shared, ["jeux"], "Un petit format pour les amateurs de jeux de cartes à emporter.", "Vérifiez l’âge conseillé et les règles si vous l’offrez à un enfant."),
  gift("B0B7724Y6X", "Speedbac — jeu d’ambiance", "jeu_societe", shared, ["jeux"], "Pour les groupes qui aiment jouer avec les mots et répondre vite.", "Choisissez la version Kids pour un public plus jeune.", [], "speedbac"),
  gift("B0FJSLMQNY", "Mouton Mouton — jeu d’ambiance", "jeu_societe", shared, ["jeux"], "Pour une bande d’amis qui aime deviner les réponses des autres.", "Dès 12 ans. Prévoir au moins 3 joueurs."),
  gift("B0CQP9RPGS", "Monopoly Deal — jeu de cartes", "jeu_societe", [...shared, "enfant"], ["jeux"], "Le clin d’œil Monopoly dans un format de cartes facile à emporter.", "Dès 8 ans. Ce n’est pas le Monopoly sur plateau."),
  gift("B0DRW2ZKGH", "Speedbac Kids — jeu de mots", "jeu_societe", ["enfant"], ["jeux"], "Pour jouer avec les mots en famille, avec une version destinée aux enfants.", "Dès 7 ans ; vérifier que l’enfant est à l’aise avec la lecture.", ["paques"], "speedbac"),
  gift("B01N6CJ1QW", "LEGO Botanicals — l’orchidée miniature", "construction", [...shared], ["creatif", "cocooning"], "Pour qui préfère construire son bouquet et le garder en décoration.", "Modèle pour adulte. Vérifiez la référence et les dimensions de l’édition.", ["saint-valentin", "fete-des-meres", "fete-des-peres"]),
  gift("B012NOGGHQ", "LEGO Architecture — New York", "construction", shared, ["creatif", "cocooning"], "Pour un passionné d’architecture ou un souvenir de voyage à construire.", "Vérifiez l’âge indiqué et la place disponible pour exposer la maquette."),
  gift("B0DHSBBV6R", "LEGO Speed Champions — Ferrari SF-24", "construction", [...adults, "ado", "enfant"], ["creatif", "sport"], "Pour un fan de Formule 1 qui aime aussi construire et exposer ses modèles.", "Petites pièces : vérifier l’âge recommandé par LEGO avant d’offrir."),
  gift("B00NVDP3ZU", "LEGO Classic — boîte de briques créatives", "construction", ["enfant"], ["creatif", "eveil"], "Pour inventer ses propres constructions plutôt que suivre un seul modèle.", "Dès 4 ans. Contient de petites pièces ; ne convient pas à un bébé.", ["paques"]),
  gift("B0DWDZ44TK", "LEGO Creator — le toucan tropical 3-en-1", "construction", ["enfant"], ["creatif", "eveil"], "Pour un enfant qui aime les animaux et veut reconstruire autrement.", "Vérifier l’âge sur la boîte. Les trois modèles ne se construisent pas en même temps.", ["paques"]),
  gift("B07C8CDF7F", "Janod Magneti’Book — animaux", "jouet", ["enfant"], ["eveil", "creatif"], "Un jeu magnétique pour composer des animaux et inventer des histoires.", "Vérifier l’âge et la présence de petites pièces ; ce n’est pas un jouet de naissance.", ["paques"]),
  gift("B0DPJ86GWS", "Playmobil My Life — le café des chats", "jouet", ["enfant"], ["eveil"], "Pour l’enfant qui adore les chats et invente des scènes avec ses figurines.", "Dès 4 ans. Vérifier le contenu de la boîte pour éviter un doublon.", ["paques"]),
  gift("B0CP417FBD", "Play-Doh — pack de 9 pots", "jouet", ["enfant"], ["creatif", "eveil"], "Pour les petites mains qui aiment modeler et mélanger les couleurs.", "Dès 2 ans, sous surveillance. Vérifier la composition en cas d’allergie.", ["paques"], "playdoh"),
  gift("B09YYT7M92", "TY — Melly le koala en peluche", "jouet", ["enfant"], ["eveil", "cocooning"], "Une petite attention pour un enfant qui collectionne les animaux en peluche.", "Format 15 cm. Vérifier l’âge recommandé ; pas présenté comme un doudou de naissance.", ["paques"], "peluche-enfant"),
  gift("B0DB23WCXK", "Mewaii — peluche axolotl 50 cm", "jouet", ["enfant", "ado"], ["cocooning"], "Pour un fan d’axolotls qui aime les grandes peluches dans sa chambre.", "Environ 50 cm : prévoir de la place et vérifier l’âge du fabricant.", [], "peluche-ado"),
  gift("B084HD9FSQ", "Educa — puzzle de l’Acropole, 1 000 pièces", "puzzle", shared, ["creatif", "cocooning"], "Pour s’accorder des soirées au calme autour d’un paysage d’Athènes.", "Dès 14 ans. Prévoir une surface où laisser le puzzle en cours.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0DJ2K625B", "Book Nook — bibliothèque miniature à monter", "creatif", shared, ["creatif", "lecture", "cocooning"], "Pour les lecteurs patients qui aiment les miniatures à glisser dans une bibliothèque.", "Montage minutieux. Vérifier dimensions, alimentation et éléments fournis avant achat."),
  gift("B08ZN3991F", "Figured’Art — peinture par numéros, pivoines", "creatif", [...adults, "ado"], ["creatif", "cocooning"], "Pour débuter une activité peinture avec une composition déjà guidée.", "Toile annoncée 40 × 50 cm avec cadre : confirmer le contenu de la variante.", ["fete-des-meres", "fete-des-peres"]),
  gift("B08MLCVC5H", "Bougimal — kit de peinture par numéros", "creatif", [...adults, "ado"], ["creatif"], "Une activité guidée pour qui veut essayer la peinture sans dessiner le motif.", "Cette variante est annoncée sans cadre. Vérifier le motif choisi."),
  gift("B0D4M9GS1X", "I-TOTAL — lampe à lave Spaceship", "deco", shared, ["cocooning"], "Pour apporter une lumière d’ambiance rétro à un bureau ou un salon.", "Objet décoratif qui chauffe : lire les précautions et ne pas offrir comme veilleuse bébé."),
  gift("B0CLVSW5YJ", "Silent Mind — bol chantant", "deco", [...adults], ["musique", "cocooning"], "Pour quelqu’un qui s’intéresse déjà aux instruments sonores et à la relaxation.", "Un choix de goût, sans promesse de bénéfice médical.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0CP32JG8B", "Amazon Kindle — liseuse compacte", "tech", shared, ["lecture", "tech"], "Pour un lecteur qui voyage ou veut emporter plusieurs livres dans un seul objet.", "Vérifier la version, la présence de publicités et la compatibilité avec ses livres numériques.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0BHTJLFVP", "JBL Wave Beam — écouteurs sans fil", "tech", [...adults, "ado"], ["musique", "tech"], "Pour écouter ses playlists dans les transports avec un format sans fil.", "Format intra-auriculaire : à choisir si la personne apprécie ce type d’écouteurs."),
  gift("B0016MNAAI", "beyerdynamic DT 770 Pro — casque 80 ohms", "tech", [...adults, "ado"], ["musique", "tech"], "Pour qui enregistre de la musique ou cherche un casque de studio filaire.", "Version 80 ohms, filaire : vérifier sa source audio. Ce n’est pas un casque Bluetooth."),
  gift("B07GS6ZB7T", "Logitech G502 HERO — souris gaming", "tech", [...adults, "ado"], ["tech"], "Pour un joueur sur ordinateur qui préfère une souris filaire et des boutons dédiés.", "Vérifier sa préférence de prise en main et son équipement ; ce n’est pas une manette."),
  gift("B0CJK1YPMC", "Sony DualSense — manette PS5", "jeu_video", [...adults, "ado"], ["tech"], "Pour partager une partie ou remplacer une manette sur un équipement compatible.", "Vérifier la console ou le PC, la couleur et les accessoires déjà possédés.", [], "dualsense"),
  gift("B0CYJF4KG7", "Logitech G Pro X SE — casque gaming filaire", "tech", [...adults, "ado"], ["tech", "musique"], "Pour les joueurs qui discutent avec leur équipe au casque.", "Version filaire : confirmer les connexions compatibles avec son appareil."),
  gift("B0DYF82545", "Xiaomi Smart Band 10 — bracelet connecté", "montre", [...adults, "ado"], ["tech", "sport"], "Pour suivre son activité au quotidien dans un format bracelet discret.", "Vérifier smartphone, application et taille du bracelet. Ne remplace pas un dispositif médical.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0DGHYDYJL", "Apple AirPods 4 — réduction active du bruit", "tech", [...adults, "ado"], ["musique", "tech"], "Pour une personne déjà équipée Apple qui préfère des écouteurs sans embouts.", "Confirmer la version avec réduction de bruit et les fonctions disponibles avec son téléphone."),
  gift("B0DZ75RKZH", "Apple iPad A16 — Wi-Fi, 128 Go", "tech", [...adults, "ado"], ["tech", "creatif"], "Un cadeau commun pour lire, regarder des vidéos et utiliser ses applications.", "Confirmer stockage et connectivité. Clavier et stylet ne sont pas supposés inclus."),
  gift("B0CQMWQDH4", "Amazon Fire TV Stick HD", "tech", [...adults, "couple"], ["tech"], "Pour regarder ses plateformes sur un téléviseur compatible.", "Vérifier port HDMI, Wi-Fi et abonnements nécessaires ; cette version est HD, pas 4K."),
  gift("B07BKQRWHT", "PROIRON — tapis de yoga 10 mm", "sport", [...adults, "ado"], ["sport"], "Pour les exercices au sol à la maison, si la personne pratique déjà.", "Épaisseur 10 mm : vérifier qu’elle convient à sa discipline et à ses préférences.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0DT9YPNK4", "uhlsport — ballon de football taille 5", "sport", [...adults, "ado"], ["sport"], "Pour une partie entre amis ou un amateur de football qui joue régulièrement.", "Taille 5 : vérifier l’âge du joueur et si une pompe doit être prévue."),
  gift("B07KFPCGFC", "Nuactiv — bouteille isotherme 500 ml", "sport", [...adults, "ado"], ["sport"], "Une petite attention pour les sorties, les trajets ou les journées de sport.", "Vérifier le format, le coloris et les consignes de nettoyage."),
  gift("B09G6M8JLK", "Blukar — lampe frontale rechargeable", "sport", [...adults, "ado"], ["sport"], "Pour un amateur de marche qui veut garder les mains libres le soir.", "Vérifier autonomie, résistance à l’eau et usage prévu sur la fiche fabricant."),
  gift("B0DNHRW9CR", "Amazon Basics — haltères avec support", "sport", [...adults], ["sport"], "Pour compléter un espace d’entraînement à la maison.", "Confirmer les poids de la variante. À offrir seulement si cet équipement est souhaité."),
  gift("2290391174", "La femme de ménage — Freida McFadden", "livre", [...adults], ["lecture"], "Pour un lecteur qui aime les thrillers domestiques et les rebondissements.", "Vérifier qu’il ne l’a pas déjà lu et choisir le bon format.", ["fete-des-meres", "fete-des-peres"], "mcfadden"),
  gift("2266359177", "À retardement — Franck Thilliez", "livre", [...adults], ["lecture"], "Pour un amateur de romans policiers qui apprécie déjà l’univers de Thilliez.", "Thriller adulte : vérifier les goûts du lecteur et les livres déjà possédés.", ["fete-des-meres", "fete-des-peres"]),
  gift("2253256838", "Les Heures fragiles — Virginie Grimaldi", "livre", [...adults], ["lecture"], "Pour un lecteur qui préfère les histoires de liens familiaux et d’émotions.", "Vérifier le résumé, l’édition et les lectures déjà faites.", ["fete-des-meres", "fete-des-peres"]),
  gift("B0D32M5XRL", "Les Quatre Accords toltèques", "livre", [...adults], ["lecture"], "Pour une personne qui a déjà envie de découvrir ce livre de développement personnel.", "Un choix très personnel : éviter de l’offrir comme une leçon ou un conseil non demandé."),
  gift("B01NCUSC7V", "Fisher-Price — mon trieur de formes", "bebe", ["bebe"], ["eveil"], "Pour accompagner les découvertes de formes quand bébé a l’âge de manipuler.", "Vérifier l’âge recommandé ; à offrir pour plus tard si l’enfant vient de naître.", ["naissance"]),
  gift("B07N1JP56L", "Fisher-Price — loutre câlins bonne nuit", "bebe", ["bebe"], ["eveil", "cocooning"], "Une peluche d’éveil à proposer aux parents pour les moments accompagnés.", "Suivre l’âge et les consignes du fabricant. Ne pas ajouter de peluche au couchage du nourrisson.", ["naissance"]),
  gift("B09WRG5PFD", "Ludi — cube de manipulation", "bebe", ["bebe"], ["eveil"], "Pour un bébé qui commence à explorer des manipulations variées.", "Dès 10 mois selon la fiche : cadeau à conserver pour plus tard à la naissance.", ["naissance"]),
  gift("B083DC9J5M", "Auxmir — veilleuse tactile rechargeable", "bebe", ["bebe"], ["cocooning"], "Pour les parents qui souhaitent une lumière d’appoint dans la chambre.", "Objet à installer hors de portée de bébé. Vérifier autonomie et alimentation.", ["naissance"]),
];
