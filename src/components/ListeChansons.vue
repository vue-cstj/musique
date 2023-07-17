<template>
	<ul class="liste-chansons">
		<li class="chanson" :class="{ 'chanson-active': chanson === selection }" v-for="chanson in chansons" @click="selectionner(chanson)">
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
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
const props = defineProps({
	chansons: {
		type: Array,
		required: true
	},
});

const selection = ref({});

// Formater le temps des chansons au format MM:SS
function formaterTemps(temps) {
	const minutes = Math.floor(temps / 60);
	const secondes = temps % 60;
	return `${minutes}:${secondes < 10 ? '0' : ''}${secondes}`;
}

const emit = defineEmits(['selection']);
// Sélectionner une chanson
function selectionner(chanson) {
	console.log(chanson);
	selection.value = chanson;
	emit('selection', chanson);
}

</script>

<style lang="scss">
.liste-chansons {
	height: 550px;
	font-size: 1.5rem;
	overflow-y: auto;
	border-top: 2px solid var(--gris-pale);
	border-bottom: 2px solid var(--gris-pale);

	.chanson {
		font-size: 1.25rem;
		display: flex;
		padding: 1em;
		border-bottom: 1px solid var(--gris);
		cursor: pointer;
		transition: 0.3s ease-in-out;

		&:last-child {
			border-bottom: none;
		}

		&:hover {
			background-color: var(--vert);
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
		background-color: var(--vert-pale);
		font-size: 1.5rem;
	}
}
</style>