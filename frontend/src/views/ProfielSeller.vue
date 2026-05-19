<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button :default-href="backHref"></ion-back-button>
        </ion-buttons>
        <ion-title>Perfil Vendedor</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding seller-content">
      <ion-card v-if="seller" class="seller-profile-card">
        <ion-card-header class="seller-profile-header">
          <div class="seller-profile-row">
            <div class="seller-avatar-wrap">
              <img :src="seller?.avatar || defaultAvatar" alt="" class="seller-avatar-large" @error="onAvatarError" />
              <div v-if="avatarError" class="seller-avatar-fallback">{{ sellerInitials }}</div>
            </div>
            <div class="seller-profile-info">
              <h2>{{ seller.name }}</h2>
              <p class="seller-subtitle">Perfil de vendedor</p>
              <div class="seller-rating">
                <span v-html="stars"></span>
                <span>{{ averageRating }} ({{ reviewsCount }})</span>
              </div>
              <div class="seller-meta-grid">
                <div class="seller-stat-box">
                  <strong>{{ salesCount }}</strong>
                  <span>Ventas</span>
                </div>
                <div class="seller-stat-box">
                  <strong>{{ reviewsCount }}</strong>
                  <span>Valoraciones</span>
                </div>
                <div class="seller-stat-box">
                  <strong>{{ purchasesCount }}</strong>
                  <span>Compras</span>
                </div>
              </div>
            </div>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-segment v-model="activeTab" value="productos" class="seller-segment">
            <ion-segment-button value="productos">Productos</ion-segment-button>
            <ion-segment-button value="valoraciones">Valoraciones</ion-segment-button>
            <ion-segment-button value="info">Info</ion-segment-button>
          </ion-segment>

          <div v-if="activeTab === 'productos'" class="tab-content">
            <div class="tab-header">
              <span class="tab-header-count">{{ sellerProducts.length }} productos</span>
              <ion-buttons class="compact-toggle">
                <ion-button :class="{ active: !compactView }" size="small" @click="compactView = false">
                  <ion-icon :icon="gridOutline" />
                </ion-button>
                <ion-button :class="{ active: compactView }" size="small" @click="compactView = true">
                  <ion-icon :icon="listOutline" />
                </ion-button>
              </ion-buttons>
            </div>
            <div v-if="sellerProducts.length > 0" :class="compactView ? 'products-list' : 'products-grid'">
              <ion-card v-for="product in sellerProducts" :key="product.id" :class="compactView ? 'seller-product-card-compact' : 'seller-product-card'">
                <template v-if="compactView">
                  <div class="compact-image-container">
                    <img :src="product.image" :alt="product.title" class="compact-image" />
                  </div>
                  <div class="compact-info">
                    <div class="compact-title">{{ product.title }}</div>
                    <div class="compact-meta">
                      <span class="seller-product-price">{{ product.price }}€</span>
                      <span class="seller-product-location">{{ product.location }}</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="seller-product-image-container">
                    <img :src="product.image" :alt="product.title" class="seller-product-image" />
                  </div>
                  <div class="seller-product-title">{{ product.title }}</div>
                  <div class="seller-product-meta">
                    <span class="seller-product-price">{{ product.price }}€</span>
                    <span class="seller-product-location">{{ product.location }}</span>
                  </div>
                </template>
              </ion-card>
            </div>
            <div v-else class="empty-state">Este vendedor no tiene productos publicados.</div>
          </div>

          <div v-else-if="activeTab === 'valoraciones'" class="tab-content">
            <div v-if="reviews.length > 0" class="reviews-list">
              <div v-for="review in reviews" :key="review.id" class="review-item">
                <div class="review-header">
                  <span class="review-author">{{ review.author }}</span>
                  <span class="review-date">{{ review.date }}</span>
                  <span class="review-stars">{{ reviewStore.ratingToStars(review.rating) }}</span>
                </div>
                <div class="review-text">{{ review.text }}</div>
              </div>
            </div>
            <div v-else class="empty-state">Este vendedor aún no tiene valoraciones.</div>
          </div>

          <div v-else-if="activeTab === 'info'" class="tab-content">
            <div class="info-section">
              <div class="info-row">
                <span class="info-label">Ubicación:</span>
                <span class="info-value">{{ seller.location }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ seller.email || 'No disponible' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Teléfono:</span>
                <span class="info-value">{{ seller.phone || 'No disponible' }}</span>
              </div>
              <div class="map-frame">
                <iframe
                  class="map-embed"
                  :src="mapUrl"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Ubicación del vendedor"
                ></iframe>
              </div>
              <div class="info-actions">
                <ion-button color="danger" expand="block" @click="logout">Cerrar sesión</ion-button>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonSegment, IonSegmentButton, IonIcon, IonButton } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { toastController } from '@ionic/vue';
