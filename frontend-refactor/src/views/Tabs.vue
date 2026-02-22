<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon name="home-outline" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="favorites" href="/favorites">
          <ion-icon name="heart-outline" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="cart" href="/cart">
          <ion-icon name="cart-outline" />
          <ion-label>Carrito</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="settings" href="/settings">
          <ion-icon name="settings-outline" />
          <ion-label>Configuración</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue'
</script>

<style scoped>
ion-tab-bar {
  background: #fff;
}
</style>
