<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button default-href="/"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <slot name="buttons"></slot>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
ion-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

ion-toolbar {
  --background: #fff;
  --border-color: #e0e0e0;
}

ion-title {
  font-weight: 600;
  color: #333;
}
</style>
