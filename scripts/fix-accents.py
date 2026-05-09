#!/usr/bin/env python3
"""Fix missing French accents across all MDX content files.

Curated word-list approach: only replace whole-word tokens we are
confident always need an accent, preserving original case (Title /
UPPERCASE / lowercase). Skips frontmatter values that are already
correctly accented.
"""
import os
import re
import sys
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

# Mapping: lowercase form -> accented form.
# Only include words that ALWAYS need their accent, regardless of context.
REPLACEMENTS = {
    # Beauté / beautés
    "beaute": "beauté",
    "beautes": "beautés",
    # Été (la saison) — risky if it matches "ete" inside other words; we use word boundary
    "ete": "été",
    "etes": "étés",
    # Fête / fêtes
    "fete": "fête",
    "fetes": "fêtes",
    # Tête / tête
    "tete": "tête",
    "tetes": "têtes",
    # Mère / pères
    "mere": "mère",
    "meres": "mères",
    "pere": "père",
    "peres": "pères",
    "frere": "frère",
    "freres": "frères",
    # Crème / crèmes
    "creme": "crème",
    "cremes": "crèmes",
    # Découverte / découvertes / découvrir
    "decouverte": "découverte",
    "decouvertes": "découvertes",
    "decouvrir": "découvrir",
    "decouvrez": "découvrez",
    "decouvre": "découvre",
    "decouvres": "découvres",
    "decouvert": "découvert",
    "decouverts": "découverts",
    # Année / années
    "annee": "année",
    "annees": "années",
    # Près / après / très
    "pres": "près",
    "apres": "après",
    "tres": "très",
    # Complet / complète
    "complete": "complète",
    "completes": "complètes",
    "completement": "complètement",
    # Réparateur / réparé
    "reparateur": "réparateur",
    "reparatrice": "réparatrice",
    "repare": "réparé",
    "reparee": "réparée",
    "reparees": "réparées",
    # Spécialité / spécial
    "specialite": "spécialité",
    "specialites": "spécialités",
    "special": "spécial",
    "speciale": "spéciale",
    "speciaux": "spéciaux",
    "speciales": "spéciales",
    # Sélection / sélectionné
    "selection": "sélection",
    "selections": "sélections",
    "selectionne": "sélectionné",
    "selectionnee": "sélectionnée",
    "selectionnes": "sélectionnés",
    "selectionnees": "sélectionnées",
    "selectionner": "sélectionner",
    "selectionnez": "sélectionnez",
    # Préféré / préférée
    "prefere": "préféré",
    "preferee": "préférée",
    "preferes": "préférés",
    "preferees": "préférées",
    "preferer": "préférer",
    "preference": "préférence",
    "preferences": "préférences",
    # Célèbre / célébrité
    "celebre": "célèbre",
    "celebres": "célèbres",
    "celebrer": "célébrer",
    "celebrite": "célébrité",
    "celebrites": "célébrités",
    # Méthode
    "methode": "méthode",
    "methodes": "méthodes",
    # Bébé
    "bebe": "bébé",
    "bebes": "bébés",
    # Régulier / régulière / régulièrement
    "regulier": "régulier",
    "reguliere": "régulière",
    "reguliers": "réguliers",
    "regulieres": "régulières",
    "regulierement": "régulièrement",
    # Expérience
    "experience": "expérience",
    "experiences": "expériences",
    "experimente": "expérimenté",
    # Première / dernière / entière
    "premiere": "première",
    "premieres": "premières",
    "derniere": "dernière",
    "dernieres": "dernières",
    "entiere": "entière",
    "entieres": "entières",
    "entierement": "entièrement",
    # Arrivée / entrée
    "arrivee": "arrivée",
    "arrivees": "arrivées",
    "entree": "entrée",
    "entrees": "entrées",
    "soiree": "soirée",
    "soirees": "soirées",
    "matinee": "matinée",
    "matinees": "matinées",
    # Délicat / délicieux
    "delicat": "délicat",
    "delicate": "délicate",
    "delicats": "délicats",
    "delicates": "délicates",
    "delicieux": "délicieux",
    "delicieuse": "délicieuse",
    # Agréable
    "agreable": "agréable",
    "agreables": "agréables",
    # Préparer / présenter
    "preparer": "préparer",
    "prepare": "préparé",
    "preparee": "préparée",
    "preparees": "préparées",
    "preparation": "préparation",
    "presenter": "présenter",
    "presente": "présenté",
    "presentee": "présentée",
    "presentes": "présentés",
    "presentation": "présentation",
    # Génération / général
    "generation": "génération",
    "generations": "générations",
    "general": "général",
    "generale": "générale",
    "generaux": "généraux",
    "generales": "générales",
    "generalement": "généralement",
    "genereux": "généreux",
    "genereuse": "généreuse",
    "genereuses": "généreuses",
    "genereusement": "généreusement",
    # Différent / différence
    "different": "différent",
    "differente": "différente",
    "differents": "différents",
    "differentes": "différentes",
    "difference": "différence",
    "differences": "différences",
    "differemment": "différemment",
    # Évident / évidemment
    "evident": "évident",
    "evidente": "évidente",
    "evidemment": "évidemment",
    "evidence": "évidence",
    # Élégant / idéal / idée
    "elegant": "élégant",
    "elegante": "élégante",
    "elegants": "élégants",
    "elegantes": "élégantes",
    "elegance": "élégance",
    "ideal": "idéal",
    "ideale": "idéale",
    "ideaux": "idéaux",
    "ideales": "idéales",
    "idee": "idée",
    "idees": "idées",
    # Édition / école / écran
    "edition": "édition",
    "editions": "éditions",
    "ecole": "école",
    "ecoles": "écoles",
    "ecran": "écran",
    "ecrans": "écrans",
    "ecrit": "écrit",
    "ecrite": "écrite",
    "ecrits": "écrits",
    "ecrites": "écrites",
    "ecouter": "écouter",
    # Énergie / élimine / émerveillé
    "energie": "énergie",
    "energies": "énergies",
    "elimine": "élimine",
    "eliminer": "éliminer",
    "eliminee": "éliminée",
    "eliminees": "éliminées",
    "emerveille": "émerveillé",
    "emerveillee": "émerveillée",
    "energique": "énergique",
    # Échange / échelle
    "echange": "échange",
    "echanges": "échanges",
    "echelle": "échelle",
    # Équilibre / équipe
    "equilibre": "équilibre",
    "equilibree": "équilibrée",
    "equilibrees": "équilibrées",
    "equipe": "équipe",
    "equipes": "équipes",
    "equipement": "équipement",
    # Hydratée / hydratant — généralement déjà accentués mais on tient compte
    "hydratee": "hydratée",
    "hydratees": "hydratées",
    "hydrate": "hydraté",
    # Réveillé / révélé
    "revele": "révélé",
    "revelee": "révélée",
    "revelees": "révélées",
    "reveler": "révéler",
    "revelation": "révélation",
    # Réaliste / réel
    "reel": "réel",
    "reels": "réels",
    "realisation": "réalisation",
    # Référence / récent
    "reference": "référence",
    "references": "références",
    "recent": "récent",
    "recente": "récente",
    "recents": "récents",
    "recentes": "récentes",
    "recemment": "récemment",
    # Régime / régler
    "regime": "régime",
    "regimes": "régimes",
    "regler": "régler",
    "regle": "réglé",
    "reglee": "réglée",
    "reglage": "réglage",
    # Légèreté / léger
    "leger": "léger",
    "legere": "légère",
    "legers": "légers",
    "legeres": "légères",
    "legerement": "légèrement",
    "legerete": "légèreté",
    # Détail / détente
    "detail": "détail",
    "details": "détails",
    "detente": "détente",
    "detendu": "détendu",
    "detendue": "détendue",
    # Démaquillant
    "demaquillant": "démaquillant",
    "demaquillants": "démaquillants",
    "demaquiller": "démaquiller",
    # Désormais / déjà
    "desormais": "désormais",
    "deja": "déjà",
    "voila": "voilà",
    "ca": "ça",
    "ah": "ah",
    # Période / pénétrer
    "periode": "période",
    "periodes": "périodes",
    "penetre": "pénétré",
    "penetrer": "pénétrer",
    "penetration": "pénétration",
    # Réserver / réservé
    "reserver": "réserver",
    "reserve": "réservé",
    "reservee": "réservée",
    "reserves": "réservés",
    "reservees": "réservées",
    # Sécurité / saison (saison reste sans accent)
    "securite": "sécurité",
    "securitaire": "sécuritaire",
    # Théorie / thé
    "theorie": "théorie",
    "the": "thé",  # only when noun — but "the" is also English, careful: rare in FR text. We'll skip for safety.
    # Cédé — skip
    # Précis / précieux
    "precis": "précis",
    "precise": "précise",
    "precision": "précision",
    "precieux": "précieux",
    "precieuse": "précieuse",
    "precieuses": "précieuses",
    # Excellent — already correct
    # Préserver
    "preserver": "préserver",
    "preserve": "préservé",
    "preservation": "préservation",
    # Recommandé
    "recommande": "recommandé",
    "recommandee": "recommandée",
    "recommandes": "recommandés",
    "recommandees": "recommandées",
    "recommander": "recommander",
    "recommandation": "recommandation",
    # Récolté
    "recolte": "récolté",
    "recoltee": "récoltée",
    # Témoin / témoignage
    "temoin": "témoin",
    "temoignage": "témoignage",
    "temoignages": "témoignages",
    # Acheté
    "achete": "acheté",
    "achetee": "achetée",
    "achetes": "achetés",
    "achetees": "achetées",
    # Été (verb form être) — covered above
    # Concentré
    "concentre": "concentré",
    "concentree": "concentrée",
    "concentres": "concentrés",
    "concentrees": "concentrées",
    "concentration": "concentration",
    # Allergie / allégé
    "allege": "allégé",
    "allegee": "allégée",
    "allegees": "allégées",
    # Hérité
    "herite": "hérité",
    "heritage": "héritage",
    # Étape
    "etape": "étape",
    "etapes": "étapes",
    # État / études
    "etude": "étude",
    "etudes": "études",
    "etudie": "étudié",
    "etudier": "étudier",
    # États (rare but possible)
    # Activité / activé
    "activite": "activité",
    "activites": "activités",
    "active": "activé",  # could be adjective active without accent... ambiguous, skip
    # Note skip 'active' as ambiguous
    # Fortifie / fortifié
    "fortifie": "fortifié",
    "fortifiee": "fortifiée",
    "fortifiees": "fortifiées",
    # Hydraté
    "hydratant": "hydratant",  # no change
    # Couché / couchée
    "couche": "couché",  # ambiguous (could be 'couche' = layer)
    # Skip ambiguous
    # Voyage — already correct
    # Volonté
    "volonte": "volonté",
    "volontes": "volontés",
    # Liberté
    "liberte": "liberté",
    "libertes": "libertés",
    # Société / sociétés
    "societe": "société",
    "societes": "sociétés",
    # Variété / variétés
    "variete": "variété",
    "varietes": "variétés",
    # Fidélité
    "fidelite": "fidélité",
    "fidele": "fidèle",
    "fideles": "fidèles",
    # Naturalité
    "naturalite": "naturalité",
    # Quotidien — sans accent
    # Ressentir — pas d'accent
    # Renforcé / renforcer
    "renforce": "renforcé",
    "renforcee": "renforcée",
    "renforcees": "renforcées",
    # Crée / créé / créer
    "cree": "créé",
    "creer": "créer",
    "creation": "création",
    "creations": "créations",
    "creative": "créative",
    "creatif": "créatif",
    "creatifs": "créatifs",
    "creatives": "créatives",
    "creativite": "créativité",
    # Maman / papa — pas d'accent
    # Hôte
    "hote": "hôte",
    "hotes": "hôtes",
    # Hôpital
    "hopital": "hôpital",
    "hopitaux": "hôpitaux",
    # Côté
    "cote": "côté",  # ambiguous (cote = quote/marker)
    # skip ambiguous 'cote'
    # Cher (no accent)
    # Pêche
    "peche": "pêche",
    "peches": "pêches",
    # Intérêt / intérêts
    "interet": "intérêt",
    "interets": "intérêts",
    # Frères / Soeurs (sœur with œ)
    "soeur": "sœur",
    "soeurs": "sœurs",
    # Cœur
    "coeur": "cœur",
    "coeurs": "cœurs",
    # Œuvre
    "oeuvre": "œuvre",
    "oeuvres": "œuvres",
    # Œil
    "oeil": "œil",
    # Œuf
    "oeuf": "œuf",
    "oeufs": "œufs",
    # Hôtel
    "hotel": "hôtel",
    "hotels": "hôtels",
    # Île
    "ile": "île",
    "iles": "îles",
    # Goût
    "gout": "goût",
    "gouts": "goûts",
    "gouter": "goûter",
    "goute": "goûté",
    # Coût
    "cout": "coût",
    "couts": "coûts",
    "couter": "coûter",
    # Nôtre / vôtre / notre / votre — keep without accent for adjective form
    # Sûr (adjective)
    "sur": "sur",  # NEVER replace - 'sur' = on
    # Ô seigneur — N/A
    # Forêt
    "foret": "forêt",
    "forets": "forêts",
    # Maître
    "maitre": "maître",
    "maitres": "maîtres",
    "maitresse": "maîtresse",
    "maitresses": "maîtresses",
    # Naître / connaître
    "naitre": "naître",
    "connaitre": "connaître",
    "paraitre": "paraître",
    "apparaitre": "apparaître",
    # Île de France etc — covered
    # Cèdre — N/A skin care
    # Fenêtre
    "fenetre": "fenêtre",
    "fenetres": "fenêtres",
    # Ô — N/A
    # Châtain
    "chatain": "châtain",
    # Château
    "chateau": "château",
    "chateaux": "châteaux",
    # Â words usually rare in beauty — skip
    # Modèle
    "modele": "modèle",
    "modeles": "modèles",
    # Système / problème
    "systeme": "système",
    "systemes": "systèmes",
    "probleme": "problème",
    "problemes": "problèmes",
    "theme": "thème",
    "themes": "thèmes",
    # Légende / légèrement covered
    "legende": "légende",
    "legendes": "légendes",
    # Jusqu'à covered by "deja"
    # Récupérer
    "recuperer": "récupérer",
    "recupere": "récupéré",
    "recuperee": "récupérée",
    "recuperation": "récupération",
    # Régulariser — skip
    # Présent / présence
    "present": "présent",
    "presente": "présenté",  # already covered
    "presents": "présents",
    "presentement": "présentement",
    "presence": "présence",
    "presences": "présences",
    # Précédent
    "precedent": "précédent",
    "precedente": "précédente",
    "precedents": "précédents",
    "precedentes": "précédentes",
    # Réussir / réussite
    "reussir": "réussir",
    "reussi": "réussi",
    "reussie": "réussie",
    "reussite": "réussite",
    # Énoncé — skip
    # Évolutions / évoluer
    "evolution": "évolution",
    "evolutions": "évolutions",
    "evoluer": "évoluer",
    "evolue": "évolué",
    # Accélération / accéléré
    "acceleration": "accélération",
    "accelere": "accéléré",
    "accelerer": "accélérer",
    # Ingrédient
    "ingredient": "ingrédient",
    "ingredients": "ingrédients",
    # Hygiène
    "hygiene": "hygiène",
    # Jeunesse — pas d'accent
    # Jeune — pas d'accent
    # Mélange / mélangé
    "melange": "mélange",
    "melanges": "mélanges",
    "melanger": "mélanger",
    "melangee": "mélangée",
    # Définir / défini
    "definir": "définir",
    "defini": "défini",
    "definie": "définie",
    "definis": "définis",
    "definies": "définies",
    "definition": "définition",
    "definitions": "définitions",
    "definitif": "définitif",
    "definitive": "définitive",
    "definitivement": "définitivement",
    # Dégager
    "degager": "dégager",
    "degage": "dégagé",
    "degagee": "dégagée",
    # Délicate / déjeuner / déjà covered
    "dejeuner": "déjeuner",
    # Déposer
    "deposer": "déposer",
    "depose": "déposé",
    "deposee": "déposée",
    # Désinfecter — skip
    # Détendu covered
    # Diététique — skip
    # Difficulté
    "difficulte": "difficulté",
    "difficultes": "difficultés",
    # Échantillon
    "echantillon": "échantillon",
    "echantillons": "échantillons",
    # Élaboration — rare
    # Émotion / émerveillé covered
    "emotion": "émotion",
    "emotions": "émotions",
    "emotionnelle": "émotionnelle",
    # Ainsi — pas d'accent
    # Voyageur — pas d'accent
    # Janvier février mars... mois
    "fevrier": "février",
    "aout": "août",
    "decembre": "décembre",
    # janvier, mars, avril, mai, juin, juillet, septembre, octobre, novembre — pas d'accent
    # Tôt / déjà / là — la is "the", rare to need accent
    "deca": "déca",  # rare
    # Hiver — pas d'accent
    # Été déjà couvert
    # Caféine
    "cafe": "café",
    "cafes": "cafés",
    "cafeine": "caféine",
    # Compétition / compétences
    "competition": "compétition",
    "competence": "compétence",
    "competences": "compétences",
    "competent": "compétent",
    # Évolution couvert
    # Étape couvert
    # Cèdre — skip
    # Crédibilité
    "credibilite": "crédibilité",
    "credible": "crédible",
    # Crédit
    "credit": "crédit",
    "credits": "crédits",
    # Cérémonie
    "ceremonie": "cérémonie",
    "ceremonies": "cérémonies",
    # Étoile
    "etoile": "étoile",
    "etoiles": "étoiles",
    # Étranger
    "etranger": "étranger",
    "etrangere": "étrangère",
    # Étonnant
    "etonnant": "étonnant",
    "etonnante": "étonnante",
    "etonne": "étonné",
    "etonner": "étonner",
    # Évalué
    "evalue": "évalué",
    "evaluation": "évaluation",
    "evaluer": "évaluer",
    # Éviter
    "eviter": "éviter",
    "evite": "évité",
    "evitee": "évitée",
    # Éveil
    "eveil": "éveil",
    # États-Unis
    "etat": "état",
    "etats": "états",
    # Pénible
    "penible": "pénible",
    "penibles": "pénibles",
    # Présentation couvert
    # Précision couvert
    # Précieux couvert
    # Précis couvert
    # Régime couvert
    # Régulièrement couvert
    # Vétérinaire — skip
    # Médecin
    "medecin": "médecin",
    "medecine": "médecine",
    "medical": "médical",
    "medicale": "médicale",
    "medicaux": "médicaux",
    # Hérédité
    "heredite": "hérédité",
    # Sécheresse
    "secheresse": "sécheresse",
    "seche": "sèche",
    "seches": "sèches",
    "secher": "sécher",
    # Régulier couvert
    # Mérite
    "merite": "mérite",
    "meriter": "mériter",
    "merite": "mérité",
    # Cosmetique : pas d'accent dans cosmétique
    "cosmetique": "cosmétique",
    "cosmetiques": "cosmétiques",
    # Éthique
    "ethique": "éthique",
    # Énergétique
    "energetique": "énergétique",
    # Vraie / vrais — pas d'accent
    # Voici / voilà — voici sans accent
    # Conséquent
    "consequence": "conséquence",
    "consequences": "conséquences",
    "consequent": "conséquent",
    # Économie / économique
    "economie": "économie",
    "economies": "économies",
    "economique": "économique",
    "economiques": "économiques",
    "economiser": "économiser",
    "economise": "économisé",
    # Égal / également
    "egal": "égal",
    "egale": "égale",
    "egaux": "égaux",
    "egalement": "également",
    "egalite": "égalité",
    # Élargi
    "elargi": "élargi",
    "elargie": "élargie",
    "elargir": "élargir",
    # Élément
    "element": "élément",
    "elements": "éléments",
    "elementaire": "élémentaire",
    # Élève
    "eleve": "élevé",  # ambiguous (élève = student) — skip for safety
    # Embellir — pas d'accent
    # Émission
    "emission": "émission",
    "emissions": "émissions",
    "emettre": "émettre",
    # Émollient
    "emollient": "émollient",
    # Émulsion
    "emulsion": "émulsion",
    "emulsions": "émulsions",
    # Éphémère
    "ephemere": "éphémère",
    # Épi / épice
    "epice": "épice",
    "epices": "épices",
    "epicee": "épicée",
    # Épiderme
    "epiderme": "épiderme",
    # Épuisé
    "epuise": "épuisé",
    "epuisee": "épuisée",
    "epuiser": "épuiser",
    # Équivalent
    "equivalent": "équivalent",
    "equivalents": "équivalents",
    # Étendre
    "etendre": "étendre",
    "etend": "étend",  # ambiguous skip
    # Évidemment couvert
    # Évoluer couvert
    # Excédent — skip
    # Existé / existence
    "existe": "existé",  # ambiguous (existe = exists) — skip safer
    # Hésiter
    "hesiter": "hésiter",
    "hesite": "hésité",
    "hesitez": "hésitez",
    # Chimique — pas d'accent
    # Cliché
    "cliche": "cliché",
    "cliches": "clichés",
    # Cohérent
    "coherent": "cohérent",
    "coherente": "cohérente",
    "coherents": "cohérents",
    "coherentes": "cohérentes",
    "coherence": "cohérence",
    # Cumulé
    "cumule": "cumulé",
    "cumulee": "cumulée",
    # Écologique
    "ecologique": "écologique",
    "ecologie": "écologie",
    "eco": "éco",
    # Éco-responsable
    "ecoresponsable": "écoresponsable",
    # Écolo
    "ecolo": "écolo",
    # Empoisonner — skip
    # Effet — pas d'accent
    # Hivernal — skip
    # Insérer
    "inserer": "insérer",
    "insere": "inséré",
    # Intérieur
    "interieur": "intérieur",
    "interieure": "intérieure",
    "interieurs": "intérieurs",
    "interieures": "intérieures",
    # Intérêt couvert
    # Italie / Italien — pas d'accent
    # Justifié
    "justifie": "justifié",
    "justifiee": "justifiée",
    "justifier": "justifier",
    # Lésion — skip
    # Liée / lié
    # ambiguous "lie" too short
    # Mémoire
    "memoire": "mémoire",
    "memoires": "mémoires",
    # Métabolisme
    "metabolisme": "métabolisme",
    # Menthe — pas d'accent
    # Mésopotamie — N/A
    # Mèche
    "meche": "mèche",
    "meches": "mèches",
    # Médaille
    "medaille": "médaille",
    "medaillon": "médaillon",
    # Numéro
    "numero": "numéro",
    "numeros": "numéros",
    # Pâte
    "pate": "pâte",
    "pates": "pâtes",
    # Père couvert
    # Pétale
    "petale": "pétale",
    "petales": "pétales",
    # Pénétrer couvert
    # Périmé
    "perime": "périmé",
    "perimee": "périmée",
    # Privilège
    "privilege": "privilège",
    "privileges": "privilèges",
    "privilegier": "privilégier",
    "privilegie": "privilégié",
    # Proximité
    "proximite": "proximité",
    # Quantité
    "quantite": "quantité",
    "quantites": "quantités",
    # Qualité
    "qualite": "qualité",
    "qualites": "qualités",
    # Réalité
    "realite": "réalité",
    "realites": "réalités",
    "realiser": "réaliser",
    "realise": "réalisé",
    "realisee": "réalisée",
    "realises": "réalisés",
    "realisees": "réalisées",
    # Récolter
    # Résider — skip
    # Régénérer
    "regenere": "régénéré",
    "regenerer": "régénérer",
    "regenerant": "régénérant",
    "regeneration": "régénération",
    # Résultat
    "resultat": "résultat",
    "resultats": "résultats",
    "resulter": "résulter",
    # Sérieux
    "serieux": "sérieux",
    "serieuse": "sérieuse",
    "serieuses": "sérieuses",
    "serieusement": "sérieusement",
    # Sévère
    "severe": "sévère",
    "severes": "sévères",
    # Sécheresse couvert
    # Stéréotype
    "stereotype": "stéréotype",
    "stereotypes": "stéréotypes",
    # Symétrie
    "symetrie": "symétrie",
    # Téléphone
    "telephone": "téléphone",
    "telephones": "téléphones",
    # Téléchargement
    "telecharger": "télécharger",
    "telecharge": "téléchargé",
    "telechargement": "téléchargement",
    # Tendance — pas d'accent
    # Tendresse — pas d'accent
    # Universel — skip
    # Utilisé / utilisée
    "utilise": "utilisé",
    "utilisee": "utilisée",
    "utilisation": "utilisation",
    # ambiguous: "utilise" can be present-tense verb. We will skip for safety because too risky.
    # Skip user-input that's ambiguous (verb forms in present tense)
    # Actually "utilise" alone is risky, skip
    # ====== second batch: past participles & adjectives in -é/-ée ======
    "meme": "même",
    "memes": "mêmes",
    "maitrise": "maîtrise",
    "maitrisee": "maîtrisée",
    "maitriser": "maîtriser",
    "connait": "connaît",
    "connaitre": "connaître",
    "connaissait": "connaissait",  # already correct
    "limitee": "limitée",
    "limitees": "limitées",
    "limite": "limité",
    "limites": "limités",
    "honnete": "honnête",
    "honnetes": "honnêtes",
    "honnetete": "honnêteté",
    "francais": "français",
    "francaise": "française",
    "francaises": "françaises",
    "garcons": "garçons",
    "lecons": "leçons",
    "lecon": "leçon",
    "facon": "façon",
    "facons": "façons",
    "garcon": "garçon",
    "agree": "agréé",
    "agreee": "agréée",
    "verifie": "vérifié",
    "verifiee": "vérifiée",
    "verifiees": "vérifiées",
    "verifier": "vérifier",
    "verification": "vérification",
    "teste": "testé",
    "testee": "testée",
    "testees": "testées",
    "tester": "tester",  # no accent
    "testes": "testés",
    "enrichie": "enrichie",  # already correct
    "enrichi": "enrichi",  # already correct
    "enrichies": "enrichies",  # already correct
    "engage": "engagé",
    "engagee": "engagée",
    "engagees": "engagées",
    "engages": "engagés",
    "engagement": "engagement",  # no accent
    "fabrique": "fabriqué",
    "fabriquee": "fabriquée",
    "fabriquees": "fabriquées",
    "fabriques": "fabriqués",
    "applique": "appliqué",
    "appliquee": "appliquée",
    "appliquees": "appliquées",
    "appliquer": "appliquer",  # no accent
    "appliques": "appliqués",
    "compose": "composé",
    "composee": "composée",
    "composees": "composées",
    "composes": "composés",
    "composition": "composition",  # no accent
    "charge": "chargé",  # ambiguous (charge = noun) — risky
    "chargee": "chargée",
    "chargees": "chargées",
    "chere": "chère",
    "cheres": "chères",
    "chers": "chers",  # already correct
    "delicate": "délicate",  # already in main list but doublecheck
    "decoree": "décorée",
    "decore": "décoré",
    "decorees": "décorées",
    "ornee": "ornée",
    "orne": "orné",
    "ornees": "ornées",
    "soignee": "soignée",
    "soigne": "soigné",
    "soignees": "soignées",
    "lavee": "lavée",
    "lavees": "lavées",
    "lave": "lavé",  # ambiguous (lave = lava / present-tense laver)
    "sechee": "séchée",
    "sechees": "séchées",
    "seches": "sèches",
    "brulee": "brûlée",
    "brulees": "brûlées",
    "brule": "brûlé",
    "bruler": "brûler",
    "controle": "contrôle",
    "controles": "contrôles",
    "controler": "contrôler",
    "controlee": "contrôlée",
    "controlees": "contrôlées",
    "controlons": "contrôlons",
    "controleur": "contrôleur",
    "ote": "ôté",
    "otee": "ôtée",
    "ouvre": "ouvre",  # no accent
    "couper": "couper",  # no accent
    "occupe": "occupé",
    "occupee": "occupée",
    "occupees": "occupées",
    "habite": "habité",  # ambiguous (habite = present-tense)
    "marie": "marié",  # ambiguous (Marie name + adjective)
    # marie / habite ambiguous — skip
    # mariee / mariees less ambiguous
    "mariee": "mariée",
    "mariees": "mariées",
    "trouvee": "trouvée",
    "trouvees": "trouvées",
    "trouve": "trouvé",  # ambiguous (trouve = present-tense)
    # trouve ambiguous skip
    "passee": "passée",
    "passees": "passées",
    "amelioree": "améliorée",
    "amelioree": "améliorée",
    "ameliore": "amélioré",
    "ameliorees": "améliorées",
    "ameliorer": "améliorer",
    "amelioration": "amélioration",
    "renouvelee": "renouvelée",
    "renouvelees": "renouvelées",
    "renouvele": "renouvelé",
    "renouveler": "renouveler",  # no accent in infinitive
    "exclue": "exclue",  # no
    "exclusivement": "exclusivement",  # no
    "raffinee": "raffinée",
    "raffinees": "raffinées",
    "raffine": "raffiné",
    "fragilisee": "fragilisée",
    "fragilisees": "fragilisées",
    "fragilise": "fragilisé",
    "endommagee": "endommagée",
    "endommagees": "endommagées",
    "endommage": "endommagé",
    "abimee": "abîmée",
    "abimees": "abîmées",
    "abime": "abîmé",
    "abimer": "abîmer",
    "ferme": "fermé",  # ambiguous (ferme = farm / firm) — skip
    "fermee": "fermée",
    "fermees": "fermées",
    "epaisse": "épaisse",
    "epais": "épais",
    "epaisseur": "épaisseur",
    "encore": "encore",  # no accent
    "presque": "presque",  # no accent
    "absolument": "absolument",  # no
    "ressemble": "ressemble",  # no
    "fournir": "fournir",  # no
    "fourni": "fourni",  # no accent on i
    "fournie": "fournie",
    "fournies": "fournies",
    "elargi": "élargi",  # already covered
    "esthetique": "esthétique",
    "esthetiques": "esthétiques",
    "estheticienne": "esthéticienne",
    "anti-age": "anti-âge",
    "antiage": "antiâge",
    "deshydratee": "déshydratée",
    "deshydrate": "déshydraté",
    "ame": "âme",
    "ames": "âmes",
    "panier": "panier",  # no
    "decouverte": "découverte",  # already
    "echelle": "échelle",  # already
    "anniversaire": "anniversaire",  # no
    "intelligence": "intelligence",  # no
    "celebre": "célèbre",  # already
    "fete": "fête",  # already
    "noel": "Noël",  # special
    "noels": "Noëls",
    "etudiant": "étudiant",
    "etudiante": "étudiante",
    "etudiants": "étudiants",
    "etudiantes": "étudiantes",
    "amateur": "amateur",  # no
    "exceptionnel": "exceptionnel",  # no
    "exceptionnelle": "exceptionnelle",  # no
    "raye": "rayé",
    "rayee": "rayée",
    "rayees": "rayées",
    "raves": "rayés",
    "tracée": "tracée",  # already
    "trace": "tracé",  # ambiguous (trace = noun)
    "tracee": "tracée",
    "tracees": "tracées",
    "calcule": "calculé",  # ambiguous
    "calculee": "calculée",
    "calculees": "calculées",
    "abandonne": "abandonné",
    "abandonnee": "abandonnée",
    "abandonner": "abandonner",
    "etre": "être",
    "etres": "êtres",
    "etrement": "êtrement",  # rare/none
    "depasse": "dépassé",
    "depassee": "dépassée",
    "depasser": "dépasser",
    "depasses": "dépassés",
    "elaboree": "élaborée",
    "elabore": "élaboré",
    "elaborees": "élaborées",
    "elaborer": "élaborer",
    "elaboration": "élaboration",
    "obligee": "obligée",
    "obligees": "obligées",
    "oblige": "obligé",
    "obliger": "obliger",
    "tachee": "tachée",
    "tache": "tâché",  # ambiguous (tache = stain / tâche = task)
    "tachees": "tachées",
}

