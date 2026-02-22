
<template>
  <ion-page>
    <!-- ==================== HEADER ==================== -->
      <!-- ===== MENU LATERAL (CATEGORÍAS) ===== -->
      <ion-menu content-id="home-content" type="overlay" class="side-menu">
        <ion-header>
          <ion-toolbar class="bg-gradient-to-br from-white via-green-50 to-green-100 text-[#1a1a1a] border-b border-[#e8e8e8] rounded-t-xl shadow-md">
            <div class="flex items-center justify-between w-full">
              <ion-title class="text-lg font-bold tracking-tight">Todas las categorías</ion-title>
              <ion-buttons slot="end">
                <ion-button class="px-2 text-gray-500 hover:bg-green-100 rounded-full transition" @click="closeCategoryMenu">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-toolbar>
        </ion-header>
        <ion-content class="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-b-xl shadow-lg">
          <ion-list class="p-0 flex flex-col">
            <ion-item
              v-for="category in categories"
              :key="category.name"
              @click="selectCategory(category.name)"
              :class="selectedCategory === category.name ? 'bg-green-100 text-green-900' : 'text-[#1a7f34]'"
            >
              <ion-label>{{ category.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>


      <!-- ===== MENU LATERAL (FILTROS) ===== -->
      <ion-menu content-id="home-content" side="end" type="overlay" class="side-menu">
        <ion-header>
          <ion-toolbar class="bg-gradient-to-br from-white via-green-50 to-green-100 text-[#1a1a1a] border-b border-[#e8e8e8] rounded-t-xl shadow-md">
            <div class="flex items-center justify-between w-full">
              <ion-title class="text-lg font-bold tracking-tight">Filtros</ion-title>
              <ion-buttons slot="end">
                <ion-button class="px-2 text-gray-500 hover:bg-green-100 rounded-full transition" @click="closeFilterMenu">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-toolbar>
        </ion-header>
        <ion-content class="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-b-xl shadow-lg">
          <FiltersMenu />
        </ion-content>
      </ion-menu>

      <!-- ===== HEADER PRINCIPAL (TOPBAR) ===== -->
      <ion-header id="header-container" class="bg-white shadow-md z-10 border-b border-gray-200">  
      <!-- ===== HEADER PRINCIPAL (TOPBAR) ===== -->
      <ion-toolbar class="main-toolbar bg-white border-transparent py-2 px-2 sm:px-4 min-h-[64px] backdrop-blur-md shadow-sm">
        <div class="header-content flex flex-row items-center justify-between w-full gap-2 sm:gap-6 px-2 sm:px-6 py-1">
          <!-- Logo y título alineados a la izquierda -->
          <div class="flex items-center gap-3 min-w-[120px] cursor-pointer select-none mr-auto" @click="goToHomeWithCarousel">
            <ion-img src="/logo.png" class="h-14 w-14 sm:h-20 sm:w-20 border-2 border-green-300 rounded-xl shadow bg-white transition-transform hover:scale-105" alt="Logo Remarket"></ion-img>
            <h1 class="text-green-900 text-xl sm:text-3xl font-extrabold whitespace-nowrap drop-shadow tracking-tight flex items-center">Remarket</h1>
          </div>

          <!-- Searchbar centrada -->
          <div class="hidden sm:flex flex-1 justify-center w-full sm:w-auto min-w-[100px] max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl order-3 sm:order-none">
            <ion-searchbar
              class="custom-searchbar w-full"
              placeholder="Buscar productos..."
              show-cancel-button="focus"
              aria-label="Buscar productos"
            ></ion-searchbar>
          </div>

          <!-- Iconos de acción -->
          <ion-buttons class="action-buttons flex gap-1 sm:gap-2 items-center ml-auto order-2 sm:order-none pr-1 sm:pr-2">
            <ion-button 
              v-if="!isLoggedIn" 
              @click="goToLogin" 
              class="login-btn hidden sm:inline-flex px-4 py-1 text-sm font-bold bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 transition-all duration-200 rounded-full shadow-lg border border-green-700/20"
              aria-label="Iniciar sesión"
            >
              <span>Iniciar sesión</span>
            </ion-button>
            <ion-button
              class="icon-btn purchases-btn group"
              title="Compras"
              aria-label="Compras"
              @click="goToPurchases"
            >
              <ion-icon :icon="cart" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500 text-2xl sm:text-3xl md:text-4xl"></ion-icon>
            </ion-button>
            <ion-button
              class="icon-btn search-btn group md:hidden"
              title="Buscar"
              aria-label="Buscar"
              @click="goToSearch"
            >
              <ion-icon :icon="searchOutline" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500 text-2xl sm:text-3xl md:text-4xl"></ion-icon>
            </ion-button>
            <ion-button 
              v-if="isLoggedIn" 
              @click="goToProfileCustumer"
              class="icon-btn profile-btn group"
              title="Mi perfil"
              aria-label="Mi perfil"
            >
              <ion-icon :icon="personCircleOutline" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500 text-2xl sm:text-3xl md:text-4xl"></ion-icon>
            </ion-button>
            <ion-button 
              @click="goToFavorites"
              class="icon-btn favorites-btn group"
              title="Favoritos"
              aria-label="Favoritos"
            >
              <ion-icon :icon="heart" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-red-500 text-gray-500 text-2xl sm:text-3xl md:text-4xl"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </ion-toolbar>

      <!-- ===== BARRA DE CATEGORÍAS ===== -->
      <ion-toolbar class="categories-toolbar bg-white border-b border-gray-200 px-0 py-0">
        <ion-buttons slot="start" class="menu-wrapper">
          <ion-button class="menu-button" @click="openCategoryMenu">
            <ion-icon :icon="menuOutline" slot="start"></ion-icon>
            <span>Todas las categorías</span>
          </ion-button>
        </ion-buttons>
        <ion-segment :value="selectedCategory" class="categories-scroll flex-nowrap overflow-x-auto" scrollable>
          <ion-segment-button
            v-for="category in categories"
            :key="category.name"
            :value="category.name"
            @click="selectCategory(category.name)"
            :class="{ 'active': selectedCategory === category.name }"
          >
            {{ category.name }}
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
      </ion-header>

    <!-- ==================== CONTENIDO PRINCIPAL ==================== -->
    <ion-content :fullscreen="true" class="bg-white">
      <!-- Carrusel de productos destacados -->

      <swiper
        :slidesPerView="1.2"
        :breakpoints="{ 640: { slidesPerView: 2.2 }, 768: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5 } }"
        :spaceBetween="10"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="true"
        :modules="modules"
        class="featured-swiper my-4 px-1 sm:px-4"
        style="padding-bottom: 40px;"
      >
        <swiper-slide v-for="product in featuredProducts" :key="product.id">
          <ion-card class="max-w-xs w-full mx-auto rounded-2xl overflow-hidden shadow-md border border-green-100 hover:shadow-xl transition-shadow duration-300 bg-white">
            <ion-img :src="product.image" :alt="product.title" class="h-44 object-cover rounded-t-2xl border-b border-green-100"></ion-img>
            <ion-card-header class="px-4 pt-3 pb-1">
              <ion-card-title class="truncate text-lg font-semibold text-green-900">{{ product.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content class="px-4 pb-4 pt-2">
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-green-700">{{ product.price }} €</span>
              </div>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <div class="swiper-pagination" style="margin-top: 24px;"></div>
      </swiper>


      <!-- Sección de todos los productos -->
      <section class="w-full max-w-5xl mx-auto py-4 px-1 sm:px-2">
        <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-800 text-center tracking-tight">Todos los productos</h2>
        <div class="flex gap-4">
          <!-- Filtro a la izquierda -->
          <div v-if="selectedCategory && selectedCategory !== 'Todas'" class="w-64 min-w-[220px]">
            <FiltersMenu />
          </div>
          <!-- Grid de productos -->
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 flex-1">
            <div v-for="product in allProducts" :key="product.id" class="flex justify-center items-center">
              <ion-card
                class="w-full max-w-[95vw] sm:max-w-xs mx-auto rounded-2xl overflow-hidden shadow-md border border-green-100 hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer"
                @click="goToProductDetail(product.id)"
              >
                <ion-img :src="product.image" :alt="product.title" class="h-28 sm:h-44 object-cover rounded-t-2xl border-b border-green-100"></ion-img>
                <ion-card-header class="px-1 sm:px-4 pt-2 pb-1">
                  <ion-card-title class="truncate text-sm sm:text-lg font-semibold text-green-900">{{ product.title }}</ion-card-title>
                </ion-card-header>
                <ion-card-content class="px-1 sm:px-4 pb-3 pt-2">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-xl font-bold text-green-700">{{ product.price }} €</span>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
          </div>
        </div>
      </section>

      <!-- Aquí va el resto del contenido principal de la página -->
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useChatStore } from '@/stores/chatStore'

import FiltersMenu from '@/components/menus/menuFilters.vue'

// Componentes de Ionic
import { 
  IonPage, IonHeader, IonContent, IonToolbar, IonImg, IonSearchbar,
  IonIcon, IonMenu, IonTitle, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonBadge
} from '@ionic/vue'

// Iconos de Ionicons
import { 
  personCircleOutline, heart, cart, closeOutline, menuOutline,
  chatbubblesOutline, searchOutline, chevronForwardCircle, add, storefrontOutline
} from 'ionicons/icons'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
const modules = [Pagination, Navigation]

// Datos de ejemplo para categorías
import { categories } from '../utils/constants'

// Stores
const productStore = useProductStore()
const chatStore = useChatStore()

// Router
const router = useRouter()

// ==================== ESTADOS ====================

// Menú FAB de chat
const isChatFabOpen = ref(false)
function toggleChatFab() {
  isChatFabOpen.value = !isChatFabOpen.value
}

// Categoría seleccionada
const selectedCategory = ref(categories[0]?.name || '')

// Productos filtrados según categoría
const filteredProducts = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'Todas') {
    return productStore.products
  }
  return productStore.products.filter(
    product => product.category === selectedCategory.value
  )
})

