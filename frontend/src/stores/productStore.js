import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([
    {
      id: 1,
      title: 'iPhone 13 Pro',
      price: 450,
      image: 'https://via.placeholder.com/300',
      category: 'Electrónica',
      seller: 'Juan Pérez',
      sellerId: 1,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-01-15'),
      isFavorite: false,
      description: 'iPhone 13 Pro en excelente estado, sin rayaduras en pantalla',
      images: ['https://via.placeholder.com/300'],
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 800,
      image: 'https://via.placeholder.com/300',
      category: 'Electrónica',
      seller: 'María García',
      sellerId: 2,
      condition: 'Nuevo',
      location: 'Barcelona',
      createdAt: new Date('2024-01-10'),
      isFavorite: false,
      description: 'MacBook Air M2 sin usar aún, con garantía',
      images: ['https://via.placeholder.com/300'],
    },
    {
      id: 3,
      title: 'Bicicleta de montaña',
      price: 150,
      image: 'https://via.placeholder.com/300',
      category: 'Deportes',
      seller: 'Carlos López',
      sellerId: 3,
      condition: 'Usado - Muy bien',
      location: 'Valencia',
      createdAt: new Date('2024-01-08'),
      isFavorite: false,
      description: 'Bicicleta Specialized, poco uso, perfecta para empezar',
      images: ['https://via.placeholder.com/300'],
    },
  ])

  const favorites = ref([])
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const filteredProducts = () => {
    return products.value.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
      const matchesCategory =
        !selectedCategory.value || product.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  }

  const getProductById = (id) => {
    return products.value.find((p) => p.id === parseInt(id))
  }

  const toggleFavorite = (productId) => {
    const product = products.value.find((p) => p.id === productId)
    if (product) {
      product.isFavorite = !product.isFavorite
      if (product.isFavorite) {
        favorites.value.push(productId)
      } else {
        favorites.value = favorites.value.filter((id) => id !== productId)
      }
    }
  }

  const addProduct = (newProduct) => {
    const id = Math.max(...products.value.map((p) => p.id), 0) + 1
    products.value.push({
      id,
      ...newProduct,
      isFavorite: false,
      createdAt: new Date(),
    })
  }

  return {
    products,
    favorites,
    searchQuery,
    selectedCategory,
    filteredProducts,
    getProductById,
    toggleFavorite,
    addProduct,
  }
})
