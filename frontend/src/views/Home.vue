<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Remarket</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToFavorites">
            <ion-icon :icon="heart"></ion-icon>
          </ion-button>
          <ion-button @click="goToLogin">
            <ion-icon :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-searchbar
        v-model="store.searchQuery"
        placeholder="Buscar productos..."
      ></ion-searchbar>

      <ion-segment v-model="store.selectedCategory">
        <ion-segment-button value="">Todos</ion-segment-button>
        <ion-segment-button value="Electrónica">Electrónica</ion-segment-button>
        <ion-segment-button value="Deportes">Deportes</ion-segment-button>
      </ion-segment>

      <ion-list>
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
            <p>{{ product.location }}</p>
          </ion-label>
          <ion-icon
            slot="end"
            :icon="product.isFavorite ? heart : heartOutline"
            @click.stop="store.toggleFavorite(product.id)"
          ></ion-icon>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="goToSell">
          <ion-icon :icon="add"></ion-icon>
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
  IonList,
  IonItem,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonButtons,
} from '@ionic/vue'
import { heart, heartOutline, add, personCircle } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const goToSell = () => {
  router.push('/sell')
}

const goToLogin = () => {
  router.push('/login')
}

const goToFavorites = () => {
  router.push('/favorites')
}
</script>
