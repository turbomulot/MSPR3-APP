<template>
  <div class="profile-container">
    <h2>Éditer le profil</h2>

    <div class="avatar-section">
      <img :src="previewAvatar || user.avatar" alt="Avatar" class="avatar-preview" />
      <input type="file" accept="image/*" @change="onAvatarSelected" ref="avatarInput" style="display: none" />
      <button @click="$refs.avatarInput.click()" class="btn-change-avatar">Changer la photo</button>
    </div>

    <div class="form-group">
      <label>Nom d'affichage</label>
      <input v-model="user.displayName" type="text" placeholder="Nouveau pseudo" />
    </div>

    <button @click="saveProfile" class="btn-save">Enregistrer les modifications</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// État local (idéalement initialisé via une requête API / Pinia)
const user = reactive({
  displayName: 'PseudoActuel',
  avatar: '/default-avatar.png'
});

const avatarFile = ref<File | null>(null);
const previewAvatar = ref<string | null>(null);

const onAvatarSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    avatarFile.value = target.files[0];
    // Créer une URL temporaire pour la prévisualisation
    previewAvatar.value = URL.createObjectURL(avatarFile.value);
  }
};

const saveProfile = async () => {
  const formData = new FormData();
  formData.append('displayName', user.displayName);
  if (avatarFile.value) {
    formData.append('avatar', avatarFile.value);
  }

  // Appel API PUT / PATCH sur /profile
  console.log('Sauvegarde du profil...', user.displayName, avatarFile.value);
};

onMounted(() => {
  // Fetch current user details API call here
});
</script>

<style scoped>
.profile-container { padding: 20px; }
.avatar-section { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; }
.avatar-preview { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 2px solid #42b883; }
.btn-change-avatar { background: transparent; border: 1px solid #42b883; color: #42b883; padding: 8px 16px; border-radius: 20px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 5px; color: #555; }
.form-group input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; box-sizing: border-box;}
.btn-save { width: 100%; padding: 15px; background: #42b883; color: white; border: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
</style>