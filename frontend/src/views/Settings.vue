<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/profile" />
        </ion-buttons>
        <ion-title>Ajustes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="settings-content" :class="{ 'dark-theme': settings.darkMode }">
      <div class="settings-shell">

        <!-- Perfil -->
        <div class="group">
          <div class="group-label">PERFIL</div>
          <div class="group-card">
            <div class="row" @click="editField('fullName')">
              <div class="row-icon"><ion-icon :icon="personOutline" /></div>
              <div class="row-body">
                <span class="row-label">Nombre completo</span>
                <span class="row-value">{{ profile.fullName || 'No establecido' }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
            <div class="divider" />
            <div class="row" @click="editField('email')">
              <div class="row-icon"><ion-icon :icon="mailOutline" /></div>
              <div class="row-body">
                <span class="row-label">Correo electrónico</span>
                <span class="row-value">{{ profile.email || 'No establecido' }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
            <div class="divider" />
            <div class="row" @click="editField('phone')">
              <div class="row-icon"><ion-icon :icon="callOutline" /></div>
              <div class="row-body">
                <span class="row-label">Teléfono</span>
                <span class="row-value">{{ profile.phone || 'No establecido' }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
            <div class="divider" />
            <div class="row" @click="editField('bio')">
              <div class="row-icon"><ion-icon :icon="documentTextOutline" /></div>
              <div class="row-body">
                <span class="row-label">Biografía</span>
                <span class="row-value">{{ profile.bio || 'Añade una descripción' }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
          </div>
        </div>

        <!-- Dirección -->
        <div class="group">
          <div class="group-label">DIRECCIÓN</div>
          <div class="group-card">
            <div class="row" @click="editAddress">
              <div class="row-icon"><ion-icon :icon="locationOutline" /></div>
              <div class="row-body">
                <span class="row-label">Dirección de envío</span>
                <span class="row-value">{{ addressSummary }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
          </div>
        </div>

        <!-- Notificaciones -->
        <div class="group">
          <div class="group-label">NOTIFICACIONES</div>
          <div class="group-card">
            <div class="row">
              <div class="row-icon"><ion-icon :icon="mailOutline" /></div>
              <div class="row-body">
                <span class="row-label">Notificaciones por email</span>
              </div>
              <ion-toggle v-model="settings.emailNotifications" @ionChange="saveToStorage" />
            </div>
            <div class="divider" />
            <div class="row">
              <div class="row-icon"><ion-icon :icon="chatbubbleOutline" /></div>
              <div class="row-body">
                <span class="row-label">Mensajes nuevos</span>
              </div>
              <ion-toggle v-model="settings.messageNotifications" @ionChange="saveToStorage" />
            </div>
            <div class="divider" />
            <div class="row">
              <div class="row-icon"><ion-icon :icon="pricetagOutline" /></div>
              <div class="row-body">
                <span class="row-label">Ofertas y promociones</span>
              </div>
              <ion-toggle v-model="settings.promotionNotifications" @ionChange="saveToStorage" />
            </div>
            <div class="divider" />
            <div class="row">
              <div class="row-icon"><ion-icon :icon="cartOutline" /></div>
              <div class="row-body">
                <span class="row-label">Cambios en tus compras</span>
              </div>
              <ion-toggle v-model="settings.orderNotifications" @ionChange="saveToStorage" />
            </div>
          </div>
        </div>

        <!-- Privacidad -->
        <div class="group">
          <div class="group-label">PRIVACIDAD</div>
          <div class="group-card">
            <div class="row" @click="changePassword">
              <div class="row-icon"><ion-icon :icon="lockClosedOutline" /></div>
              <div class="row-body">
                <span class="row-label">Cambiar contraseña</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
            <div class="divider" />
            <div class="row">
              <div class="row-icon"><ion-icon :icon="globeOutline" /></div>
              <div class="row-body">
                <span class="row-label">Perfil público</span>
              </div>
              <ion-toggle v-model="settings.publicProfile" @ionChange="saveToStorage" />
            </div>
            <div class="divider" />
            <div class="row">
              <div class="row-icon"><ion-icon :icon="starOutline" /></div>
              <div class="row-body">
                <span class="row-label">Mostrar calificación</span>
              </div>
              <ion-toggle v-model="settings.showRating" @ionChange="saveToStorage" />
            </div>
          </div>
        </div>

        <!-- Apariencia -->
        <div class="group">
          <div class="group-label">APARIENCIA</div>
          <div class="group-card">
            <div class="row">
              <div class="row-icon"><ion-icon :icon="moonOutline" /></div>
              <div class="row-body">
                <span class="row-label">Modo oscuro</span>
              </div>
              <ion-toggle v-model="settings.darkMode" @ionChange="onDarkModeChange" />
            </div>
            <div class="divider" />
            <div class="row" @click="pickLanguage">
              <div class="row-icon"><ion-icon :icon="languageOutline" /></div>
              <div class="row-body">
                <span class="row-label">Idioma</span>
                <span class="row-value">{{ languageLabel }}</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
          </div>
        </div>

        <!-- Cuenta -->
        <div class="group">
          <div class="group-label">CUENTA</div>
          <div class="group-card">
            <div class="row" @click="downloadData">
              <div class="row-icon"><ion-icon :icon="downloadOutline" /></div>
              <div class="row-body">
                <span class="row-label">Descargar mis datos</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>
          </div>
          <div class="group-card danger-card">
            <div class="row" @click="deleteAccount">
              <div class="row-icon danger-icon"><ion-icon :icon="trashOutline" /></div>
              <div class="row-body">
                <span class="row-label danger-text">Eliminar cuenta</span>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron chevron-danger" />
            </div>
          </div>
        </div>

        <p class="version">ReMarket v1.0.0</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonToggle,
  alertController,
  toastController,
} from '@ionic/vue'
import {
  personOutline,
  mailOutline,
  callOutline,
  documentTextOutline,
  locationOutline,
  chatbubbleOutline,
  pricetagOutline,
  cartOutline,
  lockClosedOutline,
  globeOutline,
  starOutline,
  moonOutline,
  languageOutline,
  downloadOutline,
  trashOutline,
  chevronForwardOutline,
} from 'ionicons/icons'
import Swal from 'sweetalert2'

interface Settings {
  emailNotifications: boolean
  messageNotifications: boolean
  promotionNotifications: boolean
  orderNotifications: boolean
  publicProfile: boolean
  showRating: boolean
  darkMode: boolean
  language: string
}

const settings = reactive<Settings>({
  emailNotifications: true,
  messageNotifications: true,
  promotionNotifications: false,
  orderNotifications: true,
  publicProfile: true,
  showRating: true,
  darkMode: false,
  language: 'es',
})

const profile = reactive({
  fullName: 'Juan Pérez García',
  email: 'juan@ejemplo.com',
  phone: '+34 612 345 678',
  bio: 'Comprador y vendedor activo en ReMarket',
})

const address = reactive({
  street: 'Calle Principal, 123',
  city: 'Madrid',
  zip: '28001',
  country: 'España',
})

const STORAGE_KEY = 'remarket_settings'

const loadFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return
  try {
    const data = JSON.parse(saved)
    Object.assign(settings, data)
  } catch { /* ignore */ }
}

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings }))
}

