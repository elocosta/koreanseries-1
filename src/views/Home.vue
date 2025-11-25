<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchTMDB } from "../plugins/axios";

const router = useRouter();

const koreanMovies = ref([]);
const koreanSeries = ref([]);

onMounted(async () => {
  koreanMovies.value = (await fetchTMDB("/discover/movie", "?with_original_language=ko&language=pt-BR")).results;
  koreanSeries.value = (await fetchTMDB("/discover/tv", "?with_original_language=ko&language=pt-BR")).results;
});

function openMovie(id) {
  router.push(`/movie/${id}`);
}

function openSerie(id) {
  router.push(`/serie/${id}`);
}
</script>

<template>
  <div class="home">

    <h2>Filmes Coreanos</h2>
    <div class="list">
      <div
        v-for="movie in koreanMovies"
        :key="movie.id"
        class="item"
        @click="openMovie(movie.id)"
      >
        <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" />
        <p>{{ movie.title }}</p>
      </div>
    </div>

    <h2>Séries Coreanas</h2>
    <div class="list">
      <div
        v-for="serie in koreanSeries"
        :key="serie.id"
        class="item"
        @click="openSerie(serie.id)"
      >
        <img :src="'https://image.tmdb.org/t/p/w185' + serie.poster_path" />
        <p>{{ serie.name }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.list {
    display: flex;
}
</style>
