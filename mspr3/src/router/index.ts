import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../views/LoginRegister.vue';
import Feed from '../views/Feed.vue';
import CreateContent from '../views/CreateContent.vue';
import ProfileSettings from '../views/ProfileSettings.vue';

const routes = [
  { path: '/', name: 'Auth', component: LoginRegister },
  { path: '/feed', name: 'Feed', component: Feed },
  { path: '/create', name: 'Create', component: CreateContent },
  { path: '/profile', name: 'Profile', component: ProfileSettings },
];

const router = createRouter({
  // Pour Tauri, createWebHistory fonctionne bien, mais createWebHashHistory est parfois préféré si vous avez des soucis de rafraîchissement
  history: createWebHistory(), 
  routes,
});

export default router;