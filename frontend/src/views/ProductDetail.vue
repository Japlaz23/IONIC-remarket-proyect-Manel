<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Producto</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="toggleFavorite">
            <ion-icon slot="icon-only" :icon="isFav ? heart : heartOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="product-content">
      <div class="product-shell">
        <template v-if="product">
          <div class="product-hero-frame">
            <Swiper
              class="product-carousel"
              :modules="[Navigation, Pagination]"
              :slides-per-view="1"
              :loop="galleryImages.length > 1"
              :navigation="{ prevEl: '.product-prev', nextEl: '.product-next' }"
              :pagination="{ el: '.product-pagination', clickable: true }"
            >
              <SwiperSlide
                v-for="(image, index) in galleryImages"
                :key="`${product.id}-${index}`"
                class="product-slide"
              >
                <img
                  :src="image"
                  :alt="product.title"
                  class="product-hero"
                  @click="openZoom(index)"
                />
              </SwiperSlide>
            </Swiper>
            <div v-if="galleryImages.length > 1" class="carousel-dots product-pagination" aria-hidden="true"></div>
            <button class="carousel-control prev product-prev" type="button" :disabled="galleryImages.length <= 1">
              Prev
            </button>
            <button class="carousel-control next product-next" type="button" :disabled="galleryImages.length <= 1">
              Next
            </button>
            <div class="product-hero-gradient"></div>
          </div>

          <div class="product-body">
            <div class="product-header">
              <div>
                <h1 class="product-title">{{ product.title }}</h1>
                <div class="product-tags">
                  <span class="product-tag">{{ product.condition }}</span>
                  <span class="product-tag">{{ product.category }}</span>
                  <span class="product-tag">{{ product.location }}</span>
                </div>
              </div>
              <p class="product-price">{{ product.price }}€</p>
            </div>
            <p class="product-description">{{ product.description }}</p>

            <ion-card class="seller-card">
              <ion-card-header>
              </ion-card-header>
              <ion-card-content class="seller-content" style="padding: 20px;">
                <img class="seller-avatar" src="/placeholder.svg" alt="Perfil del vendedor" />
                <div class="seller-meta">
                  <h3 class="seller-name">{{ product.seller }}</h3>
                  <p class="seller-rating">★★★★★ 4.8 · 24 ventas</p>
                  <p class="seller-location">{{ product.location }}</p>
                  <ion-button
                    size="small"
                    color="success"
                    class="contact-seller-btn"
                    @click="goToChat()"
                  >
                    <ion-icon slot="start" :icon="chatbubbleEllipsesOutline"></ion-icon>
                    Contactar
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>

            <ion-card class="info-card">
              <ion-card-header>
                <ion-card-title style="padding: 20px;">Información</ion-card-title>
              </ion-card-header>
              <ion-card-content class="info-grid">
                <div>
                  <p class="info-label">Estado</p>
                  <p class="info-value">{{ product.condition }}</p>
                </div>
                <div>
                  <p class="info-label">Categoría</p>
                  <p class="info-value">{{ product.category }}</p>
                </div>
                <div>
                  <p class="info-label">Ubicación</p>
                  <p class="info-value">{{ product.location }}</p>
                </div>
                <div>
                  <p class="info-label">Vendedor</p>
                  <p class="info-value">{{ product.seller }}</p>
                </div>
              </ion-card-content>
            </ion-card>
          

            <ion-card class="map-card">
              <ion-card-header>
                <ion-card-title style="padding: 20px;">Ubicación del vendedor</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="map-frame">
                  <iframe
                    class="map-embed"
                    :src="mapUrl"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Ubicación del vendedor"
                  ></iframe>
                </div>
              </ion-card-content>
            </ion-card>

            <ion-card class="reviews-card">
              <ion-card-header class="reviews-card-header">
                <div class="reviews-header">
                  <ion-card-title>Valoraciones del vendedor</ion-card-title>
                  <ion-button 
                    size="small" 
                    fill="outline" 
                    color="primary"
                    class="add-review-btn"
                    @click="openReviewModal"
                  >
                    <ion-icon slot="start" :icon="addOutline"></ion-icon>
                    Escribir valoración
                  </ion-button>
                </div>
              </ion-card-header>
              <ion-card-content class="reviews-list">
                <div v-if="productReviews.length === 0" class="no-reviews">
                  <p>Aún no hay valoraciones para este vendedor.</p>
                </div>
                <div v-for="review in productReviews" :key="review.id" class="review-item">
                  <div class="review-header">
                    <div>
                      <span class="review-author">{{ review.author }}</span>
                      <span class="review-date">{{ formatReviewDate(review.date) }}</span>
                    </div>
                    <span class="review-stars">{{ reviewStore.ratingToStars(review.rating) }}</span>
                  </div>
                  <p class="review-text">{{ review.text }}</p>
                </div>
              </ion-card-content>
            </ion-card>

            <div class="product-actions">
              <div class="primary-action-wrapper">
                <ion-button expand="block" color="primary" class="primary-action" @click="buyProduct">
                  <ion-icon slot="start" :icon="cartOutline"></ion-icon>
                  Comprar
                </ion-button>
                <ion-button
                expand="block"
                color="success"
                class="secondary-action"
                @click="goToChat()"
                >
                  Contactar vendedor
                </ion-button>
              </div>

            </div>
          </div>
        </template>
        <div v-else class="empty-state">
          <p>Producto no encontrado.</p>
        </div>
      </div>
    </ion-content>

    <ion-modal
      :is-open="showZoom"
      css-class="zoom-modal"
      :backdrop-dismiss="true"
      @didDismiss="closeZoom"
    >
      <div class="zoom-surface">
        <button class="zoom-close" type="button" @click="closeZoom">Cerrar</button>
        <Swiper
          class="zoom-carousel"
          :modules="[Navigation, Pagination, Zoom]"
          :slides-per-view="1"
          :zoom="true"
          :initial-slide="zoomInitialSlide"
          :navigation="{ prevEl: '.zoom-prev', nextEl: '.zoom-next' }"
          :pagination="{ el: '.zoom-pagination', clickable: true }"
          @swiper="setZoomSwiper"
        >
          <SwiperSlide
            v-for="(image, index) in galleryImages"
            :key="`zoom-${product?.id ?? 'x'}-${index}`"
            class="zoom-slide"
          >
            <div class="swiper-zoom-container">
              <img
                :src="image"
                alt="Vista ampliada"
                class="zoom-image"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="zoom-dots zoom-pagination" aria-hidden="true"></div>
        <button class="zoom-control prev zoom-prev" type="button" :disabled="galleryImages.length <= 1">
          Prev
        </button>
        <button class="zoom-control next zoom-next" type="button" :disabled="galleryImages.length <= 1">
          Next
        </button>
      </div>
    </ion-modal>

    <ion-modal
      :is-open="showReviewModal"
      css-class="review-modal"
      :backdrop-dismiss="true"
      @didDismiss="closeReviewModal"
    >
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Escribir valoración</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeReviewModal">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="review-modal-content">
          <div class="review-form">
            <div class="rating-section">
              <label class="rating-label">Tu valoración</label>
              <div class="star-rating">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="star-button"
                  :class="{ active: star <= newReviewRating }"
                  @click="setRating(star)"
                >
                  {{ star <= newReviewRating ? '★' : '☆' }}
                </button>
              </div>
            </div>

            <div class="review-text-section">
              <label class="review-label">Tu opinión</label>
              <ion-textarea
                v-model="newReviewText"
                placeholder="Cuéntanos tu experiencia con este vendedor..."
                :auto-grow="true"
                :rows="4"
                :maxlength="500"
                class="review-textarea"
              ></ion-textarea>
              <p class="char-count">{{ newReviewText.length }}/500</p>
            </div>

            <ion-button
              expand="block"
              color="primary"
              class="submit-review-btn"
              :disabled="!canSubmitReview"
              @click="submitReview"
            >
              Publicar valoración
            </ion-button>
          </div>
        </ion-content>
      </ion-page>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  IonButton,
  IonIcon,
  IonModal,
  IonTextarea,
  onIonViewWillEnter,
  toastController,
} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Zoom } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { chatbubbleEllipsesOutline, addOutline, heart, heartOutline, cartOutline } from 'ionicons/icons'
import { useProductStore } from '@/stores/productStore'
import { useChatStore } from '@/stores/chatStore'
import { useReviewStore } from '@/stores/reviewStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const chatStore = useChatStore()
const reviewStore = useReviewStore()
const favoriteStore = useFavoriteStore()

