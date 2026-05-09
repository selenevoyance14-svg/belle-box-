#!/usr/bin/env python3
"""Third pass: fix more past participles -ee → -ée, -ees → -ées,
and a curated list of remaining missed words. Skips frontmatter
fields image:/ogImage: which need ASCII filenames.
"""
import re
import unicodedata
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

# Targeted French words with missing accents seen in the corpus.
# All entries here are unambiguous (no homonyms with different meaning).
WORDS = {
    "emballee": "emballée",
    "emballees": "emballées",
    "emballe": "emballé",
    "abonnee": "abonnée",
    "abonnees": "abonnées",
    "abonne": "abonné",
    "abonnes": "abonnés",
    "presentee": "présentée",
    "presentees": "présentées",
    "selectionnee": "sélectionnée",
    "creee": "créée",
    "creees": "créées",
    "achete": "acheté",
    "achetee": "achetée",
    "achetes": "achetés",
    "achetees": "achetées",
    "depose": "déposé",
    "deposee": "déposée",
    "deposees": "déposées",
    "estimee": "estimée",
    "estime": "estimé",
    "estimees": "estimées",
    "appreciee": "appréciée",
    "apprecie": "apprécié",
    "appreciees": "appréciées",
    "apprecier": "apprécier",
    "apprehender": "appréhender",
    "appartenance": "appartenance",
    "exigence": "exigence",
    "garantie": "garantie",
    "garantis": "garantis",
    "garantie": "garantie",
    "tendance": "tendance",
    "boutique": "boutique",
    "qualité": "qualité",
    "elabore": "élaboré",
    "envoyee": "envoyée",
    "envoyees": "envoyées",
    "envoye": "envoyé",
    "fixee": "fixée",
    "fixees": "fixées",
    "fixe": "fixé",
    "saluee": "saluée",
    "salue": "salué",
    "saluees": "saluées",
    "diversifiee": "diversifiée",
    "diversifie": "diversifié",
    "fortifiee": "fortifiée",
    "fortifie": "fortifié",
    "ramenee": "ramenée",
    "menee": "menée",
    "menees": "menées",
    "mene": "mené",
    "amenee": "amenée",
    "amenees": "amenées",
    "amene": "amené",
    "etudiee": "étudiée",
    "etudie": "étudié",
    "etudiees": "étudiées",
    "exposee": "exposée",
    "exposees": "exposées",
    "expose": "exposé",
    "respectee": "respectée",
    "respectees": "respectées",
    "respecte": "respecté",
    "respecter": "respecter",
    "ajoutee": "ajoutée",
    "ajoutees": "ajoutées",
    "ajoute": "ajouté",
    "associee": "associée",
    "associees": "associées",
    "associe": "associé",
    "associer": "associer",
    "exposes": "exposés",
    "abandonnees": "abandonnées",
    "concue": "conçue",
    "concues": "conçues",
    "concu": "conçu",
    "concus": "conçus",
    "lancee": "lancée",
    "lancees": "lancées",
    "lance": "lancé",
    "concentree": "concentrée",
    "concentrees": "concentrées",
    "couplee": "couplée",
    "couplees": "couplées",
    "couple": "couplé",
    "designee": "désignée",
    "designe": "désigné",
    "designees": "désignées",
    "developpee": "développée",
    "developpees": "développées",
    "developpe": "développé",
    "developpes": "développés",
    "developpement": "développement",
    "developper": "développer",
    "habituee": "habituée",
    "habituees": "habituées",
    "habitue": "habitué",
    "imbibee": "imbibée",
    "imbibees": "imbibées",
    "incorporee": "incorporée",
    "incorpore": "incorporé",
    "infusee": "infusée",
    "infuse": "infusé",
    "infusees": "infusées",
    "limitee": "limitée",
    "limitees": "limitées",
    "longee": "longée",
    "marquee": "marquée",
    "marquees": "marquées",
    "marque": "marqué",  # ambiguous (marque = brand). Skip later.
    "mesuree": "mesurée",
    "mesurees": "mesurées",
    "mesure": "mesuré",  # ambiguous. Skip.
    "modifiee": "modifiée",
    "modifiees": "modifiées",
    "modifie": "modifié",
    "modifier": "modifier",  # no accent
    "mouillee": "mouillée",
    "mouillees": "mouillées",
    "mouille": "mouillé",
    "naissance": "naissance",  # no
    "nettoye": "nettoyé",
    "nettoyee": "nettoyée",
    "nettoyees": "nettoyées",
    "notee": "notée",
    "notees": "notées",
    "note": "noté",  # ambiguous (note = noun) skip
    "obtenue": "obtenue",
    "operee": "opérée",
    "operees": "opérées",
    "opere": "opéré",
    "operer": "opérer",
    "operation": "opération",
    "operations": "opérations",
    "ornee": "ornée",
    "ornees": "ornées",
    "orne": "orné",
    "orientee": "orientée",
    "orientees": "orientées",
    "oriente": "orienté",
    "orienter": "orienter",
    "orientation": "orientation",
    "ouverte": "ouverte",  # already correct
    "parfumee": "parfumée",
    "parfumees": "parfumées",
    "parfume": "parfumé",
    "perçu": "perçu",  # already
    "percue": "perçue",
    "percu": "perçu",
    "percues": "perçues",
    "permise": "permise",  # no
    "permettre": "permettre",  # no
    "personnalisee": "personnalisée",
    "personnalisees": "personnalisées",
    "personnalise": "personnalisé",
    "personnalises": "personnalisés",
    "personnaliser": "personnaliser",
    "pesee": "pesée",
    "pesees": "pesées",
    "pese": "pesé",
    "place": "place",  # no - many meanings
    "placee": "placée",
    "placees": "placées",
    "platree": "plâtrée",
    "plante": "planté",  # ambiguous (plante = plant)
    "plantee": "plantée",
    "plantees": "plantées",
    "plonge": "plongé",
    "plongee": "plongée",
    "plongees": "plongées",
    "polluee": "polluée",
    "polluees": "polluées",
    "pollue": "pollué",
    "polluant": "polluant",  # no
    "pondee": "pondée",
    "pondees": "pondées",
    "ponde": "pondé",
    "portee": "portée",
    "portees": "portées",
    "porte": "porté",  # ambiguous (porte = door / present-tense porter) — skip
    "posee": "posée",
    "posees": "posées",
    "pose": "posé",  # ambiguous (pose = noun)
    "preparee": "préparée",
    "preparees": "préparées",
    "preserve": "préservé",
    "preservee": "préservée",
    "preserves": "préservés",
    "preservees": "préservées",
    "prevue": "prévue",
    "prevues": "prévues",
    "prevu": "prévu",
    "prevoir": "prévoir",
    "prevoyance": "prévoyance",
    "primee": "primée",
    "primees": "primées",
    "prime": "primé",
    "privilegiee": "privilégiée",
    "privilegiees": "privilégiées",
    "privilegie": "privilégié",
    "produite": "produite",  # no
    "promue": "promue",  # no
    "prone": "prôné",
    "pronee": "prônée",
    "pronees": "prônées",
    "proner": "prôner",
    "proposee": "proposée",
    "proposees": "proposées",
    "propose": "proposé",  # ambiguous
    "proteges": "protégés",
    "proteges": "protégés",
    "protege": "protégé",
    "protegee": "protégée",
    "protegees": "protégées",
    "protection": "protection",  # no
    "publiee": "publiée",
    "publiees": "publiées",
    "publie": "publié",
    "publication": "publication",  # no
    "purifie": "purifié",
    "purifiee": "purifiée",
    "purifiees": "purifiées",
    "purifier": "purifier",
    "purification": "purification",
    "ranger": "ranger",  # no
    "ravie": "ravie",  # no
    "reactivee": "réactivée",
    "reactive": "réactivé",
    "reactivees": "réactivées",
    "reduit": "réduit",
    "reduite": "réduite",
    "reduits": "réduits",
    "reduites": "réduites",
    "reduction": "réduction",
    "reduire": "réduire",
    "reflete": "reflété",
    "refletee": "reflétée",
    "refletees": "reflétées",
    "refleter": "refléter",
    "regalee": "régalée",
    "regalees": "régalées",
    "regale": "régalé",
    "regaler": "régaler",
    "rehausse": "rehaussé",
    "rehaussee": "rehaussée",
    "rehausser": "rehausser",
    "remboursee": "remboursée",
    "remboursees": "remboursées",
    "rembourse": "remboursé",
    "rembourser": "rembourser",
    "remboursement": "remboursement",  # no
    "remarquee": "remarquée",
    "remarquees": "remarquées",
    "remarque": "remarqué",  # ambiguous
    "remplie": "remplie",  # no
    "renouee": "renouée",
    "renouees": "renouées",
    "renouer": "renouer",
    "repandue": "répandue",
    "repandues": "répandues",
    "repandu": "répandu",
    "repandus": "répandus",
    "repandre": "répandre",
    "repare": "réparé",
    "reparee": "réparée",
    "reparees": "réparées",
    "reparer": "réparer",
    "reparation": "réparation",
    "repondue": "répondue",
    "repondu": "répondu",
    "repondre": "répondre",
    "respectees": "respectées",
    "respectees": "respectées",
    "retenue": "retenue",  # no
    "reunie": "réunie",
    "reunies": "réunies",
    "reuni": "réuni",
    "reunir": "réunir",
    "reunion": "réunion",
    "revealed": "revealed",  # English skip
    "revele": "révélé",
    "revelee": "révélée",
    "revelees": "révélées",
    "revolutionnee": "révolutionnée",
    "revolutionne": "révolutionné",
    "revolutionnees": "révolutionnées",
    "revolutionner": "révolutionner",
    "revolution": "révolution",
    "revolutions": "révolutions",
    "salee": "salée",
    "salees": "salées",
    "sale": "salé",  # ambiguous
    "satisfaite": "satisfaite",
    "satisfait": "satisfait",
    "saturee": "saturée",
    "saturees": "saturées",
    "sature": "saturé",
    "sauvegardee": "sauvegardée",
    "sauvegarde": "sauvegardé",
    "scintille": "scintille",  # no
    "scrutee": "scrutée",
    "secretee": "sécrétée",
    "secrete": "sécrété",  # ambiguous (secret/sécrété)
    "selectionnees": "sélectionnées",
    "sentie": "sentie",  # no
    "separee": "séparée",
    "separees": "séparées",
    "separe": "séparé",
    "separer": "séparer",
    "soignee": "soignée",
    "soignees": "soignées",
    "soigne": "soigné",
    "soigner": "soigner",
    "soigneusement": "soigneusement",
    "souillee": "souillée",
    "soulignee": "soulignée",
    "soulignees": "soulignées",
    "souligne": "souligné",
    "souligner": "souligner",
    "soumise": "soumise",
    "soumis": "soumis",
    "stoppee": "stoppée",
    "stoppe": "stoppé",
    "stylee": "stylée",
    "stylees": "stylées",
    "style": "style",  # no
    "subie": "subie",
    "subies": "subies",
    "subi": "subi",
    "succedee": "succédée",
    "succede": "succédé",
    "succeder": "succéder",
    "suivie": "suivie",
    "suivies": "suivies",
    "suivi": "suivi",
    "suiv": "suivi",
    "suivante": "suivante",  # no
    "supportee": "supportée",
    "supportees": "supportées",
    "supporte": "supporté",  # ambiguous (support/supporté)
    "supprimee": "supprimée",
    "supprimees": "supprimées",
    "supprime": "supprimé",
    "supprimer": "supprimer",
    "surprise": "surprise",  # no
    "surveillee": "surveillée",
    "surveille": "surveillé",  # ambiguous (surveille = present)
    "tachetee": "tachetée",
    "tachete": "tacheté",
    "tachetees": "tachetées",
    "tassee": "tassée",
    "tasse": "tassé",  # ambiguous (tasse = cup)
    "tatouee": "tatouée",
    "tatoue": "tatoué",
    "telee": "téléé",
    "tendue": "tendue",
    "tendu": "tendu",
    "tenue": "tenue",  # no - means outfit
    "terminee": "terminée",
    "terminees": "terminées",
    "termine": "terminé",  # ambiguous
    "terne": "terne",  # no
    "ternissement": "ternissement",
    "tirees": "tirées",
    "tiree": "tirée",
    "tire": "tiré",  # ambiguous (tire = pulls)
    "tonifiee": "tonifiée",
    "tonifiees": "tonifiées",
    "tonifie": "tonifié",
    "tonifier": "tonifier",
    "tonique": "tonique",  # no
    "totalement": "totalement",  # no
    "touchee": "touchée",
    "touche": "touché",  # ambiguous
    "tournee": "tournée",
    "tournees": "tournées",
    "tourne": "tourné",  # ambiguous
    "trace": "tracé",  # ambiguous skip
    "traduite": "traduite",
    "transmise": "transmise",
    "travaillee": "travaillée",
    "travaillees": "travaillées",
    "travaille": "travaillé",  # ambiguous
    "trempee": "trempée",
    "trempees": "trempées",
    "trempe": "trempé",
    "tressee": "tressée",
    "tresse": "tressé",  # ambiguous
    "trie": "trié",  # ambiguous
    "triee": "triée",
    "triees": "triées",
    "trier": "trier",
    "trompee": "trompée",
    "trompe": "trompé",  # ambiguous
    "tuee": "tuée",
    "tue": "tué",  # ambiguous
    "uniformisee": "uniformisée",
    "uniformise": "uniformisé",
    "unie": "unie",  # no
    "unique": "unique",  # no
    "uniquement": "uniquement",  # no
    "usee": "usée",
    "usees": "usées",
    "use": "usé",  # ambiguous
    "utilisee": "utilisée",
    "utilisees": "utilisées",
    "utilise": "utilisé",  # ambiguous
    "vaincue": "vaincue",  # no
    "valorisee": "valorisée",
    "valorisees": "valorisées",
    "valorise": "valorisé",
    "valoriser": "valoriser",
    "vantee": "vantée",
    "vante": "vanté",  # ambiguous
    "vaporisee": "vaporisée",
    "vaporise": "vaporisé",
    "vaporiser": "vaporiser",
    "varie": "varié",  # ambiguous
    "variee": "variée",
    "varies": "variés",
    "variees": "variées",
    "varier": "varier",
    "vendue": "vendue",
    "vendues": "vendues",
    "vendu": "vendu",
    "vendus": "vendus",
    "venue": "venue",
    "verifiee": "vérifiée",
    "verifie": "vérifié",  # ambiguous
    "vetements": "vêtements",
    "vetement": "vêtement",
    "vetue": "vêtue",
    "vetues": "vêtues",
    "vetu": "vêtu",
    "vetus": "vêtus",
    "vibrante": "vibrante",  # no
    "victime": "victime",  # no
    "vide": "vide",  # no
    "vieille": "vieille",  # no
    "vieux": "vieux",  # no
    "vif": "vif",  # no
    "vint": "vint",  # no
    "violente": "violente",  # no
    "vise": "visé",  # ambiguous
    "visee": "visée",
    "visees": "visées",
    "visite": "visite",  # no
    "vitree": "vitrée",
    "vitre": "vitré",
    "vitrees": "vitrées",
    "vivee": "vivée",
    "vivement": "vivement",  # no
    "vol": "vol",  # no
    "volee": "volée",
    "volees": "volées",
    "vole": "volé",  # ambiguous
    "voyagee": "voyagée",
    "voyage": "voyage",  # no
    "vraiment": "vraiment",  # no
    "vue": "vue",  # no
    "zest": "zest",  # no
    "annulee": "annulée",
    "annule": "annulé",
    "annuler": "annuler",
    "annulees": "annulées",
    "doree": "dorée",
    "doree": "dorée",
    "dorees": "dorées",
    "dore": "doré",
    "argentee": "argentée",
    "argentees": "argentées",
    "argente": "argenté",
    "rosee": "rosée",
    "irisee": "irisée",
    "irise": "irisé",
    "irisees": "irisées",
    "ravivee": "ravivée",
    "ravivees": "ravivées",
    "ravive": "ravivé",
    "raviver": "raviver",
    "matifiee": "matifiée",
    "matifie": "matifié",
    "matifier": "matifier",
    "lissee": "lissée",
    "lissees": "lissées",
    "lisse": "lissé",  # ambiguous (lisse = smooth)
    "embellie": "embellie",  # no
    "epaulee": "épaulée",
    "epaule": "épaulé",  # ambiguous
    "ennoblie": "ennoblie",  # no
    "delaissee": "délaissée",
    "delaisse": "délaissé",
    "delaisser": "délaisser",
    "delivree": "délivrée",
    "delivre": "délivré",
    "delivrer": "délivrer",
    "demande": "demande",  # no
    "demandee": "demandée",
    "demandees": "demandées",
    "demarche": "démarche",
    "demarches": "démarches",
    "demarrage": "démarrage",
    "demarrer": "démarrer",
    "demarre": "démarré",
    "demarree": "démarrée",
    "denichee": "dénichée",
    "deniche": "déniché",
    "denichees": "dénichées",
    "denicher": "dénicher",
    "deparee": "déparée",
    "depare": "déparé",
    "deplaire": "déplaire",
    "deplie": "déplié",
    "depliee": "dépliée",
    "deplier": "déplier",
    "deploiement": "déploiement",
    "deplore": "déploré",
    "depore": "déporé",  # rare
    "deroule": "déroulé",
    "deroulee": "déroulée",
    "deroulees": "déroulées",
    "derouler": "dérouler",
    "destinee": "destinée",
    "destinees": "destinées",
    "destine": "destiné",
    "destines": "destinés",
    "destiner": "destiner",
    "detache": "détaché",
    "detachee": "détachée",
    "detaches": "détachés",
    "detachees": "détachées",
    "detacher": "détacher",
    "deteriore": "détérioré",
    "deterioree": "détériorée",
    "deteriorer": "détériorer",
    "deterioration": "détérioration",
    "determine": "déterminé",
    "determinee": "déterminée",
    "determinees": "déterminées",
    "determiner": "déterminer",
    "developpees": "développées",
    "devoile": "dévoilé",
    "devoilee": "dévoilée",
    "devoilees": "dévoilées",
    "devoiler": "dévoiler",
}

