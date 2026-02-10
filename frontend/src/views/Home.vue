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
          <ion-button v-if="isLoggedIn" @click="handleLogout" class="hover:bg-gray-100 rounded-lg transition" color="danger">
            <span class="text-sm font-semibold">Logout</span>
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

      <!-- Lista de productos con Tailwind -->
      <ion-list class="bg-transparent">
        <ion-item-sliding 
          v-for="product in store.filteredProducts()" 
          :key="product.id"
          class="mb-2"
        >
          <ion-item 
            @click="goToProduct(product.id)" 
            button 
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow m-2"
          >
            <ion-thumbnail slot="start" class="w-24 h-24 rounded-xl overflow-hidden">
              <img :src="product.image" :alt="product.title" class="object-cover w-full h-full" />
            </ion-thumbnail>
            <ion-label class="py-2">
              <h2 class="text-lg font-bold text-gray-800 mb-1">{{ product.title }}</h2>
              <p class="text-2xl font-bold text-remarket-green mb-1">{{ product.price }}€</p>
              <p class="text-sm text-gray-500 flex items-center gap-2">
                <span class="inline-block">📍 {{ product.location }}</span>
                <span class="inline-block">•</span>
                <span class="inline-block">{{ product.condition }}</span>
              </p>
            </ion-label>
            <ion-icon 
              slot="end" 
              :icon="product.isFavorite ? heart : heartOutline"
              :class="product.isFavorite ? 'text-red-500' : 'text-gray-400'"
              class="text-2xl"
            ></ion-icon>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option
              :color="product.isFavorite ? 'danger' : 'success'"
              @click="toggleFavorite(product.id)"
              class="font-semibold"
            >
              <ion-icon 
                :icon="product.isFavorite ? heart : heartOutline"
                class="mr-1"
              ></ion-icon>
              {{ product.isFavorite ? 'Quitar' : 'Favorito' }}
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

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

<script setup>
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
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonButtons,
} from '@ionic/vue'
import {
  heart,
  heartOutline,
  add,
  personCircle,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const store = useProductStore()

const isLoggedIn = computed(() => !!localStorage.getItem('user'))

const goToProduct = (id) => {
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

const handleLogout = () => {
  localStorage.removeItem('user')
  location.reload()
}

const toggleFavorite = (productId) => {
  store.toggleFavorite(productId)
}

const updateCategory = (event) => {
  store.selectedCategory = event.detail.value
}
</script>

<style scoped>
/* Estilos adicionales si necesitas algo específico */
ion-segment-button {
  --indicator-color: #1a7f34;
  --color-checked: #1a7f34;
}

ion-item {
  --border-radius: 12px;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-start: 12px;
  --inner-padding-end: 12px;
}

ion-thumbnail {
  --size: 96px;
  --border-radius: 12px;
}
</style>
