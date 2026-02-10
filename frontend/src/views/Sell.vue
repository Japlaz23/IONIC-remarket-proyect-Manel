<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Crear anuncio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="submitSell">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Información del artículo</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Título</ion-label>
              <ion-input
                v-model="formData.title"
                type="text"
                placeholder="Ej: iPhone 13"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Descripción</ion-label>
              <ion-textarea
                v-model="formData.description"
                placeholder="Describe el producto..."
              ></ion-textarea>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Precio (€)</ion-label>
              <ion-input
                v-model="formData.price"
                type="number"
                step="0.01"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Categoría</ion-label>
              <ion-select v-model="formData.category">
                <ion-select-option value="Electrónica">
                  Electrónica
                </ion-select-option>
                <ion-select-option value="Deportes">
                  Deportes
                </ion-select-option>
                <ion-select-option value="Moda">Moda</ion-select-option>
                <ion-select-option value="Hogar">Hogar</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Condición</ion-label>
              <ion-select v-model="formData.condition">
                <ion-select-option value="Nuevo">Nuevo</ion-select-option>
                <ion-select-option value="Usado - Buen estado">
                  Usado - Buen estado
                </ion-select-option>
                <ion-select-option value="Usado - Muy bien">
                  Usado - Muy bien
                </ion-select-option>
                <ion-select-option value="Para reparar">
                  Para reparar
                </ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Ubicación</ion-label>
              <ion-input
                v-model="formData.location"
                type="text"
              ></ion-input>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Fotos</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" fill="outline">
              <ion-icon :icon="camera" slot="start"></ion-icon>
              Subir fotos
            </ion-button>
            <p style="text-align: center; color: #999; margin-top: 16px;">
              Máximo 10 fotos
            </p>
          </ion-card-content>
        </ion-card>

        <ion-button
          expand="block"
          type="submit"
          color="success"
          style="margin: 16px;"
        >
          <ion-icon :icon="checkmark" slot="start"></ion-icon>
          Publicar anuncio
        </ion-button>
      </form>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { camera, checkmark } from 'ionicons/icons'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const store = useProductStore()

const formData = ref({
  title: '',
  description: '',
  price: '',
  category: 'Electrónica',
  condition: 'Nuevo',
  location: '',
})

const submitSell = () => {
  store.addProduct({
    title: formData.value.title,
    description: formData.value.description,
    price: parseFloat(formData.value.price),
    category: formData.value.category,
    condition: formData.value.condition,
    location: formData.value.location,
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/300'],
    seller: 'Tu nombre', // Aquí iría el usuario logueado
    sellerId: 0,
  })
  router.push('/')
}
</script>

<style scoped>
ion-button {
  --border-radius: 8px;
}
</style>
