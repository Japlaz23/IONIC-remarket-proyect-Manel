<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Producto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <template v-if="product">
        <img :src="product.image" :alt="product.title" style="width: 100%; height: 300px; object-fit: cover" />

        <div style="padding: 16px">
          <h1>{{ product.title }}</h1>
          <p style="font-size: 24px; color: #1a7f34; font-weight: bold">{{ product.price }}€</p>
          <p>{{ product.description }}</p>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Información</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Estado:</strong> {{ product.condition }}</p>
              <p><strong>Categoría:</strong> {{ product.category }}</p>
              <p><strong>Ubicación:</strong> {{ product.location }}</p>
              <p><strong>Vendedor:</strong> {{ product.seller }}</p>
            </ion-card-content>
          </ion-card>

          <ion-button expand="block" color="primary" @click="buyProduct">
            Comprar
          </ion-button>
          <ion-button expand="block" color="success" @click="goToChat(product.id)">
            Contactar vendedor
          </ion-button>
        </div>
      </template>
      <div v-else style="padding: 24px; text-align: center; color: #666">
        <p>Producto no encontrado.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  onIonViewWillEnter,
  alertController,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

const isLoggedIn = ref(false)

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

const product = computed(() => {
  const id = route.params.id
  const idValue = Array.isArray(id) ? id[0] : id
  return store.getProductById(idValue)
})

const goToChat = (productId: number) => {
  router.push(`/chat/${productId}`)
}

const buyProduct = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/purchases')
}

const confirmLogin = async () => {
  const alert = await alertController.create({
    header: 'Inicia sesion',
    message: 'Necesitas iniciar sesion para continuar con la compra.',
    cssClass: 'auth-alert',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Continuar',
        handler: () => {
          router.push('/login')
        },
      },
    ],
  })
  await alert.present()
}
</script>
