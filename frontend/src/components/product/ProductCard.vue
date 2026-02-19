<template>
  <ion-card class="product-card compact-card" @click="onClick">
    <div class="product-image-container">
      <ion-img :src="product.image" :alt="product.title" class="product-image" />
      <button 
        type="button"
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click.stop="toggleFavorite"
      >
        <ion-icon :icon="isFavorite ? heart : heartOutline" />
      </button>
    </div>
    <ion-card-header>
      <ion-card-title class="product-title line-clamp-2">
        {{ product.title }}
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="product-meta">
        <span class="product-price">{{ product.price }}€</span>
        <span class="product-location">{{ product.location }}</span>
      </div>
      <div class="product-rating always-visible">
        <template v-if="rating">
          <span class="rating-stars">{{ rating.stars }}</span>
          <span class="rating-value">{{ rating.value.toFixed(1) }}</span>
          <span class="rating-count">({{ rating.count }})</span>
        </template>
        <template v-else>
          <span class="rating-stars no-rating-stars">☆☆☆☆☆</span>
          <span class="no-rating">Sin valoraciones</span>
        </template>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup >
import { defineProps, defineEmits } from 'vue'
import { heart, heartOutline } from 'ionicons/icons'

const props = defineProps({
  product: Object,
  isFavorite: Boolean,
  rating: Object
})
const emit = defineEmits(['click', 'toggle-favorite'])

function onClick() {
  emit('click', props.product.id)
}
function toggleFavorite(e) {
  emit('toggle-favorite', props.product.id)
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e6ebf2;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.15);
}
.product-image-container {
  position: relative;
}
.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border-radius: 50%;
  border: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.favorite-btn.active ion-icon {
  color: #e53e3e;
}
</style>
