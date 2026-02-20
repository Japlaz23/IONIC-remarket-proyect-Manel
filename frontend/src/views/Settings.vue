<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Configuración</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="settings-content">
      <div class="settings-container">
        <!-- Sección de perfil -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="personCircleOutline"></ion-icon>
            Mi Perfil
          </h2>

          <ion-item class="settings-item">
            <ion-label position="floating" style="padding-bottom: 2px;">Nombre completo</ion-label>
            <ion-input v-model="profile.fullName" placeholder="Juan Pérez" style="padding-top: 30px;"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="profile.email" type="email" placeholder="correo@ejemplo.com"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">Teléfono</ion-label>
            <ion-input v-model="profile.phone" type="tel" placeholder="+34 600 00 00 00"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">Descripción del perfil</ion-label>
            <ion-textarea v-model="profile.bio" placeholder="Cuéntanos sobre ti..." :rows="3"></ion-textarea>
          </ion-item>
        </div>

        <!-- Dirección -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="locationOutline"></ion-icon>
            Dirección de Envío
          </h2>

          <ion-item class="settings-item">
            <ion-label position="floating">Calle y número</ion-label>
            <ion-input v-model="address.street" placeholder="Calle Principal, 123"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">Ciudad</ion-label>
            <ion-input v-model="address.city" placeholder="Madrid"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">Código Postal</ion-label>
            <ion-input v-model="address.zipCode" placeholder="28001"></ion-input>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label position="floating">País</ion-label>
            <ion-input v-model="address.country" placeholder="España"></ion-input>
          </ion-item>
        </div>

        <!-- Métodos de pago -->
        <div class="settings-section">
          <div class="section-header">
            <h2 class="section-title">
              <ion-icon :icon="cardOutline"></ion-icon>
              Métodos de Pago
            </h2>
            <ion-button size="small" fill="outline" @click="addPaymentMethod">
              <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
              Añadir
            </ion-button>
          </div>

          <div v-if="paymentMethods.length === 0" class="empty-payment">
            <p>No hay métodos de pago registrados</p>
          </div>

          <div v-for="(method, idx) in paymentMethods" :key="idx" class="payment-method-card">
            <div class="payment-header">
              <div class="payment-info">
                <ion-icon :icon="method.type === 'card' ? cardOutline : walletOutline"></ion-icon>
                <span class="payment-label">{{ method.label }}</span>
                <span class="payment-number">{{ method.number }}</span>
              </div>
              <ion-button fill="clear" size="small" @click="removePaymentMethod(idx)">
                <ion-icon :icon="trashOutline"></ion-icon>
              </ion-button>
            </div>
            <p class="payment-expiry" v-if="method.expiry">Vence: {{ method.expiry }}</p>
          </div>
        </div>

        <!-- Notificaciones -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="notificationsOutline"></ion-icon>
            Notificaciones
          </h2>

          <ion-item class="settings-item">
            <ion-label>Notificaciones por email</ion-label>
            <ion-toggle v-model="settings.emailNotifications" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Nuevos mensajes</ion-label>
            <ion-toggle v-model="settings.messageNotifications" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Ofertas y promociones</ion-label>
            <ion-toggle v-model="settings.promotionNotifications" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Cambios en tus compras</ion-label>
            <ion-toggle v-model="settings.orderNotifications" slot="end"></ion-toggle>
          </ion-item>
        </div>

        <!-- Privacidad y seguridad -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            Privacidad y Seguridad
          </h2>

          <ion-item class="settings-item" button @click="changePassword">
            <ion-label>Cambiar contraseña</ion-label>
            <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Perfil público</ion-label>
            <ion-toggle v-model="settings.publicProfile" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Mostrar calificación de vendedor</ion-label>
            <ion-toggle v-model="settings.showRating" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item" button @click="manageBlocked">
            <ion-label>Usuarios bloqueados ({{ blockedUsers.length }})</ion-label>
            <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
          </ion-item>
        </div>

        <!-- Preferencias -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="settingsOutline"></ion-icon>
            Preferencias
          </h2>

          <ion-item class="settings-item">
            <ion-label>Tema oscuro</ion-label>
            <ion-toggle v-model="settings.darkMode" slot="end"></ion-toggle>
          </ion-item>

          <ion-item class="settings-item">
            <ion-label>Idioma</ion-label>
            <ion-select v-model="settings.language" slot="end">
              <ion-select-option value="es">Español</ion-select-option>
              <ion-select-option value="en">Ingles</ion-select-option>
              <ion-select-option value="fr">Francés</ion-select-option>
              <ion-select-option value="de">Alemán</ion-select-option>
              <ion-select-option value="it">Italiano</ion-select-option>
              <ion-select-option value="pt">Portugués</ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <!-- Acciones de cuenta -->
        <div class="settings-section">
          <h2 class="section-title">
            <ion-icon :icon="warningOutline"></ion-icon>
            Zona de Peligro
          </h2>

          <ion-button expand="block" fill="outline" color="warning" @click="downloadData">
            <ion-icon slot="start" :icon="downloadOutline"></ion-icon>
            Descargar mis datos
          </ion-button>

          <ion-button expand="block" fill="outline" color="danger" @click="deleteAccount">
            <ion-icon slot="start" :icon="trashOutline"></ion-icon>
            Eliminar cuenta
          </ion-button>
        </div>

        <!-- Botones de guardado -->
        <div class="action-buttons">
          <ion-button expand="block" fill="outline" @click="resetSettings">
            <ion-icon slot="start" :icon="refreshOutline"></ion-icon>
            Descartar cambios
          </ion-button>

          <ion-button expand="block" color="success" @click="saveSettings">
            <ion-icon slot="start" :icon="checkmarkDoneOutline"></ion-icon>
            Guardar cambios
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToggle,
  IonSelect,
  IonSelectOption,
  toastController,
  alertController,
} from '@ionic/vue'
import {
  personCircleOutline,
  locationOutline,
  cardOutline,
  walletOutline,
  addCircleOutline,
  trashOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  chevronForwardOutline,
  settingsOutline,
  warningOutline,
  downloadOutline,
  refreshOutline,
  checkmarkDoneOutline,
} from 'ionicons/icons'

