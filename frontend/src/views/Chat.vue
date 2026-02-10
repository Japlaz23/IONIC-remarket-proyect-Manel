<template>
  <ion-page>
    <app-header title="Chat con vendedor"></app-header>

    <ion-content scroll-y="true">
      <div class="messages-container">
        <!-- Mensajes -->
        <div class="message received">
          <div class="message-content">
            <p>Hola, ¿sigue disponible?</p>
            <span class="time">10:30</span>
          </div>
        </div>

        <div class="message sent">
          <div class="message-content">
            <p>Sí, sigue disponible</p>
            <span class="time">10:31</span>
          </div>
        </div>

        <div class="message received">
          <div class="message-content">
            <p>¿Cuál es el mínimo que aceptas?</p>
            <span class="time">10:32</span>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Área de entrada de mensajes -->
    <ion-footer>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-input
            v-model="messageText"
            placeholder="Escribe un mensaje..."
            @keyup.enter="sendMessage"
          ></ion-input>
          <ion-button slot="end" @click="sendMessage" fill="clear">
            <ion-icon :icon="send"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

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
</script>

<style scoped>
.messages-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  margin-bottom: 8px;
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message-content {
  background-color: #e0e0e0;
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.sent .message-content {
  background-color: #1a7f34;
  color: white;
}

.time {
  font-size: 0.75em;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}

ion-footer {
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
}
</style>
