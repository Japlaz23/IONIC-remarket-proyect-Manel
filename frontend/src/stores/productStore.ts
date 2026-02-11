import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  seller: string
  sellerId: number
  condition: string
  location: string
  createdAt: Date
  isFavorite: boolean
  description: string
  images: string[]
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
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
      description: 'iPhone 13 Pro en excelente estado',
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
      description: 'MacBook Air M2 sin usar',
      images: ['https://via.placeholder.com/300'],
    },
  ])

  const favorites = ref<number[]>([])
  const searchQuery = ref<string>('')
  const selectedCategory = ref<string>('')

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
      const matchesCategory =
        !selectedCategory.value || product.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  })

  const getProductById = (id: string | number): Product | undefined => {
    return products.value.find((p) => p.id === Number(id))
  }

  const toggleFavorite = (productId: number): void => {
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

  const addProduct = (newProduct: Omit<Product, 'id' | 'isFavorite' | 'createdAt'>): void => {
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
