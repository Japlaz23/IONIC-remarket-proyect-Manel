import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Review {
  id: string
  productId: number
  sellerId: number
  author: string
  authorId: number
  rating: number
  text: string
  date: Date
}

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<Review[]>([
    {
      id: '1',
      productId: 1,
      sellerId: 1,
      author: 'Carla',
      authorId: 201,
      rating: 5,
      text: 'Entrega rapida y producto en buen estado.',
      date: new Date(2026, 1, 10),
    },
    {
      id: '2',
      productId: 1,
      sellerId: 1,
      author: 'Miguel',
      authorId: 202,
      rating: 4,
      text: 'Buen trato y comunicacion.',
      date: new Date(2026, 1, 12),
    },
    {
      id: '3',
      productId: 1,
      sellerId: 1,
      author: 'Laura',
      authorId: 203,
      rating: 5,
      text: 'Recomendado, todo perfecto.',
      date: new Date(2026, 1, 14),
    },
    {
      id: '4',
      productId: 2,
      sellerId: 2,
      author: 'Pedro',
      authorId: 204,
      rating: 5,
      text: 'Excelente vendedor, muy recomendable.',
      date: new Date(2026, 1, 8),
    },
    {
      id: '5',
      productId: 3,
      sellerId: 3,
      author: 'Ana',
      authorId: 205,
      rating: 4,
      text: 'Buen producto, llegó como se describe.',
      date: new Date(2026, 1, 9),
    },
  ])

  // Obtener reviews por producto
  const getReviewsByProduct = (productId: number) => {
    return reviews.value.filter((review) => review.productId === productId)
  }

  // Obtener reviews por vendedor
  const getReviewsBySeller = (sellerId: number) => {
    return reviews.value.filter((review) => review.sellerId === sellerId)
  }

  // Calcular rating promedio de un vendedor
  const getSellerAverageRating = (sellerId: number) => {
    const sellerReviews = getReviewsBySeller(sellerId)
    if (sellerReviews.length === 0) return 0
    const sum = sellerReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / sellerReviews.length).toFixed(1)
  }

  // Calcular rating promedio de un producto
  const getProductAverageRating = (productId: number) => {
    const productReviews = getReviewsByProduct(productId)
    if (productReviews.length === 0) return 0
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / productReviews.length).toFixed(1)
  }

  // Añadir una nueva review
  const addReview = (
    productId: number,
    sellerId: number,
    author: string,
    authorId: number,
    rating: number,
    text: string
  ) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId,
      sellerId,
      author,
      authorId,
      rating,
      text,
      date: new Date(),
    }
    reviews.value.unshift(newReview)
    return newReview
  }

  // Verificar si un usuario ya ha valorado un producto
  const hasUserReviewedProduct = (productId: number, userId: number) => {
    return reviews.value.some(
      (review) => review.productId === productId && review.authorId === userId
    )
  }

  // Convertir rating numérico a estrellas
  const ratingToStars = (rating: number): string => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    let stars = '★'.repeat(fullStars)
    if (hasHalfStar) {
      stars += '☆'
    }
    const emptyStars = 5 - Math.ceil(rating)
    stars += '☆'.repeat(emptyStars)
    return stars
  }

  return {
    reviews,
    getReviewsByProduct,
    getReviewsBySeller,
    getSellerAverageRating,
    getProductAverageRating,
    addReview,
    hasUserReviewedProduct,
    ratingToStars,
  }
})
