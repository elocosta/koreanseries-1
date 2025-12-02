<script setup>
import { useFavorites } from "../stores/useFavorites";
import { RouterLink } from "vue-router";

const { favorites } = useFavorites();
</script>

<template>
  <div class="fav-container">
    <h1>Seus Favoritos</h1>

    <div v-if="favorites.length === 0" class="empty">
      Nenhum favorito adicionado ainda.
    </div>

    <div class="fav-grid">
      <RouterLink v-for="item in favorites" :key="item.id + item.type"
        :to="item.type === 'movie' ? '/movie/' + item.id : '/serie/' + item.id" class="fav-card">
        <img :src="'https://image.tmdb.org/t/p/w300' + item.poster" class="fav-poster" />

        <p class="fav-title">{{ item.title }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.fav-container {
  padding: 5vw;
  color: white;
}

.fav-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.fav-card {
  width: 160px;
  text-decoration: none;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
}

.fav-poster {
  width: 160px;
  border-radius: 10px;
}

.fav-card:hover {
  transform: scale(1.03);
}

.fav-title {
  margin-top: 8px;
  font-weight: 600;
}

.empty {
  font-size: 1.2rem;
  opacity: 0.7;
}
</style>
