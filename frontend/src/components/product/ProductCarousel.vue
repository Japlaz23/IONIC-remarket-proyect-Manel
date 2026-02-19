<template>
  <div class="product-carousel">
    <button
      type="button"
      class="carousel-nav prev"
      :class="`carousel-prev-${carouselKey}`"
      :disabled="items.length <= 1"
      aria-label="Anterior"
      @click="onPrev"
    >
      <ion-icon :icon="chevronBackOutline" />
    </button>

    <Swiper
      class="carousel-viewport"
      :modules="[Navigation, Pagination]"
      :slides-per-view="'auto'"
      :space-between="12"
      :loop="items.length > 1"
      :navigation="{
        prevEl: `.carousel-prev-${carouselKey}`,
        nextEl: `.carousel-next-${carouselKey}`,
      }"
      :pagination="{
        el: `.carousel-dots-${carouselKey}`,
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="product in items"
        :key="product.id"
        class="carousel-slide"
      >
        <ProductCard
          :product="product"
          :isFavorite="isFavorite(product.id)"
          :rating="getSellerRating(product.sellerId)"
          @click="onProductClick"
          @toggle-favorite="onToggleFavorite"
        />
      </SwiperSlide>
    </Swiper>

    <button
      type="button"
      class="carousel-nav next"
      :class="`carousel-next-${carouselKey}`"
      :disabled="items.length <= 1"
      aria-label="Siguiente"
      @click="onNext"
    >
      <ion-icon :icon="chevronForwardOutline" />
    </button>

    <div
      v-if="items.length > 1"
      class="carousel-dots"
      :class="`carousel-dots-${carouselKey}`"
    ></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  items: Array,
  carouselKey: String,
  isFavorite: Function,
  getSellerRating: Function
})
const emit = defineEmits(['product-click', 'toggle-favorite', 'prev', 'next'])

function onProductClick(productId) {
  emit('product-click', productId)
}
function onToggleFavorite(productId) {
  emit('toggle-favorite', productId)
}
function onPrev() {
  emit('prev')
}
function onNext() {
  emit('next')
}
</script>

<style scoped>
.product-carousel {
  display: flex;
  align-items: center;
  gap: 8px;
}
.carousel-nav {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.carousel-viewport {
  flex: 1;
}
</style>
