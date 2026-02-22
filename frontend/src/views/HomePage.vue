
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
              :key="category.id"
              class="px-4 py-[14px] text-base font-semibold text-[#1a7f34] cursor-pointer border-b border-[#e0e0e0] transition-colors duration-200 hover:bg-green-100/80 rounded-lg">
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
                      <ion-button class="menu-button ml-2" @click="openFilterMenu">
                        <ion-icon :icon="funnelOutline" slot="start"></ion-icon>
                        <span>Filtros</span>
                      </ion-button>

            <ion-icon :icon="menuOutline" slot="start"></ion-icon>
            <span>Todas las categorías</span>
          </ion-button>
        </ion-buttons>
        <ion-segment :value="selectedCategory" class="categories-scroll flex-nowrap overflow-x-auto" scrollable>
          <ion-segment-button
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            @click="selectCategory(category.id)"
            :class="{ 'active': selectedCategory === category.id }"
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
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
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
import { 
  IonPage, 
  IonHeader, 
  IonContent,
  IonToolbar,
  IonImg,
  IonSearchbar,
  IonIcon,
  IonMenu,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonBadge

} from '@ionic/vue'

// Importar productStore para mostrar productos destacados
const featuredProducts = computed(() => productStore.products.slice(0, 10)) // Mostrar solo los primeros 10 productos como destacados
const allProducts = computed(() => productStore.products) // Todos los productos para otras secciones

import { 
  personCircleOutline,
  heart,
  cart,
  closeOutline,
  menuOutline,
  chatbubblesOutline,
  searchOutline,
  chevronForwardCircle,
  add,
  storefrontOutline
} from 'ionicons/icons'

// Importar estilos de Swiper para que IonSlides funcione correctamente
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Pagination, Navigation } from 'swiper/modules';

  // Register Swiper components and modules for use in template
  const modules = [Pagination, Navigation];

// Datos de ejemplo para categorías
import { categories } from '../utils/constants'


import { ref, onMounted, computed } from 'vue'

const isChatFabOpen = ref(false);

function toggleChatFab() {
  isChatFabOpen.value = !isChatFabOpen.value;
}
import { useProductStore } from '@/stores/productStore'
// import { useFavoriteStore } from '../stores/favoriteStore'
import { useChatStore } from '@/stores/chatStore'

const productStore = useProductStore()
// const favoriteStore = useFavoriteStore()
const chatStore = useChatStore()

onMounted(() => {
  // Si el store tiene método para cargar productos, invócalo
  if (typeof productStore.fetchProducts === 'function') {
    productStore.fetchProducts()
  }
  // Si los otros stores requieren carga, puedes hacer lo mismo aquí
})

import FiltersMenu from '@/components/menus/menuFilters.vue'

// Estado para controlar el menú lateral de categorías
//const categoryMenu = ref(null)

function openCategoryMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"]');
  if (menu && typeof menu.open === 'function') {
    menu.open();
  }
}

function closeCategoryMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"]');
  if (menu && typeof menu.close === 'function') {
    menu.close();
  }
}

// ...existing code...
import { useRouter } from 'vue-router'
const router = useRouter()

function goToProductDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } })
}

// Estado para categoría seleccionada
const selectedCategory = ref(categories[0]?.id || null);
function selectCategory(id) {
  selectedCategory.value = id;
}

// Estado para contador de mensajes no leídos
const unreadCount = computed(() => chatStore.unreadCount || 0);

// Acción para FAB de publicar
function goToSellFromFab() {
  router.push({ name: 'Sell' });
}


import { funnelOutline } from 'ionicons/icons'
function openFilterMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"][side="end"]');
  if (menu && typeof menu.open === 'function') {
    menu.open();
  }
}

function closeFilterMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"][side="end"]');
  if (menu && typeof menu.close === 'function') {
    menu.close();
  }
}
</script>

<style scoped>
/* ==================== HEADER PRINCIPAL ==================== */
ion-toolbar {
  --background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

/* Logo */
.header-container ion-img {
  height: 3rem;
  width: 3rem;
  min-width: 3rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(200, 200, 200, 0.5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease;
}

.header-container ion-img:hover {
  transform: scale(1.1);
}

/* Título */
.header-container h1 {
  font-weight: 700;
  font-size: 1.5rem;
  color: #111;
  text-shadow: 0 1px 2px rgba(0,0,0,0.08);
  white-space: nowrap;
}

/* Iconos de acción */

.header-container ion-icon {
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  font-size: 1.5rem !important;
}
@media (min-width: 640px) {
  .header-container ion-icon {
    font-size: 2rem !important;
  }
}
@media (min-width: 768px) {
  .header-container ion-icon {
    font-size: 2.5rem !important;
  }
}

.header-container ion-icon:hover {
  transform: scale(1.15);
}

/* Iconos individuales con colores */
.header-container ion-icon.heart:hover {
  color: #ef4444; /* rojo */
}
.header-container ion-icon.cart:hover {
  color: #10b981; /* verde */
}
.header-container ion-icon.person:hover {
  color: #3b82f6; /* azul */
}

/* Searchbar mejorada (ya tenemos la custom-searchbar) */
.header-container .custom-searchbar {
  flex: 1;
  min-width: 150px;
  max-width: 500px;
}

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

/* ==================== MAIN TOOLBAR PERSONALIZADA ==================== */
.main-toolbar {
  --background: #ffffff;
  --border-color: transparent;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  --min-height: 56px;
  --ion-color-base: transparent;
}

@media (min-width: 640px) {
  .main-toolbar {
    --padding-top: 12px;
    --padding-bottom: 12px;
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 70px;
  }
}


</style>