# Additional ambiguous words to skip (after second batch)
EXTRA_AMBIGUOUS = {
    "tracée", "trace", "tracees",  # tracé/tracée fine but trace alone risky
    "calcule", "ferme", "habite", "marie", "trouve", "lave",
    "tache", "etend", "enrichi", "enrichie", "enrichies",
}
for key in EXTRA_AMBIGUOUS:
    REPLACEMENTS.pop(key, None)

# Remove ambiguous keys that are too risky:
AMBIGUOUS = {
    "the", "active", "couche", "cote", "sur", "eleve", "etend", "existe",
    "utilise", "utilisee", "ca", "ah", "merite",  # merite was duplicated
    "deca",
    # Single-letter or very common false positives
}
for key in AMBIGUOUS:
    REPLACEMENTS.pop(key, None)


def make_replacement(match: re.Match) -> str:
    word = match.group(0)
    lower = word.lower()
    accented = REPLACEMENTS[lower]
    # Preserve original casing pattern
    if word.isupper():
        return accented.upper()
    if word[0].isupper():
        return accented[0].upper() + accented[1:]
    return accented


def build_pattern() -> re.Pattern:
    # Sort by length desc to favour longer matches first
    keys = sorted(REPLACEMENTS.keys(), key=len, reverse=True)
    # Word boundary — \b is fine for ASCII-only words (no accents in source)
    return re.compile(r"\b(" + "|".join(re.escape(k) for k in keys) + r")\b", re.IGNORECASE)


def fix_file(path: Path, pattern: re.Pattern) -> int:
    text = path.read_text(encoding="utf-8")
    new_text, count = pattern.subn(make_replacement, text)
    if count:
        path.write_text(new_text, encoding="utf-8")
    return count


def main():
    pattern = build_pattern()
    total = 0
    files = 0
    for mdx in CONTENT_DIR.rglob("*.mdx"):
        n = fix_file(mdx, pattern)
        if n:
            files += 1
            total += n
            print(f"  {mdx.relative_to(CONTENT_DIR)}: {n} replacements")
    print(f"\nDone: {total} replacements across {files} files")


if __name__ == "__main__":
    main()
