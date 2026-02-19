<template>
  <ion-card class="product-card" @click="goToProduct(product.id)">
    <div class="product-image-container">
      <img :src="product.image" class="product-image" />
      <button class="favorite-btn" :class="{ active: isFavorite }" @click.stop="toggleFavorite">
        <ion-icon :icon="isFavorite ? heart : heartOutline" />
      </button>
    </div>
    <ion-card-header>
      <div class="product-title line-clamp-2">{{ product.title }}</div>
    </ion-card-header>
    <ion-card-content>
      <div class="product-meta">
        <span class="product-price">{{ product.price }} €</span>
        <span class="product-location">{{ product.location }}</span>
      </div>
      <div class="product-rating">
        <span v-if="rating !== null" class="rating-stars">★ {{ rating }}</span>
        <span v-else class="no-rating">Sin valoración</span>
      </div>
    </ion-card-content>
  </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardContent, IonIcon } from '@ionic/vue'
import { heart, heartOutline } from 'ionicons/icons'
const props = defineProps<{ product: any, isFavorite: boolean, rating: number|null }>()
const emit = defineEmits(['toggleFavorite', 'goToProduct'])
const toggleFavorite = () => emit('toggleFavorite', props.product.id)
const goToProduct = (id: number) => emit('goToProduct', id)
</script>
<style scoped>
.product-card {
  cursor: pointer;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e6ebf2;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
}
.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
  z-index: 10;
  padding: 0;
  backdrop-filter: blur(4px);
}
.favorite-btn.active {
  color: #ef4444;
  background: rgba(255, 255, 255, 1);
}
</style>