const languages: Record<string, string> = {
  es: 'Español', en: 'English', fr: 'Français',
  de: 'Deutsch', it: 'Italiano', pt: 'Português',
}

const languageLabel = computed(() => languages[settings.language] || 'Español')

const addressSummary = computed(() => {
  const parts = [address.street, address.city, address.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'No establecida'
})

onMounted(() => {
  loadFromStorage()
  applyDarkMode(settings.darkMode)
})

const applyDarkMode = (enabled: boolean) => {
  document.body.classList.toggle('dark', enabled)
}

const onDarkModeChange = (ev: CustomEvent) => {
  applyDarkMode(ev.detail.checked)
  saveToStorage()
}

const editField = async (field: string) => {
  const labels: Record<string, string> = {
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    bio: 'Biografía',
  }
  const inputType = field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'

  const alert = await alertController.create({
    header: labels[field],
    inputs: [
      {
        name: 'value',
        type: inputType,
        placeholder: labels[field],
        value: profile[field as keyof typeof profile],
      },
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Guardar',
        handler: (data) => {
          if (field === 'fullName' || field === 'email' || field === 'phone' || field === 'bio') {
            (profile as Record<string, string>)[field] = data.value
          }
        },
      },
    ],
  })
  await alert.present()
}

const editAddress = async () => {
  const alert = await alertController.create({
    header: 'Dirección de envío',
    inputs: [
      { name: 'street', type: 'text', placeholder: 'Calle y número', value: address.street },
      { name: 'city', type: 'text', placeholder: 'Ciudad', value: address.city },
      { name: 'zip', type: 'text', placeholder: 'Código Postal', value: address.zip },
      { name: 'country', type: 'text', placeholder: 'País', value: address.country },
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Guardar',
        handler: (data) => {
          address.street = data.street
          address.city = data.city
          address.zip = data.zip
          address.country = data.country
        },
      },
    ],
  })
  await alert.present()
}

