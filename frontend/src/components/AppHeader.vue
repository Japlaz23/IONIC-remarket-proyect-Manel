<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-button @click="goBack">
          <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <slot name="buttons"></slot>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'

const router = useRouter()

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

const goBack = () => {
  router.back()
}
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
