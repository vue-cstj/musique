# Musique

## Differences
| Avant (composition)                         | Après (component)                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Ne peut être réutilisé dans d'autres pages. | Peut être réutilisé dans d'autres pages seulement en incluant le component où l'on veut. |
| Est plus simple pour un projet simple       | Peut-être _facilement_ augmenté au fur et à mesure que le projet grossit|


1. Placer le dossier `DEPART/chansons` dans le dossier `public`
2. Faire une copie de `components/Component.vue` et le renommer `components/Lecteur.vue`
3. Ouvrir et adapter le fichier `Lecteur.vue` :
   1. Ouvrir le fichier `DEPART/index.html` et copier le __contenu__ de la balise `<div id="app" ...>` dans le `template`, à la place du contenu original.
   2. Enlever les attributs `v-if` des balises.
   3. Ouvrir le fichier `DEPART/js/lecteurAudio.js` et copier tout le contenu dans le `script`.
   4. Ouvrir le fichier `DEPART/css/style.scss` :
      1. Copier la section `COULEURS` dans le style.
      2. Copier la règle `#lecteur` dans le style.
   5. Supprimer la ligne `import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'` et décommenter la ligne `// import { ref ... } from 'vue';`
   6. Puisque les fonctions se trouvent maintenant dans le fichier `Lecteur.vue`, on n'a plus besoin de les importer, donc on n'a plus besoin de les exporter. Enlever toutes les occurences du mot `export`.
4.  Consommer le component dans `Index.vue` :
   1.  Ajouter le import du lecteur : `import LecteurComponent from '@/components/Lecteur.vue';`
   2.  Ajouter le component dans le template : `<LecteurComponent />` ou `<lecteur-component/>`
5.  Dans le terminal, lancer la commande `npm install`.
6.  Dans le terminal, lancer la commande `npm run dev` et ouvrir le navigateur à l'adresse `http://localhost:5173/`. Le lecteur devrait s'afficher.

## Mettre à sa main
1. Créer les routes pour les pages `accueil` et `lecteur`.
2. Utiliser des variables css pour les couleurs.
3. Créer des sous-components.
4. Utiliser un prop afin de rendre le component plus générique.