import { gridOutline, listOutline } from 'ionicons/icons';
import defaultAvatar from '@/assets/img/profilesSellers/profileSeller1.jpg';
import { useProductStore } from '@/stores/productStore';
import { useSellerStore } from '@/stores/sellerStore';
import { useReviewStore } from '@/stores/reviewStore';


const route = useRoute()
const activeTab = ref('productos')
const compactView = ref(false)
const avatarError = ref(false)
const onAvatarError = () => { avatarError.value = true }
// Si se llega desde un producto, se pasa el productId por query
const backHref = computed(() => {
  const productId = route.query.productId;
  if (productId) {
    return `/product/${productId}`;
  }
  return '/tabs/home';
});
const store = useProductStore()
const sellerStore = useSellerStore()
const reviewStore = useReviewStore()

const sellerId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const seller = computed(() => sellerStore.getSellerById(sellerId.value))

const reviews = computed(() => reviewStore.getReviewsBySeller(Number(sellerId.value)))
const averageRating = computed(() =>
  reviews.value.length ? reviewStore.getSellerAverageRating(Number(sellerId.value)) : '0'
)
const reviewsCount = computed(() => reviews.value.length)
const stars = computed(() => reviewStore.ratingToStars(Number(averageRating.value)))
const sellerInitials = computed(() => {
  const name = seller.value?.name?.trim() || ''
  if (!name) {
    return 'RV'
  }
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})

const sellerProducts = computed(() =>
  store.products.filter(p => String(p.sellerId) === String(sellerId.value))
)
const salesCount = computed(() => sellerProducts.value.length)
const purchasesCount = computed(() => 25) // Simulado, pon aquí el dato real si lo tienes

const mapCoords = ref({
  lat: 40.4168,
  lon: -3.7038,
})

const sellerLocation = computed(() => seller.value?.location?.trim() || 'Madrid')

const geocodeSellerLocation = async (location: string) => {
  if (!location) {
    return
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`,
      {
        headers: {
          'Accept-Language': 'es',
        },
      },
    )

    if (!response.ok) {
      return
    }

    const results = await response.json()
    const first = results?.[0]

    if (!first) {
      return
    }

    const lat = Number.parseFloat(first.lat)
    const lon = Number.parseFloat(first.lon)

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      mapCoords.value = { lat, lon }
    }
  } catch {
    // Keep default coords when geocoding fails.
  }
}

watch(
  sellerLocation,
  (location) => {
    geocodeSellerLocation(location)
  },
  { immediate: true },
)

const mapUrl = computed(() => {
  const { lat, lon } = mapCoords.value
  const delta = 0.03
  const left = (lon - delta).toFixed(6)
  const bottom = (lat - delta).toFixed(6)
  const right = (lon + delta).toFixed(6)
  const top = (lat + delta).toFixed(6)
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`
})

const router = useRouter()

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
.seller-content {
  --background: linear-gradient(180deg, #f3f7fb 0%, #eef3f8 100%);
}

.seller-profile-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.08);
}

.seller-profile-header {
  padding: 18px 18px 12px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf5f0 100%);
  border-bottom: 1px solid #e2e8f0;
}

.seller-profile-row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px;
}

.seller-avatar-wrap {
  flex: 0 0 auto;
}

