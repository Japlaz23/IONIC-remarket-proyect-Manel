import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './productStore.js'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref<number[]>([])

  // Cargar favoritos del localStorage
  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      try {
        favoriteIds.value = JSON.parse(stored)
      } catch {
        favoriteIds.value = []
      }
    }
  }

  // Guardar favoritos en localStorage
  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  // Obtener todos los favoritos
  const favorites = computed(() => {
    const productStore = useProductStore()
    return favoriteIds.value
      .map((id) => productStore.getProductById(id))
      .filter((product): product is NonNullable<typeof product> => product !== null && product !== undefined)
  })

  // Verificar si un producto es favorito
  const isFavorite = (productId: number): boolean => {
    return favoriteIds.value.includes(productId)
  }

  // Agregar a favoritos
  const addFavorite = (productId: number) => {
    if (!favoriteIds.value.includes(productId)) {
      favoriteIds.value.push(productId)
      saveFavorites()
    }
  }

  // Eliminar de favoritos
  const removeFavorite = (productId: number) => {
    const index = favoriteIds.value.indexOf(productId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      saveFavorites()
    }
  }

  // Toggle favorito
  const toggleFavorite = (productId: number) => {
    if (isFavorite(productId)) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  // Contar favoritos
  const favoriteCount = computed(() => favoriteIds.value.length)

  return {
    favoriteIds,
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    favoriteCount,
    loadFavorites,
  }
})