const changePassword = async () => {
  const alert = await alertController.create({
    header: 'Cambiar contraseña',
    inputs: [
      { name: 'current', type: 'password', placeholder: 'Contraseña actual' },
      { name: 'newPass', type: 'password', placeholder: 'Nueva contraseña' },
      { name: 'confirm', type: 'password', placeholder: 'Confirmar contraseña' },
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Cambiar', handler: () => true },
    ],
  })
  await alert.present()
}

const pickLanguage = async () => {
  const alert = await alertController.create({
    header: 'Idioma',
    inputs: Object.entries(languages).map(([value, label]) => ({
      type: 'radio' as const,
      label,
      value,
      checked: value === settings.language,
    })),
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Seleccionar',
        handler: (value: string) => {
          if (value) {
            settings.language = value
            saveToStorage()
          }
        },
      },
    ],
  })
  await alert.present()
}

const downloadData = async () => {
  const data = {
    profile: { ...profile },
    address: { ...address },
    settings: { ...settings },
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `remarket-data-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)

  const toast = await toastController.create({
    message: '✓ Datos descargados',
    duration: 2000,
    color: 'success',
  })
  await toast.present()
}

const deleteAccount = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Eliminar cuenta',
    text: 'Esta acción es irreversible. Se perderán todos tus datos.',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'swal2-remarket-popup',
      confirmButton: 'swal2-remarket-confirm',
      cancelButton: 'swal2-remarket-cancel',
      container: 'swal2-ionic-container-fix',
    },
    heightAuto: false,
    target: document.body,
  })
  if (!result.isConfirmed) return

  const toast = await toastController.create({
    message: 'Cuenta eliminada. Redirigiendo...',
    color: 'danger',
    duration: 2000,
  })
  await toast.present()
  setTimeout(() => window.location.href = '/login', 2000)
}
</script>

<style scoped>
.settings-content {
  --background: #f1f5f9;
}

.settings-shell {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Groups */
.group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.08em;
  padding-left: 4px;
}

.group-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.danger-card {
  border: 1px solid #fecaca;
}

/* Rows */
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.15s;
  min-height: 48px;
}

.row:hover {
  background: #f8fafc;
}

.row-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f1f5f9;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: #64748b;
  font-size: 1.05rem;
}

.row-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.row-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
}

.row-value {
  font-size: 0.78rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron {
  color: #cbd5e1;
  font-size: 0.9rem;
  flex: 0 0 auto;
}

.divider {
  height: 1px;
  background: #f1f5f9;
  margin: 0 16px;
}

/* Danger overrides */
.danger-icon {
  background: #fef2f2;
  color: #ef4444;
}

.danger-text {
  color: #ef4444;
}

.chevron-danger {
  color: #fca5a5;
}

/* Toggle styling */
ion-toggle {
  --handle-width: 24px;
  --handle-height: 24px;
  --handle-spacing: 3px;
  --handle-background: #fff;
  --handle-background-checked: #fff;
  --track-background: #cbd5e1;
  --track-background-checked: #1a7f34;
}

/* Version */
.version {
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 8px 0 0;
}

/* Dark theme overrides */
:global(.dark) .settings-content {
  --background: #0f172a;
}

:global(.dark) .group-card {
  background: #1e293b;
}

:global(.dark) .group-label {
  color: #64748b;
}

:global(.dark) .row:hover {
  background: #1a2332;
}

:global(.dark) .row-label {
  color: #e2e8f0;
}

:global(.dark) .row-value {
  color: #64748b;
}

:global(.dark) .row-icon {
  background: #334155;
  color: #94a3b8;
}

:global(.dark) .divider {
  background: #334155;
}

:global(.dark) .chevron {
  color: #475569;
}

:global(.dark) .danger-card {
  border-color: #7f1d1d;
  background: #1e293b;
}

:global(.dark) .danger-icon {
  background: #450a0a;
  color: #ef4444;
}

:global(.dark) .version {
  color: #475569;
}

@media (max-width: 480px) {
  .settings-shell {
    padding: 12px 12px 24px;
    gap: 16px;
  }

  .row {
    padding: 12px 14px;
    min-height: 44px;
  }
}
</style>
