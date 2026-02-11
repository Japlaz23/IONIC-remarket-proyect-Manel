<template>
  <ion-page>
    <ion-header class="shadow-md">
      <ion-toolbar class="bg-white">
        <ion-title class="text-xl font-bold text-gray-800">Remarket</ion-title>
        <ion-buttons slot="end" class="flex gap-2">
          <ion-button v-if="!isLoggedIn" @click="goToLogin" class="hover:bg-gray-100 rounded-lg transition">
            <span class="text-sm font-semibold text-remarket-green">Login</span>
          </ion-button>
          <ion-button v-if="isLoggedIn" @click="goToProfile" class="hover:bg-gray-100 rounded-lg transition">
            <ion-icon :icon="personCircle" class="text-2xl text-gray-700"></ion-icon>
          </ion-button>
          <ion-button @click="goToFavorites" class="hover:bg-gray-100 rounded-lg transition">
            <ion-icon :icon="heart" class="text-2xl text-red-500"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar class="bg-gray-50">
        <ion-searchbar
          v-model="store.searchQuery"
          placeholder="Buscar productos..."
          class="px-2"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg-gray-50">
      <!-- Filtros por categoría con Tailwind -->
      <div class="sticky top-0 z-10 bg-white shadow-sm">
        <ion-segment v-model="store.selectedCategory" @ionChange="updateCategory" class="p-2">
          <ion-segment-button value="" class="font-semibold">
            <ion-label>Todos</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Electrónica" class="font-semibold">
            <ion-label>Electrónica</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Deportes" class="font-semibold">
            <ion-label>Deportes</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Moda" class="font-semibold">
            <ion-label>Moda</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <!-- Grid de tarjetas tipo carrusel -->
      <div class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div 
            v-for="product in store.filteredProducts"
            :key="product.id"
            @click="goToProduct(product.id)"
            class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative group"
          >
            <!-- Imagen del producto -->
            <div class="relative h-56 overflow-hidden bg-gray-200">
              <img 
                :src="product.image" 
                :alt="product.title" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Badge de condición -->
              <div class="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
                {{ product.condition }}
              </div>
              <!-- Botón de favorito -->
              <button 
                @click.stop="toggleFavorite(product.id)"
                class="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
              >
                <ion-icon 
                  :icon="product.isFavorite ? heart : heartOutline"
                  :class="product.isFavorite ? 'text-red-500' : 'text-gray-400'"
                  class="text-2xl"
                ></ion-icon>
              </button>
            </div>

            <!-- Información del producto -->
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 product-title">
                {{ product.title }}
              </h3>
              
              <!-- Precio -->
              <div class="mb-3">
                <span class="text-3xl font-extrabold text-remarket-green">
                  {{ product.price }}€
                </span>
              </div>

              <!-- Ubicación -->
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <span class="mr-1">📍</span>
                <span class="truncate">{{ product.location }}</span>
              </div>

              <!-- Botón de ver detalles -->
              <button 
                class="w-full bg-remarket-green text-white font-semibold py-2.5 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Ver detalles</span>
                <ion-icon :icon="arrowForward" class="text-lg"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay productos -->
        <div 
          v-if="store.filteredProducts.length === 0"
          class="text-center py-16"
        >
          <div class="text-gray-400 mb-4">
            <ion-icon :icon="searchOutline" class="text-6xl"></ion-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron productos
          </h3>
          <p class="text-gray-500">
            Intenta ajustar los filtros o la búsqueda
          </p>
        </div>
      </div>

      <!-- FAB para crear nuevo anuncio con Tailwind -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button 
          @click="goToSell"
          class="bg-remarket-green shadow-2xl hover:scale-110 transition-transform"
        >
          <ion-icon :icon="add" class="text-white"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFab,
  IonFabButton,
  IonButtons,
} from '@ionic/vue'
import {
  heart,
  heartOutline,
  add,
  personCircle,
  arrowForward,
  searchOutline,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const isLoggedIn = computed(() => !!localStorage.getItem('user'))

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const goToSell = () => {
  router.push('/sell')
}

const goToLogin = () => {
  router.push('/login')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToFavorites = () => {
  router.push('/favorites')
}

const toggleFavorite = (productId: number) => {
  store.toggleFavorite(productId)
}

const updateCategory = (event: CustomEvent) => {
  store.selectedCategory = event.detail.value
}
</script>

<style scoped>
/* Estilos adicionales */
ion-segment-button {
  --indicator-color: #1a7f34;
  --color-checked: #1a7f34;
}

/* Limitar líneas de texto */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-title {
  min-height: 3.5rem;
}

/* Animación sutil para las tarjetas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.5s ease-out;
}
</style>