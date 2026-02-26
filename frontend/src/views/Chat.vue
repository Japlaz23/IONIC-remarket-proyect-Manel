<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Mensajes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="chatStore.sortedChats.length === 0" class="empty-state">
        <ion-icon :icon="chatbubblesOutline" class="empty-icon"></ion-icon>
        <p>No tienes mensajes</p>
        <p class="empty-subtitle">Cuando contactes a un vendedor, tus conversaciones aparecerán aquí</p>
      </div>

      <ion-list v-else class="chat-list">
        <ion-item
          v-for="chat in chatStore.sortedChats"
          :key="chat.id"
          @click="openChat(chat.id)"
          button
          detail
          class="chat-item"
        >
          <div class="chat-avatar" slot="start">
            <ion-avatar>
              <div class="avatar-placeholder">
                {{ chat.otherUserName.charAt(0).toUpperCase() }}
              </div>
            </ion-avatar>
          </div>

          <ion-label>
            <div class="chat-item-header">
              <h2 class="chat-user-name">{{ chat.otherUserName }}</h2>
              <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
            </div>

            <div v-if="chat.productTitle" class="chat-product">
              <ion-icon :icon="cubeOutline" class="product-icon"></ion-icon>
              <span class="product-name">{{ chat.productTitle }}</span>
            </div>

            <div class="chat-item-footer">
              <p :class="['chat-last-message', { unread: chat.unreadCount > 0 }]">
                {{ chat.lastMessage }}
              </p>
              <ion-badge  v-if="chat.unreadCount > 0" color="danger" class="unread-badge">
                {{ chat.unreadCount }}
              </ion-badge>
            </div>
          </ion-label>
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
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonIcon,
  IonBackButton,
  IonButtons,
} from '@ionic/vue'
import { chatbubblesOutline, cubeOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

const router = useRouter()
const chatStore = useChatStore()

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

const openChat = (chatId: number) => {
  router.push(`/chat/${chatId}`)
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 32px;
  text-align: center;
  color: #999;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  margin: 8px 0;
  font-size: 16px;
}

.empty-subtitle {
  font-size: 14px;
  opacity: 0.7;
  max-width: 300px;
}

.chat-list {
  padding: 0;
}

.chat-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 8px;
  --border-color: #f0f0f0;
}

.chat-avatar {
  margin-right: 12px;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}

.chat-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-user-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.chat-time {
  font-size: 12px;
  color: #999;
}

.chat-product {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
}

.product-icon {
  font-size: 14px;
  color: #666;
}

.product-name {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.chat-last-message {
  flex: 1;
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-last-message.unread {
  font-weight: 600;
  color: #333;
}

.unread-badge {
  font-size: 11px;
  padding: 2px 6px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
}

ion-item::part(native) {
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
