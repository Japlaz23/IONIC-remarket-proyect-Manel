<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/home"></ion-back-button>
          </ion-buttons>
        <ion-title>Mis compras</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="empty-state">
        <p>No hay compras todavia</p>
        <ion-button expand="block" @click="goHome">Explorar productos</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons } from '@ionic/vue'

const router = useRouter()

const goHome = () => {
  router.push('/tabs/home')
}
</script>

<style scoped>
.empty-state {
  padding: 24px 16px;
  text-align: center;
  color: #666;
}
</style>
