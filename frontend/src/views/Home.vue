<template>
  <ion-page>
  <CategoryMenu
    :categories="categories"
    @closeCategoryMenu="closeCategoryMenu"
    @selectCategoryFromMenu="selectCategoryFromMenu"
  />

  <FiltersMenu
    :showFiltersLayout="showFiltersLayout"
    :filters="filters"
    :availableBrands="availableBrands"
    @closeFiltersMenu="closeFiltersMenu"
    @resetFilters="resetFilters"
  />
  <ion-header class="header-content">
    <ion-toolbar class="header-toolbar">

      <!-- Logo -->
      <div class="logo-section" @click="goToHomeWithCarousel">
        <div class="logo-icon-box">
          <ion-img src="/logo.png" alt="Logo" class="logo-image"></ion-img>
        </div>
        <span class="brand-title">ReMarket</span>
      </div>
      <!-- Searchbar -->
      <div class="center-searchbar">
        <ion-searchbar
          class="home-searchbar"
          v-model="store.searchQuery"
          placeholder="Buscar productos..."
          showCancelButton="focus"
          @ionInput="resetVisibleCount"
        ></ion-searchbar>
      </div>

      <!-- Botones -->
      <ion-buttons class="actions-buttons">
        <ion-button
          v-if="!isLoggedIn"
          @click="goToLogin"
          class="login-btn"
        >
          <span class="hidden sm:inline">Iniciar sesión</span>
        </ion-button>

        <ion-button class="icon-btn" @click="goToPurchases">
          <ion-icon :icon="cartOutline"></ion-icon>
        </ion-button>

        <ion-button class="icon-btn" @click="goToFavorites">
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-button>

        <ion-button class="icon-btn" @click="goToProfileCustumer">
          <ion-icon :icon="personCircle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

          <!-- Menú horizontal de categorías -->
      <div class="categories-toolbar">
          <div class="menu-wrapper">          
            <ion-button class="filters-button mobile-only" @click="openFiltersMenu">
              <ion-icon :icon="funnelOutline" slot="start"></ion-icon>
              Filtros
            </ion-button>
          </div>
          <ion-button class="menu-button" @click="openCategoryMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
            <span>Todas las categorías</span>
          </ion-button>
        </div>
        <div class="categories-scroll">
          <div
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="['category-item', { active: selectedCategory === category.id }]"
          >
            {{ category.name }}

        </div>
      </div>
  </ion-header>

      <!-- Contenido Carrusell + grid-->
    <ion-content id="home-content">
      <!-- Mostrar carruseles o layout de categorías según el estado -->
      <div v-if="!hasContent" class="empty-state">
        <p>No hay productos para mostrar</p>
      </div>

      <div v-else class="market-sections">
        <section v-if="!showFiltersLayout">
          <section v-for="section in carouselSections" :key="section.id" class="category-section carousel-separated">
            <div class="section-header">
              <h2>{{ section.name }}</h2>
            </div>

            <div
              class="product-carousel carousel-wrapper"
              @touchstart.passive="onCarouselTouchStart($event, section.id)"
              @touchmove.passive="onCarouselTouchMove($event, section.id)"
              @touchend="onCarouselTouchEnd(section.id, section.items.length)"
            >
              <!-- Carousel -->
              <Swiper
                :loop="true"
                :pagination="{
                  clickable: true,
                }"
                :navigation="true"
                :modules="modules"
                :breakpoints="{
                  0: { slidesPerView: 2, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }"
                class="product-swiper"                  
                >
              <SwiperSlide
              v-for="(product, index) in section.items"
              :key="`${section.id}-${product.id}-${index}`"
              >
              <ion-card
              class="product-card"
              @click="goToProduct(product.id)"
              >
              <div class="product-image-container">
                <ion-img :src="product.image" :alt="product.title" class="product-image"></ion-img>
                <button 
                  type="button"
                  class="favorite-btn"
                  :class="{ active: isFavoriteProduct(product.id) }"
                  @click="toggleProductFavorite($event, product.id)"
                >
                  <ion-icon :icon="isFavoriteProduct(product.id) ? heart : heartOutline"></ion-icon>
                </button>
              </div>
              <ion-card-header>
                <ion-card-title class="product-title">
                  {{ product.title }}
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="product-meta">
                  <span class="product-price">{{ product.price }}€</span>
                  <span class="product-location">{{ product.location }}</span>
                </div>
              </ion-card-content>
              </ion-card>
            </SwiperSlide>
          </Swiper>
            </div>
          </section>
        </section>
      </div>
      <!-- grid -->
       <div
       v-if="showFiltersLayout"
       class="product-grid"
        >
        <ion-card
          v-for="product in visibleProducts"
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="product-image-container">
            <ion-img :src="product.image" :alt="product.title" class="product-image"></ion-img>
            <button 
              type="button"
              class="favorite-btn"
              :class="{ active: isFavoriteProduct(product.id) }"
              @click="toggleProductFavorite($event, product.id)"
            >
              <ion-icon :icon="isFavoriteProduct(product.id) ? heart : heartOutline"></ion-icon>
            </button>
          </div>
          <ion-card-header>
            <ion-card-title class="product-title">
              {{ product.title }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="product-meta">
              <span class="product-price">{{ product.price }}€</span>
              <span class="product-location">{{ product.location }}</span>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
<!-- ==================== FAB DE CHAT Y PUBLICAR ==================== -->
    <ion-fab
      slot="fixed"
      horizontal="start"
      vertical="bottom"
    >
      <ion-fab-button class="chat-fab-button" @click="toggleChatFab">
        <ion-icon :icon="chevronForwardCircle"></ion-icon>
        <ion-badge v-if="unreadCount > 0" class="fab-badge">{{ unreadCount }}</ion-badge>
      </ion-fab-button>
      <ion-fab-list side="end" :class="{'fab-list-active': isChatFabOpen}">
        <ion-fab-button class="chat-fab-item" title="Publicar" @click="goToSellFromFab">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <ion-fab-button class="chat-fab-item chat-item" title="Vendedor" @click="goToChatList('seller')">
          <ion-icon :icon="chatbubblesOutline"></ion-icon>
          <ion-badge v-if="unreadCount > 0" class="fab-list-badge">{{ unreadCount }}</ion-badge>
        </ion-fab-button>
        <ion-fab-button class="chat-fab-item" title="Mensajes" @click="goToChatList('support')">
          <ion-icon :icon="storefrontOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

  </ion-page>
</template>

<script setup lang="ts">
/* swipper */
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { Navigation, Pagination } from 'swiper/modules'

  const modules = [Pagination, Navigation];

/* Componentes */
import FiltersMenu from '@/components/FiltersMenu.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import { HOME_CATEGORIES, BRANDS_BY_CATEGORY } from '@/utils/constants'
import { computed, ref, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useChatStore } from '@/stores/chatStore'
import { useReviewStore } from '@/stores/reviewStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRouter } from 'vue-router'
/* Ionic & Vue */
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonButtons,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  menuController,
  IonFab,
  IonFabButton,
  IonFabList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonBadge,
  alertController,
  onIonViewWillEnter
} from '@ionic/vue'
import type { ComponentPublicInstance } from 'vue'
import {
  heart,
  personCircle,
  storefrontOutline,
  menuOutline,
  add,
  cartOutline,
  searchOutline,
  chatbubblesOutline,
  chevronForwardCircle,
  chevronBackOutline,
  chevronForwardOutline,
  funnelOutline,
  heartOutline,
} from 'ionicons/icons'

