<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="remarket-green">
        <ion-buttons slot="start">
          <ion-back-button default-href="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Mis Compras</ion-title>
        <ion-buttons slot="end" v-if="purchasesList.length > 0">
          <ion-badge>{{ purchasesList.length }}</ion-badge>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="purchases-content">
      <!-- Estado vacío -->
      <div v-if="purchasesList.length === 0" class="empty-state">
        <div class="empty-icon">🛍️</div>
        <h2>Sin compras</h2>
        <p>No has realizado ninguna compra aún</p>
        <ion-button expand="block" color="remarket-green" @click="goToHome" class="explore-btn">
          <ion-icon slot="start" :icon="storefrontOutline"></ion-icon>
          Explorar Productos
        </ion-button>
      </div>

      <!-- Lista de compras -->
      <div v-else class="purchases-container">
        <!-- Filtros -->
        <div class="filter-group">
          <ion-segment v-model="filterStatus" @ionChange="filterPurchases">
            <ion-segment-button value="all">
              <ion-label>Todos</ion-label>
            </ion-segment-button>
            <ion-segment-button value="pending">
              <ion-label>Pendientes</ion-label>
            </ion-segment-button>
            <ion-segment-button value="delivered">
              <ion-label>Entregados</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>

        <!-- Compras agrupadas -->
        <div class="purchases-list">
          <div v-for="purchase in filteredPurchases" :key="purchase.id" class="purchase-card">
            <div class="purchase-header">
              <div class="purchase-info">
                <h3 class="purchase-product">{{ purchase.productTitle }}</h3>
                <p class="purchase-seller">Vendedor: <strong>{{ purchase.seller }}</strong></p>
                <p class="purchase-date">{{ formatDate(purchase.purchaseDate) }}</p>
              </div>
              <div class="purchase-price">
                <span class="price">€{{ purchase.totalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <div class="purchase-status" :class="'status-' + purchase.status">
              <ion-icon :icon="getStatusIcon(purchase.status)"></ion-icon>
              <span>{{ getStatusLabel(purchase.status) }}</span>
            </div>

            <div class="purchase-details">
              <div class="detail-item">
                <span class="detail-label">Cantidad:</span>
                <span class="detail-value">{{ purchase.quantity }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Precio unitario:</span>
                <span class="detail-value">€{{ purchase.unitPrice.toFixed(2) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Entrega:</span>
                <span class="detail-value">{{ purchase.shippingMethod }}</span>
              </div>
            </div>

            <div class="purchase-actions">
              <ion-button size="small" fill="outline" @click="viewDetails(purchase)">
                <ion-icon slot="start" :icon="eyeOutline"></ion-icon>
                Ver Detalles
              </ion-button>

              <ion-button 
                size="small" 
                fill="outline" 
                @click="contactSeller" 
                v-if="purchase.status === 'pending'"
              >
                <ion-icon slot="start" :icon="chatbubbleOutline"></ion-icon>
                Contactar
              </ion-button>

              <ion-button 
                size="small" 
                fill="outline" 
                @click="leaveReview" 
                v-if="purchase.status === 'delivered' && !purchase.reviewed"
              >
                <ion-icon slot="start" :icon="starOutline"></ion-icon>
                Reseña
              </ion-button>

              <div v-if="purchase.reviewed" class="review-badge">
                ⭐ Reseña dejada
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  toastController,
} from '@ionic/vue'
import {
  storefrontOutline,
  eyeOutline,
  chatbubbleOutline,
  starOutline,
  hourglass,
  checkmarkDone,
} from 'ionicons/icons'

interface Purchase {
  id: number
  productTitle: string
  seller: string
  status: 'pending' | 'delivered'
  purchaseDate: string
  quantity: number
  unitPrice: number
  totalPrice: number
  shippingMethod: string
  reviewed: boolean
  trackingNumber?: string
}

const router = useRouter()
const filterStatus = ref('all')

// Datos de ejemplo
const purchasesList = ref<Purchase[]>([
  {
    id: 1,
    productTitle: 'MacBook Air M1',
    seller: 'TechStore',
    status: 'delivered',
    purchaseDate: '2026-02-05',
    quantity: 1,
    unitPrice: 999,
    totalPrice: 999,
    shippingMethod: 'Correo Certificado',
    reviewed: true,
  },
  {
    id: 2,
    productTitle: 'Auriculares Sony WH-1000XM4',
    seller: 'AudioPro',
    status: 'pending',
    purchaseDate: '2026-02-12',
    quantity: 1,
    unitPrice: 349,
    totalPrice: 349,
    shippingMethod: 'Envío Exprés',
    reviewed: false,
    trackingNumber: 'ES123456789',
  },
  {
    id: 3,
    productTitle: 'Zapatillas Nike Running',
    seller: 'SportWorld',
    status: 'delivered',
    purchaseDate: '2026-01-28',
    quantity: 2,
    unitPrice: 89.99,
    totalPrice: 179.98,
    shippingMethod: 'Recogida en tienda',
    reviewed: false,
  },
])

const filteredPurchases = computed(() => {
  if (filterStatus.value === 'all') return purchasesList.value
  return purchasesList.value.filter((p) => p.status === filterStatus.value)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusIcon = (status: string) => {
  if (status === 'pending') return hourglass
  if (status === 'delivered') return checkmarkDone
  return hourglass
}

const getStatusLabel = (status: string) => {
  if (status === 'pending') return 'Pendiente de entrega'
  if (status === 'delivered') return 'Entregado'
  return status
}

const goToHome = () => {
  router.push('/tabs/home')
}

const viewDetails = (purchase: Purchase) => {
  toastController
    .create({
      message: `Detalles de ${purchase.productTitle}`,
      duration: 2000,
    })
    .then((t) => t.present())
}

const contactSeller = () => {
  router.push('/tabs/chat')
}

const leaveReview = () => {
  toastController
    .create({
      message: 'Abriendo formulario de reseña...',
      duration: 2000,
    })
    .then((t) => t.present())
}

const filterPurchases = () => {
  // Ya se filtra con el computed
}
</script>

<style scoped>
.purchases-content {
  --background: var(--background-color);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 60vh;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: var(--text-secondary-color);
  margin: 0 0 20px 0;
}

.explore-btn {
  width: 100%;
  max-width: 280px;
}

.purchases-container {
  padding: 16px;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group ion-segment {
  --background: var(--background-color);
}

.purchases-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.purchase-card {
  background: var(--background-color);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.purchase-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.purchase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
}

.purchase-info {
  flex: 1;
}

.purchase-product {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0 0 6px 0;
}

.purchase-seller {
  font-size: 13px;
  color: var(--text-secondary-color);
  margin: 0 0 4px 0;
}

.purchase-date {
  font-size: 12px;
  color: var(--border-color);
  margin: 0;
}

.purchase-price {
  text-align: right;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.purchase-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
}

.status-pending {
  background: rgba(255, 193, 7, 0.1);
  color: #f57f17;
}

.status-delivered {
  background: rgba(26, 127, 52, 0.1);
  color: var(--primary-color);
}

.purchase-status ion-icon {
  font-size: 16px;
}

.purchase-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 11px;
  color: var(--border-color);
  font-weight: 600;
  text-transform: uppercase;
}

.detail-value {
  font-size: 13px;
  color: var(--primary-color);
  font-weight: 600;
}

.purchase-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.purchase-actions ion-button {
  flex: 1;
  min-width: 110px;
}

.review-badge {
  padding: 6px 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffc700 100%);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 520px) {
  .purchase-header {
    flex-direction: column;
    gap: 8px;
  }

  .purchase-price {
    text-align: left;
  }

  .purchase-details {
    grid-template-columns: repeat(2, 1fr);
  }

  .purchase-actions {
    gap: 6px;
  }

  .purchase-actions ion-button {
    min-width: auto;
    font-size: 12px;
  }
}
</style>
