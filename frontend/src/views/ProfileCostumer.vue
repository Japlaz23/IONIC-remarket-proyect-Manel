<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home" />
        </ion-buttons>
        <ion-title>Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="profile-content ion-padding">
      <div class="profile-shell">
        <ion-card class="hero-card">
          <ion-card-content>
            <div class="hero-row">
              <div class="avatar-wrap">
                <div class="avatar-fallback">{{ initials }}</div>
              </div>

              <div class="hero-copy">
                <p class="eyebrow">Cuenta de comprador</p>
                <h1>{{ displayName }}</h1>
                <p class="subtitle">{{ displayEmail }}</p>
                <div class="hero-meta">
                  <span v-if="userRole">{{ userRoleLabel }}</span>
                  <span v-if="loginDate">Último acceso: {{ loginDate }}</span>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <div class="stats-grid">
          <ion-card class="stat-card">
            <ion-card-content>
              <div class="stat-value">{{ favoriteCount }}</div>
              <div class="stat-label">Favoritos</div>
            </ion-card-content>
          </ion-card>

          <ion-card class="stat-card">
            <ion-card-content>
              <div class="stat-value">{{ purchasesCount }}</div>
              <div class="stat-label">Compras</div>
            </ion-card-content>
          </ion-card>

          <ion-card class="stat-card">
            <ion-card-content>
              <div class="stat-value">{{ accountAgeLabel }}</div>
              <div class="stat-label">Antigüedad</div>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card class="section-card">
          <ion-card-header>
            <ion-card-title>Información de cuenta</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="info-list">
              <div class="info-row">
                <span class="info-key">Nombre</span>
                <span class="info-value">{{ displayName }}</span>
              </div>
              <div class="info-row">
                <span class="info-key">Email</span>
                <span class="info-value">{{ displayEmail }}</span>
              </div>
              <div class="info-row">
                <span class="info-key">Rol</span>
                <span class="info-value">{{ userRoleLabel }}</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="section-card">
          <ion-card-header>
            <ion-card-title>Accesos rápidos</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="actions-grid">
              <ion-button expand="block" router-link="/favorites">Favoritos</ion-button>
              <ion-button expand="block" fill="outline" router-link="/purchases">Mis compras</ion-button>
              <ion-button expand="block" fill="outline" router-link="/settings">Configuración</ion-button>
              <ion-button expand="block" color="medium" fill="outline" @click="refreshUser">Actualizar</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

interface StoredUser {
  email?: string
  name?: string
  fullName?: string
  role?: string
  loginDate?: string
  registerDate?: string
}

const favoriteStore = useFavoriteStore()
const user = ref<StoredUser | null>(null)

const loadUser = () => {
  const rawUser = localStorage.getItem('user')
  if (!rawUser) {
    user.value = null
    return
  }

  try {
    user.value = JSON.parse(rawUser) as StoredUser
  } catch {
    user.value = null
  }
}

onMounted(() => {
  favoriteStore.loadFavorites()
  loadUser()
})

const displayName = computed(() => user.value?.fullName || user.value?.name || 'Usuario')
const displayEmail = computed(() => user.value?.email || 'correo@ejemplo.com')
const userRole = computed(() => user.value?.role || 'user')
const userRoleLabel = computed(() => (userRole.value === 'admin' ? 'Administrador' : 'Comprador'))
const loginDate = computed(() => user.value?.loginDate || user.value?.registerDate || '')
const favoriteCount = computed(() => favoriteStore.favoriteCount)
const purchasesCount = computed(() => {
  const storedPurchases = localStorage.getItem('purchases')
  if (!storedPurchases) {
    return 0
  }

  try {
    const parsed = JSON.parse(storedPurchases)
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
})
const initials = computed(() => {
  const source = displayName.value.trim()
  if (!source) {
    return 'U'
  }

  return source
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
})
const accountAgeLabel = computed(() => {
  const referenceDate = user.value?.registerDate || user.value?.loginDate
  if (!referenceDate) {
    return 'Hoy'
  }

  const start = new Date(referenceDate).getTime()
  if (Number.isNaN(start)) {
    return 'Hoy'
  }

  const diffDays = Math.max(0, Math.floor((Date.now() - start) / 86400000))
  if (diffDays === 0) {
    return 'Hoy'
  }

  if (diffDays === 1) {
    return '1 día'
  }

  return `${diffDays} días`
})

const refreshUser = () => {
  loadUser()
}
</script>

<style scoped>
.profile-content {
  --background: linear-gradient(180deg, #f5f7fb 0%, #eef4f8 100%);
}

.profile-shell {
  max-width: 760px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.hero-card,
.section-card,
.stat-card {
  border-radius: 20px;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
}

.hero-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.avatar-wrap {
  width: 84px;
  height: 84px;
  border-radius: 24px;
  background: linear-gradient(135deg, #1f7a4f 0%, #4bb86b 100%);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.avatar-fallback {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.hero-copy h1 {
  margin: 2px 0 4px;
  font-size: 1.4rem;
  color: #0f172a;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  color: #1f7a4f;
  font-weight: 700;
}

.subtitle,
.hero-meta {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat-card ion-card-content {
  text-align: center;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}

.stat-label {
  color: #64748b;
  margin-top: 4px;
  font-size: 0.9rem;
}

.info-list {
  display: grid;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  padding-bottom: 10px;
}

.info-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.info-key {
  color: #64748b;
}

.info-value {
  color: #0f172a;
  font-weight: 600;
  text-align: right;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

@media (max-width: 640px) {
  .hero-row {
    align-items: flex-start;
  }

  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    gap: 4px;
  }

  .info-value {
    text-align: left;
  }
}
</style>