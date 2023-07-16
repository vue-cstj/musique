import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import * as changerPage from './changerPage.js'
import * as lecteurAudio from './lecteurAudio.js'


const root = {
    setup() {
        return {
            ...changerPage,
            ...lecteurAudio,
        }
    }
}

createApp(root).mount("#app")