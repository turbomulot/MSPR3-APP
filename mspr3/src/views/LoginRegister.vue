<template>
  <div class="auth-container">
    <div class="header">
      <h1>{{ isLogin ? 'Connexion' : 'Inscription' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div v-if="!isLogin" class="form-group">
        <label>Nom d'affichage</label>
        <input v-model="form.displayName" type="text" placeholder="Votre pseudo" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="email@exemple.com" required />
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input v-model="form.password" type="password" placeholder="********" required />
      </div>

      <button type="submit" class="btn-primary">
        {{ isLogin ? 'Se connecter' : 'Créer un compte' }}
      </button>
    </form>

    <p class="toggle-mode" @click="isLogin = !isLogin">
      {{ isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true);
const form = reactive({
  displayName: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  if (isLogin.value) {
    // Appel API pour Login
    console.log('Connexion avec', form.email, form.password);
    router.push('/feed')
  } else {
    // Appel API pour Register
    console.log('Inscription avec', form.displayName, form.email, form.password);
    router.push('/feed')
  }
};
</script>

<style scoped>
.auth-container { padding: 20px; display: flex; flex-direction: column; height: 100vh; justify-content: center; }
.form-group { margin-bottom: 15px; }
.form-group input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; margin-top: 5px; }
.btn-primary { width: 100%; padding: 15px; background: #42b883; color: white; border: none; border-radius: 8px; font-weight: bold; }
.toggle-mode { margin-top: 20px; text-align: center; color: #42b883; cursor: pointer; }
</style>