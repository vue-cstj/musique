import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/Index.vue';
import MusiqueView from '../views/Musique.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'accueil',
            component: IndexView
        },
        {
            path: '/musique',
            name: 'musique',
            component: MusiqueView
        },
    ]
});

export default router;
