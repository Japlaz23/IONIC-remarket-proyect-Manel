<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-white">
      <section class="max-w-2xl mx-auto py-6 px-2">
        <h2 class="text-xl font-bold mb-4 text-green-900">Productos en tu carrito</h2>
        <div v-if="cartProducts.length === 0" class="text-gray-500 text-center py-8">
          No hay productos en el carrito.
        </div>
        <div v-else class="space-y-4">
          <div v-for="product in cartProducts" :key="product.id" class="flex items-center gap-4 border-b pb-4">
            <ion-img :src="product.image" :alt="product.title" class="w-20 h-20 object-cover rounded-lg border" />
            <div class="flex-1">
              <div class="font-semibold text-green-900">{{ product.title }}</div>
              <div class="text-green-700 font-bold text-lg">{{ product.price }} €</div>
            </div>
            <ion-button color="danger" @click="removeFromCart(product.id)">
              <ion-icon :icon="trashOutline" />
            </ion-button>
          </div>
        </div>
        <div v-if="cartProducts.length > 0" class="mt-8 flex justify-between items-center">
          <span class="font-bold text-xl text-green-900">Total: {{ cartTotal }} €</span>
          <ion-button color="success" @click="checkout">Comprar</ion-button>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonIcon } from '@ionic/vue'
import { trashOutline } from 'ionicons/icons'
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'

const productStore = useProductStore()
const cartStore = useCartStore()

const cartProducts = computed(() => cartStore.products.map(id => productStore.getProductById(id)).filter(Boolean))
const cartTotal = computed(() => cartProducts.value.reduce((sum, p) => sum + p.price, 0))

function removeFromCart(id) {
  cartStore.removeProduct(id)
}

function checkout() {
  // Aquí iría la lógica de compra
  alert('¡Compra realizada!')
  cartStore.clearCart()
}
</script>

<style scoped>
section {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>
