<template>
    <main>
        <h1>La page d'accueil</h1>
        <div id="accueil">
            <router-link :to="{ name: 'musique' }">Ouvrir le lecteur</router-link>
        </div>
    </main>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss"></style>