import '@/assets/styles/main.css'

const router = useRouter()
const store = useProductStore()
const chatStore = useChatStore()
const reviewStore = useReviewStore()
const favoriteStore = useFavoriteStore()

const isLoggedIn = ref(false)
const isChatFabOpen = ref(false)
const unreadCount = computed(() => chatStore.totalUnread)

interface CarouselState {
  index: number
  slideSize: number
  isTransitioning: boolean
  clones: number
  touchStartX: number | null
  touchDeltaX: number
}

const carouselState = reactive<Record<string, CarouselState>>({})
const carouselTrackRefs = ref<Record<string, HTMLElement | null>>({})
const infiniteScrollRef = ref<HTMLElement | null>(null)

const itemsPerPage = 8
const visibleCount = ref(itemsPerPage)

const filters = reactive({
  minPrice: '',
  maxPrice: '',
  condition: 'all',
  location: '',
  sort: 'recent',
  brand: 'all',
})

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

const categories = HOME_CATEGORIES

const carouselCategoryIds = new Set(['Electrónica', 'Vehículos'])

const brandsByCategory = BRANDS_BY_CATEGORY

const selectedCategory = computed({
  get: () => store.selectedCategory,
  set: (value) => {
    store.selectedCategory = value
  },
})

const availableBrands = computed(() => {
  if (!selectedCategory.value || !brandsByCategory[selectedCategory.value]) {
    return []
  }
  return brandsByCategory[selectedCategory.value]
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const openCategoryMenu = async () => {
  await menuController.open()
}

const closeCategoryMenu = async () => {
  await menuController.close()
}

const selectCategoryFromMenu = async (categoryId: string) => {
  selectedCategory.value = categoryId
  await menuController.close()
}

const openFiltersMenu = async () => {
  await menuController.open('filters-menu')
}

const closeFiltersMenu = async () => {
  await menuController.close('filters-menu')
}

const resetFilters = () => {
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.condition = 'all'
  filters.location = ''
  filters.sort = 'recent'
  filters.brand = 'all'
}

const filteredProducts = computed(() => {
  let list = [...store.filteredProducts]

  const minPrice = Number.parseFloat(filters.minPrice)
  if (!Number.isNaN(minPrice)) {
    list = list.filter((product) => product.price >= minPrice)
  }

  const maxPrice = Number.parseFloat(filters.maxPrice)
  if (!Number.isNaN(maxPrice)) {
    list = list.filter((product) => product.price <= maxPrice)
  }

  if (filters.condition !== 'all') {
    list = list.filter((product) => product.condition.startsWith(filters.condition))
  }

  const locationQuery = filters.location.trim().toLowerCase()
  if (locationQuery) {
    list = list.filter((product) => product.location.toLowerCase().includes(locationQuery))
  }

  if (filters.brand !== 'all') {
    list = list.filter((product) => product.brand?.toLowerCase() === filters.brand.toLowerCase())
  }

  if (filters.sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  } else {
    list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
  return list
})

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const nonCarouselProducts = computed(() =>
  filteredProducts.value.filter((product) => !carouselCategoryIds.has(product.category)),
)
const visibleNonCarouselProducts = computed(() =>
  nonCarouselProducts.value.slice(0, visibleCount.value),
)

const showFiltersLayout = computed(() => {
  return !!(store.selectedCategory || store.searchQuery.trim())
})

const carouselSections = computed(() => {
  if (showFiltersLayout.value) {
    return []
  }
  return categories
    .filter((category) => carouselCategoryIds.has(category.id))
    .map((category) => ({
      ...category,
      items: filteredProducts.value.filter((product) => product.category === category.id),
    }))
    .filter((section) => section.items.length > 0)
})

const categorySections = computed(() => {
  if (!showFiltersLayout.value) {
    return []
  }
  
  // Si hay búsqueda activa, mostrar todos los resultados en una sola sección
  if (store.searchQuery.trim() && !store.selectedCategory) {
    return [{
      id: 'search-results',
      name: 'Resultados de búsqueda',
      items: visibleProducts.value,
    }].filter((section) => section.items.length > 0)
  }
  
  // Si hay categoría seleccionada, mostrar solo esa categoría
  return categories
    .filter((category) => category.id === store.selectedCategory)
    .map((category) => ({
      ...category,
      items: visibleProducts.value.filter((product) => product.category === category.id),
    }))
    .filter((section) => section.items.length > 0)
})

const hasMore = computed(() => {
  if (showFiltersLayout.value) {
    return visibleCount.value < filteredProducts.value.length
  }
  return visibleCount.value < nonCarouselProducts.value.length
})

const hasContent = computed(() => {
  if (showFiltersLayout.value) {
    return categorySections.value.length > 0
  }
  return carouselSections.value.length > 0 || visibleNonCarouselProducts.value.length > 0
})



const getClonesCount = (itemsCount: number) => {
  if (itemsCount <= 1) {
    return 0
  }
  return Math.min(2, itemsCount)
}

const getCarouselState = (sectionId: string, itemsCount: number) => {
  if (!carouselState[sectionId]) {
    carouselState[sectionId] = {
      index: 0,
      slideSize: 0,
      isTransitioning: true,
      clones: getClonesCount(itemsCount),
      touchStartX: null,
      touchDeltaX: 0,
    }
  }

  carouselState[sectionId].clones = getClonesCount(itemsCount)
  return carouselState[sectionId]
}

const setCarouselTrackRef = (sectionId: string) => (el: Element | ComponentPublicInstance | null) => {
  carouselTrackRefs.value[sectionId] = el as HTMLElement | null
}

const getCarouselItems = (section: { items: typeof store.filteredProducts }) => {
  const items = section.items
  const clones = getClonesCount(items.length)

  if (clones === 0) {
    return items
  }

  const head = items.slice(0, clones)
  const tail = items.slice(-clones)
  return [...tail, ...items, ...head]
}

const updateCarouselSlideSize = (sectionId: string) => {
  const track = carouselTrackRefs.value[sectionId]
  const state = carouselState[sectionId]

  if (!track || !state) {
    return
  }

  const slide = track.querySelector<HTMLElement>('.carousel-slide')
  if (!slide) {
    return
  }

  const styles = window.getComputedStyle(track)
  const gapValue = styles.columnGap || styles.gap || '12px'
  const gap = Number.parseFloat(gapValue) || 12
  state.slideSize = slide.getBoundingClientRect().width + gap
}

const initCarousel = async (sectionId: string, itemsCount: number) => {
  const state = getCarouselState(sectionId, itemsCount)

  if (itemsCount <= 1) {
    state.index = 0
    state.isTransitioning = false
    return
  }

  if (state.index === 0 || state.index < state.clones || state.index >= itemsCount + state.clones * 2) {
    state.index = state.clones
  }

  state.isTransitioning = true
  await nextTick()
  updateCarouselSlideSize(sectionId)
}

const getCarouselTrackStyle = (sectionId: string) => {
  const state = carouselState[sectionId]

  if (!state || state.slideSize === 0) {
    return {}
  }

  return {
    transform: `translateX(-${state.index * state.slideSize}px)`,
    transition: state.isTransitioning ? 'transform 450ms ease' : 'none',
  }
}

const jumpToIndex = (sectionId: string, nextIndex: number) => {
  const state = carouselState[sectionId]

  if (!state) {
    return
  }

  state.isTransitioning = false
  state.index = nextIndex
  requestAnimationFrame(() => {
    state.isTransitioning = true
  })
}

const handleCarouselTransitionEnd = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }

  const state = carouselState[sectionId]
  if (!state) {
    return
  }

  const clones = state.clones
  if (state.index >= itemsCount + clones) {
    jumpToIndex(sectionId, state.index - itemsCount)
    return
  }

  if (state.index < clones) {
    jumpToIndex(sectionId, state.index + itemsCount)
  }
}

const nextSlide = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index += 2
}