// Productos destacados y todos los productos
const featuredProducts = computed(() => filteredProducts.value.slice(0, 10))
const allProducts = computed(() => filteredProducts.value)

// Mensajes no leídos
const unreadCount = computed(() => chatStore.unreadCount || 0)

// ==================== FUNCIONES ====================

// Abrir/cerrar menús laterales
function openCategoryMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"]')
  if (menu && typeof menu.open === 'function') menu.open()
}

function closeCategoryMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"]')
  if (menu && typeof menu.close === 'function') menu.close()
}

function closeFilterMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"][side="end"]')
  if (menu && typeof menu.close === 'function') menu.close()
}

// Cambiar categoría
function selectCategory(name) {
  selectedCategory.value = name
}

// function openFilterMenu() {
//   const menu = document.querySelector('ion-menu[content-id="home-content"][side="end"]')
//   if (menu && typeof menu.open === 'function') menu.open()
// }

// Navegación
function goToProductDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } })
}

function goToHomeWithCarousel() {
  router.push({ name: 'Home' })
}

function goToLogin() {
  router.push({ name: 'Login' })
}

function goToProfileCustumer() {
  router.push({ name: 'Profile' })
}

function goToPurchases() {
  router.push({ name: 'Purchases' })
}

function goToFavorites() {
  router.push({ name: 'Favorites' })
}

