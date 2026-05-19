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

    <ion-content class="profile-content">
      <div class="profile-shell">
        <div class="hero-card">
          <div class="hero-bg"></div>
          <div class="hero-content">
            <div class="avatar-wrap">
              <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="avatar-img" />
              <div v-else class="avatar-fallback">{{ initials }}</div>
            </div>
            <div class="hero-info">
              <span class="hero-badge">{{ userRoleLabel }}</span>
              <h1>{{ displayName }}</h1>
              <p class="hero-email">{{ displayEmail }}</p>
              <div class="hero-meta">
                <span v-if="loginDate">
                  <ion-icon :icon="calendarOutline" /> Último acceso: {{ loginDate }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon stat-icon-fav"><ion-icon :icon="heartOutline" /></div>
            <div class="stat-body">
              <div class="stat-value">{{ favoriteCount }}</div>
              <div class="stat-label">Favoritos</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-purchases"><ion-icon :icon="cartOutline" /></div>
            <div class="stat-body">
              <div class="stat-value">{{ purchasesCount }}</div>
              <div class="stat-label">Compras</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-age"><ion-icon :icon="timeOutline" /></div>
            <div class="stat-body">
              <div class="stat-value">{{ accountAgeLabel }}</div>
              <div class="stat-label">Antigüedad</div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <ion-icon :icon="personOutline" />
            <span>Información de cuenta</span>
          </div>
          <div class="section-body">
            <div class="info-row">
              <div class="info-left"><ion-icon :icon="personOutline" class="info-icon" /><span class="info-key">Nombre</span></div>
              <span class="info-value">{{ displayName }}</span>
            </div>
            <div class="info-row">
              <div class="info-left"><ion-icon :icon="mailOutline" class="info-icon" /><span class="info-key">Email</span></div>
              <span class="info-value">{{ displayEmail }}</span>
            </div>
            <div class="info-row">
              <div class="info-left"><ion-icon :icon="shieldCheckmarkOutline" class="info-icon" /><span class="info-key">Rol</span></div>
              <span class="info-value">{{ userRoleLabel }}</span>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <ion-icon :icon="flashOutline" />
            <span>Acceso rápido</span>
          </div>
          <div class="section-body">
            <div class="actions-grid">
              <button class="action-btn" @click="goTo('/favorites')">
                <div class="action-icon"><ion-icon :icon="heartOutline" /></div>
                <span>Favoritos</span>
              </button>
              <button class="action-btn" @click="goTo('/purchases')">
                <div class="action-icon"><ion-icon :icon="cartOutline" /></div>
                <span>Mis compras</span>
              </button>
              <button class="action-btn" @click="goTo('/sales')">
                <div class="action-icon"><ion-icon :icon="storefrontOutline" /></div>
                <span>Mis ventas</span>
              </button>
              <button class="action-btn" @click="refreshUser">
                <div class="action-icon"><ion-icon :icon="refreshOutline" /></div>
                <span>Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <ion-icon :icon="settingsOutline" />
            <span>Ajustes</span>
          </div>
          <div class="section-body">
            <div class="settings-links">
              <button class="settings-row" @click="goTo('/settings')">
                <ion-icon :icon="optionsOutline" />
                <span>Configuración de la cuenta</span>
                <ion-icon :icon="chevronForwardOutline" class="chevron" />
              </button>
              <button class="settings-row logout-row" @click="logout">
                <ion-icon :icon="powerOutline" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/vue'
import { toastController } from '@ionic/vue'
import {
  heartOutline,
  cartOutline,
  timeOutline,
  calendarOutline,
  personOutline,
  mailOutline,
  shieldCheckmarkOutline,
  flashOutline,
  storefrontOutline,
  refreshOutline,
  settingsOutline,
  optionsOutline,
  chevronForwardOutline,
  powerOutline,
} from 'ionicons/icons'
import { useFavoriteStore } from '@/stores/favoriteStore'

interface StoredUser {
  email?: string
  name?: string
  fullName?: string
  role?: string
  loginDate?: string
  registerDate?: string
  avatar?: string
}

const router = useRouter()
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
const avatarUrl = computed(() => user.value?.avatar || '')
const favoriteCount = computed(() => favoriteStore.favoriteCount)
const purchasesCount = computed(() => {
  const storedPurchases = localStorage.getItem('purchases')
  if (!storedPurchases) return 0
  try {
    const parsed = JSON.parse(storedPurchases)
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
})
const initials = computed(() => {
  const source = displayName.value.trim()
  if (!source) return 'U'
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
})
const accountAgeLabel = computed(() => {
  const referenceDate = user.value?.registerDate || user.value?.loginDate
  if (!referenceDate) return 'Hoy'
  const start = new Date(referenceDate).getTime()
  if (Number.isNaN(start)) return 'Hoy'
  const diffDays = Math.max(0, Math.floor((Date.now() - start) / 86400000))
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return '1 día'
  return `${diffDays} días`
})

const goTo = (path: string) => {
  router.push(path)
}

const refreshUser = () => {
  loadUser()
}

const logout = async () => {
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('favorites')
    localStorage.removeItem('purchases')
  } catch {}
  const t = await toastController.create({
    message: 'Sesión cerrada',
    duration: 1400,
    position: 'top',
    color: 'primary',
  })
  await t.present()
  router.push('/login')
}
</script>

<style scoped>
.profile-content {
  --background: #f5f7fa;
}

.profile-shell {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
}

/* Hero */
.hero-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  position: relative;
}

