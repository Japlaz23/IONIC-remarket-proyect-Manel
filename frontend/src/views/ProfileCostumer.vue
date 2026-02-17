<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="profile-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title class="profile-title">Mi perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="profile-content">
      <div class="profile-hero profile-animate profile-delay-1">
        <div class="profile-hero-glow"></div>
        <div class="profile-hero-content">
          <p class="profile-hero-kicker">Tu cuenta</p>
          <h1 class="profile-hero-title">Hola, {{ displayName }}</h1>
          <p class="profile-hero-subtitle">Gestiona tus datos y revisa tu actividad</p>
        </div>
      </div>
      <ion-card class="profile-card profile-animate profile-delay-2">
        <ion-card-content class="profile-card-content">
          <img class="profile-avatar" :src="profileAvatar" alt="Perfil" />
          <div class="profile-meta">
            <h2 class="profile-name">{{ displayName }}</h2>
            <div class="profile-tags">
              <span class="profile-chip">{{ providerLabel }}</span>
            </div>
            <p class="profile-rating">{{ displayEmail }}</p>
            <p class="profile-since">Miembro desde {{ displaySince }}</p>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-list class="profile-list profile-animate profile-delay-3">
        <ion-item class="profile-section">
          <ion-label>Cuenta</ion-label>
        </ion-item>
        <ion-item class="profile-item" button @click="goToSettings">
          <ion-label>Configuración</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>
        <ion-item class="profile-section">
          <ion-label>Transacciones</ion-label>
        </ion-item>
        <ion-item class="profile-item" button @click="goToSales">
          <ion-label>Mis publicaciones</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>
        <ion-item class="profile-item" button @click="goToPurchases">
          <ion-label>Mis compras</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>
        <ion-item class="profile-item" button @click="logout">
          <ion-label color="danger">Salir de la cuenta</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
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
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  onIonViewWillEnter,
  useIonRouter,
  IonBackButton,
  IonButtons,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { chevronForwardOutline } from 'ionicons/icons'
import { computed, ref } from 'vue'

type StoredUser = {
  name?: string
  fullName?: string
  email?: string
  loginDate?: string
  registerDate?: string
  provider?: string
  avatarUrl?: string
}

const ionRouter = useIonRouter()
const router = useRouter()

const profile = ref<StoredUser | null>(null)

const loadProfile = () => {
  const raw = localStorage.getItem('user')
  if (!raw) {
    profile.value = null
    return
  }

  try {
    profile.value = JSON.parse(raw) as StoredUser
  } catch {
    profile.value = null
  }
}

onIonViewWillEnter(loadProfile)

const displayName = computed(() => {
  return profile.value?.fullName || profile.value?.name || 'Invitado'
})

const displayEmail = computed(() => {
  return profile.value?.email || 'Sin email registrado'
})

const displaySince = computed(() => {
  const rawDate = profile.value?.registerDate || profile.value?.loginDate
  if (!rawDate) {
    return 'sin fecha'
  }

  const parsed = new Date(rawDate)
  if (Number.isNaN(parsed.getTime())) {
    return 'sin fecha'
  }

  return parsed.toLocaleDateString('es-ES', {
    month: 'short',
    year: 'numeric',
  })
})

const providerLabel = computed(() => {
  const provider = profile.value?.provider
  if (!provider) {
    return 'Correo'
  }

  if (provider.toLowerCase() === 'google') {
    return 'Google'
  }

  return provider
})

const profileAvatar = computed(() => {
  return profile.value?.avatarUrl || '/placeholder.svg'
})

const goHome = () => {
  ionRouter.push('/tabs/home')
}

const goToSettings = () => {
  router.push('/settings')
}

const goToSales = () => {
  router.push('/sales')
}

const goToPurchases = () => {
  router.push('/purchases')
}

const logout = () => {
  localStorage.removeItem('user')
  ionRouter.push('/login')
}
</script>

<style scoped>
.profile-toolbar {
  --background: #ffffff;
  --border-color: #e7e7e7;
}

.profile-title {
  color: #111;
  font-size: 24px;
  font-weight: 700;
  padding-left: 20px;
  letter-spacing: -0.2px;
}

.profile-content {
  --background: #f0f4f8;
}

.profile-hero {
  position: relative;
  margin: 16px 16px 12px;
  padding: 26px 22px 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
}

.profile-hero-glow {
  position: absolute;
  top: -60px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));
  opacity: 0.9;
}

.profile-hero-content {
  position: relative;
  z-index: 1;
}

.profile-hero-kicker {
  margin: 0 0 6px 0;
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  opacity: 0.8;
}

.profile-hero-title {
  margin: 0 0 6px 0;
  font-size: 24px;
  font-weight: 700;
}

.profile-hero-subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.85;
}

.profile-animate {
  opacity: 0;
  transform: translateY(12px);
  animation: profileFadeUp 600ms ease forwards;
}

.profile-delay-1 {
  animation-delay: 80ms;
}

.profile-delay-2 {
  animation-delay: 180ms;
}

.profile-delay-3 {
  animation-delay: 280ms;
}

.profile-card {
  --background: #ffffff;
  margin: 0 16px 8px;
  border-radius: 18px;
  border: 1px solid #e3e8ef;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.profile-card-content {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 22px;
}

.profile-avatar {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  border: 3px solid #e6f4ea;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
  object-fit: cover;
  flex-shrink: 0;
}

.profile-meta {
  text-align: left;
}

.profile-name {
  margin: 0 0 6px 0;
  font-size: 21px;
  font-weight: 700;
  color: #0f172a;
}

.profile-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.profile-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #0f5223;
  background: #e6f4ea;
}

.profile-rating {
  margin: 0;
  font-size: 14px;
  color: #1f2937;
  font-weight: 600;
}

.profile-since {
  margin: 6px 0 0 0;
  font-size: 13px;
  color: #64748b;
}

.profile-list {
  margin: 0 16px 24px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e3e8ef;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
}

.profile-section {
  --background: #eef3f6;
  --color: #5f6b7a;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.profile-item {
  --background: #ffffff;
  --color: #0f172a;
  --border-color: #eef2f7;
  --background-activated: #e6f4ea;
  --ripple-color: rgba(26, 127, 52, 0.18);
  font-size: 15px;
}

.profile-item ion-icon {
  color: #94a3b8;
}

.profile-item ion-label {
  font-weight: 600;
}

.profile-item ion-label[color='danger'] {
  color: #dc2626;
}

@media (max-width: 520px) {
  .profile-hero {
    margin: 12px 12px 10px;
    padding: 20px 18px 26px;
  }

  .profile-hero-title {
    font-size: 20px;
  }

  .profile-card-content {
    flex-direction: column;
    text-align: center;
    padding: 20px 18px 22px;
  }

  .profile-meta {
    text-align: center;
  }

  .profile-tags {
    justify-content: center;
  }

  .profile-avatar {
    width: 88px;
    height: 88px;
  }

  .profile-card {
    margin: 0 12px 8px;
  }

  .profile-list {
    margin: 0 12px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-animate {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

@keyframes profileFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>