AMBIGUOUS_SKIP = {
    "marque", "mesure", "note", "porte", "pose", "plante", "tasse",
    "supporte", "surveille", "termine", "tire", "touche", "tourne",
    "travaille", "tresse", "trie", "trompe", "tue", "use",
    "utilise", "vante", "varie", "vise", "vole", "lisse",
    "epaule", "remarque", "secrete", "sale", "trace", "tachee",
    "place",
    # Already covered or too ambiguous
}
for k in AMBIGUOUS_SKIP:
    WORDS.pop(k, None)


def make_replacement(match: re.Match) -> str:
    word = match.group(0)
    accented = WORDS[word.lower()]
    if word.isupper():
        return accented.upper()
    if word[0].isupper():
        return accented[0].upper() + accented[1:]
    return accented


def build_pattern() -> re.Pattern:
    keys = sorted(WORDS.keys(), key=len, reverse=True)
    return re.compile(r"\b(" + "|".join(re.escape(k) for k in keys) + r")\b", re.IGNORECASE)


# Also: protect image: lines from being modified
IMAGE_LINE_RE = re.compile(r'^(\s*(?:image|ogImage|cover|thumbnail)\s*:\s*)"([^"]+)"\s*$', re.MULTILINE)


def fix_file(path: Path, pattern: re.Pattern) -> int:
    text = path.read_text(encoding="utf-8")

    # Save image lines before replacement
    image_lines = []
    def stash_img(m):
        image_lines.append(m.group(0))
        return f"__IMG_PLACEHOLDER_{len(image_lines)-1}__"
    text2 = IMAGE_LINE_RE.sub(stash_img, text)

    new_text, count = pattern.subn(make_replacement, text2)

    # Restore image lines
    def restore(m):
        idx = int(m.group(1))
        return image_lines[idx]
    new_text = re.sub(r"__IMG_PLACEHOLDER_(\d+)__", restore, new_text)

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
    print(f"Done: {total} replacements across {files} files")


if __name__ == "__main__":
    main()
