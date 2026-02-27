<template>
  <ion-page>
    <!-- CategoriesMenu para menú lateral -->
    <CategoriesMenu
      :categories="categories"
      @closeCategoriesMenu="closeCategoriesMenu"
      @selectCategoriesFromMenu="selectCategoriesFromMenu"
    />

    <FiltersMenu
      :showFiltersLayout="showFiltersLayout"
      :filters="filters"
      :availableBrands="availableBrands"
      @closeFiltersMenu="closeFiltersMenu"
      @resetFilters="resetFilters"
    />
  <ion-header>
    <ion-toolbar class="header-toolbar">
      <div class="header-content">
        <div class="header-left" @click="goToHomeWithCarousel">
          <ion-avatar class="logo-section">
            <ion-img src="/logo.png" alt="Logo" class="logo-image logo-icon-box"></ion-img>
          </ion-avatar>
          <span class="logo-text">ReMarket</span>
        </div>
        <!-- Searchbar -->
        <div class="header-center">
          <ion-searchbar
            class="home-searchbar"
            v-model="store.searchQuery"
            placeholder="Buscar productos..."
            showCancelButton="focus"
          ></ion-searchbar>
        </div>

        <!-- -->
        <div class="header-right">
          <ion-buttons class="actions-buttons">

            <ion-button class="icon-btn-search" @click="goToSearch">
              <ion-icon :icon="searchOutline"></ion-icon>
            </ion-button>
            <ion-button color="primary" fill="outline"
              v-if="!isLoggedIn"
              @click="goToLogin"
              class="login-btn"
            >
              <span>Iniciar sesión</span>
            </ion-button>
            <ion-button class="icon-btn" @click="goToPurchases">
              <ion-icon :icon="cartOutline"></ion-icon>
            </ion-button>
            <ion-button class="icon-btn" @click="goToFavorites">
              <ion-icon :icon="heartOutline"></ion-icon>
            </ion-button>
            <ion-button
              v-if="isLoggedIn"
              class="icon-btn"
              @click="goToProfileCustumer"
            >
              <ion-icon :icon="personCircle"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </ion-toolbar>
    <ion-toolbar class="categories-menu">
      <div style="display: flex; align-items: center;">
        <ion-buttons slot="start">
          <ion-button @click="openCategoriesMenu" class="categories-menu-btn">
            <ion-icon :icon="listOutline"></ion-icon>
            <span class="ml-2">Categorías</span>
          </ion-button>
        </ion-buttons>
        <ion-segment style="margin-left: 8px;" v-model="store.selectedCategories" class="categories-segment">
          <ion-segment-button v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </ion-segment-button>
        </ion-segment>
      </div>
    </ion-toolbar>
  </ion-header>

      <!-- Contenido Carrusell + grid-->
    <ion-content id="home-content" class="ion-padding">
      <div class="page-container">
      <!-- Mostrar carruseles o layout de categorías según el estado -->
      <div v-if="!hasContent" class="empty-state">
        <div class="empty-icon">
          <ion-icon :icon="cartOutline" size="large"></ion-icon>
        </div>
        <p class="empty-title">No hay productos para mostrar</p>
        <p class="empty-desc">Intenta cambiar los filtros o busca otra categoría.</p>
      </div>

      <!-- -->
      <div v-else class="market-sections">
        <section v-if="!showFiltersLayout">
          <section v-for="section in carouselSections" :key="section.id" class="categories-section carousel-separated">
            <div class="section-header">
              <h2>{{ section.name }}</h2>
            </div>

            <div
              class="carousel-wrapper"
 
            >
              <!-- Carousel montado en Swiper.js -->
              <div class="carousel-row">
                <Swiper
                  :loop="true"
                  :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
                  :pagination="false"
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
                <button class=" swiper-button-prev" ></button>
                <button class=" swiper-button-next" ></button>
              </div>
        </div>
          </section>
        </section>
      </div>
      <!-- grid  -->
      <ion-grid class="product-grid improved-grid">
        <ion-row class="product-row center-row">
          <ion-col
            v-for="product in visibleProducts"
            :key="product.id"
            size="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            class="product-col"
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
          </ion-col>
          <ion-col
            v-if="visibleProducts.length % 3 !== 0"
            v-for="n in (3 - (visibleProducts.length % 3))"
            :key="'empty-' + n"
            size="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            class="product-col empty-col"
          >
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- ========= layout filtros ========= -->

      </div>
      