function goToSellFromFab() {
  router.push({ name: 'Sell' })
}

function goToChatList(type) {
  router.push({ name: 'ChatList', params: { type } })
}

function goToSearch() {
  router.push({ name: 'Search' })
}

// ==================== ON MOUNT ====================
onMounted(() => {
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()
  }
})
</script>

<style scoped>
/* ==================== SEARCHBAR PERSONALIZADA ==================== */

.custom-searchbar {
  --background: #f9fafb; /* fondo suave */
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 9999px; /* estilo “pill” */
  --color: #111; /* texto principal */
  --placeholder-color: #9ca3af; /* gris claro */
  --border-width: 0; /* sin borde extra */
  --highlight-color-focused: #10b918; /* verde vibrante al enfocar */
  --icon-color: #6b7280; /* icono de búsqueda gris */
  --clear-icon-color: #ef4444; /* icono de “clear” rojo suave */
  padding: 0.25rem 1rem; /* espacio interno */
  transition: all 0.25s ease-in-out;
}

.custom-searchbar:focus-within {
  --background: #ffffff;
  --box-shadow: 0 4px 16px rgba(7, 145, 19, 0.25);
}

.custom-searchbar .searchbar-input {
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
}

.custom-searchbar .searchbar-clear-icon {
  transition: transform 0.2s ease-in-out;
}

.custom-searchbar .searchbar-clear-icon:hover {
  transform: scale(1.2);
}

.custom-searchbar .searchbar-search-icon {
  font-size: 1.2rem;
}
</style>