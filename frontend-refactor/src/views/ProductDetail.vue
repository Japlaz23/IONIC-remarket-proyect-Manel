<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs"></ion-back-button>
        </ion-buttons>
        <ion-title>Detalles del producto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-white">
      <section class="max-w-2xl mx-auto py-6 px-2">
        <div v-if="!product">
          <div class="text-gray-500 text-center py-8">Producto no encontrado.</div>
        </div>
        <div v-else>
          <!-- Carrusel de productos del vendedor -->
          <swiper
            :slidesPerView="1"
            :pagination="{ clickable: true }"
            :navigation="true"
            :loop="true"
            :modules="modules"
            class="product-swiper mb-4"
            style="height: 230px;"
          >
            <swiper-slide v-for="prod in sellerProducts" :key="prod.id">
              <div @click="goToProductDetail(prod.id)" class="cursor-pointer">
                <ion-img :src="prod.images[0]" :alt="prod.title" class="w-full h-56 object-cover rounded-xl" />
                <div class="text-center mt-2 text-green-900 font-bold">{{ prod.title }}</div>
                <div class="text-center text-green-700">{{ prod.price }} €</div>
              </div>
            </swiper-slide>
          </swiper>


          <!-- Título y precio -->
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-2xl font-bold text-green-900">{{ product.title }}</h2>
            <span class="text-xl font-bold text-green-700">{{ product.price }} €</span>
          </div>

          <!-- Descripción y detalles -->
          <div class="mb-4">
            <div class="text-gray-700 mb-2">{{ product.description }}</div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
              <span><b>Estado:</b> {{ product.condition }}</span>
              <span v-if="product.brand"><b>Marca:</b> {{ product.brand }}</span>
              <span><b>Categoría:</b> {{ product.category }}</span>
              <span><b>Publicado:</b> {{ product.createdAt.toLocaleDateString() }}</span>
            </div>
          </div>

          <!-- Perfil del vendedor -->
          <div class="mb-6 p-4 bg-green-50 rounded-lg flex items-center gap-4">
            <ion-img src="/profile-placeholder.png" class="w-14 h-14 rounded-full border" />
            <div>
              <div class="font-bold text-green-900">{{ seller.name }}</div>
              <div class="text-xs text-gray-500">Ubicación: {{ product.location }}</div>
              <div class="text-xs text-gray-500">Valoración: {{ sellerRating }} ⭐</div>
            </div>
            <ion-button color="primary" @click="openChat">Chat</ion-button>
          </div>

          <!-- Mapa de ubicación -->
          <div class="mb-6">
            <iframe
              v-if="product.location"
              :src="mapUrl"
              width="100%"
              height="200"
              style="border:0;border-radius:1rem;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>

          <!-- Valoraciones de otros compradores -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2 text-green-900">Valoraciones del vendedor</h3>
            <div v-if="reviews.length === 0" class="text-gray-400">Este vendedor aún no tiene valoraciones.</div>
            <div v-else class="space-y-3">
              <div v-for="review in reviews" :key="review.id" class="bg-gray-50 rounded-lg p-3 border">
                <div class="font-semibold text-green-800">{{ review.author }}</div>
                <div class="text-xs text-gray-500 mb-1">{{ review.date.toLocaleDateString() }}</div>
                <div class="text-sm text-gray-700">{{ review.text }}</div>
                <div class="text-yellow-500">{{ '⭐'.repeat(review.rating) }}</div>
              </div>
            </div>

            <!-- Botón para añadir reseña -->
            <div class="mt-4 flex justify-end">
              <ion-button color="primary" @click="showReviewModal = true">Añadir reseña</ion-button>
            </div>
            <ion-modal :is-open="showReviewModal" @didDismiss="showReviewModal = false">
              <section class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
                <h4 class="text-lg font-bold mb-4 text-green-900">Escribe tu reseña</h4>
                <div class="mb-3">
                  <label class="block mb-1 text-sm font-semibold">Valoración</label>
                  <select v-model="newReviewRating" class="w-full border rounded p-2">
                    <option value="5">5 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="2">2 estrellas</option>
                    <option value="1">1 estrella</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="block mb-1 text-sm font-semibold">Comentario</label>
                  <textarea v-model="newReviewText" class="w-full border rounded p-2" rows="3" placeholder="Escribe tu opinión..."></textarea>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                  <ion-button @click="showReviewModal = false" color="medium">Cancelar</ion-button>
                  <ion-button @click="submitReview" color="success">Enviar</ion-button>
                </div>
              </section>
            </ion-modal>
          </div>

          <!-- Botón de comprar -->
          <div class="flex justify-end mt-8">
            <ion-button color="success" @click="buyProduct">Comprar</ion-button>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
const showReviewModal = ref(false)
const newReviewRating = ref(5)
const newReviewText = ref('')

function submitReview() {
  if (!product.value || !seller.value) return
  reviewStore.addReview(
    product.value.id,
    seller.value.id,
    'Usuario', // Cambia por el nombre real del usuario si tienes auth
    0, // Cambia por el id real del usuario si tienes auth
    newReviewRating.value,
    newReviewText.value
  )
  showReviewModal.value = false
  newReviewRating.value = 5
  newReviewText.value = ''
}
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
const modules = [Pagination, Navigation]
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonBackButton } from '@ionic/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useSellerStore } from '../stores/sellerStore'
import { useReviewStore } from '../stores/reviewStore'

const route = useRoute()
const productStore = useProductStore()
const sellerStore = useSellerStore()
const reviewStore = useReviewStore()

const productId = computed(() => Number(route.params.id))
const product = computed(() => productStore.getProductById(productId.value))
const seller = computed(() => sellerStore.getSellerById(product.value?.sellerId))
const reviews = computed(() => reviewStore.getReviewsBySeller(product.value?.sellerId))

const sellerRating = computed(() => {
  if (!reviews.value.length) return 'Sin valoraciones'
  const avg = reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length
  return avg.toFixed(1)
})

const mapUrl = computed(() => {
  if (!product.value?.location) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(product.value.location)}&output=embed`
})

function openChat() {
  // Lógica para abrir chat con el vendedor
  alert('Abrir chat con el vendedor')
}

function buyProduct() {
  // Lógica para comprar el producto
  alert('¡Producto comprado!')
}

const sellerProducts = computed(() => {
  if (!product.value) return []

  const sellerId = product.value.sellerId

  return productStore
    .getProductsBySeller(sellerId)
    .filter(p => p.id !== product.value?.id)
})

import { useRouter } from 'vue-router';
const router = useRouter();
function goToProductDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
}
</script>

<style scoped>
section {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>
