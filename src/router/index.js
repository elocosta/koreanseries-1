import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import MovieDetails from "../views/MovieDetails.vue";
import SerieDetails from "../views/SerieDetails.vue";
import Search from "../views/Search.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/movie/:id", component: MovieDetails },
    { path: "/serie/:id", component: SerieDetails },
    { path: "/search", component: Search },
  ],
});

export default router;
