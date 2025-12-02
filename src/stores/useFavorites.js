import { ref } from "vue";

const favorites = ref(JSON.parse(localStorage.getItem("favorites") || "[]"));

export function useFavorites() {

  function saveLocal() {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function isFavorite(id, type) {
    return favorites.value.some(f => f.id === id && f.type === type);
  }

  function addFavorite(item) {
    if (!isFavorite(item.id, item.type)) {
      favorites.value.push(item);
      saveLocal();
    }
  }

  function removeFavorite(id, type) {
    favorites.value = favorites.value.filter(
      f => !(f.id === id && f.type === type)
    );
    saveLocal();
  }

  function toggleFavorite(item) {
    if (isFavorite(item.id, item.type)) {
      removeFavorite(item.id, item.type);
    } else {
      addFavorite(item);
    }
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
