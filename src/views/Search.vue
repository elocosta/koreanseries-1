<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchTMDB } from "../plugins/axios";

const router = useRouter();

const query = ref("");
const results = ref([]);
const defaultResults = ref([]);

/* Navegar para detalhes (corrigido para usar /serie/:id) */
function goToDetails(item) {
  // ignora pessoas
  if (item.media_type === "person") return;

  // Decide se é filme ou série:
  // - filmes costumam ter `title`
  // - séries costumam ter `name`
  const isMovie = item.media_type === "movie" || Boolean(item.title);
  const isSerie = item.media_type === "tv" || Boolean(item.name);

  if (isMovie) {
    router.push(`/movie/${item.id}`);
  } else if (isSerie) {
    // rota do seu projeto é /serie/:id (em português)
    router.push(`/serie/${item.id}`);
  }
}

/* Carregar filmes e séries coreanas como exemplos */
onMounted(async () => {
  const movies = await fetchTMDB(
    "/discover/movie",
    "?with_original_language=ko&language=pt-BR"
  );

  const series = await fetchTMDB(
    "/discover/tv",
    "?with_original_language=ko&language=pt-BR"
  );

  defaultResults.value = [...movies.results, ...series.results]
    .sort(() => Math.random() - 0.5)
    .slice(0, 14);
});

watch(query, async (value) => {
  if (!value) {
    results.value = [];
    return;
  }

  const data = await fetchTMDB(
    "/search/multi",
    `?query=${value}&language=pt-BR&include_adult=false`
  );

  // Se media_type estiver ausente, usa title/name para decidir.
  results.value = data.results.filter((item) => {
    // remover pessoas
    if (item.media_type === "person") return false;

    // checar idioma (alguns itens de search podem não ter original_language)
    if (item.original_language && item.original_language !== "ko") return false;

    // aceitar se for movie/tv explicitamente
    if (item.media_type === "movie" || item.media_type === "tv") return true;

    // ou aceitar se faltar media_type mas tiver title (filme) ou name (serie)
    if (!item.media_type && (item.title || item.name)) return true;

    return false;
  });
});
</script>

<template>
  <div class="search">
    <div class="search-bar">
      <input class="search-input" type="text" v-model="query" placeholder="Pesquisar..." />
    </div>

    <!-- exemplos -->
    <div v-if="!query.length" class="results-grid">
      <div v-for="item in defaultResults" :key="`${item.id}-${item.media_type || (item.title ? 'movie' : 'serie')}`"
        class="result-card" @click="goToDetails(item)">
        <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w185' + item.poster_path" />
        <p>{{ item.title || item.name }}</p>
      </div>
    </div>

    <!-- resultados da pesquisa -->
    <div v-if="query.length" class="results-grid">
      <div v-for="item in results" :key="`${item.id}-${item.media_type || (item.title ? 'movie' : 'serie')}`"
        class="result-card" @click="goToDetails(item)">
        <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w185' + item.poster_path" />
        <p>{{ item.title || item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  color: white;
  padding: 20px;
}

.search-bar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 3vw 0;
}

.search-input {
  padding: 0.8vw 5vw;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-bottom: 20px;
  background: #f5f3f7;
  text-align: center;
}

.search-input:focus {
  box-shadow: 0 0 10px rgb(154, 81, 238);
}

.search-input:hover {
  background: #e8e6ea;
}

.search-input::placeholder {
  color: #3f3e41;
}

.results-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5vw;
  margin: 7vw 0 0 3vw;
}

.result-card p {
  max-width: 10vw;
}

.result-card {
  cursor: pointer;
  text-align: center;
  animation: fadeIn 0.4s ease;
  transition: transform 0.25s ease;
  font-weight: 600;
}

.result-card img {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.result-card:hover {
  transform: scale(1.06);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
