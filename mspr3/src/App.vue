<template>
  <div id="app-container">
    <main class="main-content">
      <router-view />
    </main>

    <nav v-if="showBottomNav" class="bottom-nav">
      <router-link to="/feed" class="nav-item" active-class="active">
        <span>🏠</span>
        <small>Feed</small>
      </router-link>
      <router-link to="/create" class="nav-item" active-class="active">
        <span>➕</span>
        <small>Créer</small>
      </router-link>
      <router-link to="/profile" class="nav-item" active-class="active">
        <span>👤</span>
        <small>Profil</small>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// On cache la barre de navigation sur la page de connexion/inscription (racine '/')
const showBottomNav = computed(() => route.path !== '/');
</script>

<style>
/* Styles globaux pour le rendu mobile */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

#app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  /* Marge en bas pour ne pas que le contenu soit caché par la barre de nav */
  padding-bottom: 70px; 
}

/* Barre de navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.nav-item small {
  font-size: 12px;
  margin-top: 4px;
}

.nav-item.active {
  color: #42b883; /* Couleur de Vue.js / Active */
}
</style>