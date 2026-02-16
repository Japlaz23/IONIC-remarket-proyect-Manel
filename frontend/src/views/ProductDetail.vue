<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Producto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="product-content">
      <div class="product-shell">
        <template v-if="product">
          <div class="product-hero-frame">
            <div class="product-carousel" ref="carouselRef" @scroll="handleCarouselScroll">
              <div
                v-for="(image, index) in galleryImages"
                :key="`${product.id}-${index}`"
                class="product-slide"
              >
                <img
                  :src="image"
                  :alt="product.title"
                  class="product-hero"
                  @click="openZoom(image)"
                />
              </div>
            </div>
            <div class="carousel-dots" aria-hidden="true">
              <span
                v-for="(image, index) in galleryImages"
                :key="`dot-${product.id}-${index}`"
                class="carousel-dot"
                :class="{ active: index === activeSlide }"
              ></span>
            </div>
            <button class="carousel-control prev" type="button" @click="scrollCarousel(-1)">
              Prev
            </button>
            <button class="carousel-control next" type="button" @click="scrollCarousel(1)">
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
              <ion-card-content class="seller-content">
                <img class="seller-avatar" src="/placeholder.svg" alt="Perfil del vendedor" />
                <div class="seller-meta">
                  <h3 class="seller-name">{{ product.seller }}</h3>
                  <p class="seller-rating">★★★★★ 4.8 · 24 ventas</p>
                  <p class="seller-location">{{ product.location }}</p>
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
              <ion-card-header>
                <ion-card-title style="padding: 20px;">Valoraciones recientes</ion-card-title>
              </ion-card-header>
              <ion-card-content class="reviews-list">
                <div v-for="review in reviews" :key="review.id" class="review-item">
                  <div class="review-header">
                    <span class="review-author">{{ review.author }}</span>
                    <span class="review-stars">{{ review.stars }}</span>
                  </div>
                  <p class="review-text">{{ review.text }}</p>
                </div>
              </ion-card-content>
            </ion-card>

            <div class="product-actions">
              <ion-button expand="block" color="primary" class="primary-action" @click="buyProduct">
                Comprar
              </ion-button>
              <ion-button
                expand="block"
                color="success"
                class="secondary-action"
                @click="goToChat(product.id)"
              >
                Contactar vendedor
              </ion-button>
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
        <div class="zoom-carousel" ref="zoomCarouselRef" @scroll="handleZoomCarouselScroll">
          <div
            v-for="(image, index) in galleryImages"
            :key="`zoom-${product?.id ?? 'x'}-${index}`"
            class="zoom-slide"
          >
            <img
              :src="image"
              alt="Vista ampliada"
              class="zoom-image"
              :style="{ transform: `translate(${zoomTranslate.x}px, ${zoomTranslate.y}px) scale(${zoomScale})` }"
              @dblclick="toggleZoom"
              @pointerdown="onZoomPointerDown"
              @pointermove="onZoomPointerMove"
              @pointerup="onZoomPointerUp"
              @pointercancel="onZoomPointerUp"
              @pointerleave="onZoomPointerUp"
            />
          </div>
        </div>
        <div class="zoom-dots" aria-hidden="true">
          <span
            v-for="(image, index) in galleryImages"
            :key="`zoom-dot-${product?.id ?? 'x'}-${index}`"
            class="zoom-dot"
            :class="{ active: index === zoomActiveSlide }"
          ></span>
        </div>
        <button class="zoom-control prev" type="button" @click="scrollZoomCarousel(-1)">
          Prev
        </button>
        <button class="zoom-control next" type="button" @click="scrollZoomCarousel(1)">
          Next
        </button>
      </div>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
  IonModal,
  onIonViewWillEnter,
  alertController,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

const isLoggedIn = ref(false)

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

