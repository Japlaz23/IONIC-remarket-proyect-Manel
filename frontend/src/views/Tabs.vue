<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>

    <ion-tab-bar slot="bottom" class="mobile-tab-bar">
      <ion-tab-button tab="home" href="/tabs/home">
        <ion-icon :icon="homeOutline"></ion-icon>
        <ion-label>Inicio</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="search" href="/tabs/search">
        <ion-icon :icon="searchOutline"></ion-icon>
        <ion-label>Buscar</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="favorites" href="/tabs/favorites">
        <ion-icon :icon="heartOutline"></ion-icon>
        <ion-label>Favoritos</ion-label>
        <ion-badge v-if="favoriteCount > 0" class="tab-badge">{{ favoriteCount }}</ion-badge>
      </ion-tab-button>

      <ion-tab-button tab="sell" href="/tabs/sell">
        <ion-icon :icon="addCircleOutline"></ion-icon>
        <ion-label>Vender</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="profile" href="/tabs/profile">
        <ion-icon :icon="personCircleOutline"></ion-icon>
        <ion-label>Perfil</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/vue'
import {
  homeOutline,
  searchOutline,
  heartOutline,
  addCircleOutline,
  personCircleOutline,
} from 'ionicons/icons'
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
const favoriteCount = computed(() => store.favorites.length)
</script>

<style scoped>
.mobile-tab-bar {
  --background: #ffffff;
  --border: 1px solid #e8e8e8;
  height: 60px;
}

.mobile-tab-bar ion-tab-button {
  --color: #666;
  --color-selected: #1a7f34;
  font-size: 12px;
}

.mobile-tab-bar ion-icon {
  font-size: 22px;
}

.tab-badge {
  margin-left: 6px;
  font-size: 10px;
  height: 16px;
  min-width: 16px;
}

@media (min-width: 769px) {
  .mobile-tab-bar {
    display: none;
  }
}
</style>