.seller-avatar-large {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.18);
  border: 3px solid #ffffff;
}

.seller-avatar-fallback {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.18);
  border: 3px solid #ffffff;
}

.seller-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.seller-profile-info h2 {
  margin: 0;
  font-size: 1.45rem;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.seller-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

.seller-rating {
  font-size: 0.98rem;
  color: #f5b301;
  line-height: 1.2;
  font-weight: 600;
}

.seller-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 4px;
}

.seller-stat-box {
  background: #ffffff;
  border: 1px solid #dbe5ef;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.seller-stat-box strong {
  color: #1a7f34;
  font-size: 1rem;
  line-height: 1.1;
}

.seller-stat-box span {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
}

.seller-location {
  font-size: 0.9em;
  color: #222;
}

.ion-card-header {
  padding: 12px 16px 8px 16px !important;
}

.ion-card-content {
  padding: 14px !important;
}

.seller-segment {
  margin: 4px 0 10px;
  --background: #f1f5f9;
  border-radius: 12px;
  padding: 4px;
}

.tab-content {
  margin-top: 8px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.seller-product-card {
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e6ebf2;
  box-shadow: 0 3px 12px rgba(26, 127, 52, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  overflow: hidden;
}

.seller-product-card:hover {
  box-shadow: 0 12px 32px rgba(26, 127, 52, 0.18);
  transform: translateY(-4px) scale(1.02);
  border-color: #1a7f34;
}

.seller-product-image-container {
  width: 100%;
  height: 120px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.seller-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.seller-product-card:hover .seller-product-image {
  transform: scale(1.06);
}

.seller-product-title {
  padding: 10px 10px 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000;
  margin: 0;
  min-height: 2em;
  line-height: 1.2;
  letter-spacing: -0.3px;
}

.seller-product-meta {
  padding: 8px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78em;
  color: #64748b;
}

.seller-product-price {
  color: #1a7f34;
  font-weight: 800;
  font-size: 0.95em;
}

.seller-product-location {
  color: #94a3b8;
  font-size: 0.85em;
}
.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tab-header-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}
.compact-toggle {
  gap: 4px;
}
.compact-toggle ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --border-radius: 8px;
  --color: #94a3b8;
  font-size: 1.1rem;
  min-height: 32px;
}
.compact-toggle ion-button.active {
  --color: #1a7f34;
  --background: #e8f5e9;
}
.products-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.seller-product-card-compact {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e6ebf2;
  box-shadow: 0 2px 8px rgba(26, 127, 52, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  overflow: hidden;
  gap: 12px;
}
.seller-product-card-compact:hover {
  box-shadow: 0 8px 24px rgba(26, 127, 52, 0.14);
  transform: translateY(-2px);
  border-color: #1a7f34;
}
.compact-image-container {
  flex: 0 0 72px;
  width: 72px;
  height: 72px;
  overflow: hidden;
  background: #f8fafc;
}
.compact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.seller-product-card-compact:hover .compact-image {
  transform: scale(1.08);
}
.compact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 10px 10px 0;
  min-width: 0;
}
.compact-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.78em;
  color: #64748b;
}
.empty-state {
  padding: 16px;
  border-radius: 12px;
  border: 1px dashed #c9d7e8;
  background: #f8fbff;
  color: #64748b;
  font-weight: 600;
}

.review-item {
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  margin-bottom: 8px;
}

.review-header {
  margin-bottom: 4px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  align-items: center;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
}

.info-row {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
}

.info-label {
  min-width: 78px;
  font-size: 0.92rem;
  color: #64748b;
  font-weight: 700;
}

.info-value {
  color: #334155;
  font-weight: 600;
}

.map-frame {
  margin-top: 10px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #dbe5ef;
}

.map-embed {
  width: 100%;
  height: 180px;
  border: 0;
  border-radius: 12px;
}

@media (max-width: 720px) {
  .seller-profile-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .seller-profile-info {
    width: 100%;
  }

  .seller-meta-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .review-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }
}
</style>