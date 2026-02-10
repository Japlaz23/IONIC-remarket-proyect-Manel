<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Información del usuario -->
      <ion-card class="profile-card">
        <ion-card-content>
          <div class="user-avatar">
            <img src="https://via.placeholder.com/100" alt="Perfil" />
          </div>
          <h2>Juan Usuario</h2>
          <p class="rating">⭐ 4.8 (24 transacciones)</p>
          <p class="location">📍 Madrid</p>
        </ion-card-content>
      </ion-card>

      <!-- Opciones del perfil -->
      <ion-list>
        <ion-item @click="goToMyListings" button>
          <ion-icon :icon="list" slot="start"></ion-icon>
          <ion-label>Mis anuncios</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>

        <ion-item @click="goToMyChats" button>
          <ion-icon :icon="chatbubbles" slot="start"></ion-icon>
          <ion-label>Mis conversaciones</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>

        <ion-item @click="goToMyPurchases" button>
          <ion-icon :icon="bag" slot="start"></ion-icon>
          <ion-label>Mis compras</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>

        <ion-item @click="goToSettings" button>
          <ion-icon :icon="settings" slot="start"></ion-icon>
          <ion-label>Configuración</ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <!-- Estadísticas -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Mis estadísticas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="stats-grid">
            <div class="stat">
              <p class="stat-number">12</p>
              <p class="stat-label">Anuncios</p>
            </div>
            <div class="stat">
              <p class="stat-number">8</p>
              <p class="stat-label">Vendidos</p>
            </div>
            <div class="stat">
              <p class="stat-number">3</p>
              <p class="stat-label">En venta</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Botón de logout -->
      <ion-button
        expand="block"
        color="danger"
        style="margin: 16px;"
        @click="logout"
      >
        <ion-icon :icon="logOut" slot="start"></ion-icon>
        Cerrar sesión
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/vue'
import {
  list,
  chatbubbles,
  bag,
  settings,
  chevronForward,
  logOut,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMyListings = () => {
  // router.push('/my-listings')
  console.log('Ir a mis anuncios')
}

const goToMyChats = () => {
  // router.push('/my-chats')
  console.log('Ir a mis chats')
}

const goToMyPurchases = () => {
  // router.push('/my-purchases')
  console.log('Ir a mis compras')
}

const goToSettings = () => {
  // router.push('/settings')
  console.log('Ir a configuración')
}

const logout = () => {
  localStorage.removeItem('user')
  console.log('Sesión cerrada')
  router.push('/')
}
</script>

<style scoped>
.profile-card {
  margin-top: 20px;
  text-align: center;
}

.user-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #1a7f34;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card h2 {
  margin: 0 0 8px 0;
  font-size: 1.5em;
}

.rating {
  color: #ffc107;
  margin: 8px 0;
  font-weight: 500;
}

.location {
  color: #999;
  margin: 8px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;
  margin-top: 16px;
}

.stat {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stat-number {
  font-size: 1.8em;
  font-weight: bold;
  color: #1a7f34;
  margin: 0;
}

.stat-label {
  color: #999;
  margin: 4px 0 0 0;
  font-size: 0.9em;
}

ion-list {
  margin-top: 16px;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style>