<!-- ==================== FAB DE CHAT Y PUBLICAR ==================== -->

        <ion-fab horizontal="start" vertical="bottom" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
          <ion-fab-list side="end">
            <ion-fab-button @click="goToSellFromFab" style="margin-left: 12px;"> 
              <ion-icon :icon="storefrontOutline"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="goToChatList('support')" style="margin-left: 12px;">
              <ion-icon :icon="paperPlane"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="goToChatList('seller')" style="margin-left: 12px;">
              <ion-icon :icon="personCircle"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>
    </ion-content>
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
import CategoriesMenu from '@/components/CategoriesMenu.vue'
import { HOME_CATEGORIES, BRANDS_BY_CATEGORIES } from '@/utils/constants'
import { computed, ref, reactive, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useChatStore } from '@/stores/chatStore'
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
  menuController,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  onIonViewWillEnter,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,

} from '@ionic/vue'


import {
  heart,
  personCircle,
  cartOutline,
  heartOutline,
  listOutline,
  storefrontOutline,
  add,
  paperPlane,
  searchOutline,
  document,
  colorPalette,
  globe,

} from 'ionicons/icons'

import Swal from 'sweetalert2'
import '@/assets/styles/main.css'

const router = useRouter()
const store = useProductStore()
const chatStore = useChatStore()
const favoriteStore = useFavoriteStore()

const isLoggedIn = ref(false)
const isChatFabOpen = ref(false)
const unreadCount = computed(() => chatStore.totalUnread)

// interface CarouselState {
//   index: number
//   slideSize: number
//   isTransitioning: boolean
//   clones: number
//   touchStartX: number | null
//   touchDeltaX: number
// }

// const carouselState = reactive<Record<string, CarouselState>>({})

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

const carouselcategoriesIds = new Set(['Electrónica'])

const brandsBycategories = BRANDS_BY_CATEGORIES

const selectedcategories = computed({
  get: () => store.selectedCategories,
  set: (value) => {
    store.selectedCategories = value
  },
})

const availableBrands = computed(() => {
  if (!selectedcategories.value || !brandsBycategories[selectedcategories.value]) {
    return []
  }
  return brandsBycategories[selectedcategories.value]
})


const openCategoriesMenu = async () => {
  await menuController.open()
}

const closeCategoriesMenu = async () => {
  await menuController.close()
}

const selectCategoriesFromMenu = async (categoriesId: string) => {
  selectedcategories.value = categoriesId
  await menuController.close()
}

// const openFiltersMenu = async () => {
//   await menuController.open('filters-menu')
// }

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
  filteredProducts.value.filter((product) => !carouselcategoriesIds.has(product.category)),
)
const visibleNonCarouselProducts = computed(() =>
  nonCarouselProducts.value.slice(0, visibleCount.value),
)

const showFiltersLayout = computed(() => {
  return !!(store.selectedCategories || store.searchQuery.trim())
})

const carouselSections = computed(() => {
  if (showFiltersLayout.value) {
    return []
  }
  return categories
    .filter((categories) => carouselcategoriesIds.has(categories.id))
    .map((categories) => ({
      ...categories,
      items: filteredProducts.value.filter((product) => product.category === categories.id),
    }))
    .filter((section) => section.items.length > 0)
})

const categoriesections = computed(() => {
  if (!showFiltersLayout.value) {
    return []
  }
  
  // Si hay búsqueda activa, mostrar todos los resultados en una sola sección
  if (store.searchQuery.trim() && !store.selectedCategories) {
    return [{
      id: 'search-results',
      name: 'Resultados de búsqueda',
      items: visibleProducts.value,
    }].filter((section) => section.items.length > 0)
  }
  
  // Si hay categoría seleccionada, mostrar solo esa categoría
  return categories
    .filter((categories) => categories.id === store.selectedCategories)
    .map((categories) => ({
      ...categories,
      items: visibleProducts.value.filter((product) => product.category === categories.id),
    }))
    .filter((section) => section.items.length > 0)
})


const hasContent = computed(() => {
  if (showFiltersLayout.value) {
    return categoriesections.value.length > 0
  }
  return carouselSections.value.length > 0 || visibleNonCarouselProducts.value.length > 0
})

/* Función para alternar favorito de un producto */
const toggleProductFavorite = (e: Event, productId: number) => {
  e.stopPropagation()
  favoriteStore.loadFavorites()
  favoriteStore.toggleFavorite(productId)
}

const isFavoriteProduct = (productId: number) => {
  return favoriteStore.isFavorite(productId)
}

/* Función para mostrar alerta (SweetAlert) de inicio de sesión */
const confirmLogin = async () => {
  const result = await Swal.fire({
    title: 'Inicia sesion',
    text: 'Necesitas iniciar sesion para continuar.',
    icon: 'info',
    heightAuto: false, // fuerza el centrado vertical
    customClass: {
      popup: 'swal2-remarket-popup',
      confirmButton: 'swal2-remarket-confirm',
      cancelButton: 'swal2-remarket-cancel',
      container: 'swal2-ionic-container-fix',
    },
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  })
  if (result.isConfirmed) {
    goToLogin()
  }
}

