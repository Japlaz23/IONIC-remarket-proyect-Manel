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
  const baseProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 13 Pro',
      price: 450,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Juan Pérez',
      sellerId: 1,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-01-15'),
      isFavorite: false,
      description: 'iPhone 13 Pro en excelente estado',
      images: ['/placeholder.svg'],
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 800,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'María García',
      sellerId: 2,
      condition: 'Nuevo',
      location: 'Barcelona',
      createdAt: new Date('2024-01-10'),
      isFavorite: false,
      description: 'MacBook Air M2 sin usar',
      images: ['/placeholder.svg'],
    },
    {
      id: 3,
      title: 'iPad 10a Gen 64GB',
      price: 280,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Luis Romero',
      sellerId: 3,
      condition: 'Usado - Buen estado',
      location: 'Valencia',
      createdAt: new Date('2024-01-18'),
      isFavorite: false,
      description: 'iPad 10a generacion con caja',
      images: ['/placeholder.svg'],
    },
    {
      id: 4,
      title: 'Samsung Galaxy S22',
      price: 360,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Ana Ruiz',
      sellerId: 4,
      condition: 'Usado - Como nuevo',
      location: 'Sevilla',
      createdAt: new Date('2024-01-20'),
      isFavorite: false,
      description: 'Galaxy S22 con funda y cargador',
      images: ['/placeholder.svg'],
    },
    {
      id: 5,
      title: 'Auriculares Sony WH-1000XM4',
      price: 180,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Carlos Ortega',
      sellerId: 5,
      condition: 'Usado - Buen estado',
      location: 'Bilbao',
      createdAt: new Date('2024-01-22'),
      isFavorite: false,
      description: 'Cancelacion de ruido y estuche',
      images: ['/placeholder.svg'],
    },
    {
      id: 6,
      title: 'Nintendo Switch OLED',
      price: 230,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Paula Vega',
      sellerId: 6,
      condition: 'Nuevo',
      location: 'Zaragoza',
      createdAt: new Date('2024-01-25'),
      isFavorite: false,
      description: 'Con garantia y 1 juego',
      images: ['/placeholder.svg'],
    },
    {
      id: 7,
      title: 'Silla ergonomica',
      price: 120,
      image: '/placeholder.svg',
      category: 'Oficina',
      seller: 'Marta Gil',
      sellerId: 7,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-01-28'),
      isFavorite: false,
      description: 'Silla regulable y comoda',
      images: ['/placeholder.svg'],
    },
    {
      id: 8,
      title: 'Mesa comedor 4 plazas',
      price: 90,
      image: '/placeholder.svg',
      category: 'Hogar',
      seller: 'Rocio Serrano',
      sellerId: 8,
      condition: 'Usado',
      location: 'Alicante',
      createdAt: new Date('2024-02-01'),
      isFavorite: false,
      description: 'Madera clara en buen estado',
      images: ['/placeholder.svg'],
    },
    {
      id: 9,
      title: 'Patinete electrico',
      price: 210,
      image: '/placeholder.svg',
      category: 'Vehículos',
      seller: 'Javier Mora',
      sellerId: 9,
      condition: 'Usado - Buen estado',
      location: 'Malaga',
      createdAt: new Date('2024-02-03'),
      isFavorite: false,
      description: 'Bateria en buen estado',
      images: ['/placeholder.svg'],
    },
    {
      id: 10,
      title: 'Chaqueta denim vintage',
      price: 35,
      image: '/placeholder.svg',
      category: 'Moda',
      seller: 'Nuria Campos',
      sellerId: 10,
      condition: 'Usado',
      location: 'Granada',
      createdAt: new Date('2024-02-05'),
      isFavorite: false,
      description: 'Talla M, estilo retro',
      images: ['/placeholder.svg'],
    },
    {
      id: 11,
      title: 'Bicicleta urbana',
      price: 150,
      image: '/placeholder.svg',
      category: 'Deportes',
      seller: 'Sergio Leon',
      sellerId: 11,
      condition: 'Usado - Buen estado',
      location: 'Salamanca',
      createdAt: new Date('2024-02-07'),
      isFavorite: false,
      description: 'Revisada y lista para usar',
      images: ['/placeholder.svg'],
    },
    {
      id: 12,
      title: 'Monitor 27" 144Hz',
      price: 190,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Diego Prieto',
      sellerId: 12,
      condition: 'Usado - Buen estado',
      location: 'Santander',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Panel IPS sin pixeles muertos',
      images: ['/placeholder.svg'],
    },
    {
      id: 13,
      title: 'Camara Canon M50',
      price: 320,
      image: '/placeholder.svg',
      category: 'Electrónica',
      seller: 'Claudia Soto',
      sellerId: 13,
      condition: 'Usado - Como nuevo',
      location: 'Valladolid',
      createdAt: new Date('2024-02-09'),
      isFavorite: false,
      description: 'Incluye lente 15-45mm',
      images: ['/placeholder.svg'],
    },
    {
      id: 14,
      title: 'Lampara de pie',
      price: 25,
      image: '/placeholder.svg',
      category: 'Hogar',
      seller: 'Bea Torres',
      sellerId: 14,
      condition: 'Usado',
      location: 'Oviedo',
      createdAt: new Date('2024-02-10'),
      isFavorite: false,
      description: 'Luz calida, estilo nordico',
      images: ['/placeholder.svg'],
    },
    {
      id: 15,
      title: 'Teclado mecanico',
      price: 70,
      image: '/placeholder.svg',
      category: 'Oficina',
      seller: 'Mario Diaz',
      sellerId: 15,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-02-11'),
      isFavorite: false,
      description: 'Switches rojos y retroiluminacion',
      images: ['/placeholder.svg'],
    },
  ]

  const locations = [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Bilbao',
    'Zaragoza',
    'Alicante',
    'Malaga',
    'Granada',
    'Salamanca',
    'Santander',
    'Valladolid',
    'Oviedo',
  ]

  const categories = ['Electrónica', 'Moda', 'Hogar', 'Deportes', 'Oficina', 'Vehículos']

  const titles = [
    'Smartwatch deportivo',
    'Camara instantanea',
    'Altavoz bluetooth',
    'Teclado gaming',
    'Silla de oficina',
    'Mesa auxiliar',
    'Zapatillas running',
    'Chaqueta impermeable',
    'Auriculares in-ear',
    'Monitor ultrawide',
  ]

  const conditions = ['Nuevo', 'Usado', 'Usado - Buen estado', 'Usado - Como nuevo']

  const buildExtraProducts = (count: number, startId: number): Product[] =>
    Array.from({ length: count }, (_, index) => {
      const id = startId + index
      const title = titles[index % titles.length]
      const category = categories[index % categories.length]
      const location = locations[index % locations.length]
      const condition = conditions[index % conditions.length]

      return {
        id,
        title: `${title} #${id}`,
        price: 20 + (index % 30) * 5,
        image: '/placeholder.svg',
        category,
        seller: `Vendedor ${id}`,
        sellerId: id,
        condition,
        location,
        createdAt: new Date(2024, 1, (index % 27) + 1),
        isFavorite: false,
        description: `${title} en buen estado`,
        images: ['/placeholder.svg'],
      }
    })

  const extraProducts = buildExtraProducts(45, 16)
  const products = ref<Product[]>([...baseProducts, ...extraProducts])

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
