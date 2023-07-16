<template>
	<audio :src="(source_audio ?? 'chansons/empty.mp3')" autoplay ref="balise_audio" @timeupdate="timeUpdate()" @ended="arreterLecture"></audio>
	<div id="accueil">
		<a class="btn-lecteur" href="#" @click.prevent="changerPage('lecteur')">Ouvrir le lecteur</a>
	</div>
	<div id="lecteur">
		<div class="entete">
			<a class="btn-accueil" href="#" @click.prevent="changerPage('accueil')">Retour</a>
			<input class="barre-recherche" type="text" v-model="texte_recherche" placeholder="Recherche...">
		</div>
		<ul class="liste-chansons">
			<li class="chanson" :class="{ 'chanson-active': chanson === selection }" v-for="chanson of filtrer(chansons)" @click="selectionnerChanson(chanson)">
				<div class="titre">
					<p> {{ chanson.titre }}</p>
				</div>
				<div class="artiste">
					<p>{{ chanson.artiste }}</p>
				</div>
				<div class="temps">
					<p>{{ formaterTemps(chanson.temps) }}</p>
				</div>
			</li>
		</ul>
		<div v-if="selection_active == true" class="informations">
			<img :src="'chansons/' + selection.image" alt="">
			<div class="controles">
				<div class="progression">
					<p class="temps-actuel">
						{{ temps_actuel && !isNaN(temps_actuel) ? formaterTemps(temps_actuel.toFixed(0)) : '--:--'
						}}
					</p>
					<div class="barre-progression">
						<div class="barre-progression-remplie" :style="{ width: progression + '%' }"></div>
					</div>
					<p class="temps-total">
						{{ temps_total && !isNaN(temps_total) ? formaterTemps(temps_total.toFixed(0)) : '--:--' }}
					</p>
				</div>
				<span class="material-symbols-outlined" @click="toggleJouer()">
					{{ balise_audio && !balise_audio.paused ? 'pause_circle' : 'play_circle' }}
				</span>
			</div>
			<div class="barre-volume">
				<input type="range" min="0" max="100" v-model="volume" @input="setVolume">
				<p class="pourcentage-volume">
					{{ 'volume: (' + (balise_audio.volume * 100).toFixed(0) + '%)' }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
const props = defineProps({
	// ...
});

const chansons = ref([]);
const texte_recherche = ref("");
const selection = ref({});
const selection_active = ref(false);
const source_audio = ref(null);
const balise_audio = ref(null);
const temps_actuel = ref("-");
const temps_total = ref("-");
const progression = ref(0);
const volume = ref(25);

// Récupérer la liste des chansons depuis le fichier JSON
fetch("chansons/chansons.json")
	.then(resp => resp.json())
	.then(fichier => {
		chansons.value = fichier;
	});

// Filtrer les chansons affichées
function filtrer(chansons) {
	const chansons_filtrees = chansons.filter(chanson => {
		const recherche = texte_recherche.value.toLowerCase();
		const titre = chanson.titre.toLowerCase();
		const artiste = chanson.artiste.toLowerCase();

		// Retourne les titres ou artistes qui incluent la recherche
		return titre.includes(recherche) || artiste.includes(recherche);
	});

	return chansons_filtrees;
}

// Formater le temps des chansons au format MM:SS
function formaterTemps(temps) {
	const minutes = Math.floor(temps / 60);
	const secondes = temps % 60;
	return `${minutes}:${secondes < 10 ? '0' : ''}${secondes}`;
}

// Sélectionner une chanson
function selectionnerChanson(chanson) {
	selection_active.value = true;
	selection.value = chanson;
	source_audio.value = "chansons/" + selection.value.audio;
	setVolume();
}

// Bascule la lecture en cours
function toggleJouer() {
	if (balise_audio.value.paused) {
		balise_audio.value.play();
	} else {
		balise_audio.value.pause();
	}
}

// Fonction pour mettre à jour les informations de temps de lecture de l'audio
function timeUpdate() {
	if (balise_audio.value) {
		temps_actuel.value = balise_audio.value.currentTime;
		temps_total.value = balise_audio.value.duration;

		// Vérifie si la durée du fichier audio est NaN
		if (isNaN(balise_audio.value.duration)) {
			progression.value = 0;
		} else {
			// Calcule le pourcentage de progression de la lecture actuelle par rapport à la durée totale
			progression.value = (balise_audio.value.currentTime / balise_audio.value.duration) * 100;
		}
	}
}

// Arrêter la lecture
function arreterLecture() {
	balise_audio.value.pause();
	balise_audio.value.currentTime = 0;
}

// Définir le volume audio
function setVolume() {
	balise_audio.value.volume = volume.value / 100;
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');

/***************
** COULEURS
***************/

$noir: #111;
$blanc: #f8f8f8;
$gris: #888;
$gris-pale: lighten($gris, 35%);
$gris-fonce: darken($gris, 30%);
$vert: darkslategray;
$vert-pale: lighten($vert, 15%);


/***************
** LECTEUR
***************/

#lecteur {
	width: 1200px;
	height: 850px;
	background-color: $gris-fonce;
	border-radius: 10px;

	.entete {
		height: 125px;
		padding: 1.5em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 2px solid $noir;

		.barre-recherche {
			background-color: $gris-pale;
			font-size: 1.5rem;
			padding: 0.2em 0.4em;
			border-radius: 6px;
		}
	}

	.liste-chansons {
		height: 550px;
		font-size: 1.5rem;
		overflow-y: auto;
		border-top: 2px solid $gris-pale;
		border-bottom: 2px solid $gris-pale;

		.chanson {
			font-size: 1.25rem;
			display: flex;
			padding: 1em;
			border-bottom: 1px solid $gris;
			cursor: pointer;
			transition: 0.3s ease-in-out;

			&:last-child {
				border-bottom: none;
			}

			&:hover {
				background-color: $vert;
				font-size: 1.5rem;
			}

			.titre {
				width: 55%;
			}

			.artiste {
				width: 40%;
			}

			.temps {
				width: 5%;
			}

		}

		.chanson-active {
			background-color: $vert-pale;
			font-size: 1.5rem;
		}
	}

	.informations {
		height: 175px;
		display: flex;
		padding: 1.25em;
		display: flex;
		justify-content: space-between;

		.controles {
			width: 800px;
			padding: 1em;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.progression {
				display: flex;
				align-items: center;
				margin-bottom: 0.5rem;

				.barre-progression {
					width: 100%;
					height: 7px;
					background-color: $gris-pale;
					margin: 0 1rem;
				}

				.barre-progression-remplie {
					height: 100%;
					background-color: $vert-pale;
					width: 0;
				}

				.temps-actuel,
				.temps-total {
					width: 35px;
				}
			}

			.material-symbols-outlined {
				color: lighten(firebrick, 10%);
				font-size: 80px;
				display: flex;
				justify-content: center;
				cursor: pointer;
			}

		}

		.barre-volume {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			input[type="range"] {
				width: 100%;
				height: 10px;
				background-color: $gris-pale;
				border-radius: 5px;
				appearance: none;
				margin: 0 1rem;

				&::-webkit-slider-thumb {
					appearance: none;
					width: 20px;
					height: 20px;
					background-color: $vert-pale;
					border-radius: 50%;
					cursor: pointer;
				}

				&::-moz-range-thumb {
					width: 20px;
					height: 20px;
					background-color: $vert-pale;
					border-radius: 50%;
					cursor: pointer;
				}

			}

			.pourcentage-volume {
				margin-top: 0.5rem;
			}
		}
	}
}
</style>