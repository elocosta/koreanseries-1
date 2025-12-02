<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchTMDB } from "../plugins/axios";
import { useFavorites } from "../stores/useFavorites";

const { isFavorite, toggleFavorite } = useFavorites();
const route = useRoute();
const serie = ref(null);
const credits = ref({ cast: [] });
const trailer = ref(null);

const showModal = ref(false);

onMounted(async () => {
  const id = route.params.id;

  // detalhes da série
  serie.value = await fetchTMDB(`/tv/${id}`, "?language=pt-BR");

  // elenco
  credits.value = await fetchTMDB(`/tv/${id}/credits`, "?language=pt-BR");

  // vídeos / trailer
  const videos = await fetchTMDB(`/tv/${id}/videos`, "?language=pt-BR");

  trailer.value =
    videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || null;
});

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div class="movie-details-container">
    <div v-if="serie" class="movie-details">
      <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + serie.poster_path" />

      <div class="info">
        <h1>{{ serie.name }}</h1>
        <p>{{ serie.overview }}</p>
        <p><strong>Data de lançamento:</strong> {{ serie.first_air_date }}</p>
        <p><strong>Episódios:</strong> {{ serie.number_of_episodes }}</p>
        <div class="trailer-section">
          <span class="mdi" :class="isFavorite(serie.id, 'series') ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
            @click="toggleFavorite({ id: serie.id, type: 'series', title: serie.name, poster: serie.poster_path })"
            style="cursor: pointer;"></span>

          <button class="trailer-btn" @click="showModal = true">
            Assistir Trailer
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL DO TRAILER -->
    <div v-if="showModal" class="modal-bg" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>

        <iframe width="100%" height="550" :src="`https://www.youtube.com/embed/${trailer.key}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>

    <!-- ELENCO -->
    <div v-if="credits.cast.length > 0">
      <h3>Elenco:</h3>

      <div class="cast-list">
        <a class="actor-card" v-for="actor in credits.cast.slice(0, 9)" :key="actor.id"
          :href="`https://www.google.com/search?q=${encodeURIComponent(actor.name)}`" target="_blank" rel="noopener">
          <img class="actor-photo" v-if="actor.profile_path"
            :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" />

          <div class="actor-info">
            <p class="actor-name">{{ actor.name }}</p>
            <p class="actor-character">{{ actor.character }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-details-container {
  padding: 6vw 3vw;
  color: white;
}

.movie-details {
  color: white;
  display: flex;
  margin-bottom: 4vw;
}

.poster {
  width: 20vw;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.info {
  margin-left: 3vw;
  max-width: 60vw;
}

.info h1 {
  margin-top: 0;
  font-size: 2.5rem;
}

.info p {
  line-height: 1.6;
  margin: 12px 0;
  font-size: 1.1rem;
}

.trailer-btn {
  background: #8100cc;
  border: none;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: 0.2s;
}

.trailer-btn:hover {
  background: #9a0eeb;
}

.trailer-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.trailer-section span {
  font-size: 3rem;
  margin-right: 1vw;
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #111;
  width: 70%;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.close {
  position: absolute;
  right: -5vw;
  top: -1vw;
  font-size: 4rem;
  cursor: pointer;
  color: white;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 10px;
}

.actor-card {
  width: 9vw;
  text-align: center;
  animation: fadeIn 0.3s ease;
  text-decoration: none;
}

.actor-photo {
  width: 8vw;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.actor-name {
  font-weight: 700;
  margin-top: 6px;
  color: white;
}

.actor-character {
  font-size: 1rem;
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
  }
}
</style>
