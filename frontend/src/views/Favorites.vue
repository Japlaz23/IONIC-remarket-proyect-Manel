<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="favoriteProducts.length === 0" style="padding: 40px; text-align: center">
        <p>No tienes favoritos aún</p>
        <ion-button @click="goHome">Volver</ion-button>
      </div>

      <ion-list v-else>
        <ion-item v-for="product in favoriteProducts" :key="product.id" button @click="goToProduct(product.id)">
          <ion-thumbnail slot="start">
            <img :src="product.image" :alt="product.title" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ product.title }}</h2>
            <p>{{ product.price }}€</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const favoriteProducts = computed(() => store.products.filter((p) => p.isFavorite))

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const goHome = () => {
  router.push('/')
}
</script>
