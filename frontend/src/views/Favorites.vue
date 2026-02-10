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
      <div v-if="favoriteProducts.length === 0" class="empty-state">
        <ion-icon :icon="heart" class="empty-icon"></ion-icon>
        <h2>No tienes favoritos</h2>
        <p>Añade productos a favoritos para guardarlos aquí</p>
        <ion-button @click="goHome" fill="outline">
          <ion-icon :icon="arrowBack" slot="start"></ion-icon>
          Volver a inicio
        </ion-button>
      </div>

      <ion-list v-else>
        <ion-item-sliding v-for="product in favoriteProducts" :key="product.id">
          <ion-item @click="goToProduct(product.id)" button>
            <ion-thumbnail slot="start">
              <img :src="product.image" :alt="product.title" />
            </ion-thumbnail>
            <ion-label>
              <h2>{{ product.title }}</h2>
              <p class="price">{{ product.price }}€</p>
              <p>{{ product.location }} • {{ product.condition }}</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeFavorite(product.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { heart, arrowBack, trash } from 'ionicons/icons'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const store = useProductStore()

const favoriteProducts = computed(() => {
  return store.products.filter((p) => p.isFavorite)
})

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}

const goHome = () => {
  router.push('/')
}

const removeFavorite = (productId) => {
  store.toggleFavorite(productId)
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 80px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-state h2 {
  margin: 0 0 8px 0;
  color: #333;
}

.empty-state p {
  color: #999;
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  color: #1a7f34;
  font-size: 1.1em;
  margin-top: 0.5em;
}

ion-thumbnail {
  width: 100px;
  height: 100px;
  --border-radius: 8px;
}

ion-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>