const prevSlide = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index -= 2
}

const goToSlide = (sectionId: string, targetIndex: number, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index = targetIndex + state.clones
}

const getCarouselDotIndex = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return 0
  }
  const state = getCarouselState(sectionId, itemsCount)
  const normalized = (state.index - state.clones) % itemsCount
  return normalized < 0 ? normalized + itemsCount : normalized
}

const onCarouselTouchStart = (event: TouchEvent, sectionId: string) => {
  const state = carouselState[sectionId]
  if (!state) {
    return
  }
  state.touchStartX = event.touches[0]?.clientX ?? null
  state.touchDeltaX = 0
}

const onCarouselTouchMove = (event: TouchEvent, sectionId: string) => {
  const state = carouselState[sectionId]
  if (!state || state.touchStartX === null) {
    return
  }
  state.touchDeltaX = (event.touches[0]?.clientX ?? state.touchStartX) - state.touchStartX
}

const onCarouselTouchEnd = (sectionId: string, itemsCount: number) => {
  const state = carouselState[sectionId]
  if (!state) {
    return
  }

  if (Math.abs(state.touchDeltaX) > 30) {
    if (state.touchDeltaX > 0) {
      prevSlide(sectionId, itemsCount)
    } else {
      nextSlide(sectionId, itemsCount)
    }
  }

  state.touchStartX = null
  state.touchDeltaX = 0
}

