<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Crear anuncio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="submitSell">
        <ion-item>
          <ion-label position="floating">Título</ion-label>
          <ion-input v-model="formData.title" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Descripción</ion-label>
          <ion-textarea v-model="formData.description"></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Precio</ion-label>
          <ion-input v-model="formData.price" type="number" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Categoría</ion-label>
          <ion-select v-model="formData.category">
            <ion-select-option value="Electrónica">Electrónica</ion-select-option>
            <ion-select-option value="Deportes">Deportes</ion-select-option>
            <ion-select-option value="Moda">Moda</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Ubicación</ion-label>
          <ion-input v-model="formData.location"></ion-input>
        </ion-item>

        <ion-button expand="block" type="submit" color="success" style="margin: 16px">
          Publicar
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

interface FormData {
  title: string
  description: string
  price: string
  category: string
  location: string
}

const router = useRouter()
const store = useProductStore()

const formData = ref<FormData>({
  title: '',
  description: '',
  price: '',
  category: 'Electrónica',
  location: '',
})

const submitSell = () => {
  store.addProduct({
    title: formData.value.title,
    description: formData.value.description,
    price: parseFloat(formData.value.price),
    category: formData.value.category,
    condition: 'Nuevo',
    location: formData.value.location,
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/300'],
    seller: 'Tu nombre',
    sellerId: 0,
  })
  router.push('/')
}
</script>
