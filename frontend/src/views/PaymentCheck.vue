<template>
  <ion-page>
    <ion-header class="payment-header">
      <ion-toolbar class="payment-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/purchases"></ion-back-button>
        </ion-buttons>
        <ion-title>Método de Pago</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="payment-content">
      <!-- ORDER SUMMARY -->
      <div class="summary-section">
        <ion-card class="summary-card">
          <ion-card-header>
            <ion-card-title class="summary-title">Resumen del Pedido</ion-card-title>
          </ion-card-header>
          <ion-card-content class="summary-details">
            <div class="detail-row">
              <span class="detail-label">Subtotal</span>
              <span class="detail-value">{{ subtotal() }} €</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Envío</span>
              <span class="detail-value success">Gratis</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Impuestos</span>
              <span class="detail-value">{{ taxes() }} €</span>
            </div>
            <div class="summary-divider"></div>
            <div class="detail-row total-row">
              <span class="detail-label bold">Total</span>
              <span class="detail-value bold large">{{ total.toFixed(2) }} €</span>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- PAYMENT METHODS -->
      <div class="methods-section">
        <h3 class="section-title">Selecciona un Método de Pago</h3>
        
        <ion-list class="payment-methods">
          <!-- TARJETA -->
          <ion-item 
            button 
            class="method-item"
            :class="{ 'method-selected': method === 'card' }"
            @click="selectMethod('card')"
          >
            <div class="method-content">
              <ion-icon :icon="cardOutline" slot="start" class="method-icon"></ion-icon>
              <div class="method-info">
                <ion-label class="method-label">Tarjeta de Crédito/Débito</ion-label>
                <p class="method-description">Visa, Mastercard, American Express</p>
              </div>
            </div>
            <ion-radio slot="end" :checked="method === 'card'" class="method-radio"></ion-radio>
          </ion-item>

          <!-- PAYPAL -->
          <ion-item 
            button 
            class="method-item"
            :class="{ 'method-selected': method === 'paypal' }"
            @click="selectMethod('paypal')"
          >
            <div class="method-content">
              <ion-icon :icon="logoPaypal" slot="start" class="method-icon paypal"></ion-icon>
              <div class="method-info">
                <ion-label class="method-label">PayPal</ion-label>
                <p class="method-description">Paga de forma segura con tu cuenta PayPal</p>
              </div>
            </div>
            <ion-radio slot="end" :checked="method === 'paypal'" class="method-radio"></ion-radio>
          </ion-item>

          <!-- APPLE PAY -->
          <ion-item 
            button 
            class="method-item"
            :class="{ 'method-selected': method === 'apple' }"
            @click="selectMethod('apple')"
          >
            <div class="method-content">
              <ion-icon :icon="logoApple" slot="start" class="method-icon"></ion-icon>
              <div class="method-info">
                <ion-label class="method-label">Apple Pay</ion-label>
                <p class="method-description">Rápido y seguro con tu iPhone</p>
              </div>
            </div>
            <ion-radio slot="end" :checked="method === 'apple'" class="method-radio"></ion-radio>
          </ion-item>

          <!-- GOOGLE PAY -->
          <ion-item 
            button 
            class="method-item"
            :class="{ 'method-selected': method === 'google' }"
            @click="selectMethod('google')"
          >
            <div class="method-content">
              <ion-icon :icon="logoGoogle" slot="start" class="method-icon google"></ion-icon>
              <div class="method-info">
                <ion-label class="method-label">Google Pay</ion-label>
                <p class="method-description">Pago rápido con Google Pay</p>
              </div>
            </div>
            <ion-radio slot="end" :checked="method === 'google'" class="method-radio"></ion-radio>
          </ion-item>

          <!-- TRANSFERENCIA BANCARIA -->
          <ion-item 
            button 
            class="method-item"
            :class="{ 'method-selected': method === 'transfer' }"
            @click="selectMethod('transfer')"
          >
            <div class="method-content">
              <ion-icon :icon="swapHorizontal" slot="start" class="method-icon"></ion-icon>
              <div class="method-info">
                <ion-label class="method-label">Transferencia Bancaria</ion-label>
                <p class="method-description">Transferencia directa a tu banco</p>
              </div>
            </div>
            <ion-radio slot="end" :checked="method === 'transfer'" class="method-radio"></ion-radio>
          </ion-item>
        </ion-list>
      </div>

      <!-- SECURITY INFO -->
      <div class="security-section">
        <ion-card class="security-card">
          <ion-card-content class="security-content">
            <ion-icon :icon="shield" class="security-icon"></ion-icon>
            <p class="security-text">Tu pago es seguro y está encriptado con tecnología SSL de 256 bits</p>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- RESULT MESSAGE -->
      <!-- SweetAlert2 reemplaza los ion-alerts -->
    </ion-content>

    <!-- ACTION FOOTER -->
    <ion-footer class="payment-footer">
      <ion-toolbar class="footer-toolbar">
        <div class="footer-content">
          <ion-button 
            fill="outline" 
            expand="block"
            @click="cancelPayment"
            class="cancel-btn"
          >
            Cancelar
          </ion-button>
          <ion-button
            expand="block"
            color="success"
            :disabled="!method || isProcessing"
            @click="processPayment"
            class="pay-btn"
          >
            <ion-spinner v-if="isProcessing" name="crescent" slot="start"></ion-spinner>
            <span v-if="!isProcessing">Pagar {{ total.toFixed(2) }} €</span>
            <span v-else>Procesando...</span>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRadio,
  IonFooter,
  IonSpinner,
} from '@ionic/vue'
import {
  cardOutline,
  logoPaypal,
  logoApple,
  logoGoogle,
  swapHorizontal,
  shield,
} from 'ionicons/icons'