interface PaymentMethod {
  type: 'card' | 'bank'
  label: string
  number: string
  expiry?: string
}

interface Address {
  street: string
  city: string
  zipCode: string
  country: string
}

interface ProfileData {
  fullName: string
  email: string
  phone: string
  bio: string
}

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

const router = useRouter()

const profile = reactive<ProfileData>({
  fullName: 'Juan Pérez García',
  email: 'juan@ejemplo.com',
  phone: '+34 612345678',
  bio: 'Comprador y vendedor activo',
})

const address = reactive<Address>({
  street: 'Calle Principal, 123',
  city: 'Madrid',
  zipCode: '28001',
  country: 'España',
})

const paymentMethods = ref<PaymentMethod[]>([
  { type: 'card', label: 'Visa', number: '**** **** **** 1234', expiry: '12/25' },
  { type: 'bank', label: 'Banco Popular', number: 'ES9121000418450200051332' },
])

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

const blockedUsers = ref([
  { id: 1, name: 'Usuario X', blockedDate: '2026-01-15' },
])

const addPaymentMethod = async () => {
  const toast = await toastController.create({
    message: 'Abriendo formulario de pago...',
    duration: 2000,
  })
  await toast.present()
}

const removePaymentMethod = async (idx: number) => {
  const alert = await alertController.create({
    header: 'Eliminar método de pago',
    message: '¿Seguro de que quieres eliminar este método de pago?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          paymentMethods.value.splice(idx, 1)
        },
      },
    ],
  })
  await alert.present()
}

const changePassword = async () => {
  const toast = await toastController.create({
    message: 'Redireccionar a cambio de contraseña',
    duration: 2000,
  })
  await toast.present()
}

const manageBlocked = async () => {
  const toast = await toastController.create({
    message: `${blockedUsers.value.length} usuario(s) bloqueado(s)`,
    duration: 2000,
  })
  await toast.present()
}

const downloadData = async () => {
  const toast = await toastController.create({
    message: '✓ Descargando tus datos...',
    duration: 2000,
    color: 'success',
  })
  await toast.present()
}

const deleteAccount = async () => {
  const alert = await alertController.create({
    header: 'Eliminar cuenta',
    message: '⚠️ Esta acción es irreversible. Se perderán todos tus datos.',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: async () => {
          const toast = await toastController.create({
            message: 'Cuenta eliminada. Redirigiendo...',
            color: 'danger',
            duration: 2000,
          })
          await toast.present()
          setTimeout(() => router.push('/login'), 2000)
        },
      },
    ],
  })
  await alert.present()
}

const saveSettings = async () => {
  const toast = await toastController.create({
    message: '✓ Cambios guardados correctamente',
    duration: 2000,
    color: 'success',
  })
  await toast.present()
}

const resetSettings = async () => {
  const toast = await toastController.create({
    message: 'Cambios descartados',
    duration: 2000,
  })
  await toast.present()
}
</script>

<style scoped>
.settings-content {
  --background: #f5f7fa;
}

.settings-container {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}

.section-title ion-icon {
  color: #1a7f34;
  font-size: 20px;
}

.settings-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  margin-bottom: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

.settings-item:last-child {
  margin-bottom: 0;
}

.empty-payment {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
}

.payment-method-card {
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.payment-info ion-icon {
  color: #1a7f34;
  font-size: 20px;
}

.payment-label {
  font-weight: 600;
  color: #1a1a1a;
}

.payment-number {
  color: #999;
  font-size: 13px;
}

.payment-expiry {
  font-size: 11px;
  color: #999;
  margin: 4px 0 0 30px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
}

.action-buttons ion-button {
  flex: 1;
}

/* Responsive */
@media (max-width: 480px) {
  .settings-container {
    padding: 12px;
  }

  .settings-section {
    padding: 12px;
    margin-bottom: 12px;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
