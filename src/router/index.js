import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import MovieDetails from "../views/MovieDetails.vue";
import SerieDetails from "../views/SerieDetails.vue";
import Search from "../views/Search.vue";
import List from "@/views/List.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/movie/:id", component: MovieDetails },
    { path: "/serie/:id", component: SerieDetails },
    { path: "/search", component: Search },
    { path: "/list", component: List },
  ],
});

export default router;
