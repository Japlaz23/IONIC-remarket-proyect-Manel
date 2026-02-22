<template>
  <div class="p-4">
    <h3 class="text-lg font-bold mb-2 text-green-900">Filtrar productos</h3>

    <!-- Filtro por precio -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Precio máximo (€)</label>
      <input type="range" min="0" max="1000" step="10" v-model="price" class="w-full">
      <div class="text-sm text-gray-600">Hasta: {{ price }} €</div>
    </div>

    <!-- Filtro por condición -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Condición</label>
      <select v-model="condition" class="w-full border rounded px-2 py-1">
        <option value="">Todas</option>
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
      </select>
    </div>

    <!-- Botón aplicar -->
    <button @click="applyFilters" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Aplicar filtros
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const price = ref(1000)
const condition = ref('')

function applyFilters() {
  productStore.setFilter({ maxPrice: price.value, condition })
}
</script>

<style scoped>
/* Opcional: puedes agregar estilos Tailwind adicionales aquí */
</style>