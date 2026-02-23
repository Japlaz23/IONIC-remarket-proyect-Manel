<template>
  <div class="p-5 space-y-6 bg-white h-full overflow-y-auto">

    <h3 class="text-xl font-bold text-green-900 border-b pb-2">
      Filtros
    </h3>

    <!-- ================= PRECIO ================= -->
    <div>
      <h4 class="font-semibold mb-2 text-gray-800">Precio</h4>

      <div class="flex gap-2">
        <input
          type="number"
          placeholder="Mín"
          v-model.number="minPrice"
          class="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
          type="number"
          placeholder="Máx"
          v-model.number="maxPrice"
          class="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
    </div>

    <!-- ================= CATEGORÍA ================= -->
    <div>
      <h4 class="font-semibold mb-2 text-gray-800">Categoría</h4>
      <select
        v-model="category"
        class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      >
        <option value="">Todas</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Ropa">Ropa</option>
        <option value="Hogar">Hogar</option>
        <option value="Deportes">Deportes</option>
      </select>
    </div>

    <!-- ================= CONDICIÓN ================= -->
    <div>
      <h4 class="font-semibold mb-2 text-gray-800">Condición</h4>
      <div class="flex gap-3">
        <button
          @click="condition = ''"
          :class="buttonClass(condition === '')"
        >
          Todas
        </button>

        <button
          @click="condition = 'Nuevo'"
          :class="buttonClass(condition === 'Nuevo')"
        >
          Nuevo
        </button>

        <button
          @click="condition = 'Usado'"
          :class="buttonClass(condition === 'Usado')"
        >
          Usado
        </button>
      </div>
    </div>

    <!-- ================= UBICACIÓN ================= -->
    <div>
      <h4 class="font-semibold mb-2 text-gray-800">Ubicación</h4>
      <input
        type="text"
        placeholder="Ciudad"
        v-model="location"
        class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <!-- ================= FAVORITOS ================= -->
    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="onlyFavorites" />
      <label class="text-gray-700">Solo favoritos</label>
    </div>

    <!-- ================= ORDENAR ================= -->
    <div>
      <h4 class="font-semibold mb-2 text-gray-800">Ordenar por</h4>
      <select
        v-model="sortBy"
        class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      >
        <option value="">Relevancia</option>
        <option value="price_asc">Precio: menor a mayor</option>
        <option value="price_desc">Precio: mayor a menor</option>
        <option value="newest">Más recientes</option>
      </select>
    </div>

    <!-- ================= BOTONES ================= -->
    <div class="flex gap-3 pt-4 border-t">

      <button
        @click="clearFilters"
        class="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
      >
        Limpiar
      </button>

      <button
        @click="applyFilters"
        class="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Aplicar
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


// import { defineEmits } from 'vue' // Removed to fix macro conflict
const emit = defineEmits(['apply-filters'])

// Estados
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const category = ref('')
const condition = ref('')
const location = ref('')
const onlyFavorites = ref(false)
const sortBy = ref('')

// Estilo dinámico botones condición
function buttonClass(active: boolean) {
  return [
    'px-3 py-2 rounded-lg text-sm font-medium transition',
    active
      ? 'bg-green-600 text-white'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
  ]
}


// Aplicar filtros
function applyFilters() {
  emit('apply-filters', {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    category: category.value,
    condition: condition.value,
    location: location.value,
    onlyFavorites: onlyFavorites.value,
    sortBy: sortBy.value
  })
}

// Limpiar filtros
function clearFilters() {
  minPrice.value = null
  maxPrice.value = null
  category.value = ''
  condition.value = ''
  location.value = ''
  onlyFavorites.value = false
  sortBy.value = ''

  applyFilters()
}
</script>

<style scoped>
input[type="number"],
input[type="text"],
select {
  background-color: #fff;
  color: #222;
  border: 1px solid #d1d5db;
  box-shadow: none;
}

input[type="number"]::placeholder,
input[type="text"]::placeholder {
  color: #888;
  opacity: 1;
}

input[type="checkbox"] {
  accent-color: #16a34a;
}

/* Botones condición y generales */
button {
  box-shadow: none;
}
</style>