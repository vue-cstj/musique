## Component ListeChansons.vue
1. Faire une copie de `Lecteur.vue` et le renommer `ListeChansons.vue`
2. Ne garder __que__ le `ul` dans le `template`. Oui, oui, supprimer tout le reste du `template`.
3. Ajouter la _prop_ `chansons` dans le `script` :
	```js	
	const props = defineProps({
		chansons: {
			type: Array,
			required: true
		},
	});
	```
1. Supprimer le fetch dans le `script`.
   > Remarquez que le component ne va pas chercher les données. Il les reçoit en _prop_. Ce n'est pas non plus son boulot de filtrer les données. Il ne fait qu'afficher ce qu'on lui donne.
2. Supprimer toutes les fonctions dans le `script` sauf `formaterTemps`.
3. Supprimer les constantes `texte_recherche`, `chansons`, `selection_active`, `source_audio`, `balise_audio`, `temps_actuel`, `temps_total`, `progression` et `volume`. Finalement, ne garder que `selection`.
   > Remarquez qu'on ne rend pas la variable `chansons` réactive. On ne veut pas que le component change les chansons.
4. Ajouter la fonction `selectionner` :
	```js
	const emit = defineEmits(['selection']);
	// Sélectionner une chanson
	function selectionner(chanson) {
		selection.value = chanson;
		emit('selection', chanson);
	}
	```
	> Elle a été renommée, car on se trouve maintenant dans un component ListeChansons... On ne peut pas sélectionner autre chose qu'une chanson.

	> Remarquez que la liste ne démarre plus la chanson. Ce n'est pas son boulot.

5. Dans le `template`, remplacer le `selectionnerChanson(chanson)` par `selectionner(chanson)`.
6. Et finalement le `style`. Ne garder que la règle `.liste-chansons {...}` dans `ListeChansons.vue` (supprimer le reste) et supprimer la règle `.liste-chansons {...}` dans `Lecteur.vue`.
7. Consommer le component dans `Lecteur.vue` :
	1. Ajouter le import du lecteur : `import ListeChansonsComponent from './ListeChansons.vue';`
	2. Ajouter le component dans le template : 
   	```html
	<ListeChansonsComponent 
		:chansons="chansons" 
		@selection="selectionnerChanson"
		/>
	ou
	<liste-chansons-component
		:chansons="chansons" 
		@selection="selectionnerChanson" 
		/>
	```
