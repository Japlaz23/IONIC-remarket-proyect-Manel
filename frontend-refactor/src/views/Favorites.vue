<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Favoritos</ion-title>
        <ion-buttons slot="end" v-if="favoriteStore.favoriteCount > 0">
          <ion-badge>{{ favoriteStore.favoriteCount }}</ion-badge>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="favorites-content">
      <div v-if="favoriteStore.favoriteCount === 0" class="empty-state">
        <h2>No tienes favoritos aún</h2>
        <p>Añade tus productos favoritos haciendo clic en el corazón</p>
        <ion-button @click="goHome">Explorar productos</ion-button>
      </div>

      <div v-else class="favorites-grid">
        <ion-card
          v-for="product in (favoriteStore.favorites as any[])"
          :key="product?.id"
          class="favorite-card"
          @click="product && goToProduct(product.id)"
        >
          <div v-if="product" class="favorite-image-container">
            <ion-img :src="product.image" :alt="product.title" class="favorite-image"></ion-img>
            <button 
              type="button"
              class="remove-favorite-btn"
              @click="removeFavorite($event, product.id)"
            >
              <ion-icon :icon="heartFilled"></ion-icon>
            </button>
          </div>
          <ion-card-header v-if="product">
            <ion-card-title class="favorite-title line-clamp-2">
              {{ product.title }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content v-if="product">
            <div class="favorite-meta">
              <span class="favorite-price">{{ product.price }}€</span>
              <span class="favorite-seller">{{ product.seller }}</span>
            </div>
            <div v-if="getSellerRating(product.sellerId)" class="favorite-rating">
              <span class="rating-stars">{{ getSellerRating(product.sellerId)?.stars }}</span>
              <span class="rating-value">{{ getSellerRating(product.sellerId)?.value.toFixed(1) }}</span>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonBadge,
  IonIcon,
} from '@ionic/vue'
import { heart as heartFilled } from 'ionicons/icons'
// Update the path if the store is located elsewhere, for example:
import { useFavoriteStore } from '../stores/favoriteStore.js'
import { useReviewStore } from '../stores/reviewStore.js'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const reviewStore = useReviewStore()

onMounted(() => {
  favoriteStore.loadFavorites()
})

const getSellerRating = (sellerId: number) => {
  const ratingStr = reviewStore.getSellerAverageRating(sellerId)
  const rating = typeof ratingStr === 'string' ? parseFloat(ratingStr) : ratingStr
  if (rating === 0) return null
  return {
    value: rating,
    stars: reviewStore.ratingToStars(rating),
    count: reviewStore.getReviewsBySeller(sellerId).length,
  }
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const removeFavorite = (e: Event, productId: number) => {
  e.stopPropagation()
  favoriteStore.removeFavorite(productId)
}

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.favorites-content {
  --background: #f8fafc;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
}

.empty-state h2 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.empty-state p {
  margin: 0 0 24px 0;
  color: #64748b;
  font-size: 14px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding: 16px;
}

.favorite-card {
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
  overflow: hidden;
  border-radius: 12px;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}

.favorite-image-container {
  position: relative;
  overflow: hidden;
}

.favorite-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.remove-favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
  z-index: 10;
  padding: 0;
  backdrop-filter: blur(4px);
}

.remove-favorite-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.remove-favorite-btn ion-icon {
  font-size: 18px;
}

.favorite-card ion-card-header {
  padding: 12px;
}

.favorite-card ion-card-content {
  padding: 0 12px 12px;
}

.favorite-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.favorite-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.favorite-price {
  color: #1a7f34;
  font-weight: 700;
  font-size: 14px;
}

.favorite-seller {
  color: #94a3b8;
  font-size: 11px;
}

.favorite-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6b7280;
}

.rating-stars {
  color: #f59e0b;
  font-size: 12px;
}

.rating-value {
  font-weight: 600;
  color: #0f172a;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 520px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    padding: 12px;
  }

  .favorite-image {
    height: 130px;
  }
}
</style>
