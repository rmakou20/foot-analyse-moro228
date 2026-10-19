# FOOT ANALYSE MORO228

Version corrigée du site, adaptée au téléphone.

## Correction principale
Le code précédent utilisait football-data.org et attendait la variable `FOOTBALL_DATA_TOKEN`, alors que le projet est configuré avec API-Football et la variable `API_FOOTBALL_KEY`. L’API du serveur a été adaptée à API-Football v3.

## Fichiers
- `index.html` : page du site
- `style.css` : design mobile
- `app.js` : chargement et affichage des matchs
- `api/matches.js` : appel serveur à API-Football
- `vercel.json` : configuration Vercel

## Configuration Vercel nécessaire
Dans le projet Vercel, Settings → Environment Variables :
- Name : `API_FOOTBALL_KEY`
- Value : ta clé API-Football privée
- Environment : `Production` (et Preview si tu veux tester les prévisualisations)

Après avoir importé ces fichiers dans le dépôt GitHub relié à Vercel, lance un nouveau déploiement. La clé ne doit jamais être placée dans `app.js` ou dans un fichier public.

## Fonctionnement
Le serveur appelle `https://v3.football.api-sports.io/fixtures` avec la date du jour et le fuseau `Europe/Paris`. Il transforme les données en cartes pour le site et renvoie des messages d’erreur compréhensibles si la clé ou le quota pose problème.

L’API peut légitimement renvoyer zéro match pour une date donnée. Les quotas et limites du compte API-Football s’appliquent.