const isLoggedIn = ref(false)
const currentUserId = ref(1) // ID del usuario actual (simulado)

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
  favoriteStore.loadFavorites()
})

const product = computed(() => {
  const id = route.params.id
  const idValue = Array.isArray(id) ? id[0] : id
  return store.getProductById(idValue)
})

const isFav = computed(() => {
  if (!product.value) return false
  return favoriteStore.isFavorite(product.value.id)
})

const galleryImages = computed(() => {
  if (!product.value) {
    return []
  }
  const images = product.value.images?.length ? product.value.images : [product.value.image]
  return images.filter(Boolean)
})

const mapCoords = '-25.5013149,152.690286'
const mapUrl = computed(() => {
  const query = encodeURIComponent(mapCoords)
  return `https://www.google.com/maps?q=${query}&z=13&output=embed`
})

// Reviews dinámicas del vendedor del producto
const productReviews = computed(() => {
  if (!product.value) return []
  return reviewStore.getReviewsBySeller(product.value.sellerId)
})

// Modal de valoración
const showReviewModal = ref(false)
const newReviewRating = ref(0)
const newReviewText = ref('')

const canSubmitReview = computed(() => {
  return newReviewRating.value > 0 && newReviewText.value.trim().length >= 10
})

const openReviewModal = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  
  if (!product.value) return
  
  // Verificar si el usuario ya ha valorado a este vendedor
  const hasReviewed = reviewStore.hasUserReviewedProduct(
    product.value.id,
    currentUserId.value
  )
  
  if (hasReviewed) {
    showAlreadyReviewedAlert()
    return
  }
  
  showReviewModal.value = true
}