const product = computed(() => {
  const id = route.params.id
  const idValue = Array.isArray(id) ? id[0] : id
  return store.getProductById(idValue)
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

const reviews = [
  { id: 1, author: 'Carla', stars: '★★★★★', text: 'Entrega rapida y producto en buen estado.' },
  { id: 2, author: 'Miguel', stars: '★★★★☆', text: 'Buen trato y comunicacion.' },
  { id: 3, author: 'Laura', stars: '★★★★★', text: 'Recomendado, todo perfecto.' },
]

const goToChat = (productId: number) => {
  router.push(`/chat/${productId}`)
}

const carouselRef = ref<HTMLElement | null>(null)
const activeSlide = ref(0)
const showZoom = ref(false)
const zoomImage = ref('')
const zoomScale = ref(1)
const zoomTranslate = ref({ x: 0, y: 0 })
const zoomCarouselRef = ref<HTMLElement | null>(null)
const zoomActiveSlide = ref(0)
const zoomPointers = new Map<number, { x: number; y: number }>()
const zoomStateByIndex = new Map<number, { scale: number; translate: { x: number; y: number } }>()
let pinchStartDistance = 0
let pinchStartScale = 1
let lastTapTime = 0
let dragPointerId: number | null = null
let dragStart = { x: 0, y: 0 }
let dragStartTranslate = { x: 0, y: 0 }

const updateActiveSlide = () => {
  const carousel = carouselRef.value
  if (!carousel) {
    return
  }
  const width = carousel.clientWidth
  if (!width) {
    return
  }
  activeSlide.value = Math.round(carousel.scrollLeft / width)
}

const handleCarouselScroll = () => {
  updateActiveSlide()
}

const scrollCarousel = (direction: number) => {
  const carousel = carouselRef.value
  if (!carousel) {
    return
  }
  const width = carousel.clientWidth
  carousel.scrollBy({ left: width * direction, behavior: 'smooth' })
}

const openZoom = (image: string) => {
  zoomImage.value = image
  showZoom.value = true
  const index = galleryImages.value.findIndex((item) => item === image)
  zoomActiveSlide.value = Math.max(index, 0)
  requestAnimationFrame(() => {
    const carousel = zoomCarouselRef.value
    if (!carousel) {
      return
    }
    const width = carousel.clientWidth
    carousel.scrollTo({ left: width * zoomActiveSlide.value })
    applyZoomState(zoomActiveSlide.value)
  })
}

const closeZoom = () => {
  saveZoomState(zoomActiveSlide.value)
  showZoom.value = false
  zoomImage.value = ''
  zoomScale.value = 1
  zoomTranslate.value = { x: 0, y: 0 }
  zoomPointers.clear()
  pinchStartDistance = 0
  pinchStartScale = 1
  lastTapTime = 0
  dragPointerId = null
}

const getActiveZoomImage = () => {
  const carousel = zoomCarouselRef.value
  if (!carousel) {
    return null
  }
  const images = carousel.querySelectorAll<HTMLImageElement>('.zoom-image')
  return images[zoomActiveSlide.value] || null
}

const clampTranslate = (nextTranslate: { x: number; y: number }) => {
  const carousel = zoomCarouselRef.value
  const image = getActiveZoomImage()
  if (!carousel || !image) {
    return nextTranslate
  }
  const containerWidth = carousel.clientWidth
  const containerHeight = carousel.clientHeight
  const baseWidth = image.clientWidth
  const baseHeight = image.clientHeight
  const scaledWidth = baseWidth * zoomScale.value
  const scaledHeight = baseHeight * zoomScale.value
  const maxX = Math.max(0, (scaledWidth - containerWidth) / 2)
  const maxY = Math.max(0, (scaledHeight - containerHeight) / 2)
  return {
    x: Math.min(maxX, Math.max(-maxX, nextTranslate.x)),
    y: Math.min(maxY, Math.max(-maxY, nextTranslate.y)),
  }
}

const saveZoomState = (index: number) => {
  zoomStateByIndex.set(index, {
    scale: zoomScale.value,
    translate: { ...zoomTranslate.value },
  })
}

const applyZoomState = (index: number) => {
  const saved = zoomStateByIndex.get(index)
  if (saved) {
    zoomScale.value = saved.scale
    zoomTranslate.value = clampTranslate(saved.translate)
    return
  }
  zoomScale.value = 1
  zoomTranslate.value = { x: 0, y: 0 }
}

const updateZoomActiveSlide = () => {
  const carousel = zoomCarouselRef.value
  if (!carousel) {
    return
  }
  const width = carousel.clientWidth
  if (!width) {
    return
  }
  const nextIndex = Math.round(carousel.scrollLeft / width)
  if (nextIndex !== zoomActiveSlide.value) {
    saveZoomState(zoomActiveSlide.value)
    zoomActiveSlide.value = nextIndex
    requestAnimationFrame(() => {
      applyZoomState(nextIndex)
    })
  }
}

const handleZoomCarouselScroll = () => {
  updateZoomActiveSlide()
}

const scrollZoomCarousel = (direction: number) => {
  const carousel = zoomCarouselRef.value
  if (!carousel) {
    return
  }
  const width = carousel.clientWidth
  carousel.scrollBy({ left: width * direction, behavior: 'smooth' })
}

const getPinchDistance = () => {
  const points = Array.from(zoomPointers.values())
  if (points.length < 2) {
    return 0
  }
  const [a, b] = points
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}

const onZoomPointerDown = (event: PointerEvent) => {
  ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  zoomPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
  if (zoomPointers.size === 2) {
    pinchStartDistance = getPinchDistance()
    pinchStartScale = zoomScale.value
    dragPointerId = null
    return
  }

  if (zoomPointers.size === 1 && zoomScale.value > 1) {
    dragPointerId = event.pointerId
    dragStart = { x: event.clientX, y: event.clientY }
    dragStartTranslate = { ...zoomTranslate.value }
  }
}

const onZoomPointerMove = (event: PointerEvent) => {
  if (!zoomPointers.has(event.pointerId)) {
    return
  }
  zoomPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
  if (zoomPointers.size === 2 && pinchStartDistance > 0) {
    const distance = getPinchDistance()
    const nextScale = (pinchStartScale * distance) / pinchStartDistance
    zoomScale.value = Math.min(Math.max(nextScale, 1), 3)
    if (zoomScale.value === 1) {
      zoomTranslate.value = { x: 0, y: 0 }
    }
    zoomTranslate.value = clampTranslate(zoomTranslate.value)
    return
  }

  if (dragPointerId === event.pointerId && zoomScale.value > 1) {
    const dx = event.clientX - dragStart.x
    const dy = event.clientY - dragStart.y
    zoomTranslate.value = clampTranslate({
      x: dragStartTranslate.x + dx,
      y: dragStartTranslate.y + dy,
    })
  }
}

const onZoomPointerUp = (event: PointerEvent) => {
  if (zoomPointers.has(event.pointerId)) {
    zoomPointers.delete(event.pointerId)
  }
  if (zoomPointers.size < 2) {
    pinchStartDistance = 0
    pinchStartScale = zoomScale.value
  }

  if (dragPointerId === event.pointerId) {
    dragPointerId = null
  }

  if (zoomPointers.size === 0 && event.pointerType === 'touch') {
    const now = Date.now()
    if (now - lastTapTime < 280) {
      toggleZoom()
      lastTapTime = 0
    } else {
      lastTapTime = now
    }
  }
}

const toggleZoom = () => {
  if (zoomScale.value > 1) {
    zoomScale.value = 1
    zoomTranslate.value = { x: 0, y: 0 }
    return
  }
  zoomScale.value = 2
  zoomTranslate.value = clampTranslate({ x: 0, y: 0 })
}

onMounted(() => {
  updateActiveSlide()
  window.addEventListener('resize', updateActiveSlide)
  window.addEventListener('resize', updateZoomActiveSlide)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateActiveSlide)
  window.removeEventListener('resize', updateZoomActiveSlide)
})

const buyProduct = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/purchases')
}

