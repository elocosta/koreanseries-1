import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
});

// Função auxiliar para requisições
export async function fetchTMDB(endpoint, params = "") {
  const response = await api.get(endpoint + params);
  return response.data;
}

export default api;