const closeReviewModal = () => {
  showReviewModal.value = false
  newReviewRating.value = 0
  newReviewText.value = ''
}

const setRating = (rating: number) => {
  newReviewRating.value = rating
}

const submitReview = async () => {
  if (!product.value || !canSubmitReview.value) return

  const userName = localStorage.getItem('userName') || 'Usuario'

  // Generate a unique id for the review (timestamp + random)
  const id = Date.now() + Math.floor(Math.random() * 10000)
  const date = new Date().toISOString()

  reviewStore.addReview({
    id,
    date,
    productId: product.value.id,
    sellerId: product.value.sellerId,
    author: userName,
    authorId: currentUserId.value,
    rating: newReviewRating.value,
    text: newReviewText.value
  })

  closeReviewModal()

  const toast = await toastController.create({
    message: 'Valoración publicada con éxito',
    duration: 2000,
    position: 'bottom',
    color: 'success',
  })
  await toast.present()
}

const showAlreadyReviewedAlert = async () => {
  await Swal.fire({
    title: 'Valoración existente',
    text: 'Ya has valorado a este vendedor.',
    icon: 'info',
    heightAuto: false,
    scrollbarPadding: false,
    confirmButtonText: 'OK',
  })
}

const formatReviewDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

const goToChat = () => {
  if (!product.value) return
  
  // Crear o obtener el chat con el vendedor del producto
  const chat = chatStore.createOrGetChat(
    product.value.sellerId,
    product.value.seller,
    product.value.id,
    product.value.title,
    product.value.image
  )
  
  router.push(`/chat/${chat.id}`)
}

const toggleFavorite = async () => {
  if (!product.value) return
  
  favoriteStore.toggleFavorite(product.value.id)
  
  const message = isFav.value ? 'Añadido a favoritos' : 'Eliminado de favoritos'
  const toast = await toastController.create({
    message,
    duration: 1500,
    position: 'bottom',
    color: 'success',
  })
  await toast.present()
}

const showZoom = ref(false)
const zoomInitialSlide = ref(0)
const zoomSwiper = ref<SwiperClass | null>(null)

const setZoomSwiper = (swiper: SwiperClass) => {
  zoomSwiper.value = swiper
}

const openZoom = async (index: number) => {
  zoomInitialSlide.value = Math.max(index, 0)
  showZoom.value = true
  await nextTick()
  requestAnimationFrame(() => {
    zoomSwiper.value?.slideTo(zoomInitialSlide.value, 0)
    zoomSwiper.value?.zoom?.out()
  })
}

const closeZoom = () => {
  showZoom.value = false
  zoomSwiper.value?.zoom?.out()
}

const buyProduct = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  const productPrice = product.value?.price || 0
  router.push({
    path: '/payment',
    query: { total: productPrice.toString() }
  })
}

const confirmLogin = async () => {
  const result = await Swal.fire({
    title: 'Inicia sesion',
    text: 'Necesitas iniciar sesion para continuar con la compra.',
    icon: 'info',
    heightAuto: false,
    scrollbarPadding: false,
    showCancelButton: true,
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  })

  if (result.isConfirmed) {
    router.push('/login')
  }
}
</script>

<style scoped>
.product-content {
  --background: #f0f4f8;
}

.product-shell {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 16px 32px;
}

.product-hero-frame {
  position: relative;
  margin: 16px 0 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
}

.product-carousel {
  width: 100%;
}

.product-carousel :deep(.swiper-wrapper) {
  align-items: stretch;
}

.product-carousel :deep(.swiper-slide) {
  display: flex;
}

.product-hero {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
}

.carousel-control.prev {
  left: 12px;
}

.carousel-control.next {
  right: 12px;
}

.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.carousel-dots :deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: transform 200ms ease, background-color 200ms ease;
}

