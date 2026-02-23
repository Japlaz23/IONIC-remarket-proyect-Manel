<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-white">
      <section class="w-full max-w-5xl mx-auto py-4 px-1 sm:px-2">
        <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-800 text-center tracking-tight">Tus productos favoritos</h2>
        <div v-if="favoriteStore.favorites.length === 0" class="text-center text-gray-500 mt-8">
          No tienes productos favoritos.
        </div>
        <div v-else class="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 flex-1">
          <div v-for="product in favoriteStore.favorites" :key="product.id" class="flex justify-center items-center">
            <ion-card
              class="w-full max-w-[95vw] sm:max-w-xs mx-auto rounded-2xl overflow-hidden shadow-md border border-green-100 hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer"
              @click="goToProductDetail(product.id)"
            >
              <ion-img :src="product.image" :alt="product.title" class="h-28 sm:h-44 object-cover rounded-t-2xl border-b border-green-100"></ion-img>
              <ion-card-header class="px-1 sm:px-4 pt-2 pb-1 flex items-center justify-between">
                <ion-card-title class="truncate text-sm sm:text-lg font-semibold text-green-900">{{ product.title }}</ion-card-title>
                <ion-button fill="clear" @click.stop="favoriteStore.toggleFavorite(product.id)" :aria-label="favoriteStore.isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'">
                  <ion-icon :icon="heart" :class="favoriteStore.isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'" class="text-xl sm:text-2xl transition-colors" />
                </ion-button>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue'
import { heart } from 'ionicons/icons'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/stores/favoriteStore'
const favoriteStore = useFavoriteStore()
const router = useRouter()

onMounted(() => {
  favoriteStore.loadFavorites()
})

function goToProductDetail(id: number) {
  router.push({ name: 'ProductDetail', params: { id } })
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
