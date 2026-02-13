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
          <img src="/placeholder.svg" alt="Perfil" style="border-radius: 50%; width: 100px; height: 100px" />
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
  useIonRouter,
} from '@ionic/vue'

const ionRouter = useIonRouter()

const goHome = () => {
  ionRouter.push('/tabs/home')
}

const logout = () => {
  localStorage.removeItem('user')
  ionRouter.push('/login')
}
</script>
