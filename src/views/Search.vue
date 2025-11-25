<script setup>
import { ref, watch } from "vue";
import { fetchTMDB } from "../plugins/axios";

const query = ref("");
const results = ref([]);

watch(query, async (value) => {
  if (!value) {
    results.value = [];
    return;
  }

  const data = await fetchTMDB(
    "/search/multi",
    `?query=${value}&language=pt-BR&include_adult=false`
  );

  results.value = data.results;
});
</script>

<template>
  <div class="search">
    <input
      type="text"
      v-model="query"
      placeholder="Pesquisar filmes e séries..."
    />

    <div v-if="results.length">
      <div
        v-for="item in results"
        :key="item.id"
        class="result-item"
      >
        <img
          v-if="item.poster_path"
          :src="'https://image.tmdb.org/t/p/w185' + item.poster_path"
        />
        <p>{{ item.title || item.name }}</p>
      </div>
    </div>
  </div>
</template>