const ionInfinite = async (event: CustomEvent) => {
  if (visibleCount.value < filteredProducts.value.length) {
    visibleCount.value = Math.min(visibleCount.value + itemsPerPage, filteredProducts.value.length)
  }

  await nextTick()
  const target = event.target as HTMLIonInfiniteScrollElement | null
  target?.complete()
  if (!hasMore.value && target) {
    target.disabled = true
  }
}

const resetVisibleCount = async () => {
  visibleCount.value = itemsPerPage
  await nextTick()
  const target = infiniteScrollRef.value as HTMLIonInfiniteScrollElement | null
  if (target) {
    target.disabled = !hasMore.value
  }
}

const goToHomeWithCarousel = () => {
  selectedCategory.value = ''
  router.push('/tabs/home')
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

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

const toggleProductFavorite = (e: Event, productId: number) => {
  e.stopPropagation()
  favoriteStore.loadFavorites()
  favoriteStore.toggleFavorite(productId)
}

const isFavoriteProduct = (productId: number) => {
  return favoriteStore.isFavorite(productId)
}

const goToLogin = () => {
  router.push('/login')
}

const goToProfileCustumer = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/profile')
}

const goToFavorites = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/favorites')
}

const goToPurchases = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/purchases')
}

const goToSearch = () => {
  router.push('/tabs/search')
}

