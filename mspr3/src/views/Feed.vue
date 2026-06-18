<template>
  <div class="feed-container">
    <div class="feed-header">
      <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Rechercher..." class="search-bar" />
      
      <div class="sort-options">
        <select v-model="sortBy" @change="fetchPosts">
          <option value="date">Plus récents</option>
          <option value="likes">All Time High</option>
          <option value="hot">Populaire</option>
        </select>
      </div>
    </div>

    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <img :src="post.author.avatar" alt="Avatar" class="avatar" />
          <span class="author-name">{{ post.author.displayName }}</span>
        </div>
        
        <p class="post-content">{{ post.text }}</p>
        
        <div v-if="post.media && post.media.length" class="post-media">
          <video v-if="post.mediaType === 'video'" :src="post.media[0]" controls></video>
          <div v-else class="image-grid">
            <img v-for="(img, index) in post.media" :key="index" :src="img" alt="Post image" />
          </div>
        </div>

        <div class="post-actions">
          <button @click="likePost(post.id)" :class="{ liked: post.isLiked }">
            ❤️ {{ post.likesCount }}
          </button>
          <button @click="openComments(post.id)">
            💬 {{ post.commentsCount }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const searchQuery = ref('');
const sortBy = ref('date');
const posts = ref<any[]>([]); 

const fetchPosts = async () => {
  posts.value = [
    {
      id: 1, text: "Mon premier post !", likesCount: 42, commentsCount: 5, isLiked: false,
      author: { displayName: "Alice", avatar: "default.png" },
      mediaType: "image", media: [] 
    }
  ];
};

const handleSearch = () => {
  fetchPosts();
};

const likePost = async (postId: number) => {
  console.log('Like post', postId);
};

const openComments = (postId: number) => {
  console.log('Ouvrir commentaires', postId);
};

onMounted(fetchPosts);
</script>

<style scoped>
.feed-container { padding: 10px; padding-bottom: 80px; }
.feed-header { display: flex; gap: 10px; margin-bottom: 15px; }
.search-bar { flex: 1; padding: 10px; border-radius: 20px; border: 1px solid #ddd; }
.sort-options select { padding: 10px; border-radius: 20px; border: 1px solid #ddd; background: white; }
.post-card { background: white; padding: 15px; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }
.author-name { font-weight: bold; }
.post-actions { display: flex; gap: 15px; margin-top: 10px; }
.post-actions button { background: none; border: none; font-size: 16px; display: flex; align-items: center; gap: 5px; }
.liked { color: red; }
.image-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; }
.image-grid img { width: 100%; border-radius: 8px; }
video { width: 100%; border-radius: 8px; }
</style>