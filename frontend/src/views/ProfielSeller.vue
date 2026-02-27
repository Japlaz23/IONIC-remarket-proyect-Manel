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

    <ion-content class="ion-padding">
      <ion-card v-if="seller">
        <ion-card-header class="seller-profile-header">
          <div class="seller-profile-row">
            <img v-if="seller?.avatar" :src="seller.avatar" alt="Foto de perfil" class="seller-avatar-large" />
            <div class="seller-profile-info">
              <h2>{{ seller.name }}</h2>
              <div class="seller-rating">
                <span v-html="stars"></span>
                <span>{{ averageRating }} ({{ reviewsCount }})</span>
              </div>
              <div class="seller-meta">
                <span>{{ salesCount }} ventas · {{ purchasesCount }} compras</span>
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
            <div v-if="sellerProducts.length > 0" class="products-grid">
              <ion-card v-for="product in sellerProducts" :key="product.id" class="product-card product-card-compact">
                <div class="product-card-row">
                  <img :src="product.image" :alt="product.title" class="product-img-compact" />
                  <div class="product-info-compact">
                    <div class="product-title-compact">{{ product.title }}</div>
                    <div class="product-price-compact">{{ product.price }}€</div>
                  </div>
                </div>
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
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonSegment, IonSegmentButton } from '@ionic/vue';
import 'leaflet/dist/leaflet.css';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useSellerStore } from '@/stores/sellerStore';
import { useReviewStore } from '@/stores/reviewStore';

const lat = 41.3851; // ejemplo: latitud de Barcelona
const lng = 2.1734;  // ejemplo: longitud de Barcelona

const route = useRoute()
const router = useRouter()
const activeTab = ref('productos')
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

const sellerProducts = computed(() =>
  store.products.filter(p => String(p.sellerId) === String(sellerId.value))
)
const salesCount = computed(() => sellerProducts.value.length)
const purchasesCount = computed(() => 25) // Simulado, pon aquí el dato real si lo tienes

const mapUrl = computed(() =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(seller.value?.location || '')}`
)
</script>

<style scoped>
.seller-profile-header {
  padding: 0 0 8px 0;
}
.seller-profile-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
}
.seller-avatar-large {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 2px solid #e5e7eb;
}
.seller-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.seller-rating {
  font-size: 1em;
  color: #f5b301;
  line-height: 1.1;
}
.seller-meta {
  font-size: 0.85em;
  color: #666;
  line-height: 1.1;
}
.seller-location {
  font-size: 0.9em;
  color: #222;
}
.ion-card-header {
  padding: 12px 16px 8px 16px !important;
}
.ion-card-content {
  padding: 10px 14px 14px 14px !important;
}
.seller-segment {
  margin: 10px 0 6px 0;
}
.tab-content {
  margin-top: 6px;
}
.products-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-card {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 0;
  margin: 0;
}
.product-card-compact {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15,23,42,0.07);
  padding: 0;
  margin: 0;
  background: linear-gradient(90deg, #f8fafc 80%, #e6f4ea 100%);
  transition: box-shadow 0.18s, transform 0.18s;
  cursor: pointer;
  border: 1px solid #e3e8ef;
}
.product-card-compact:hover {
  box-shadow: 0 6px 18px rgba(26,127,52,0.10);
  transform: translateY(-2px) scale(1.012);
  background: linear-gradient(90deg, #e6f4ea 60%, #f8fafc 100%);
}
.product-card-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
}
.product-img {
  height: 90px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}
.product-img-compact {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #e6f4ea;
  box-shadow: 0 2px 8px rgba(15,23,42,0.06);
  background: #fff;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.product-title {
  font-size: 1em;
  font-weight: 600;
  color: #222;
  line-height: 1.1;
}
.product-price {
  font-size: 1em;
  margin-top: 2px;
}
.product-price-compact {
  color: #1a7f34;
  font-weight: 700;
  font-size: 1em;
  margin-top: 2px;
  letter-spacing: 0.5px;
}
.empty-state {
  padding: 12px 0;
}
.review-item {
  border-radius: 7px;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
}
.review-header {
  margin-bottom: 2px;
}
.info-section {
  gap: 6px;
  margin-top: 2px;
}
.info-row {
  gap: 4px;
  align-items: center;
}
.info-label {
  min-width: 70px;
  font-size: 0.97em;
}
.info-value {
  color: #334155;
}
.map-frame {
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.map-embed {
  width: 100%;
  height: 120px;
  border: 0;
  border-radius: 8px;
}
</style>