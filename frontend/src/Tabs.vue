<template>
  <!-- Solo mostrar ion-tabs en móvil, y solo router-outlet en escritorio -->
  <ion-tabs v-if="isMobile">
    <ion-router-outlet />
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" href="/tabs/home">
        <ion-icon :icon="homeOutline" />
        <ion-label>Inicio</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="favoritos" href="/tabs/favoritos">
        <ion-icon :icon="heartOutline" />
        <ion-label>Favoritos</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="compras" href="/tabs/purchases">
        <ion-icon :icon="cartOutline" />
        <ion-label>Compras</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="perfil" href="/tabs/profilecustomer">
        <ion-icon :icon="personCircleOutline" />
        <ion-label>Perfil</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
  <ion-router-outlet v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, heartOutline, cartOutline, personCircleOutline } from 'ionicons/icons';

const isMobile = ref(window.innerWidth < 768);
function handleResize() {
  isMobile.value = window.innerWidth < 768;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
