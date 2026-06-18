<template>
  <div class="create-container">
    <div class="header">
      <h2>Nouveau Post</h2>
      <button :disabled="!isValid" @click="publishPost" class="btn-publish">Publier</button>
    </div>

    <textarea 
      v-model="content" 
      placeholder="Quoi de neuf ?" 
      rows="5" 
      maxlength="280">
    </textarea>
    
    <div class="char-counter" :class="{ 'text-red': content.length >= 280 }">
      {{ content.length }} / 280
    </div>

    <div class="media-upload">
      <input 
        type="file" 
        accept="image/*,video/*" 
        multiple 
        @change="handleFileUpload" 
        ref="fileInput" 
        style="display: none;" 
      />
      <button @click="$refs.fileInput.click()" class="btn-media">
        Ajouter Média (Vidéo ou max 4 images)
      </button>
    </div>

    <div v-if="files.length > 0" class="preview-area">
      <p>{{ files.length }} fichier(s) sélectionné(s)</p>
      <button @click="files = []" class="btn-clear">Vider</button>
    </div>
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const content = ref('');
const files = ref<File[]>([]);
const errorMsg = ref('');

const isValid = computed(() => {
  return content.value.trim().length > 0 || files.value.length > 0;
});

const handleFileUpload = (event: Event) => {
  errorMsg.value = '';
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const selectedFiles = Array.from(target.files);
  const hasVideo = selectedFiles.some(f => f.type.startsWith('video/'));

  if (hasVideo && selectedFiles.length > 1) {
    errorMsg.value = "Vous ne pouvez ajouter qu'une seule vidéo.";
    files.value = [];
    return;
  }
  if (!hasVideo && selectedFiles.length > 4) {
    errorMsg.value = "Vous pouvez ajouter un maximum de 4 images.";
    files.value = [];
    return;
  }

  files.value = selectedFiles;
};

const publishPost = async () => {
  const formData = new FormData();
  formData.append('content', content.value);
  files.value.forEach((file, index) => {
    formData.append(`media[${index}]`, file);
  });

  // Appel API de création
  console.log('Publication en cours...', content.value, files.value);
};
</script>

<style scoped>
.create-container { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
textarea { width: 100%; padding: 15px; border: none; border-radius: 12px; background: #f5f5f5; resize: none; font-size: 16px; box-sizing: border-box;}
textarea:focus { outline: none; border: 1px solid #42b883; }
.char-counter { text-align: right; font-size: 12px; color: #888; margin-top: 5px; }
.text-red { color: red; }
.btn-publish { background: #42b883; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
.btn-publish:disabled { background: #ccc; }
.media-upload { margin-top: 20px; }
.btn-media { width: 100%; padding: 15px; border: 2px dashed #ccc; background: transparent; border-radius: 12px; color: #555; }
.error-msg { color: red; margin-top: 10px; font-size: 14px; }
.preview-area { margin-top: 10px; display: flex; justify-content: space-between; align-items: center; }
.btn-clear { background: #ff4d4f; color: white; border: none; padding: 5px 10px; border-radius: 5px; }
</style>