const router = useRouter()
const route = useRoute()

// Estado
const total = ref(49.99)
const method = ref<string | null>(null)
const paid = ref(false)
const error = ref<string | null>(null)
const isProcessing = ref(false)

// Cálculos derivados
const subtotal = () => (total.value * 0.9).toFixed(2)
const taxes = () => (total.value * 0.1).toFixed(2)

// Métodos
const selectMethod = (m: string) => {
  method.value = m
  error.value = null
}

const processPayment = async () => {
  if (!method.value) return

  isProcessing.value = true
  error.value = null

  try {
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Validaciones aleatorias para demostración
    if (Math.random() > 0.85) {
      throw new Error('Fondos insuficientes en tu cuenta')
    }

    paid.value = true
    await nextTick()
    await Swal.fire({
      icon: 'success',
      title: '¡Pago Exitoso!',
      text: 'Tu pedido ha sido confirmado. Recibirás una confirmación por email.',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'swal2-remarket-popup',
        confirmButton: 'swal2-remarket-confirm',
        container: 'swal2-ionic-container-fix',
      },
      heightAuto: false,
      target: document.body,
    })
    router.push('/tabs/purchases')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al procesar el pago'
    await nextTick()
    await Swal.fire({
      icon: 'error',
      title: 'Error de Pago',
      text: error.value,
      confirmButtonText: 'Reintentar',
      customClass: {
        popup: 'swal2-remarket-popup',
        confirmButton: 'swal2-remarket-confirm',
        container: 'swal2-ionic-container-fix',
      },
      heightAuto: false,
      target: document.body,
    })
  } finally {
    isProcessing.value = false
  }
}

const cancelPayment = () => {
  router.back()
}

// Obtener total de la ruta si está disponible
onMounted(() => {
  const queryTotal = route.query.total
  if (queryTotal) {
    total.value = parseFloat(queryTotal as string)
  }
})
</script>

<style scoped>
/* ==================== HEADER STYLES ==================== */

.payment-header {
  --background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.payment-toolbar {
  --background: #ffffff;
  --border-color: #e8e8e8;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --min-height: 64px;
}

/* ==================== CONTENT STYLES ==================== */

.payment-content {
  --background: #f5f5f5;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.summary-section {
  padding: 16px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  width: 100%;
  display: flex;
  justify-content: center;
}

.summary-card {
  margin: 0;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(26, 127, 52, 0.15);
  width: 100%;
  max-width: 600px;
}

.summary-title {
  color: #000000 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
}

.summary-card ion-card-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
}

