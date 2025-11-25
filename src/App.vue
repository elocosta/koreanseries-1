<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goSearch() {
  router.push("/search");
}
</script>

<template>
  <div id="app">

    <!-- Botão separado para Search.vue -->
    <button @click="goSearch" class="search-btn">
      Pesquisar
    </button>

    <!-- Onde Home, Search, MovieDetails e SerieDetails aparecem -->
    <router-view />
  </div>
</template>



<style scoped>
.search-btn {
  padding: 10px 20px;
  margin: 15px;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
