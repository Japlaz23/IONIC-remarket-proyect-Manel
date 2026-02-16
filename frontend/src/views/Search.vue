<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="search-toolbar">
        <ion-title class="search-title">Buscar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="search-content">
      <div class="search-shell">
        <section class="search-hero">
        <div class="search-hero-glow"></div>
        <div class="search-hero-content">
          <p class="search-kicker">Explora</p>
          <h1 class="search-hero-title">Encuentra tu proximo producto</h1>
          <p class="search-hero-subtitle">
            {{ hasQuery ? `Resultados para "${store.searchQuery}"` : 'Busca, filtra y compara al instante' }}
          </p>
        </div>

        <div class="search-bar">
          <ion-searchbar
            v-model="store.searchQuery"
            placeholder="Buscar productos..."
            :animated="true"
            class="search-input"
          ></ion-searchbar>
          <button v-if="store.searchQuery" class="search-clear" @click="clearSearch">
            Limpiar
          </button>
        </div>

        <div class="search-actions">
          <div class="search-chips">
            <button
              class="search-chip"
              :class="{ active: priceFilter === 'all' }"
              @click="priceFilter = 'all'"
            >
              Todos
            </button>
            <button
              class="search-chip"
              :class="{ active: priceFilter === 'under50' }"
              @click="priceFilter = 'under50'"
            >
              Menos de 50
            </button>
            <button
              class="search-chip"
              :class="{ active: priceFilter === '50to200' }"
              @click="priceFilter = '50to200'"
            >
              50 a 200
            </button>
            <button
              class="search-chip"
              :class="{ active: priceFilter === 'over200' }"
              @click="priceFilter = 'over200'"
            >
              Mas de 200
            </button>
          </div>

          <div class="search-chips search-categories">
            <button
              class="search-chip search-chip-secondary"
              :class="{ active: categoryFilter === 'all' }"
              @click="categoryFilter = 'all'"
            >
              Todas las categorias
            </button>
            <button
              v-for="category in categories"
              :key="category"
              class="search-chip search-chip-secondary"
              :class="{ active: categoryFilter === category }"
              @click="categoryFilter = category"
            >
              {{ category }}
            </button>
          </div>

          <ion-select
            v-model="sortOption"
            interface="popover"
            placeholder="Ordenar"
            class="search-select"
          >
            <ion-select-option value="relevance">Relevancia</ion-select-option>
            <ion-select-option value="recent">Mas recientes</ion-select-option>
            <ion-select-option value="price-asc">Precio mas bajo</ion-select-option>
            <ion-select-option value="price-desc">Precio mas alto</ion-select-option>
          </ion-select>
        </div>
        </section>

        <section class="search-results">
        <div class="results-header">
          <h2>Resultados</h2>
          <span class="results-count">{{ resultsCount }} productos</span>
        </div>

        <div v-if="sortedProducts.length === 0" class="empty-state">
          <div class="empty-card">
            <p class="empty-title">No hay resultados</p>
            <p class="empty-subtitle">Prueba con otra palabra o ajusta los filtros.</p>
          </div>
        </div>

        <div v-else class="results-grid">
          <ion-card
            v-for="product in sortedProducts"
            :key="product.id"
            class="result-card"
            @click="goToProduct(product.id)"
          >
            <div class="result-media">
              <ion-img :src="product.image" :alt="product.title" class="result-image"></ion-img>
              <span v-if="isNew(product)" class="result-badge">Nuevo</span>
            </div>
            <ion-card-header class="result-header">
              <ion-card-title class="result-title">{{ product.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content class="result-content">
              <div class="result-meta">
                <span class="result-price">{{ product.price }}€</span>
                <span class="result-location">{{ product.location }}</span>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from '@ionic/vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const priceFilter = ref<'all' | 'under50' | '50to200' | 'over200'>('all')
const categoryFilter = ref('all')
const sortOption = ref<'relevance' | 'recent' | 'price-asc' | 'price-desc'>('relevance')

const hasQuery = computed(() => store.searchQuery.trim().length > 0)

const categories = computed(() => {
  const unique = new Set<string>()
  store.products.forEach((product) => {
    if (product.category) {
      unique.add(product.category)
    }
  })
  return Array.from(unique)
})

const filteredByCategory = computed(() => {
  return store.filteredProducts.filter((product) => {
    if (categoryFilter.value === 'all') {
      return true
    }
    return product.category === categoryFilter.value
  })
})

const filteredByPrice = computed(() => {
  return filteredByCategory.value.filter((product) => {
    if (priceFilter.value === 'under50') {
      return product.price < 50
    }
    if (priceFilter.value === '50to200') {
      return product.price >= 50 && product.price <= 200
    }
    if (priceFilter.value === 'over200') {
      return product.price > 200
    }
    return true
  })
})

const sortedProducts = computed(() => {
  const items = [...filteredByPrice.value]
  if (sortOption.value === 'price-asc') {
    return items.sort((a, b) => a.price - b.price)
  }
  if (sortOption.value === 'price-desc') {
    return items.sort((a, b) => b.price - a.price)
  }
  if (sortOption.value === 'recent') {
    return items.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime()
      const bTime = new Date(b.createdAt).getTime()
      return bTime - aTime
    })
  }
  return items
})