const confirmLogin = async () => {
  const alert = await alertController.create({
    header: 'Inicia sesion',
    message: 'Necesitas iniciar sesion para continuar.',
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

const goToSell = () => {
  router.push('/tabs/sell')
}

const goToSellFromFab = () => {
  isChatFabOpen.value = false
  goToSell()
}

const toggleChatFab = () => {
  isChatFabOpen.value = !isChatFabOpen.value
}

const goToChatList = (type: 'support' | 'seller') => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  isChatFabOpen.value = false
  if (type === 'support') {
    router.push('/tabs/chat')
    return
  }
  router.push('/chat/1')
}

const handleCarouselResize = () => {
  Object.keys(carouselState).forEach((sectionId) => {
    updateCarouselSlideSize(sectionId)
  })
}

watch(
  carouselSections,
  (sections) => {
    sections.forEach((section) => {
      initCarousel(section.id, section.items.length)
    })
  },
  { immediate: true },
)

watch(
  () => [
    store.filteredProducts,
    store.selectedCategory,
    store.searchQuery,
    filters.minPrice,
    filters.maxPrice,
    filters.condition,
    filters.location,
    filters.sort,
    filters.brand,
  ],
  () => {
    resetVisibleCount()
  },
)

onMounted(() => {
  window.addEventListener('resize', handleCarouselResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleCarouselResize)
})
</script>

<style scoped>
/* =========================
   HEADER HOME
========================= */
.header-content {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.header-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  padding: 0 24px;
  box-sizing: border-box;
  gap: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: 0;
}

.center-searchbar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 200px;
  max-width: 700px;
  margin: 0 32px;
}

.home-searchbar {
  width: 100%;
  min-width: 180px;
  max-width: 700px;
}

.actions-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  justify-content: flex-end;
  min-width: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  min-width: 0;
}

.logo-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-left: 0;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-title {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
  margin-right: 0;
}

.center-searchbar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;
  min-width: 180px;
  max-width: 600px;
  margin: 0 32px;
}

.home-searchbar {
  width: 100%;
  max-width: 420px;
  --background: #f1f5f9;
  --border-radius: 12px;
  --padding-start: 12px;
  --padding-end: 12px;
  --placeholder-color: #94a3b8;
  --icon-color: #94a3b8;
}

.actions-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  justify-content: flex-end;
  min-width: 0;
}

@media (min-width: 640px) {
  .header-toolbar {
    min-height: 72px;
    padding: 0 48px;
  }
  .center-searchbar {
    margin: 0 48px;
    max-width: 700px;
  }
}



/* =========================
   MARKET LAYOUT
========================= */
.market-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 700;
}

/* =========================
   GRID
========================= */
.product-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* =========================
   RESPONSIVE HOME
========================= */
@media (min-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .market-sections {
    padding: 24px;
  }
}

/* =========================
   PRODUCT CARD
========================= */
.product-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e6ebf2;
  box-shadow: 0 6px 24px rgba(26, 127, 52, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 12px 32px rgba(26, 127, 52, 0.18);
  transform: translateY(-4px) scale(1.02);
  border-color: #1a7f34;
}

.product-image-container {
  width: 100%;
  height: 160px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.product-title {
  padding-left: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #000000;
  margin: 0;
  min-height: 2.4em;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.98em;
  color: #64748b;
  margin-top: 4px;
}

.product-price {
  color: #1a7f34;
  font-weight: 800;
  font-size: 1.08em;
}

.product-location {
  color: #94a3b8;
  font-size: 0.97em;
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.92);
  color: #1a7f34;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(26,127,52,0.10);
  transition: background 0.2s, color 0.2s;
  z-index: 2;
  cursor: pointer;
}
.favorite-btn.active {
  color: #ef4444;
  background: #fff;
}
.favorite-btn:hover {
  background: #e6ebf2;
  color: #ef4444;
}

.favorite-btn ion-icon {
  font-size: 20px;
}

</style>