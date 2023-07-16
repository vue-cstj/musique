import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const chansons = ref([])
export const texte_recherche = ref("")
export const selection = ref({})
export const selection_active = ref(false)
export const source_audio = ref(null)
export const balise_audio = ref(null)
export const temps_actuel = ref("-")
export const temps_total = ref("-")
export const progression = ref(0)
export const volume = ref(25)

// Récupérer la liste des chansons depuis le fichier JSON
fetch("chansons/chansons.json")
    .then(resp => resp.json())
    .then(fichier => {
        chansons.value = fichier
    })

// Filtrer les chansons affichées
export function filtrer(chansons) {
    const chansons_filtrees = chansons.filter(chanson => {
        const recherche = texte_recherche.value.toLowerCase()
        const titre = chanson.titre.toLowerCase()
        const artiste = chanson.artiste.toLowerCase()

        // Retourne les titres ou artistes qui incluent la recherche
        return titre.includes(recherche) || artiste.includes(recherche)
    })

    return chansons_filtrees
}

// Formater le temps des chansons au format MM:SS
export function formaterTemps(temps) {
    const minutes = Math.floor(temps / 60)
    const secondes = temps % 60
    return `${minutes}:${secondes < 10 ? '0' : ''}${secondes}`
}

// Sélectionner une chanson
export function selectionnerChanson(chanson) {
    selection_active.value = true
    selection.value = chanson
    source_audio.value = "chansons/" + selection.value.audio
    setVolume()
}

// Bascule la lecture en cours
export function toggleJouer() {
    if (balise_audio.value.paused) {
        balise_audio.value.play()
    } else {
        balise_audio.value.pause()
    }
}

// Fonction pour mettre à jour les informations de temps de lecture de l'audio
export function timeUpdate() {
    if (balise_audio.value) {
        temps_actuel.value = balise_audio.value.currentTime
        temps_total.value = balise_audio.value.duration

        // Vérifie si la durée du fichier audio est NaN
        if (isNaN(balise_audio.value.duration)) {
            progression.value = 0
        } else {
            // Calcule le pourcentage de progression de la lecture actuelle par rapport à la durée totale
            progression.value = (balise_audio.value.currentTime / balise_audio.value.duration) * 100
        }
    }
}

// Arrêter la lecture
export function arreterLecture() {
    balise_audio.value.pause()
    balise_audio.value.currentTime = 0
}

// Définir le volume audio
export function setVolume() {
    balise_audio.value.volume = volume.value / 100
}