.carousel-dots :deep(.swiper-pagination-bullet-active) {
  background: #ffffff;
  transform: scale(1.2);
}

.product-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.35) 100%);
  pointer-events: none;
}

.product-body {
  padding: 20px 0 0;
}

.product-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.product-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.product-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #0f5223;
  background: #e6f4ea;
}

.product-price {
  margin: 0;
  font-size: 24px;
  color: #1a7f34;
  font-weight: 700;
}

.product-description {
  margin: 0 0 20px 0;
  color: #334155;
  line-height: 1.6;
}

.info-card,
.map-card,
.seller-card,
.reviews-card {
  border-radius: 16px;
  border: 1px solid #e3e8ef;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
}

.info-label {
  margin: 0 0 4px 0;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.info-value {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.map-frame {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.map-embed {
  width: 100%;
  height: 240px;
  border: 0;
}

.seller-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.seller-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e6f4ea;
}

.seller-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.seller-rating {
  margin: 0 0 4px 0;
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
}

.seller-location {
  margin: 0;
  color: #64748b;
  font-size: 12px;
}

.contact-seller-btn {
  margin-top: 12px;
  --border-radius: 12px;
  font-weight: 600;
  font-size: 13px;
  height: 36px;
}

.reviews-list {
  display: grid;
  gap: 12px;
}

.reviews-card-header {
  padding: 20px;
}

.review-item {
  padding: 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.reviews-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

.add-review-btn {
  --border-radius: 12px;
  font-weight: 600;
}

.no-reviews {
  padding: 20px;
  text-align: center;
  color: #64748b;
}

.no-reviews p {
  margin: 0;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.review-header > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-author {
  font-weight: 700;
  color: #0f172a;
  font-size: 13px;
}

.review-date {
  font-size: 11px;
  color: #94a3b8;
}

.review-stars {
  color: #f59e0b;
  font-size: 14px;
}

.review-text {
  margin: 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.5;
}

/* Review Modal Styles */
.review-modal-content {
  --background: #f8fafc;
}

.review-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 20px;
}

.rating-section {
  margin-bottom: 24px;
}

.rating-label,
.review-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}

.star-rating {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 16px 0;
}

.star-button {
  background: none;
  border: none;
  font-size: 36px;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 200ms ease;
  padding: 0;
  line-height: 1;
}

.star-button.active {
  color: #f59e0b;
  transform: scale(1.1);
}

.star-button:hover {
  transform: scale(1.15);
}

.review-text-section {
  margin-bottom: 24px;
}

.review-textarea {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  margin-top: 8px;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #94a3b8;
  margin: 4px 0 0 0;
}

.submit-review-btn {
  --border-radius: 14px;
  font-weight: 600;
  margin-top: 8px;
}

.product-actions {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.primary-action-wrapper {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.primary-action {
  --border-radius: 14px;
  --background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.primary-action:hover,
.primary-action:active {
  --background: linear-gradient(135deg, #0f5223 0%, #082a1a 100%);
  box-shadow: 0 8px 16px rgba(26, 127, 52, 0.3);
}

.price-badge {
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(26, 127, 52, 0.2);
}

.secondary-action {
  --border-radius: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #666;
}

@media (max-width: 520px) {
  .product-hero {
    height: 240px;
  }

  .product-header {
    flex-direction: column;
  }

  .product-title {
    font-size: 20px;
  }

  .product-price {
    font-size: 20px;
  }

  .product-tags {
    gap: 6px;
  }

  .product-tag {
    font-size: 11px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .product-shell {
    padding: 0 12px 24px;
  }

  .map-embed {
    height: 200px;
  }

  .seller-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-review-btn {
    width: 100%;
  }

  .carousel-control {
    display: none;
  }
}

.zoom-modal::part(backdrop) {
  background: rgba(15, 23, 42, 0.72);
}

.zoom-modal::part(content) {
  --background: transparent;
}

.zoom-surface {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.zoom-carousel {
  width: 100%;
  height: 100%;
}

.zoom-carousel :deep(.swiper-wrapper) {
  align-items: center;
}

.zoom-carousel :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-carousel :deep(.swiper-zoom-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-image {
  max-width: 100vw;
  max-height: 76vh;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.zoom-close {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: rgba(15, 23, 42, 0.6);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.zoom-dots {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.zoom-dots :deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 1;
  transition: transform 200ms ease, background-color 200ms ease;
}

.zoom-dots :deep(.swiper-pagination-bullet-active) {
  background: #ffffff;
  transform: scale(1.2);
}

.zoom-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.55);
}

.zoom-control.prev {
  left: 20px;
}

.zoom-control.next {
  right: 20px;
}

@media (max-width: 520px) {
  .zoom-control {
    display: none;
  }
}
</style>
