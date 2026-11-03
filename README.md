# Kado-Box

Guide de cadeaux en français : Next.js 16 / React 19 / export statique.

## Développer et vérifier

- `npm run dev -- --webpack` : aperçu local.
- `npm test` : cohérence du catalogue et des recommandations.
- `npx tsc --noEmit` : vérification TypeScript.
- `npx next build --webpack` : export de production dans `out/` (Webpack évite la restriction de ports de Turbopack dans l’environnement local).

## Sélection des cadeaux

`data/amazon-catalog.yaml` contient les données marchandes. Seuls les ASIN explicitement retenus dans `src/lib/gift-selection.ts` sont affichés au public. Pour ajouter une idée :

1. Vérifier la correspondance du produit, de sa variante, de l’image et du lien affilié dans le catalogue source.
2. Ajouter un titre court, un conseil propre au produit, une précaution et ses destinataires, envies et occasions dans la sélection.
3. Lancer les tests et le build. Les tests détectent les ASIN absents, les doublons et la perte du tag affilié.

Les importations et mises à jour de prix ne doivent pas ajouter automatiquement de nouveaux produits à la sélection. Un prix exact apparaît uniquement si le relevé Amazon date de moins de 24 heures ; les filtres de budget utilisent le dernier prix enregistré, avec une mention explicite qu’il peut avoir changé. Aucune disponibilité ni date de livraison n’est promise.

## Parcours

- `/trouver-cadeau` : filtres combinés (destinataire, budget, envie, occasion et recherche), tri, pagination et URL partageable.
- `/favoris` : liste enregistrée dans le navigateur sous `kado-box-favorites-v1`, sans compte ni serveur. Le stockage bloqué conserve les favoris pour la session.
- Les pages occasion, destinataire et budget utilisent le même moteur et affichent les produits avant les conseils.
- Les guides combinent leurs contraintes et évitent les produits sans rapport avec le sujet.

## Vérification visuelle avant publication

Accueil sur ordinateur et téléphone ; recherche « ado + 20 € maximum + jeux » ; recherche sans résultat puis remise à zéro ; ajout/retrait d’un favori, navigation et rechargement ; vérification des images, des liens Amazon et du tag `lebrunnathali-21`.

L’export local et un commit Git ne constituent pas une confirmation de déploiement public.
