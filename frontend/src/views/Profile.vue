<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-content style="text-align: center">
          <img src="https://via.placeholder.com/100" alt="Perfil" style="border-radius: 50%; width: 100px; height: 100px" />
          <h2>Usuario</h2>
          <p>⭐ 4.8 (24 transacciones)</p>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-item button @click="goHome">
          <ion-label>Mis anuncios</ion-label>
        </ion-item>
        <ion-item button @click="goHome">
          <ion-label>Mis compras</ion-label>
        </ion-item>
        <ion-item button @click="logout">
          <ion-label color="danger">Cerrar sesión</ion-label>
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
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}
</script>
