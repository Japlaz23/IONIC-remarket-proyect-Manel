<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/chat"></ion-back-button>
        </ion-buttons>
        <ion-title v-if="chat" class="chat-title">
          <div class="chat-header-info">
            <span class="chat-user-name">{{ chat.otherUserName }}</span>
            <span v-if="chat.productTitle" class="chat-product-name">{{ chat.productTitle }}</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="contentRef" class="chat-content">
      <div v-if="!chat" class="empty-state">
        <p>Chat no encontrado</p>
      </div>
      
      <div v-else class="messages-container">
        <!-- Información del producto si existe -->
        <div v-if="chat.productId" class="product-info-card" @click="goToProduct">
          <ion-card>
            <div class="product-info-content">
              <ion-img 
                v-if="chat.productImage" 
                :src="chat.productImage" 
                :alt="chat.productTitle"
                class="product-thumbnail"
              ></ion-img>
              <div class="product-info-text">
                <div class="product-info-title">{{ chat.productTitle }}</div>
                <div class="product-info-action">Ver producto →</div>
              </div>
            </div>
          </ion-card>
        </div>

        <!-- Mensajes -->
        <div 
          v-for="message in chat.messages" 
          :key="message.id"
          :class="['message-wrapper', message.senderId === chatStore.currentUserId ? 'sent' : 'received']"
        >
          <div class="message-bubble">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer v-if="chat">
      <ion-toolbar class="message-input-toolbar">
        <div class="message-input-container">
          <ion-textarea
            v-model="newMessage"
            :rows="1"
            :auto-grow="true"
            :maxlength="500"
            placeholder="Escribe un mensaje..."
            class="message-input"
            @keydown.enter.exact.prevent="sendMessage"
          ></ion-textarea>
          <ion-button 
            :disabled="!newMessage.trim()"
            @click="sendMessage"
            class="send-button"
            fill="clear"
          >
            <ion-icon :icon="sendOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonTextarea,
  IonButton,
  IonIcon,
  IonCard,
  IonImg,
} from '@ionic/vue'
import { sendOutline } from 'ionicons/icons'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const contentRef = ref<any>(null)
const newMessage = ref('')

const chatId = computed(() => Number(route.params.id))
const chat = computed(() => chatStore.getChatById(chatId.value))

const formatTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return 'Ayer'
  } else if (days < 7) {
    return date.toLocaleDateString('es-ES', { weekday: 'short' })
  } else {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (contentRef.value) {
    await contentRef.value.$el.scrollToBottom(300)
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !chat.value) return

  chatStore.sendMessage(chatId.value, newMessage.value.trim())
  newMessage.value = ''
  
  await scrollToBottom()
}

const goToProduct = () => {
  if (chat.value?.productId) {
    router.push(`/product/${chat.value.productId}`)
  }
}

onMounted(async () => {
  if (chat.value) {
    chatStore.markChatAsRead(chatId.value)
  }
  await scrollToBottom()
})
</script>

<style scoped>
.chat-header-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
  margin-left: 12px;
}

.chat-user-name {
  font-size: 16px;
  font-weight: 600;
}

.chat-product-name {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
}

.chat-content {
  --background: #f5f5f5;
}

.chat-title {
  --background: white;
  --border-width: 0 0 2px 0;
  --border-color: #ddd;
  position: sticky;
  top: 0;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.messages-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-info-card {
  margin-bottom: 8px;
}

.product-info-card ion-card {
  margin: 0;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-info-card ion-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-info-content {
  display: flex;
  gap: 12px;
  padding: 12px;
  align-items: center;
}

.product-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.product-info-text {
  flex: 1;
  min-width: 0;
}

.product-info-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-info-action {
  font-size: 12px;
  color: var(--ion-color-primary);
}

.message-wrapper {
  display: flex;
  margin-bottom: 4px;
}

.message-wrapper.sent {
  justify-content: flex-end;
}

.message-wrapper.received {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 18px;
  position: relative;
}

.message-wrapper.sent .message-bubble {
  background: var(--ion-color-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-wrapper.received .message-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-text {
  font-size: 15px;
  line-height: 1.4;
  word-wrap: break-word;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}

.message-input-toolbar {
  --background: white;
  --border-width: 1px 0 0 0;
  --border-color: #ddd;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --min-height: auto;
}

.message-input-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 0 12px;
}

.message-input {
  flex: 1;
  --background: #f5f5f5;
  --padding-start: 14px;
  --padding-end: 14px;
  --padding-top: 10px;
  --padding-bottom: 10px;
  border-radius: 20px;
  font-size: 15px;
  min-height: 40px;
  max-height: 120px;
}

.send-button {
  --padding-start: 8px;
  --padding-end: 8px;
  height: 40px;
  width: 40px;
  margin: 0;
}

.send-button ion-icon {
  font-size: 24px;
}

.send-button:not([disabled]) {
  --color: var(--ion-color-primary);
}

.send-button[disabled] {
  --color: #ccc;
}
</style>
