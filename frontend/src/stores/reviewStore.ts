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
      text: 'Todo perfecto.',
      date: new Date(2026, 1, 15),
    },
    // Reviews para todos los vendedores extra
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-electronica-${i+1}`,
      productId: 100 + i,
      sellerId: 200 + i,
      author: `Comprador Electronica ${i+1}`,
      authorId: 1000 + i,
      rating: 4 + (i % 2),
      text: `Valoración electrónica ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-vehiculo-${i+1}`,
      productId: 200 + i,
      sellerId: 300 + i,
      author: `Comprador Vehículo ${i+1}`,
      authorId: 1100 + i,
      rating: 3 + (i % 3),
      text: `Valoración vehículo ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-moda-${i+1}`,
      productId: 300 + i,
      sellerId: 400 + i,
      author: `Comprador Moda ${i+1}`,
      authorId: 1200 + i,
      rating: 4 + (i % 2),
      text: `Valoración moda ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-hogar-${i+1}`,
      productId: 400 + i,
      sellerId: 500 + i,
      author: `Comprador Hogar ${i+1}`,
      authorId: 1300 + i,
      rating: 3 + (i % 3),
      text: `Valoración hogar ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-deportes-${i+1}`,
      productId: 500 + i,
      sellerId: 600 + i,
      author: `Comprador Deportes ${i+1}`,
      authorId: 1400 + i,
      rating: 4 + (i % 2),
      text: `Valoración deportes ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-oficina-${i+1}`,
      productId: 600 + i,
      sellerId: 700 + i,
      author: `Comprador Oficina ${i+1}`,
      authorId: 1500 + i,
      rating: 3 + (i % 3),
      text: `Valoración oficina ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
    ...Array.from({length: 10}, (_, i) => ({
      id: `r-musica-${i+1}`,
      productId: 700 + i,
      sellerId: 800 + i,
      author: `Comprador Música ${i+1}`,
      authorId: 1600 + i,
      rating: 4 + (i % 2),
      text: `Valoración música ${i+1}`,
      date: new Date(2026, 1, 10),
    })),
  ])

  // ...existing code...

  // Get all reviews for a specific product
  function getReviewsByProduct(productId: number) {
    return reviews.value.filter(r => r.productId === productId)
  }

  // Get all reviews for a specific seller
  function getReviewsBySeller(sellerId: number) {
    return reviews.value.filter(r => r.sellerId === sellerId)
  }

  // Get average rating for a seller
  function getSellerAverageRating(sellerId: number): number {
    const sellerReviews = getReviewsBySeller(sellerId)
    if (sellerReviews.length === 0) return 0
    return sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length
  }

  // Get average rating for a product
  function getProductAverageRating(productId: number): number {
    const productReviews = getReviewsByProduct(productId)
    if (productReviews.length === 0) return 0
    return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
  }

  // Add a new review
  function addReview(review: Review) {
    reviews.value.push(review)
  }

  // Check if a user has already reviewed a product
  function hasUserReviewedProduct(productId: number, userId: number): boolean {
    return reviews.value.some(r => r.productId === productId && r.authorId === userId)
  }

  // Convert rating number to array of stars (for UI)
  function ratingToStars(rating: number): string {
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
