<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchTMDB } from "../plugins/axios";

const route = useRoute();
const serie = ref(null);
const credits = ref(null);

onMounted(async () => {
  const id = route.params.id;

  serie.value = await fetchTMDB(
    `/tv/${id}`,
    "?language=pt-BR"
  );

  credits.value = await fetchTMDB(
    `/tv/${id}/credits`,
    "?language=pt-BR"
  );
});
</script>

<template>
  <div v-if="serie">
    <img :src="'https://image.tmdb.org/t/p/w342' + serie.poster_path" />

    <h1>{{ serie.name }}</h1>
    <p>{{ serie.overview }}</p>

    <p><strong>Data de lançamento:</strong> {{ serie.first_air_date }}</p>

    <h3>Elenco:</h3>
    <ul>
      <li v-for="actor in credits.cast.slice(0, 10)" :key="actor.id">
        {{ actor.name }} — {{ actor.character }}
      </li>
    </ul>
  </div>
</template>
