<template>
  <ion-page>
    <!-- ================= HEADER ================= -->
    <ion-header>
      <ion-toolbar>
        <ion-title>ReMarket</ion-title>
      </ion-toolbar>

      <!-- ===== BARRA DE CATEGORÍAS ===== -->
      <ion-toolbar>
        <ion-segment
          :value="productStore.selectedCategory"
          scrollable
          @ionChange="handleSegmentChange"
        >
          <ion-segment-button
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <!-- ================= CONTENIDO ================= -->
    <ion-content class="ion-padding">

      <div class="flex">

        <!-- ===== PANEL IZQUIERDO (solo desktop) ===== -->
        <div
          v-if="productStore.selectedCategory"
          class="hidden lg:block w-64 mr-6"
        >
          <FiltersMenu />
        </div>

        <!-- ===== GRID PRODUCTOS ===== -->
        <div class="flex-1">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ion-card
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              @click="goToProductDetail(product.id)"
              class="cursor-pointer"
            >
              <ion-img
                :src="product.image"
                :alt="product.title"
                class="h-40 object-cover"
              />

              <ion-card-header>
                <ion-card-title>
                  {{ product.title }}
                </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <div class="font-bold text-green-600">
                  {{ product.price }} €
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <!-- Mensaje si no hay productos -->
          <div
            v-if="productStore.filteredProducts.length === 0"
            class="text-center mt-10 text-gray-500"
          >
            No hay productos en esta categoría
          </div>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from '@ionic/vue'

import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import FiltersMenu from '@/components/menus/menuFilters.vue'
import { categories } from '@/utils/constants'

const router = useRouter()
const productStore = useProductStore()

// Cambiar categoría desde segment
function handleSegmentChange(event: CustomEvent) {
  const value = event.detail.value as string
  productStore.selectedCategory = value
}

// Ir a detalle
function goToProductDetail(id: number) {
  router.push({
    name: 'ProductDetail',
    params: { id }
  })
}
</script>