/* enrutamientos */
const goToSearch = () => {
  router.push('/tabs/search')
}

const goToSell = () => {
  router.push('/tabs/sell')
}

const goToPurchases = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/purchases')
}

const goToHomeWithCarousel = () => {
  selectedcategories.value = ''
  router.push('/tabs/home')
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const goToSellFromFab = () => {
  isChatFabOpen.value = false
  goToSell()
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

watch(
  () => [
    store.filteredProducts,
    store.selectedCategories,
    store.searchQuery,
    filters.minPrice,
    filters.maxPrice,
    filters.condition,
    filters.location,
    filters.sort,
    filters.brand,
  ],
  () => {
    visibleCount.value = itemsPerPage
  },
)
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  color: #64748b;
  background: #f8fafc;
  border-radius: 18px;
  margin: 32px 0;
  box-shadow: 0 2px 12px rgba(26,127,52,0.06);
}
.empty-icon {
  font-size: 64px;
  color: #b6e2c6;
  margin-bottom: 12px;
}
.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1a7f34;
}
.empty-desc {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0;
}
.empty-col {
  pointer-events: none;
  background: transparent;
  border: none;
}
/* =========================
   HEADER HOME
========================= */
/* Header layout horizontal */
.header-content {

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.header-center {
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: 0;
}
.logo-text {
  font-size: 34px;
  font-weight: 800;
  color: #1a1a1a;
}

.home-searchbar {
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 420px;
  --background: #f1f5f9;
  --border-radius: 12px;
  --padding-start: 12px;
  --padding-end: 12px;
  --placeholder-color: #94a3b8;
  --icon-color: #94a3b8;
  padding-top: 20px;
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

.categories-section {
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
/* Mejor grid responsive y visual */
.improved-grid {
  padding-bottom: 32px;
}
.product-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.center-row {
  justify-content: center !important;
}
.product-col {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.product-card {
  width: 100%;
  max-width: 340px;
  min-width: 220px;
}
@media (max-width: 600px) {
  .product-row {
    gap: 12px;
  }
  .product-card {
    max-width: 100%;
    min-width: 0;
  }
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
/* Contenedor central para toda la página */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .page-container {
    padding-left: 4px;
    padding-right: 4px;
  }
}
.carousel-wrapper {
  position: relative;
  padding: 0 44px; /* espacio reservado para las flechas */
  padding-bottom: 30px;
}


:deep(.swiper-button-prev) {
  left: -1px;
  background-color: #fff !important;

}

:deep(.swiper-button-next) {
  right: -1px;
    background-color: #fff !important;

}

/* Estilos para el carrusel con flechas laterales */
.carousel-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
}

.product-swiper {
  flex: 1;
  min-width: 0;
}


.swiper-button-prev::before {
  background-color: #fff !important;
}
.swiper-button-next::before {
  background-color: #fff !important;

}

/* Agrandar iconos del header */
.actions-buttons ion-icon {
  font-size: 28px;
  width: 28px;
  height: 28px;
}
/* Fix para que SweetAlert2 salga siempre centrado y por encima de Ionic */
:global(.swal2-ionic-fix) {
  z-index: 99999 !important;
  position: fixed !important;
}
:global(.swal2-ionic-container-fix) {
  z-index: 99999 !important;
  pointer-events: all !important;
}

:global(.swal2-remarket-popup) {
  border-radius: 18px;
  border: 2px solid #1a7f34;
  background: #f8fafc;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:global(.swal2-remarket-confirm) {
  background: #1a7f34 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 8px !important;
  padding: 8px 24px !important;
  font-size: 1.1em;
}

:global(.swal2-remarket-cancel) {
  background: #e6ebf2 !important;
  color: #1a7f34 !important;
  border-radius: 8px !important;
  font-weight: bold;
  padding: 8px 24px !important;
  font-size: 1.1em;
}

.categories-menu {
  --background: #f1f5f9;
}

.categories-menu-btn {
  --background: #1a7f34;
  --color: #ffffff;
}


/* Ocultar el menú lateral en pantallas grandes */
@media (min-width: 992px) {
  .categories-menu-btn {
    display: none;
  }
  .icon-btn-search {
    display: none;
  }
}

/* Ocular el segmento de categorías en pantallas pequeñas */
@media (max-width: 873px) {
  .categories-segment {
    display: none;
  }
  .logo-text {
    display: none;
  }
  
  .header-center {
    display: none;
  }
}

ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);

}

</style>