<template>
  <ion-page>
<<<<<<< HEAD
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Chat</ion-title>
      </ion-toolbar>
    </ion-header>
=======
    <app-header title="Chat con vendedor"></app-header>
>>>>>>> origin/Japhet

    <ion-content>
      <div style="padding: 16px; text-align: center; color: #999">
        <p>Chat feature coming soon</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<<<<<<< HEAD
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
=======
<script setup>
import AppHeader from '../components/AppHeader.vue'
import {
  IonPage,
  IonContent,
  IonFooter,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { send } from 'ionicons/icons'
import { ref } from 'vue'

const messageText = ref('')

const sendMessage = () => {
  if (messageText.value.trim()) {
    // Aquí va la lógica para enviar el mensaje
    console.log('Mensaje enviado:', messageText.value)
    messageText.value = ''
  }
}
>>>>>>> origin/Japhet
</script>
