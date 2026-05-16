<template>
  <ion-page>
  <!-- Menú hamburguesa sidebar para móvil -->
  <div class="mobile-menu-overlay" v-if="isMobileMenuOpen" @click="closeMobileMenu"></div>
  <aside class="mobile-menu" :class="{ open: isMobileMenuOpen }">
    <div class="mobile-menu-header">
      <h2>Categorías</h2>
      <button type="button" class="mobile-menu-close" @click="closeMobileMenu" aria-label="Cerrar menú">
        <ion-icon :icon="closeOutline"></ion-icon>
      </button>
    </div>
    <div class="mobile-menu-content">
      <button type="button" class="mobile-category-btn" @click="clearCategoryFiltersFromMenu">
        Todas las categorías
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        type="button"
        class="mobile-category-btn"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectCategoryFromMenu(cat.id)"
      >
        {{ cat.name }}
      </button>
    </div>
  </aside>

  <!-- Drawer de filtros para móvil -->
  <div class="mobile-filters-overlay" v-if="isMobileFiltersOpen" @click="closeMobileFilters"></div>
  <aside class="mobile-filters" :class="{ open: isMobileFiltersOpen }">
    <div class="mobile-filters-header">
      <h2>Filtros</h2>
      <button type="button" class="mobile-filters-close" @click="closeMobileFilters" aria-label="Cerrar filtros">
        <ion-icon :icon="closeOutline"></ion-icon>
      </button>
    </div>
    <div class="mobile-filters-content">
      <div class="sidebar-field">
        <label>Filtrar resultados</label>
        <ion-input
          v-model="resultsFilterQuery"
          placeholder="Titulo, marca, descripcion..."
          class="sidebar-input"
        ></ion-input>
      </div>

      <div class="sidebar-two-columns">
        <div class="sidebar-field">
          <label>Precio min</label>
          <ion-input v-model="filters.minPrice" type="number" placeholder="0" class="sidebar-input"></ion-input>
        </div>
        <div class="sidebar-field">
          <label>Precio max</label>
          <ion-input v-model="filters.maxPrice" type="number" placeholder="1000" class="sidebar-input"></ion-input>
        </div>
      </div>

      <div class="sidebar-field">
        <label>Condicion</label>
        <ion-select v-model="filters.condition" interface="popover" class="sidebar-select">
          <ion-select-option value="all">Todas</ion-select-option>
          <ion-select-option value="Nuevo">Nuevo</ion-select-option>
          <ion-select-option value="Usado">Usado</ion-select-option>
        </ion-select>
      </div>

      <div class="sidebar-field">
        <label>Ubicacion</label>
        <ion-input v-model="filters.location" placeholder="Ciudad" class="sidebar-input"></ion-input>
      </div>

      <div class="sidebar-field">
        <label>Ordenar</label>
        <ion-select v-model="filters.sort" interface="popover" class="sidebar-select">
          <ion-select-option value="recent">Mas reciente</ion-select-option>
          <ion-select-option value="price-asc">Precio mas bajo</ion-select-option>
          <ion-select-option value="price-desc">Precio mas alto</ion-select-option>
        </ion-select>
      </div>

      <button type="button" class="mobile-filters-apply" @click="closeMobileFilters">
        Aplicar filtros
      </button>
    </div>
  </aside>

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

        <!-- Botones de acción -->
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
            <ion-button class="icon-btn icon-btn-cart" @click="goToPurchases">
              <ion-icon :icon="cartOutline"></ion-icon>
            </ion-button>
            <ion-button class="icon-btn" @click="goToFavorites">
              <ion-icon :icon="heartOutline"></ion-icon>
            </ion-button>
            <ion-button
              v-if="isLoggedIn"
              class="icon-btn icon-btn-profile"
              @click="goToProfileCustumer"
            >
              <ion-icon :icon="personCircle"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </ion-toolbar>
    <ion-toolbar class="categories-menu">
      <div class="categories-menu-inner">
        <ion-buttons slot="start">
          <button type="button" class="mobile-hamburger-btn" @click="toggleMobileMenu" aria-label="Abrir menú">
            <ion-icon :icon="menuOutline"></ion-icon>
          </button>
        </ion-buttons>
        <ion-segment v-model="selectedCategory" class="categories-segment" :scrollable="true">
          <ion-segment-button v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </ion-segment-button>
        </ion-segment>
        <ion-buttons slot="end">
          <button type="button" class="mobile-filters-btn" @click="toggleMobileFilters" aria-label="Abrir filtros">
            <ion-icon :icon="funnelOutline"></ion-icon>
          </button>
        </ion-buttons>
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
      <div v-else-if="!showFiltersLayout" class="market-sections">
        <section class="categories-section carousel-separated">
          <div class="section-header">
            <h2>Destacados</h2>
          </div>

          <div class="carousel-wrapper">
            <!-- Carousel montado en Swiper.js -->
            <button class="home-swiper-nav home-swiper-prev" type="button" aria-label="Anterior" @click="carouselSwiper?.slidePrev()"></button>
            <div class="carousel-frame">
              <Swiper
                @swiper="onSwiper"
                :loop="true"
                :autoplay="{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }"
                :modules="modules"
                :breakpoints="{
                  0: { slidesPerView: 1.2, spaceBetween: 10 },
                  380: { slidesPerView: 1.5, spaceBetween: 12 },
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                  1280: { slidesPerView: 5, spaceBetween: 24 },
                }"
                class="product-swiper"
              >
                <SwiperSlide
                  v-for="(product, index) in carouselProducts"
                  :key="`${product.id}-${index}`"
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
            <button class="home-swiper-nav home-swiper-next" type="button" aria-label="Siguiente" @click="slideNext"></button>
          </div>
        </section>
      </div>
      <!-- grid  -->
      <div :class="['results-layout', { active: showFiltersLayout }]">
        <aside v-if="showFiltersLayout" class="filters-sidebar">
          <div class="filters-sidebar-header">
            <h3>Filtros</h3>
            <ion-button size="small" fill="clear" class="sidebar-clear-btn" @click="resetFilters">
              Limpiar
            </ion-button>
          </div>

          <div class="sidebar-field">
            <label>Filtrar resultados</label>
            <ion-input
              v-model="resultsFilterQuery"
              placeholder="Titulo, marca, descripcion..."
              class="sidebar-input"
            ></ion-input>
          </div>

          <div class="sidebar-two-columns">
            <div class="sidebar-field">
              <label>Precio min</label>
              <ion-input v-model="filters.minPrice" type="number" placeholder="0" class="sidebar-input"></ion-input>
            </div>
            <div class="sidebar-field">
              <label>Precio max</label>
              <ion-input v-model="filters.maxPrice" type="number" placeholder="1000" class="sidebar-input"></ion-input>
            </div>
          </div>

          <div class="sidebar-field">
            <label>Condicion</label>
            <ion-select v-model="filters.condition" interface="popover" class="sidebar-select">
              <ion-select-option value="all">Todas</ion-select-option>
              <ion-select-option value="Nuevo">Nuevo</ion-select-option>
              <ion-select-option value="Usado">Usado</ion-select-option>
            </ion-select>
          </div>

          <div class="sidebar-field">
            <label>Ubicacion</label>
            <ion-input v-model="filters.location" placeholder="Ciudad" class="sidebar-input"></ion-input>
          </div>

          <div class="sidebar-field">
            <label>Ordenar</label>
            <ion-select v-model="filters.sort" interface="popover" class="sidebar-select">
              <ion-select-option value="recent">Mas reciente</ion-select-option>
              <ion-select-option value="price-asc">Precio mas bajo</ion-select-option>
              <ion-select-option value="price-desc">Precio mas alto</ion-select-option>
            </ion-select>
          </div>

          <p class="results-filter-count">{{ filteredProducts.length }} resultados filtrados</p>
        </aside>

        <div class="results-products">
          <ion-grid class="product-grid improved-grid">
            <ion-row class="product-row" :class="{ 'center-row': !showFiltersLayout }">
          <ion-col
            v-for="product in visibleProducts"
            :key="product.id"
            size="6"
            size-xs="6"
            size-sm="6"
            size-md="3"
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
            v-if="visibleProducts.length % 4 !== 0"
            v-for="n in (4 - (visibleProducts.length % 4))"
            :key="'empty-' + n"
            size="6"
            size-xs="6"
            size-sm="6"
            size-md="3"
            size-lg="3"
            class="product-col empty-col"
          >
          </ion-col>
            </ion-row>
          </ion-grid>

          <div v-if="filteredProducts.length > visibleCount" class="load-more-wrap">
            <button class="load-more-btn" @click="showAllProducts">
              Ver todos los productos ({{ filteredProducts.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- ========= layout filtros ========= -->

      </div>
      
<!-- ==================== FAB DE CHAT Y PUBLICAR ==================== -->
      <div class="home-fab" :class="{ open: isActionFabOpen }">
        <div class="home-fab-actions">
          <button type="button" class="home-fab-action" @click="goToSellFromFab">
            <ion-icon :icon="storefrontOutline"></ion-icon>
            <span>Vender</span>
          </button>
          <button type="button" class="home-fab-action" @click="goToChatList('support')">
            <ion-icon :icon="paperPlane"></ion-icon>
            <span>Soporte</span>
          </button>
          <button type="button" class="home-fab-action" @click="goToChatList('seller')">
            <ion-icon :icon="personCircle"></ion-icon>
            <span>Vendedor</span>
          </button>
        </div>
        <button type="button" class="home-fab-main" @click.stop="toggleActionFab" aria-label="Abrir acciones rápidas">
          <ion-icon :icon="add"></ion-icon>
        </button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/* swipper */
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { Pagination, Autoplay } from 'swiper/modules'

  const modules = [Pagination, Autoplay];

/* Componentes */
import { computed, ref, reactive, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRouter } from 'vue-router'
import { HOME_CATEGORIES } from '@/utils/constants'
import type { Swiper as SwiperInstance } from 'swiper'
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  onIonViewWillEnter,

} from '@ionic/vue'


import {
  heart,
  personCircle,
  cartOutline,
  heartOutline,
  storefrontOutline,
  add,
  paperPlane,
  searchOutline,
  menuOutline,
  closeOutline,
  funnelOutline,
} from 'ionicons/icons'

import Swal from 'sweetalert2'
import '@/assets/styles/main.css'

const router = useRouter()
const store = useProductStore()
const favoriteStore = useFavoriteStore()

const isLoggedIn = ref(false)
const isActionFabOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileFiltersOpen = ref(false)
const resultsFilterQuery = ref('')
const carouselSwiper = ref<SwiperInstance | null>(null)
const categories = HOME_CATEGORIES

const selectedCategory = computed({
  get: () => store.selectedCategories,
  set: (value: string) => {
    store.selectedCategories = value
  },
})

const itemsPerPage = 8
const visibleCount = ref(itemsPerPage)

const showAllProducts = () => {
  visibleCount.value = filteredProducts.value.length
}

const filters = reactive({
  minPrice: '',
  maxPrice: '',
  condition: 'all',
  location: '',
  sort: 'recent',
})

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

const resetFilters = () => {
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.condition = 'all'
  filters.location = ''
  filters.sort = 'recent'
  resultsFilterQuery.value = ''
}

const clearCategoryFilters = () => {
  resetFilters()
  store.selectedCategories = ''
}

const toggleActionFab = () => {
  isActionFabOpen.value = !isActionFabOpen.value
}

const closeActionFab = () => {
  isActionFabOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const selectCategoryFromMenu = (categoryId: string) => {
  store.selectedCategories = categoryId
  closeMobileMenu()
}

const clearCategoryFiltersFromMenu = () => {
  clearCategoryFilters()
  closeMobileMenu()
}

const toggleMobileFilters = () => {
  isMobileFiltersOpen.value = !isMobileFiltersOpen.value
}

const closeMobileFilters = () => {
  isMobileFiltersOpen.value = false
}

const filteredProducts = computed(() => {
  let list = [...store.filteredProducts]

  const localSearchQuery = resultsFilterQuery.value.trim().toLowerCase()
  if (localSearchQuery) {
    list = list.filter((product) => {
      const titleMatches = product.title.toLowerCase().includes(localSearchQuery)
      const locationMatches = product.location.toLowerCase().includes(localSearchQuery)
      const brandMatches = (product.brand ?? '').toLowerCase().includes(localSearchQuery)
      const descriptionMatches = product.description.toLowerCase().includes(localSearchQuery)
      return titleMatches || locationMatches || brandMatches || descriptionMatches
    })
  }

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
const carouselProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))

const onSwiper = (swiper: SwiperInstance) => {
  carouselSwiper.value = swiper
}

const slideNext = () => {
  carouselSwiper.value?.slideNext()
}

const showFiltersLayout = computed(() => {
  return !!(store.searchQuery.trim() || resultsFilterQuery.value.trim() || store.selectedCategories)
})


const hasContent = computed(() => {
  return filteredProducts.value.length > 0
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
  clearCategoryFilters()
  router.push('/tabs/home')
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const goToSellFromFab = () => {
  closeActionFab()
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
  closeActionFab()
  if (type === 'support') {
    router.push('/tabs/chat')
    return
  }
  router.push('/chat/1')
}

watch(
  () => [
    store.filteredProducts,
    store.searchQuery,
    resultsFilterQuery.value,
    filters.minPrice,
    filters.maxPrice,
    filters.condition,
    filters.location,
    filters.sort,
  ],
  () => {
    visibleCount.value = itemsPerPage
  },
)
</script>

<style scoped>
.load-more-wrap {
  display: flex;
  justify-content: center;
  padding: 20px 0 4px;
}

.load-more-btn {
  background: transparent;
  border: 2px solid #1a7f34;
  color: #1a7f34;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 10px 28px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.load-more-btn:hover {
  background: #1a7f34;
  color: #fff;
}

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

.results-layout {
  width: 100%;
}

.results-layout.active {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.filters-sidebar {
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 16px;
  padding: 14px;
  position: sticky;
  top: 14px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.filters-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.filters-sidebar-header h3 {
  margin: 0;
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
}

.sidebar-clear-btn {
  --color: #1a7f34;
}

.sidebar-field {
  margin-top: 10px;
}

.sidebar-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  color: #334155;
  font-weight: 600;
}

.sidebar-two-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.sidebar-input,
.sidebar-select {
  --background: #f8fafc;
  --border-radius: 10px;
  --padding-start: 10px;
  --padding-end: 10px;
  --color: #0f172a;
  border: 1px solid #dbe5ef;
  border-radius: 10px;
}

.results-products {
  min-width: 0;
}

.results-filter-count {
  margin: 12px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .results-layout.active {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
  }
}

@media (max-width: 873px) {
  .filters-sidebar {
    display: none !important;
  }
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
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 34px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
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
  gap: 10px; 
  justify-content: center;
}
.center-row {
  justify-content: center !important;
}
.product-col {
  margin-bottom: 10px;
}
.product-card {
  width: 100%;
  max-width: 240px;
  min-width: 160px;
}
@media (max-width: 600px) {
  .product-row {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
    justify-content: stretch !important;
    align-items: stretch !important;
  }
  .product-col {
    width: 100% !important;
    max-width: 100% !important;
    flex: none !important;
    min-width: 0;
    box-sizing: border-box;
    padding: 0 !important;
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
  border-radius: 12px;
  border: 1px solid #e6ebf2;
  box-shadow: 0 3px 12px rgba(26, 127, 52, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
  margin: 0;
}

.product-card:hover {
  box-shadow: 0 12px 32px rgba(26, 127, 52, 0.18);
  transform: translateY(-4px) scale(1.02);
  border-color: #1a7f34;
}

.product-image-container {
  width: 100%;
  height: 120px;
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
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000;
  margin: 0;
  min-height: 2em;
  line-height: 1.2;
  letter-spacing: -0.3px;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78em;
  color: #64748b;
  margin-top: 2px;
}

.product-price {
  color: #1a7f34;
  font-weight: 800;
  font-size: 0.95em;
}

.product-location {
  color: #94a3b8;
  font-size: 0.85em;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
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
    padding-left: 0;
    padding-right: 0;
  }
}
.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Estilos para el carrusel con flechas laterales */
.carousel-frame {
  flex: 1;
  min-width: 0;
}

.product-swiper {
  min-width: 0;
}

/* Botones de navegación externos */
.home-swiper-nav {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 50%;
  box-shadow: 0 3px 12px rgba(15, 23, 42, 0.12);
  transition: all 0.3s ease;
  flex: 0 0 auto;
  cursor: pointer;
  position: relative;
}

.home-swiper-nav:hover {
  background: #fff;
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.18);
  transform: translateY(-1px);
}

.home-swiper-nav::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #1a7f34;
  border-right: 2px solid #1a7f34;
  margin: 0 auto;
}

.home-swiper-prev::after {
  transform: rotate(-135deg);
  margin-left: 15px;
}

.home-swiper-next::after {
  transform: rotate(45deg);
  margin-right: 15px;
}

@media (max-width: 900px) {
  .carousel-wrapper {
    gap: 8px;
  }

  .home-swiper-nav {
    width: 34px;
    height: 34px;
  }

  .home-swiper-prev::after {
    margin-left: 12px;
  }

  .home-swiper-next::after {
    margin-right: 12px;
  }
}

:deep(.swiper-button-prev:after),
:deep(.swiper-button-next:after) {
  font-size: 16px;
  font-weight: bold;
  color: #1a7f34;
}

/* Agrandar iconos del header */
.actions-buttons ion-icon {
  font-size: 28px;
  width: 28px;
  height: 28px;
}
.categories-menu {
  --background: #f1f5f9;
}

.categories-menu-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  padding: 0;
  padding-left: 8px;
  padding-right: 8px;
}

.categories-menu-inner ion-buttons[slot="start"] {
  flex: 0 0 auto;
  margin: 0;
  --margin-start: 0;
  --margin-end: 0;
}

.categories-menu-inner ion-segment {
  flex: 1 1 auto;
  min-width: 0;
  --margin-start: 0;
  --margin-end: 0;
}

.categories-menu-inner ion-buttons[slot="end"] {
  flex: 0 0 auto;
  margin: 0;
  --margin-start: 0;
  --margin-end: 0;
}

/* Ocultar el menú lateral en pantallas grandes */
@media (min-width: 992px) {
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

  .icon-btn-cart,
  .icon-btn-profile,
  .login-btn {
    display: none !important;
  }

  .home-fab {
    display: none !important;
  }
}

@media (min-width: 874px) {
  .header-toolbar {
    position: sticky;
    top: 0;
    z-index: 40;
    --background: #ffffff;
  }

  .categories-menu {
    position: sticky;
    top: 72px;
    z-index: 39;
    border-top: 1px solid #e6ebf2;
    border-bottom: 1px solid #e6ebf2;
  }

  .mobile-hamburger-btn {
    display: none !important;
  }

  .mobile-filters-btn {
    display: none !important;
  }

  .categories-segment {
    display: block;
    flex: 1 1 auto;
    min-width: 0;
  }

  .categories-menu-inner {
    padding-left: 16px;
    padding-right: 16px;
  }

  .categories-menu-inner ion-buttons[slot="start"],
  .categories-menu-inner ion-buttons[slot="end"] {
    display: none;
  }

  .categories-segment {
    width: 100%;
  }

  :deep(.categories-segment) {
    display: flex;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  :deep(.categories-segment ion-segment-button) {
    display: inline-flex;
    flex: 0 0 auto;
    width: auto;
    min-width: 128px;
    min-height: 44px;
  }
}

.home-fab {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.home-fab-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.home-fab.open .home-fab-actions {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.home-fab-action,
.home-fab-main {
  border: none;
  border-radius: 16px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.16);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.home-fab-action {
  background: #ffffff;
  color: #0f172a;
  padding: 12px 14px;
  min-width: 140px;
  justify-content: flex-start;
  font-weight: 600;
}

.home-fab-action ion-icon,
.home-fab-main ion-icon {
  font-size: 20px;
}

.home-fab-action:hover,
.home-fab-main:hover {
  transform: translateY(-1px);
}

.home-fab-main {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: #1a7f34;
  color: #ffffff;
}

@media (max-width: 873px) {
  .home-fab {
    left: 12px;
    bottom: 12px;
  }

  .home-fab-action {
    min-width: 132px;
  }
}

/* ========================= */
/* MOBILE HAMBURGER MENU */
/* ========================= */
.mobile-hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: #0f172a;
  font-size: 24px;
  padding: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.mobile-hamburger-btn ion-icon {
  font-size: 28px;
  width: 28px;
  height: 28px;
}

.mobile-menu-overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  animation: fadeIn 0.2s ease-in-out;
}

.mobile-menu {
  display: flex;
  position: fixed;
  top: 0;
  left: -100%;
  width: 280px;
  height: 100vh;
  background: #ffffff;
  z-index: 1001;
  flex-direction: column;
  box-shadow: 2px 0 12px rgba(15, 23, 42, 0.12);
  transition: left 0.3s ease-in-out;
}

.mobile-menu.open {
  left: 0;
}

.mobile-menu.open ~ .mobile-menu-overlay {
  display: block;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom: 1px solid #e6ebf2;
  background: #f8fafc;
}

.mobile-menu-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.mobile-menu-close {
  background: none;
  border: none;
  color: #0f172a;
  font-size: 24px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-close ion-icon {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.mobile-category-btn {
  width: 100%;
  padding: 14px 16px;
  background: none;
  border: none;
  border-left: 4px solid transparent;
  text-align: left;
  color: #334155;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.mobile-category-btn:hover {
  background: #f1f5f9;
  color: #1a7f34;
}

.mobile-category-btn.active {
  background: #e6f5ed;
  color: #1a7f34;
  border-left-color: #1a7f34;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ========================= */
/* MOBILE FILTERS DRAWER */
/* ========================= */
.mobile-filters-overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  animation: fadeIn 0.2s ease-in-out;
}

.mobile-filters {
  display: flex;
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  z-index: 1001;
  flex-direction: column;
  box-shadow: -2px 0 12px rgba(15, 23, 42, 0.12);
  transition: right 0.3s ease-in-out;
}

.mobile-filters.open {
  right: 0;
}

.mobile-filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom: 1px solid #e6ebf2;
  background: #f8fafc;
}

.mobile-filters-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.mobile-filters-close {
  background: none;
  border: none;
  color: #0f172a;
  font-size: 24px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-filters-close ion-icon {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

.mobile-filters-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px;
}

.mobile-filters-apply {
  padding: 12px 16px;
  background: #1a7f34;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin: 16px;
  transition: background 0.2s ease;
}

.mobile-filters-apply:hover {
  background: #156b2d;
}

.mobile-filters-btn {
  background: none;
  border: none;
  color: #0f172a;
  font-size: 24px;
  padding: 8px;
  cursor: pointer;
  display: none;
  flex-shrink: 0;
}

.mobile-filters-btn ion-icon {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 873px) {
  .mobile-hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-filters-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-menu-overlay {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .mobile-filters-overlay {
    display: block;
  }

  .mobile-filters {
    display: flex;
  }
}

@media (min-width: 874px) {
  .mobile-hamburger-btn {
    display: none !important;
  }

  .mobile-filters-btn {
    display: none !important;
  }

  .mobile-menu-overlay,
  .mobile-menu,
  .mobile-filters-overlay,
  .mobile-filters {
    display: none !important;
  }
}

</style>