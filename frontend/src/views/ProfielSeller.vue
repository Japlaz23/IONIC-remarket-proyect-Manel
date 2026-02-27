<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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
      </ion-card>
      <!-- Aquí puedes mostrar los productos del vendedor si quieres -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader } from '@ionic/vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useSellerStore } from '@/stores/sellerStore';
import { useReviewStore } from '@/stores/reviewStore';

const lat = 41.3851; // ejemplo: latitud de Barcelona
const lng = 2.1734;  // ejemplo: longitud de Barcelona

const route = useRoute()
const router = useRouter()
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
/* Nueva estructura para fila */
.seller-profile-header {
  padding: 0;
}
.seller-profile-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}
.seller-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.seller-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 0;
  margin-right: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.seller-rating {
  font-size: 1.2em;
  color: #f5b301;
}
.seller-meta {
  font-size: 0.9em;
  color: #666;
}
.seller-location {
  font-size: 0.95em;
  color: #222;
}
</style>