.summary-card ion-card-content {
  padding: 16px;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.detail-label {
  color: #000000;
  font-weight: 500;
}

.detail-value {
  color: #000000;
  font-weight: 600;
}

.detail-value.success {
  color: #56f756;
}

.summary-divider {
  background: rgba(255, 255, 255, 0.2);
  margin: 8px 0;
}

.total-row {
  padding-top: 8px;
}

.detail-label.bold {
  color: #000000;
}

.detail-value.bold {
  color: #000000;
}

.detail-value.large {
  font-size: 18px;
}

/* ==================== METHODS SECTION ==================== */

.methods-section {
  padding: 24px 16px;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px 0;
  width: 100%;
  max-width: 600px;
}

.payment-methods {
  background: transparent;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.method-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 0;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  margin-bottom: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px;
}

.method-item:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.method-item.method-selected {
  border-color: #1a7f34;
  background: linear-gradient(135deg, rgba(26, 127, 52, 0.08) 0%, rgba(26, 127, 52, 0.04) 100%);
  box-shadow: 0 8px 20px rgba(26, 127, 52, 0.15);
  transform: translateY(-2px);
}

.method-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  padding: 12px 0;
}

.method-icon {
  font-size: 36px;
  color: #1a7f34;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.method-item.method-selected .method-icon {
  transform: scale(1.1);
}

.method-icon.paypal {
  color: #003087;
}

.method-icon.google {
  color: #1f2937;
}

.method-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.method-label {
  font-size: 15px !important;
  font-weight: 600 !important;
  color: #0f172a !important;
}

.method-description {
  font-size: 12px;
  color: #64748b;
  margin: 0 !important;
}

.method-radio {
  --color: #1a7f34;
  --color-checked: #1a7f34;
  transition: transform 0.3s ease;
}

.method-item.method-selected .method-radio {
  transform: scale(1.2);
}

/* ==================== SECURITY SECTION ==================== */

.security-section {
  padding: 16px;
  background: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: center;
}

.security-card {
  margin: 0;
  background: linear-gradient(135deg, #eef2f7 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 600px;
}

.security-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
}

.security-icon {
  font-size: 24px;
  color: #1a7f34;
  flex-shrink: 0;
}

.security-text {
  font-size: 13px;
  color: #475569;
  margin: 0;
  line-height: 1.5;
}

/* ==================== FOOTER STYLES ==================== */

.payment-footer {
  --background: #ffffff;
  border-top: 1px solid #e8e8e8;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

.footer-toolbar {
  --background: #ffffff;
  --border-color: transparent;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: auto;
  display: flex;
  justify-content: center;
  width: 100%;
}

.footer-content {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 0 16px;
}

.cancel-btn {
  --padding-start: 16px;
  --padding-end: 16px;
  --border-color: #e8e8e8;
  color: #666 !important;
  flex: 0 0 100px;
}

.pay-btn {
  flex: 1;
}

.pay-btn:disabled {
  opacity: 0.5;
}

/* ==================== RESPONSIVE DESIGN ==================== */

@media (max-width: 424px) {
  .summary-section {
    padding: 12px;
  }

  .methods-section {
    padding: 16px 12px;
  }

  .security-section {
    padding: 12px;
  }

  .method-item {
    margin-bottom: 10px;
  }

  .footer-content {
    flex-direction: column-reverse;
  }

  .cancel-btn {
    flex: 1;
  }
}

@media (min-width: 425px) and (max-width: 768px) {
  .footer-content {
    gap: 16px;
  }

  .cancel-btn {
    flex: 0 0 120px;
  }
}

@media (min-width: 769px) {
  .payment-content {
    padding: 0 auto !important;
  }

  .summary-section {
    padding: 24px auto;
    display: flex;
    justify-content: center;
  }

  .summary-card {
    max-width: 700px;
    width: 100%;
  }

  .methods-section {
    padding: 24px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .methods-section h3 {
    max-width: 700px;
    width: 100%;
  }

  .payment-methods {
    max-width: 700px;
    width: 100%;
  }

  .security-section {
    padding: 24px auto;
    display: flex;
    justify-content: center;
  }

  .security-card {
    max-width: 700px;
    width: 100%;
  }

  .footer-toolbar {
    --padding-start: 24px;
    --padding-end: 24px;
    display: flex;
    justify-content: center;
  }

  .footer-content {
    max-width: 700px;
    width: 100%;
    padding: 0 24px;
  }
}
</style>