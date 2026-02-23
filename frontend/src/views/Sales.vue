<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Mis Publicaciones</ion-title>
        <ion-buttons slot="end" v-if="salesList.length > 0">
          <ion-badge>{{ salesList.length }}</ion-badge>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="sales-content">
      <!-- Estado vacío -->
      <div v-if="salesList.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h2>Sin publicaciones</h2>
        <p>No has publicado ningún producto aún</p>
        <ion-button expand="block" color="success" @click="goToSell" class="create-btn">
          <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
          Crear Publicación
        </ion-button>
      </div>

      <!-- Lista de productos en venta -->
      <div v-else class="sales-container">
        <!-- Filtros y acciones -->
        <div class="sales-header">
          <div class="sales-stats">
            <div class="stat-card">
              <div class="stat-label">Activos</div>
              <div class="stat-value">{{ activeSales }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Vendidos</div>
              <div class="stat-value">{{ soldSales }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total vistas</div>
              <div class="stat-value">{{ totalViews }}</div>
            </div>
          </div>
          <ion-button expand="block" color="success" @click="goToSell" class="create-btn">
            <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
            Nuevo Anuncio
          </ion-button>
        </div>

        <!-- Filtros -->
        <div class="filter-group">
          <ion-segment v-model="filterStatus" @ionChange="filterSales">
            <ion-segment-button value="all">
              <ion-label>Todos</ion-label>
            </ion-segment-button>
            <ion-segment-button value="active">
              <ion-label>Activos</ion-label>
            </ion-segment-button>
            <ion-segment-button value="sold">
              <ion-label>Vendidos</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>

        <!-- Producto cards -->
        <div class="sales-grid">
          <div v-for="product in filteredSales" :key="product.id" class="sale-card">
            <div class="sale-image-wrapper">
              <img :src="product.image" :alt="product.title" class="sale-image" />
              <div class="sale-status" :class="'status-' + product.status">
                {{ product.status === 'active' ? 'Activo' : 'Vendido' }}
              </div>
              <div class="sale-price">€{{ product.price.toFixed(2) }}</div>
            </div>

            <div class="sale-info">
              <h3 class="sale-title">{{ product.title }}</h3>
              <p class="sale-category">{{ product.category }}</p>
              <div class="sale-meta">
                <span class="meta-item">
                  <ion-icon :icon="eyeOutline"></ion-icon>
                  {{ product.views }}
                </span>
                <span class="meta-item">
                  <ion-icon :icon="chatbubbleOutline"></ion-icon>
                  {{ product.messages }}
                </span>
              </div>

              <div v-if="product.status === 'active'" class="sale-actions">
                <ion-button size="small" fill="outline" @click="editProduct(product)">
                  <ion-icon slot="start" :icon="pencilOutline"></ion-icon>
                  Editar
                </ion-button>
                <ion-button size="small" fill="outline" color="danger" @click="deleteSale(product.id)">
                  <ion-icon slot="start" :icon="trashOutline"></ion-icon>
                  Eliminar
                </ion-button>
              </div>

              <div v-if="product.status === 'sold' && product.soldDate" class="sold-info">
                <p class="sold-date">Vendido hace {{ formatDate(product.soldDate) }}</p>
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
  alertController,
} from '@ionic/vue'
import {
  addCircleOutline,
  eyeOutline,
  chatbubbleOutline,
  pencilOutline,
  trashOutline,
} from 'ionicons/icons'
interface SaleProduct {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  images: string[]
  status: 'active' | 'sold'
  views: number
  messages: number
  createdDate: string
  soldDate?: string
}

const router = useRouter()
const filterStatus = ref('all')

// Datos de ejemplo - en un caso real virían de la base de datos
const salesList = ref<SaleProduct[]>([
  {
    id: 1,
    title: 'iPhone 13 Pro',
    description: 'iPhone 13 Pro en perfecto estado',
    price: 799,
    category: 'Electrónica',
    image: '/placeholder.svg',
    images: ['/placeholder.svg'],
    status: 'active',
    views: 245,
    messages: 12,
    createdDate: '2026-02-10',
  },
  {
    id: 2,
    title: 'Samsung Galaxy Watch',
    description: 'Reloj inteligente como nuevo',
    price: 199,
    category: 'Electrónica',
    image: '/placeholder.svg',
    images: ['/placeholder.svg'],
    status: 'sold',
    views: 189,
    messages: 8,
    createdDate: '2026-01-25',
    soldDate: '2026-02-15',
  },
  {
    id: 3,
    title: 'Nike Air Max',
    description: 'Zapatillas deportivas talla 42',
    price: 85,
    category: 'Moda',
    image: '/placeholder.svg',
    images: ['/placeholder.svg'],
    status: 'active',
    views: 156,
    messages: 5,
    createdDate: '2026-02-08',
  },
])

const filteredSales = computed(() => {
  if (filterStatus.value === 'all') return salesList.value
  return salesList.value.filter((s) => s.status === filterStatus.value)
})

const activeSales = computed(() => {
  return salesList.value.filter((s) => s.status === 'active').length
})

const soldSales = computed(() => {
  return salesList.value.filter((s) => s.status === 'sold').length
})

const totalViews = computed(() => {
  return salesList.value.reduce((sum, s) => sum + s.views, 0)
})

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `${diffDays} días`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas`
  return `${Math.floor(diffDays / 30)} meses`
}

const goToSell = () => {
  router.push('/sell')
}

const editProduct = (product: SaleProduct) => {
  router.push(`/product-detail/${product.id}`)
}

const filterSales = () => {
  // Ya se filtra con el computed
}

const deleteSale = async (id: number) => {
  const alert = await alertController.create({
    header: 'Eliminar publicación',
    message: '¿Estás seguro de que quieres eliminar este anuncio?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          salesList.value = salesList.value.filter((s) => s.id !== id)

          toastController
            .create({
              message: '✓ Anuncio eliminado correctamente',
              duration: 2000,
              color: 'success',
            })
            .then((t) => t.present())
        },
      },
    ],
  })
  await alert.present()
}
</script>

<style scoped>
.sales-content {
  --background: #f5f7fa;
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
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
}

.create-btn {
  width: 100%;
  max-width: 280px;
}

.sales-container {
  padding: 16px;
  max-width: 100%;
}

.sales-header {
  margin-bottom: 24px;
}

.sales-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.stat-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a7f34;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group ion-segment {
  --background: white;
}

.sales-grid {
  display: grid;
  gap: 16px;
}

.sale-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.sale-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.sale-image-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f0f0f0;
}

.sale-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sale-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.status-active {
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
}

.status-sold {
  background: #999;
}

.sale-price {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  color: #1a7f34;
  font-size: 14px;
}

.sale-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sale-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sale-category {
  font-size: 12px;
  color: #999;
  margin: 0 0 10px 0;
}

.sale-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-item ion-icon {
  font-size: 14px;
  color: #1a7f34;
}

.sale-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.sale-actions ion-button {
  flex: 1;
}

.sold-info {
  padding-top: 12px;
  border-top: 1px solid #e5e5e5;
}

.sold-date {
  font-size: 12px;
  color: #999;
  margin: 0;
  font-style: italic;
}

/* Responsive */
@media (min-width: 520px) {
  .sales-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .sales-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sales-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
