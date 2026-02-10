<template>
  <ion-page v-if="product">
    <app-header title="Detalles del producto">
      <template #buttons>
        <ion-button @click="toggleFav">
          <ion-icon :icon="product.isFavorite ? heart : heartOutline"></ion-icon>
        </ion-button>
      </template>
    </app-header>

    <ion-content>
      <!-- Galería de imágenes -->
      <div class="image-container">
        <img :src="product.image" :alt="product.title" />
      </div>

      <!-- Info básica -->
      <div class="product-header">
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price }}€</p>
      </div>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Información del producto</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item lines="none">
            <ion-label>
              <p class="label-text">Estado</p>
              <p>{{ product.condition }}</p>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
              <p class="label-text">Categoría</p>
              <p>{{ product.category }}</p>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
              <p class="label-text">Ubicación</p>
              <p>{{ product.location }}</p>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
              <p class="label-text">Publicado</p>
              <p>{{ formatDate(product.createdAt) }}</p>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- Descripción -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Descripción</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ product.description }}</p>
        </ion-card-content>
      </ion-card>

      <!-- Info del vendedor -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Vendedor</ion-card-title>
        </ion-card-header>
        <ion-item lines="none">
          <ion-avatar slot="start">
            <img src="https://via.placeholder.com/50" :alt="product.seller" />
          </ion-avatar>
          <ion-label>
            <h2>{{ product.seller }}</h2>
            <p>⭐ 4.8 (24 opiniones)</p>
          </ion-label>
          <ion-button slot="end" fill="outline" @click="goToChat(product.id)">
            <ion-icon :icon="chatbubble" slot="start"></ion-icon>
            Chat
          </ion-button>
        </ion-item>
      </ion-card>

      <div style="height: 80px"></div>
    </ion-content>

    <!-- FAB flotante -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToChat(product.id)" color="success">
        <ion-icon :icon="chatbubble"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonAvatar,
  IonFab,
  IonFabButton,
} from '@ionic/vue'
import { heart, heartOutline, chatbubble } from 'ionicons/icons'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

const product = computed(() => store.getProductById(route.params.id))

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const toggleFav = () => {
  store.toggleFavorite(parseInt(route.params.id))
}

const goToChat = (productId) => {
  router.push(`/chat/${productId}`)
}
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-header {
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.product-header h1 {
  margin: 0 0 8px 0;
  font-size: 1.5em;
  font-weight: 600;
}

.price {
  color: #1a7f34;
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
}

.label-text {
  color: #999;
  font-size: 0.9em;
  margin: 0 0 4px 0;
}

ion-card {
  margin: 12px 0;
}

ion-fab-button {
  width: 60px;
  height: 60px;
}
</style>
