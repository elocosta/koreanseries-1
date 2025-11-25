<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchTMDB } from "../plugins/axios";

const route = useRoute();
const movie = ref(null);
const credits = ref(null);

onMounted(async () => {
  const id = route.params.id;

  movie.value = await fetchTMDB(
    `/movie/${id}`,
    "?language=pt-BR"
  );

  credits.value = await fetchTMDB(
    `/movie/${id}/credits`,
    "?language=pt-BR"
  );
});
</script>

<template>
  <div v-if="movie">
    <img :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" />

    <h1>{{ movie.title }}</h1>
    <p>{{ movie.overview }}</p>

    <p><strong>Data de lançamento:</strong> {{ movie.release_date }}</p>

    <h3>Elenco:</h3>
    <ul>
      <li v-for="actor in credits.cast.slice(0, 10)" :key="actor.id">
        {{ actor.name }} — {{ actor.character }}
      </li>
    </ul>
  </div>
</template>
