<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { fetchTMDB } from "../plugins/axios";

const router = useRouter();

const koreanMovies = ref([]);
const koreanSeries = ref([]);

const MOVIES_VISIBLE = 7;
const SERIES_VISIBLE = 7;

const currentIndexMovies = ref(0);
const currentIndexSeries = ref(0);

onMounted(async () => {
  koreanMovies.value = (await fetchTMDB("/discover/movie", "?with_original_language=ko&language=pt-BR")).results;
  koreanSeries.value = (await fetchTMDB("/discover/tv", "?with_original_language=ko&language=pt-BR")).results;
});

const visibleMovies = computed(() =>
  koreanMovies.value.slice(
    currentIndexMovies.value,
    currentIndexMovies.value + MOVIES_VISIBLE
  )
);

const visibleSeries = computed(() =>
  koreanSeries.value.slice(
    currentIndexSeries.value,
    currentIndexSeries.value + SERIES_VISIBLE
  )
);

function nextMovies() {
  if (currentIndexMovies.value + MOVIES_VISIBLE < koreanMovies.value.length) {
    currentIndexMovies.value += MOVIES_VISIBLE;
  }
}

function prevMovies() {
  if (currentIndexMovies.value > 0) {
    currentIndexMovies.value -= MOVIES_VISIBLE;
  }
}

function nextSeries() {
  if (currentIndexSeries.value + SERIES_VISIBLE < koreanSeries.value.length) {
    currentIndexSeries.value += SERIES_VISIBLE;
  }
}

function prevSeries() {
  if (currentIndexSeries.value > 0) {
    currentIndexSeries.value -= SERIES_VISIBLE;
  }
}

/* ABRIR DETALHES */
function openMovie(id) {
  router.push(`/movie/${id}`);
}

function openSerie(id) {
  router.push(`/serie/${id}`);
}
</script>

<template>
  <div class="home">
    <h1>KoreanSeries</h1>
    <div class="section">
      <h2>Filmes Coreanos</h2>
      <button class="arrow left" v-if="currentIndexMovies > 0" @click="prevMovies">
        ❮
      </button>
      <div class="list">
        <div v-for="movie in visibleMovies" :key="movie.id" class="item" @click="openMovie(movie.id)">
          <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
      <button class="arrow right" v-if="currentIndexMovies + MOVIES_VISIBLE < koreanMovies.length" @click="nextMovies">
        ❯
      </button>
    </div>
    <div class="section">
      <h2>Séries Coreanas</h2>
      <button class="arrow left" v-if="currentIndexSeries > 0" @click="prevSeries">
        ❮
      </button>
      <div class="list">
        <div v-for="serie in visibleSeries" :key="serie.id" class="item" @click="openSerie(serie.id)">
          <img :src="'https://image.tmdb.org/t/p/w185' + serie.poster_path" />
          <p>{{ serie.name }}</p>
        </div>
      </div> <button class="arrow right" v-if="currentIndexSeries + SERIES_VISIBLE < koreanSeries.length"
        @click="nextSeries">
        ❯
      </button>
    </div>
  </div>
</template>

<style scoped>
.home {
  color: white;
  margin: 3vw 2vw;
}

.home h1 {
  text-align: center;
}

.section {
  margin-bottom: 40px;
  position: relative;
}

.list {
  display: flex;
  gap: 2vw;
  position: relative;
}

.item {
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;
  font-weight: 600;
}

.item img {
  width: 12vw;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
}

.item:hover {
  transform: scale(1.03);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 28px;
  width: 45px;
  height: 60px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>