.hero-bg {
  height: 90px;
  background: linear-gradient(135deg, #1a7f34 0%, #2ea043 50%, #4bc06a 100%);
}

.hero-content {
  padding: 0 20px 20px;
  margin-top: -40px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.avatar-wrap {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a7f34 0%, #2ea043 100%);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
}

.hero-info {
  flex: 1;
  padding-top: 44px;
}

.hero-badge {
  display: inline-block;
  background: #e8f5e9;
  color: #1a7f34;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 6px;
}

.hero-info h1 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
  font-weight: 700;
}

.hero-email {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 0.85rem;
}

.hero-meta {
  margin-top: 8px;
  font-size: 0.78rem;
  color: #94a3b8;
}

.hero-meta ion-icon {
  vertical-align: middle;
  margin-right: 4px;
  font-size: 0.85rem;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  font-size: 1.2rem;
}

.stat-icon-fav { background: #fef2f2; color: #ef4444; }
.stat-icon-purchases { background: #eff6ff; color: #3b82f6; }
.stat-icon-age { background: #f0fdf4; color: #22c55e; }

.stat-body {
  min-width: 0;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
}

.stat-label {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Sections */
.section-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
}

.section-header ion-icon {
  color: #1a7f34;
  font-size: 1.2rem;
}

.section-body {
  padding: 14px 18px 18px;
}

/* Info rows */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-row:last-child {
  border-bottom: none;
}

.info-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  color: #94a3b8;
  font-size: 1rem;
}

.info-key {
  color: #64748b;
  font-size: 0.88rem;
}

.info-value {
  color: #0f172a;
  font-weight: 600;
  font-size: 0.88rem;
  text-align: right;
}

/* Action buttons */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
}

.action-btn:hover {
  border-color: #1a7f34;
  background: #f8fdf9;
  color: #1a7f34;
}

.action-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f1f5f9;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  color: #64748b;
  transition: all 0.2s;
}

.action-btn:hover .action-icon {
  background: #e8f5e9;
  color: #1a7f34;
}

/* Settings link */
.settings-links {
  display: flex;
  flex-direction: column;
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  width: 100%;
  text-align: left;
  transition: color 0.15s;
}

.settings-row:hover {
  color: #1a7f34;
}

.settings-row ion-icon:first-child {
  color: #94a3b8;
  font-size: 1.15rem;
}

.logout-row {
  color: #ef4444;
}

.logout-row ion-icon:first-child {
  color: #ef4444;
}

.chevron {
  margin-left: auto;
  color: #cbd5e1;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 480px) {
  .profile-shell {
    padding: 12px;
    gap: 12px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -50px;
  }

  .hero-info {
    padding-top: 4px;
  }

  .hero-bg {
    height: 80px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 12px 14px;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}
</style>
