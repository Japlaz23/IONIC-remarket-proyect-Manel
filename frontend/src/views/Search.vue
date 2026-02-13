<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Buscar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="search-container">
        <ion-searchbar
          v-model="store.searchQuery"
          placeholder="Buscar productos..."
          :animated="true"
        ></ion-searchbar>
      </div>

      <div v-if="store.filteredProducts.length === 0" class="empty-state">
        <p>No hay resultados</p>
      </div>

      <ion-list v-else>
        <ion-item
          v-for="product in store.filteredProducts"
          :key="product.id"
          button
          @click="goToProduct(product.id)"
        >
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
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.search-container {
  padding: 8px 12px 0;
}

.empty-state {
  padding: 24px 16px;
  text-align: center;
  color: #888;
}
</style>