const resultsCount = computed(() => sortedProducts.value.length)

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const clearSearch = () => {
  store.searchQuery = ''
}

const isNew = (product: { createdAt: Date | string }) => {
  const createdAt = new Date(product.createdAt).getTime()
  if (Number.isNaN(createdAt)) {
    return false
  }

  const threeDays = 3 * 24 * 60 * 60 * 1000
  return Date.now() - createdAt <= threeDays
}

const desktopMediaQuery = window.matchMedia('(min-width: 769px)')

const handleDesktopRedirect = () => {
  if (desktopMediaQuery.matches) {
    router.replace('/tabs/home')
  }
}

onMounted(() => {
  handleDesktopRedirect()
  desktopMediaQuery.addEventListener('change', handleDesktopRedirect)
})

onBeforeUnmount(() => {
  desktopMediaQuery.removeEventListener('change', handleDesktopRedirect)
})
</script>

<style scoped>
.search-toolbar {
  --background: #ffffff;
  --border-color: #e7e7e7;
}

.search-title {
  color: #111;
  font-size: 22px;
  font-weight: 700;
  padding-left: 16px;
  letter-spacing: -0.2px;
}

.search-content {
  --background: #f0f4f8;
  font-family: 'Manrope', 'Segoe UI', sans-serif;
}

.search-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 24px;
}

.search-hero {
  position: relative;
  margin: 16px 0 12px;
  padding: 22px 22px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
}

.search-hero-glow {
  position: absolute;
  top: -80px;
  right: -50px;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));
}

.search-hero-content {
  position: relative;
  z-index: 1;
}

.search-kicker {
  margin: 0 0 6px 0;
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  opacity: 0.8;
}

.search-hero-title {
  margin: 0 0 6px 0;
  font-size: 24px;
  font-weight: 700;
}

.search-hero-subtitle {
  margin: 0 0 16px 0;
  font-size: 14px;
  opacity: 0.85;
}

.search-bar {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  --background: #ffffff;
  --color: #0f172a;
  --border-radius: 999px;
  --placeholder-color: #94a3b8;
  --icon-color: #1a7f34;
  flex: 1;
}

.search-clear {
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.search-actions {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.search-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.search-chip {
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.search-chip-secondary {
  background: rgba(255, 255, 255, 0.2);
}

.search-chip.active {
  background: #ffffff;
  color: #0f5223;
}

.search-select {
  --background: rgba(255, 255, 255, 0.18);
  --color: #ffffff;
  --placeholder-color: rgba(255, 255, 255, 0.7);
  --border-radius: 999px;
  min-width: 180px;
}

.search-results {
  margin: 0;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 4px 12px;
}

.results-header h2 {
  margin: 0;
  font-size: 18px;
  color: #0f172a;
}

.results-count {
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}

.result-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e3e8ef;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.result-image {
  height: 160px;
  object-fit: cover;
}

.result-media {
  position: relative;
}

.result-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #1a7f34;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.2);
}

.result-header {
  padding: 14px 16px 0;
}

.result-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-content {
  padding: 12px 16px 16px;
}

.result-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #64748b;
}

.result-price {
  color: #1a7f34;
  font-weight: 700;
  font-size: 15px;
}

.empty-state {
  padding: 12px 0;
}

.empty-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  text-align: center;
  border: 1px dashed #cbd5f5;
  color: #64748b;
}

.empty-title {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.empty-subtitle {
  margin: 0;
  font-size: 13px;
}

@media (max-width: 640px) {
  .search-hero {
    margin: 12px 0 10px;
    padding: 20px 18px;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-clear {
    width: 100%;
  }

  .search-actions {
    align-items: flex-start;
  }

  .search-select {
    width: 100%;
  }

  .search-categories {
    width: 100%;
  }

  .search-results {
    margin: 0;
  }

  .search-shell {
    padding: 0 12px 20px;
  }
}
</style>
