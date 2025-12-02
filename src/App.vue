<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showSidebar = ref(false);

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}
</script>

<template>
  <div class="app-container">
    <button class="open-sidebar" @click="toggleSidebar">
      ☰ Menu
    </button>
    <transition name="slide-down">
      <div class="sidebar" v-if="showSidebar">
        <button class="close-btn" @click="toggleSidebar" aria-label="Fechar sidebar">✖</button>
        <h1>KoreanSeries</h1>
        <nav>
          <ul>
            <router-link to="/" custom v-slot="{ navigate }">
              <li @click="navigate">Home</li>
            </router-link>

            <router-link to="/search" custom v-slot="{ navigate }">
              <li @click="navigate">Pesquisar</li>
            </router-link>

            <router-link to="/list" custom v-slot="{ navigate }">
              <li @click="navigate">Minha lista</li>
            </router-link>
          </ul>
        </nav>
        <p>2025 © KoreanSeries</p>
      </div>
    </transition>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  min-width: 15vw;
  background-color: #522588;
  color: white;
  padding: 1vw;
  height: 100vh;
  position: fixed;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 20px 0;
  z-index: 1000;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.open-sidebar {
  position: fixed;
  top: 18px;
  left: 18px;
  background: #522588;
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  z-index: 999;
  font-weight: 600;
}

nav ul {
  padding: 0;
  margin-bottom: 2vw;
}

ul li {
  color: white;
  text-decoration: none;
  font-weight: 600;
  list-style: none;
  background: #6b3bbb;
  margin: 0.5vw 0;
  padding: 1vw;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

ul li:hover {
  background: #7c4ed2;
}

nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

p {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 4vw;
}

.app-container {
  display: flex;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-enter-active {
  transition: all 300ms ease-out;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-active {
  transition: all 300ms ease-in;
}
</style>
