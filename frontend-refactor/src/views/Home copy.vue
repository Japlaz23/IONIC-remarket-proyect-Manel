<template>
  <ion-page>
    <!-- ==================== HEADER ==================== -->
      <!-- ===== MENU LATERAL (CATEGORÍAS) ===== -->
      <ion-menu content-id="home-content" type="overlay" class="side-menu">
      <ion-header>
        <ion-toolbar class="bg-white text-[#1a1a1a] border-b border-[#e8e8e8]">
          <div class="flex items-center justify-between w-full">
            <ion-title class="text-lg">Todas las categorías</ion-title>
            <ion-buttons slot="end">
              <ion-button class="px-2 text-gray-500" @click="closeCategoryMenu">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-content class="bg-white">
        <ion-list class="p-0 flex flex-col">
          <ion-item
            v-for="category in categories"
            :key="category.id"
            class="px-4 py-[14px] text-sm text-[#333] cursor-pointer border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-gray-100/80">
            <ion-label>{{ category.name }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      </ion-menu>

      <!-- ===== MENU LATERAL (FILTROS) ===== -->
      <FiltersMenu
        :showFiltersLayout="showFiltersLayout"
        :filters="filters"
        :availableBrands="availableBrands"
        @close="closeFiltersMenu"
        @reset="resetFilters"
      />

      <ion-header id="header-container" class="bg-white shadow-md z-10 border-b border-gray-200">  
      <!-- ===== HEADER PRINCIPAL (TOPBAR) ===== -->
      <ion-toolbar class="main-toolbar bg-white border-transparent py-2 px-2 sm:px-4 min-h-[64px] backdrop-blur-md shadow-sm">
        <div class="header-content flex flex-col sm:flex-row items-center justify-between w-full gap-2 sm:gap-6 px-2 sm:px-6 py-1">
          <!-- Logo y título -->
          <div class="flex items-center gap-2 min-w-[100px] cursor-pointer select-none" @click="goToHomeWithCarousel">
            <ion-img src="/logo.png" class="h-9 w-9 sm:h-12 sm:w-12 border-2 border-green-300 rounded-xl shadow bg-white transition-transform hover:scale-105" alt="Logo Remarket"></ion-img>
            <h1 class="hidden sm:inline text-green-900 text-lg sm:text-2xl font-extrabold whitespace-nowrap drop-shadow tracking-tight">Remarket</h1>
          </div>

          <!-- Searchbar centrada -->
          <div class="flex-1 flex justify-center w-full sm:w-auto min-w-[100px] max-w-xs sm:max-w-md order-3 sm:order-none">
            <ion-searchbar
              class="custom-searchbar w-full"
              placeholder="Buscar productos..."
              show-cancel-button="focus"
              aria-label="Buscar productos"
            ></ion-searchbar>
          </div>

          <!-- Iconos de acción -->
          <ion-buttons class="action-buttons flex gap-2 sm:gap-4 items-center ml-0 sm:ml-1 order-2 sm:order-none">
            <ion-button 
              v-if="!isLoggedIn" 
              @click="goToLogin" 
              class="login-btn px-4 py-1 text-sm font-bold bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 transition-all duration-200 rounded-full shadow-lg border border-green-700/20"
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
              <ion-icon :icon="cart" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500"></ion-icon>
            </ion-button>
            <ion-button
              class="icon-btn search-btn group md:hidden"
              title="Buscar"
              aria-label="Buscar"
              @click="goToSearch"
            >
              <ion-icon :icon="searchOutline" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500"></ion-icon>
            </ion-button>
            <ion-button 
              v-if="isLoggedIn" 
              @click="goToProfileCustumer"
              class="icon-btn profile-btn group"
              title="Mi perfil"
              aria-label="Mi perfil"
            >
              <ion-icon :icon="personCircleOutline" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-green-600 text-gray-500"></ion-icon>
            </ion-button>
            <ion-button 
              @click="goToFavorites"
              class="icon-btn favorites-btn group"
              title="Favoritos"
              aria-label="Favoritos"
            >
              <ion-icon :icon="heart" class="transition-transform duration-200 group-hover:scale-125 group-hover:text-red-500 text-gray-500"></ion-icon>
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
            :key="category.id"
            :value="category.id"
            @click="selectCategory(category.id)"
            :class="{ 'active': selectedCategory === category.id }"
          >
            {{ category.name }}
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <!-- ==================Categorias Menu ==================== -->

      
      </ion-header>

    <!-- ==================== CONTENIDO PRINCIPAL ==================== -->
    <ion-content :fullscreen="true" class="bg-white">
      <!-- Carrusel de productos destacados -->
      <section class="w-full max-w-5xl mx-auto py-4 px-2">
        <h2 class="text-xl font-bold mb-4 text-gray-800 text-center tracking-tight">Destacados</h2>
        <ion-slides :options="carouselOptions" class="rounded-2xl shadow-lg bg-gradient-to-br from-white via-gray-50 to-green-50 p-2">
          <template v-for="product in featuredProducts" :key="product.id">
            <div class="swiper-slide flex justify-center items-center">
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
            </div>
          </template>
        </ion-slides>
      </section>
      <!-- Aquí va el resto del contenido principal de la página -->
    </ion-content>
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
} from '@ionic/vue'
// Productos destacados de ejemplo
const featuredProducts = [
  {
    id: 101,
    title: 'iPhone 14 Pro Max',
    price: 999,
    image: 'https://dummyimage.com/400x300/1a7f34/fff&text=iPhone+14+Pro+Max',
  },
  {
    id: 102,
    title: 'Zapatillas Nike Air',
    price: 120,
    image: 'https://dummyimage.com/400x300/222/fff&text=Nike+Air',
  },
  {
    id: 103,
    title: 'Robot Aspirador Xiaomi',
    price: 180,
    image: 'https://dummyimage.com/400x300/444/fff&text=Robot+Xiaomi',
  },
]

const carouselOptions = {
  slidesPerView: 1.2,
  spaceBetween: 16,
  centeredSlides: true,
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  breakpoints: {
    640: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.2 },
  },
}
import { 
  personCircleOutline,
  heart,
  cart,
  closeOutline,
  menuOutline
} from 'ionicons/icons'

// Importar estilos de Swiper para que IonSlides funcione correctamente
import 'swiper/css';

// Datos de ejemplo para categorías
const categories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Hogar' },
  { id: 4, name: 'Deportes' },
  { id: 5, name: 'Juguetes' },
  { id: 6, name: 'Libros' },
  { id: 7, name: 'Belleza' },
  { id: 8, name: 'Automotriz' },
]

import { ref } from 'vue'

const filters = ref({
  priceRange: [0, 1000], // valor inicial: mínimo 0, máximo 1000
  // ...otros filtros
})
import FiltersMenu from '../components/FiltersMenu.vue'

// Estado para controlar el menú lateral de categorías
const categoryMenu = ref(null)

function openCategoryMenu() {
  const menu = document.querySelector('ion-menu[content-id="home-content"]')
  if (menu && typeof menu.open === 'function') {
    menu.open()
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
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 70px;
  --ion-color-base: transparent;
}
</style>