import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const page_active = ref("accueil")

export function changerPage(nom_page) {
    page_active.value = nom_page
}