const confirmLogin = async () => {
  const alert = await alertController.create({
    header: 'Inicia sesion',
    message: 'Necesitas iniciar sesion para continuar con la compra.',
    cssClass: 'auth-alert',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Continuar',
        handler: () => {
          router.push('/login')
        },
      },
    ],
  })
  await alert.present()
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
  touch-action: pan-x;
}

.product-carousel {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  overscroll-behavior-x: contain;
}

.product-carousel::-webkit-scrollbar {
  display: none;
}

.product-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
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

.carousel-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  transition: transform 200ms ease, background-color 200ms ease;
}

.carousel-dot.active {
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

.reviews-list {
  display: grid;
  gap: 12px;
}

.review-item {
  padding: 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.review-author {
  font-weight: 700;
  color: #0f172a;
  font-size: 13px;
}

.review-stars {
  color: #f59e0b;
  font-size: 12px;
}

.review-text {
  margin: 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.5;
}

.product-actions {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.primary-action {
  --border-radius: 14px;
  font-weight: 600;
}

.secondary-action {
  --border-radius: 14px;
  font-weight: 600;
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
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
}

.zoom-carousel::-webkit-scrollbar {
  display: none;
}

.zoom-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-image {
  max-width: 100vw;
  max-height: 76vh;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  touch-action: none;
  transition: transform 120ms ease;
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

.zoom-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
}

.zoom-dot.active {
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
