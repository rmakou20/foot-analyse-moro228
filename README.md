# FOOT ANALYSE MORO228

Site de football adapté au téléphone.

## Fichiers
- `index.html` : page du site
- `style.css` : design mobile
- `app.js` : affichage des matchs
- `api/matches.js` : connexion serveur à football-data.org
- `vercel.json` : configuration de déploiement

## Pour afficher les vrais matchs
Il faut déployer ce dépôt sur Vercel et ajouter une clé valide obtenue auprès de football-data.org dans les variables d’environnement Vercel sous le nom `FOOTBALL_DATA_TOKEN`. Les limites du fournisseur s’appliquent. Ne mets jamais la clé API dans un fichier public comme `app.js`.

## Déploiement
1. Importe ce dépôt GitHub dans Vercel.
2. Ajoute `FOOTBALL_DATA_TOKEN` dans les variables d’environnement.
3. Redéploie et ouvre l’adresse fournie par Vercel.

Les analyses sportives ne garantissent aucun résultat. Vérifie les informations auprès de sources fiables.
