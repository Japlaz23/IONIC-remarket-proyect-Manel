 <template>
  <ion-page>
  <ion-menu content-id="home-content" type="overlay" class="side-menu">
    <ion-header>
      <ion-toolbar class="menu-header">
        <ion-title>Todas las categorias</ion-title>
        <ion-buttons slot="end">
          <ion-button class="menu-close" @click="closeCategoryMenu">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="menu-content">
      <div class="menu-list">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="selectCategoryFromMenu(category.id)"
          class="menu-item"
        >
          {{ category.name }}
        </div>
      </div>
    </ion-content>
  </ion-menu>

  <!-- Menu de filtro -->
  <ion-menu
    v-if="showFiltersLayout"
    menu-id="filters-menu"
    side="end"
    content-id="home-content"
    type="overlay"
    class="filters-menu"
  >
    <ion-header>
      <ion-toolbar class="menu-header">
        <ion-title>Filtros</ion-title>
        <ion-buttons slot="end">
          <ion-button class="menu-close" @click="closeFiltersMenu">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="menu-content">
      <div class="filters-card">
        <div class="filters-group">
          <div class="filters-label">Precio</div>
          <div class="filters-row">
            <ion-input
              v-model="filters.minPrice"
              type="number"
              inputmode="decimal"
              placeholder="Min"
              class="filters-input"
            ></ion-input>
            <ion-input
              v-model="filters.maxPrice"
              type="number"
              inputmode="decimal"
              placeholder="Max"
              class="filters-input"
            ></ion-input>
          </div>
        </div>

        <div class="filters-group">
          <div class="filters-label">Condicion</div>
          <ion-select v-model="filters.condition" interface="popover" class="filters-select">
            <ion-select-option value="all">Todas</ion-select-option>
            <ion-select-option value="Nuevo">Nuevo</ion-select-option>
            <ion-select-option value="Usado">Usado</ion-select-option>
          </ion-select>
        </div>

        <div class="filters-group">
          <div class="filters-label">Ubicacion</div>
          <ion-input
            v-model="filters.location"
            placeholder="Ciudad"
            class="filters-input"
          ></ion-input>
        </div>

        <div class="filters-group">
          <div class="filters-label">Ordenar</div>
          <ion-select v-model="filters.sort" interface="popover" class="filters-select">
            <ion-select-option value="recent">Mas reciente</ion-select-option>
            <ion-select-option value="price-asc">Precio mas bajo</ion-select-option>
            <ion-select-option value="price-desc">Precio mas alto</ion-select-option>
          </ion-select>
        </div>

        <div class="filters-group" v-if="availableBrands.length > 0">
          <div class="filters-label">Marca</div>
          <ion-select v-model="filters.brand" interface="popover" class="filters-select">
            <ion-select-option
              v-for="brand in availableBrands"
              :key="brand.value"
              :value="brand.value"
            >
              {{ brand.label }}
            </ion-select-option>
          </ion-select>
        </div>

        <div class="filters-actions">
          <ion-button fill="clear" size="small" @click="resetFilters">Limpiar</ion-button>
          <ion-button size="small" @click="closeFiltersMenu">Ver resultados</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-menu> 

  <ion-header class="header-container">
      <!-- Main Header -->
      <ion-toolbar class="main-toolbar">
        <div class="header-content">
          <!-- Logo Section -->
          <div class="logo-section" @click="goToHomeWithCarousel">
            <div class="logo-icon-box">
              <img src="/logo.png" alt="ReMarket Logo" class="logo-image">
            </div>
            <ion-title class="brand-title">ReMarket</ion-title>
          </div>

          <ion-searchbar
            v-model="store.searchQuery"
            placeholder="Buscar productos..."
            class="custom-searchbar desktop-searchbar"
            :animated="true"
          ></ion-searchbar>

          <!-- Action Buttons -->
          <ion-buttons class="action-buttons">
            <ion-button 
              v-if="!isLoggedIn" 
              @click="goToLogin" 
              class="login-btn"
            >
              <span>Iniciar sesión</span>
            </ion-button>
            <ion-button
              class="icon-btn purchases-btn"
              title="Compras"
              @click="goToPurchases"
            >
              <ion-icon :icon="cartOutline"></ion-icon>
            </ion-button>
            <ion-button
              class="icon-btn search-btn"
              title="Buscar"
              @click="goToSearch"
            >
              <ion-icon :icon="searchOutline"></ion-icon>
            </ion-button>
            <ion-button 
              v-if="isLoggedIn" 
              @click="goToProfileCustumer"
              class="icon-btn profile-btn"
              title="Mi perfil"
            >
              <ion-icon :icon="personCircle"></ion-icon>
            </ion-button>
            <ion-button 
              @click="goToFavorites"
              class="icon-btn favorites-btn"
              title="Favoritos"
            >
              <ion-icon :icon="heart"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </ion-toolbar>

      <!-- Categories Menu -->
      <div class="categories-toolbar">
        <div class="menu-wrapper">
          <ion-button class="menu-button" @click="openCategoryMenu">
            <ion-icon :icon="menuOutline"></ion-icon>
            <span>Todas las categorías</span>
          </ion-button>
        </div>
        <div class="categories-scroll">
          <div
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="['category-item', { active: selectedCategory === category.id }]"
          >
            {{ category.name }}
          </div>
        </div>
      </div>
    </ion-header>
      <!-- Contenido Carrusell + grid-->
    <ion-content id="home-content">
      <div v-if="!hasContent" class="empty-state">
        <p>No hay productos para mostrar</p>
      </div>
      <div v-else class="market-sections">
        <template v-if="!showFiltersLayout">
          <section v-for="section in carouselSections" :key="section.id" class="category-section">
            <div class="section-header">
              <h2>{{ section.name }}</h2>
              <span>{{ section.items.length }} productos</span>
            </div>

            <div
              class="product-carousel"
              @touchstart.passive="onCarouselTouchStart($event, section.id)"
              @touchmove.passive="onCarouselTouchMove($event, section.id)"
              @touchend="onCarouselTouchEnd(section.id, section.items.length)"
            >
              <button
                type="button"
                class="carousel-nav prev"
                :disabled="section.items.length <= 1"
                aria-label="Anterior"
                @click="prevSlide(section.id, section.items.length)"
              >
                <ion-icon :icon="chevronBackOutline"></ion-icon>
              </button>

              <div class="carousel-viewport">
                <div
                  class="carousel-track"
                  :ref="setCarouselTrackRef(section.id)"
                  :style="getCarouselTrackStyle(section.id)"
                  @transitionend="handleCarouselTransitionEnd(section.id, section.items.length)"
                >
                  <ion-card
                    v-for="(product, index) in getCarouselItems(section)"
                    :key="`${section.id}-${product.id}-${index}`"
                    class="product-card compact-card carousel-slide"
                    @click="goToProduct(product.id)"
                  >
                    <div class="product-image-container">
                      <ion-img :src="product.image" :alt="product.title" class="product-image"></ion-img>
                      <button 
                        type="button"
                        class="favorite-btn"
                        :class="{ active: isFavoriteProduct(product.id) }"
                        @click="toggleProductFavorite($event, product.id)"
                      >
                        <ion-icon :icon="isFavoriteProduct(product.id) ? heart : heartOutline"></ion-icon>
                      </button>
                    </div>
                    <ion-card-header>
                      <ion-card-title class="product-title line-clamp-2">
                        {{ product.title }}
                      </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <div class="product-meta">
                        <span class="product-price">{{ product.price }}€</span>
                        <span class="product-location">{{ product.location }}</span>
                      </div>
                      <div v-if="getSellerRating(product.sellerId)" class="product-rating">
                        <span class="rating-stars">{{ getSellerRating(product.sellerId)?.stars }}</span>
                        <span class="rating-value">{{ getSellerRating(product.sellerId)?.value.toFixed(1) }}</span>
                        <span class="rating-count">({{ getSellerRating(product.sellerId)?.count }})</span>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </div>
              </div>

              <button
                type="button"
                class="carousel-nav next"
                :disabled="section.items.length <= 1"
                aria-label="Siguiente"
                @click="nextSlide(section.id, section.items.length)"
              >
                <ion-icon :icon="chevronForwardOutline"></ion-icon>
              </button>

              <div v-if="section.items.length > 1" class="carousel-dots">
                <button
                  v-for="(product, dotIndex) in section.items"
                  :key="`dot-${section.id}-${product.id}`"
                  type="button"
                  class="carousel-dot"
                  :class="{ active: getCarouselDotIndex(section.id, section.items.length) === dotIndex }"
                  :aria-label="`Ir a ${product.title}`"
                  @click="goToSlide(section.id, dotIndex, section.items.length)"
                ></button>
              </div>
            </div>
          </section>

          <section v-if="visibleNonCarouselProducts.length > 0" class="category-section">
            <div class="section-header">
              <h2>Otros productos</h2>
              <span>{{ nonCarouselProducts.length }} productos</span>
            </div>
            <div class="product-grid compact-grid">
              <ion-card
                v-for="product in visibleNonCarouselProducts"
                :key="product.id"
                class="product-card compact-card"
                @click="goToProduct(product.id)"
              >
                <div class="product-image-container">
                  <ion-img :src="product.image" :alt="product.title" class="product-image"></ion-img>
                  <button 
                    type="button"
                    class="favorite-btn"
                    :class="{ active: isFavoriteProduct(product.id) }"
                    @click="toggleProductFavorite($event, product.id)"
                  >
                    <ion-icon :icon="isFavoriteProduct(product.id) ? heart : heartOutline"></ion-icon>
                  </button>
                </div>
                <ion-card-header>
                  <ion-card-title class="product-title line-clamp-2">
                    {{ product.title }}
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <div class="product-meta">
                    <span class="product-price">{{ product.price }}€</span>
                    <span class="product-location">{{ product.location }}</span>
                  </div>
                  <div v-if="getSellerRating(product.sellerId)" class="product-rating">
                    <span class="rating-stars">{{ getSellerRating(product.sellerId)?.stars }}</span>
                    <span class="rating-value">{{ getSellerRating(product.sellerId)?.value.toFixed(1) }}</span>
                    <span class="rating-count">({{ getSellerRating(product.sellerId)?.count }})</span>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
          </section>
        </template>

        <template v-else>
          <div class="category-layout">
            <aside class="filters-panel">
              <div class="filters-card">
                <div class="filters-title">Filtros</div>
                <div class="filters-group">
                  <div class="filters-label">Precio</div>
                  <div class="filters-row">
                    <ion-input
                      v-model="filters.minPrice"
                      type="number"
                      inputmode="decimal"
                      placeholder="Min"
                      class="filters-input"
                    ></ion-input>
                    <ion-input
                      v-model="filters.maxPrice"
                      type="number"
                      inputmode="decimal"
                      placeholder="Max"
                      class="filters-input"
                    ></ion-input>
                  </div>
                </div>

                <div class="filters-group">
                  <div class="filters-label">Condicion</div>
                  <ion-select v-model="filters.condition" interface="popover" class="filters-select">
                    <ion-select-option value="all">Todas</ion-select-option>
                    <ion-select-option value="Nuevo">Nuevo</ion-select-option>
                    <ion-select-option value="Usado">Usado</ion-select-option>
                  </ion-select>
                </div>

                <div class="filters-group">
                  <div class="filters-label">Ubicacion</div>
                  <ion-input
                    v-model="filters.location"
                    placeholder="Ciudad"
                    class="filters-input"
                  ></ion-input>
                </div>

                <div class="filters-group">
                  <div class="filters-label">Ordenar</div>
                  <ion-select v-model="filters.sort" interface="popover" class="filters-select">
                    <ion-select-option value="recent">Mas reciente</ion-select-option>
                    <ion-select-option value="price-asc">Precio mas bajo</ion-select-option>
                    <ion-select-option value="price-desc">Precio mas alto</ion-select-option>
                  </ion-select>
                </div>

                <div class="filters-group" v-if="availableBrands.length > 0">
                  <div class="filters-label">Marca</div>
                  <ion-select v-model="filters.brand" interface="popover" class="filters-select">
                    <ion-select-option
                      v-for="brand in availableBrands"
                      :key="brand.value"
                      :value="brand.value"
                    >
                      {{ brand.label }}
                    </ion-select-option>
                  </ion-select>
                </div>

                <div class="filters-actions">
                  <ion-button fill="clear" size="small" @click="resetFilters">Limpiar</ion-button>
                </div>
              </div>
            </aside>

            <div class="category-products">
              <div class="mobile-filters-bar">
                <ion-button class="filters-button" @click="openFiltersMenu">
                  <ion-icon :icon="funnelOutline" slot="start"></ion-icon>
                  Filtros
                </ion-button>
              </div>

              <section v-for="section in categorySections" :key="section.id" class="category-section">
                <div class="section-header">
                  <h2>{{ section.name }}</h2>
                  <span>{{ section.items.length }} productos</span>
                </div>

                <div class="product-grid compact-grid">
                  <ion-card
                    v-for="product in section.items"
                    :key="product.id"
                    class="product-card compact-card"
                    @click="goToProduct(product.id)"
                  >
                    <div class="product-image-container">
                      <ion-img :src="product.image" :alt="product.title" class="product-image"></ion-img>
                      <button 
                        type="button"
                        class="favorite-btn"
                        :class="{ active: isFavoriteProduct(product.id) }"
                        @click="toggleProductFavorite($event, product.id)"
                      >
                        <ion-icon :icon="isFavoriteProduct(product.id) ? heart : heartOutline"></ion-icon>
                      </button>
                    </div>
                    <ion-card-header>
                      <ion-card-title class="product-title line-clamp-2">
                        {{ product.title }}
                      </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <div class="product-meta">
                        <span class="product-price">{{ product.price }}€</span>
                        <span class="product-location">{{ product.location }}</span>
                      </div>
                      <div v-if="getSellerRating(product.sellerId)" class="product-rating">
                        <span class="rating-stars">{{ getSellerRating(product.sellerId)?.stars }}</span>
                        <span class="rating-value">{{ getSellerRating(product.sellerId)?.value.toFixed(1) }}</span>
                        <span class="rating-count">({{ getSellerRating(product.sellerId)?.count }})</span>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </div>
              </section>
            </div>
          </div>
        </template>
      </div>
    </ion-content>
    <!-- Bottom FAB -->
    <ion-fab
      slot="fixed"
      horizontal="start"
      vertical="bottom"
    >
      <ion-fab-button class="chat-fab-button" @click="toggleChatFab">
        <ion-icon :icon="chevronForwardCircle"></ion-icon>
        <ion-badge v-if="unreadCount > 0" class="fab-badge">{{ unreadCount }}</ion-badge>
      </ion-fab-button>
      <ion-fab-list side="end" class="chat-fab-list">
        <ion-fab-button class="chat-fab-item" title="Publicar" @click="goToSellFromFab">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <ion-fab-button class="chat-fab-item chat-item" title="Vendedor" @click="goToChatList('seller')">
          <ion-icon :icon="chatbubblesOutline"></ion-icon>
          <ion-badge v-if="unreadCount > 0" class="fab-list-badge">{{ unreadCount }}</ion-badge>
        </ion-fab-button>
        <ion-fab-button class="chat-fab-item" title="Mensajes" @click="goToChatList('support')">
          <ion-icon :icon="storefrontOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonButtons,
  IonMenu,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  menuController,
  IonFab,
  IonFabButton,
  IonFabList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonBadge,
  alertController,
  onIonViewWillEnter,
} from '@ionic/vue'
import type { ComponentPublicInstance } from 'vue'
import {
  heart,
  personCircle,
  storefrontOutline,
  menuOutline,
  closeOutline,
  add,
  cartOutline,
  searchOutline,
  chatbubblesOutline,
  chevronForwardCircle,
  chevronBackOutline,
  chevronForwardOutline,
  funnelOutline,
  heartOutline,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { computed, ref, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useChatStore } from '@/stores/chatStore'
import { useReviewStore } from '@/stores/reviewStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const router = useRouter()
const store = useProductStore()
const chatStore = useChatStore()
const reviewStore = useReviewStore()
const favoriteStore = useFavoriteStore()

const isLoggedIn = ref(false)
const isChatFabOpen = ref(false)
const unreadCount = computed(() => chatStore.totalUnread)

interface CarouselState {
  index: number
  slideSize: number
  isTransitioning: boolean
  clones: number
  touchStartX: number | null
  touchDeltaX: number
}

const carouselState = reactive<Record<string, CarouselState>>({})
const carouselTrackRefs = ref<Record<string, HTMLElement | null>>({})
const infiniteScrollRef = ref<HTMLElement | null>(null)

const itemsPerPage = 8
const visibleCount = ref(itemsPerPage)

const filters = reactive({
  minPrice: '',
  maxPrice: '',
  condition: 'all',
  location: '',
  sort: 'recent',
  brand: 'all',
})

onIonViewWillEnter(() => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

const categories = [
  { id: 'Electrónica', name: 'Electrónica' },
  { id: 'Vehículos', name: 'Vehículos' },
  { id: 'Moda', name: 'Moda' },
  { id: 'Hogar', name: 'Hogar' },
  { id: 'Deportes', name: 'Deportes' },
  { id: 'Oficina', name: 'Oficina' },
  { id: 'Juguetes', name: 'Juguetes' },
  { id : 'Libros', name: 'Libros' },
  { id: 'Música', name: 'Música' },
  
]

const carouselCategoryIds = new Set(['Electrónica', 'Vehículos'])

const brandsByCategory: Record<string, Array<{ value: string; label: string }>> = {
  'Electrónica': [
    { value: 'all', label: 'Todas' },
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'huawei', label: 'Huawei' },
    { value: 'msi', label: 'MSI' },
    { value: 'sony', label: 'Sony' },
    { value: 'lg', label: 'LG' },
  ],
  'Moda': [
    { value: 'all', label: 'Todas' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'zara', label: 'Zara' },
    { value: 'nike', label: 'Nike' },
    { value: 'h&m', label: 'H&M' },
    { value: 'gucci', label: 'Gucci' },
    { value: 'prada', label: 'Prada' },
  ],
  'Vehículos': [
    { value: 'all', label: 'Todas' },
    { value: 'mazda', label: 'Mazda' },
    { value: 'seat', label: 'Seat' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'mercedes', label: 'Mercedes' },
  ],
  'Hogar': [
    { value: 'all', label: 'Todas' },
    { value: 'ikea', label: 'IKEA' },
    { value: 'philips', label: 'Philips' },
    { value: 'dyson', label: 'Dyson' },
    { value: 'bosch', label: 'Bosch' },
  ],
  'Deportes': [
    { value: 'all', label: 'Todas' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'nike', label: 'Nike' },
    { value: 'puma', label: 'Puma' },
    { value: 'decathlon', label: 'Decathlon' },
  ],
}

const selectedCategory = computed({
  get: () => store.selectedCategory,
  set: (value) => {
    store.selectedCategory = value
  },
})

const availableBrands = computed(() => {
  if (!selectedCategory.value || !brandsByCategory[selectedCategory.value]) {
    return []
  }
  return brandsByCategory[selectedCategory.value]
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const openCategoryMenu = async () => {
  await menuController.open()
}

const closeCategoryMenu = async () => {
  await menuController.close()
}

const selectCategoryFromMenu = async (categoryId: string) => {
  selectedCategory.value = categoryId
  await menuController.close()
}

const openFiltersMenu = async () => {
  await menuController.open('filters-menu')
}

const closeFiltersMenu = async () => {
  await menuController.close('filters-menu')
}

const resetFilters = () => {
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.condition = 'all'
  filters.location = ''
  filters.sort = 'recent'
  filters.brand = 'all'
}

const filteredProducts = computed(() => {
  let list = [...store.filteredProducts]

  const minPrice = Number.parseFloat(filters.minPrice)
  if (!Number.isNaN(minPrice)) {
    list = list.filter((product) => product.price >= minPrice)
  }

  const maxPrice = Number.parseFloat(filters.maxPrice)
  if (!Number.isNaN(maxPrice)) {
    list = list.filter((product) => product.price <= maxPrice)
  }

  if (filters.condition !== 'all') {
    list = list.filter((product) => product.condition.startsWith(filters.condition))
  }

  const locationQuery = filters.location.trim().toLowerCase()
  if (locationQuery) {
    list = list.filter((product) => product.location.toLowerCase().includes(locationQuery))
  }

  if (filters.brand !== 'all') {
    list = list.filter((product) => product.brand?.toLowerCase() === filters.brand.toLowerCase())
  }

  if (filters.sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  } else {
    list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  return list
})

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const nonCarouselProducts = computed(() =>
  filteredProducts.value.filter((product) => !carouselCategoryIds.has(product.category)),
)
const visibleNonCarouselProducts = computed(() =>
  nonCarouselProducts.value.slice(0, visibleCount.value),
)

const showFiltersLayout = computed(() => {
  return !!(store.selectedCategory || store.searchQuery.trim())
})

const carouselSections = computed(() => {
  if (showFiltersLayout.value) {
    return []
  }
  return categories
    .filter((category) => carouselCategoryIds.has(category.id))
    .map((category) => ({
      ...category,
      items: filteredProducts.value.filter((product) => product.category === category.id),
    }))
    .filter((section) => section.items.length > 0)
})

const categorySections = computed(() => {
  if (!showFiltersLayout.value) {
    return []
  }
  
  // Si hay búsqueda activa, mostrar todos los resultados en una sola sección
  if (store.searchQuery.trim() && !store.selectedCategory) {
    return [{
      id: 'search-results',
      name: 'Resultados de búsqueda',
      items: visibleProducts.value,
    }].filter((section) => section.items.length > 0)
  }
  
  // Si hay categoría seleccionada, mostrar solo esa categoría
  return categories
    .filter((category) => category.id === store.selectedCategory)
    .map((category) => ({
      ...category,
      items: visibleProducts.value.filter((product) => product.category === category.id),
    }))
    .filter((section) => section.items.length > 0)
})

const hasMore = computed(() => {
  if (showFiltersLayout.value) {
    return visibleCount.value < filteredProducts.value.length
  }
  return visibleCount.value < nonCarouselProducts.value.length
})

const hasContent = computed(() => {
  if (showFiltersLayout.value) {
    return categorySections.value.length > 0
  }
  return carouselSections.value.length > 0 || visibleNonCarouselProducts.value.length > 0
})



const getClonesCount = (itemsCount: number) => {
  if (itemsCount <= 1) {
    return 0
  }
  return Math.min(2, itemsCount)
}

const getCarouselState = (sectionId: string, itemsCount: number) => {
  if (!carouselState[sectionId]) {
    carouselState[sectionId] = {
      index: 0,
      slideSize: 0,
      isTransitioning: true,
      clones: getClonesCount(itemsCount),
      touchStartX: null,
      touchDeltaX: 0,
    }
  }

  carouselState[sectionId].clones = getClonesCount(itemsCount)
  return carouselState[sectionId]
}

const setCarouselTrackRef = (sectionId: string) => (el: Element | ComponentPublicInstance | null) => {
  carouselTrackRefs.value[sectionId] = el as HTMLElement | null
}

const getCarouselItems = (section: { items: typeof store.filteredProducts }) => {
  const items = section.items
  const clones = getClonesCount(items.length)

  if (clones === 0) {
    return items
  }

  const head = items.slice(0, clones)
  const tail = items.slice(-clones)
  return [...tail, ...items, ...head]
}

const updateCarouselSlideSize = (sectionId: string) => {
  const track = carouselTrackRefs.value[sectionId]
  const state = carouselState[sectionId]

  if (!track || !state) {
    return
  }

  const slide = track.querySelector<HTMLElement>('.carousel-slide')
  if (!slide) {
    return
  }

  const styles = window.getComputedStyle(track)
  const gapValue = styles.columnGap || styles.gap || '12px'
  const gap = Number.parseFloat(gapValue) || 12
  state.slideSize = slide.getBoundingClientRect().width + gap
}

const initCarousel = async (sectionId: string, itemsCount: number) => {
  const state = getCarouselState(sectionId, itemsCount)

  if (itemsCount <= 1) {
    state.index = 0
    state.isTransitioning = false
    return
  }

  if (state.index === 0 || state.index < state.clones || state.index >= itemsCount + state.clones * 2) {
    state.index = state.clones
  }

  state.isTransitioning = true
  await nextTick()
  updateCarouselSlideSize(sectionId)
}

const getCarouselTrackStyle = (sectionId: string) => {
  const state = carouselState[sectionId]

  if (!state || state.slideSize === 0) {
    return {}
  }

  return {
    transform: `translateX(-${state.index * state.slideSize}px)`,
    transition: state.isTransitioning ? 'transform 450ms ease' : 'none',
  }
}

const jumpToIndex = (sectionId: string, nextIndex: number) => {
  const state = carouselState[sectionId]

  if (!state) {
    return
  }

  state.isTransitioning = false
  state.index = nextIndex
  requestAnimationFrame(() => {
    state.isTransitioning = true
  })
}

const handleCarouselTransitionEnd = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }

  const state = carouselState[sectionId]
  if (!state) {
    return
  }

  const clones = state.clones
  if (state.index >= itemsCount + clones) {
    jumpToIndex(sectionId, state.index - itemsCount)
    return
  }

  if (state.index < clones) {
    jumpToIndex(sectionId, state.index + itemsCount)
  }
}

const nextSlide = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index += 2
}

const prevSlide = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index -= 2
}

const goToSlide = (sectionId: string, targetIndex: number, itemsCount: number) => {
  if (itemsCount <= 1) {
    return
  }
  const state = getCarouselState(sectionId, itemsCount)
  state.isTransitioning = true
  state.index = targetIndex + state.clones
}

const getCarouselDotIndex = (sectionId: string, itemsCount: number) => {
  if (itemsCount <= 1) {
    return 0
  }
  const state = getCarouselState(sectionId, itemsCount)
  const normalized = (state.index - state.clones) % itemsCount
  return normalized < 0 ? normalized + itemsCount : normalized
}

const onCarouselTouchStart = (event: TouchEvent, sectionId: string) => {
  const state = carouselState[sectionId]
  if (!state) {
    return
  }
  state.touchStartX = event.touches[0]?.clientX ?? null
  state.touchDeltaX = 0
}

const onCarouselTouchMove = (event: TouchEvent, sectionId: string) => {
  const state = carouselState[sectionId]
  if (!state || state.touchStartX === null) {
    return
  }
  state.touchDeltaX = (event.touches[0]?.clientX ?? state.touchStartX) - state.touchStartX
}

const onCarouselTouchEnd = (sectionId: string, itemsCount: number) => {
  const state = carouselState[sectionId]
  if (!state) {
    return
  }

  if (Math.abs(state.touchDeltaX) > 30) {
    if (state.touchDeltaX > 0) {
      prevSlide(sectionId, itemsCount)
    } else {
      nextSlide(sectionId, itemsCount)
    }
  }

  state.touchStartX = null
  state.touchDeltaX = 0
}


const resetVisibleCount = async () => {
  visibleCount.value = itemsPerPage
  await nextTick()
  const target = infiniteScrollRef.value as HTMLIonInfiniteScrollElement | null
  if (target) {
    target.disabled = !hasMore.value
  }
}

const goToHomeWithCarousel = () => {
  selectedCategory.value = ''
  router.push('/tabs/home')
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const getSellerRating = (sellerId: number) => {
  const ratingStr = reviewStore.getSellerAverageRating(sellerId)
  const rating = typeof ratingStr === 'string' ? parseFloat(ratingStr) : ratingStr
  if (rating === 0) return null
  return {
    value: rating,
    stars: reviewStore.ratingToStars(rating),
    count: reviewStore.getReviewsBySeller(sellerId).length,
  }
}

const toggleProductFavorite = (e: Event, productId: number) => {
  e.stopPropagation()
  favoriteStore.loadFavorites()
  favoriteStore.toggleFavorite(productId)
}

const isFavoriteProduct = (productId: number) => {
  return favoriteStore.isFavorite(productId)
}

const goToLogin = () => {
  router.push('/login')
}

const goToProfileCustumer = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/profile')
}

const goToFavorites = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/favorites')
}

const goToPurchases = () => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  router.push('/tabs/purchases')
}

const goToSearch = () => {
  router.push('/tabs/search')
}

const confirmLogin = async () => {
  const alert = await alertController.create({
    header: 'Inicia sesion',
    message: 'Necesitas iniciar sesion para continuar.',
    cssClass: 'auth-alert',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Continuar',
        handler: () => {
          router.push('/login')
        },
      },
    ],
  })
  await alert.present()
}

const goToSell = () => {
  router.push('/tabs/sell')
}

const goToSellFromFab = () => {
  isChatFabOpen.value = false
  goToSell()
}

const toggleChatFab = () => {
  isChatFabOpen.value = !isChatFabOpen.value
}

const goToChatList = (type: 'support' | 'seller') => {
  if (!isLoggedIn.value) {
    confirmLogin()
    return
  }
  isChatFabOpen.value = false
  if (type === 'support') {
    router.push('/tabs/chat')
    return
  }
  router.push('/chat/1')
}

const handleCarouselResize = () => {
  Object.keys(carouselState).forEach((sectionId) => {
    updateCarouselSlideSize(sectionId)
  })
}

watch(
  carouselSections,
  (sections) => {
    sections.forEach((section) => {
      initCarousel(section.id, section.items.length)
    })
  },
  { immediate: true },
)

watch(
  () => [
    store.filteredProducts,
    store.selectedCategory,
    store.searchQuery,
    filters.minPrice,
    filters.maxPrice,
    filters.condition,
    filters.location,
    filters.sort,
    filters.brand,
  ],
  () => {
    resetVisibleCount()
  },
)

onMounted(() => {
  window.addEventListener('resize', handleCarouselResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleCarouselResize)
})
</script>

<style scoped>
/* ==================== HEADER STYLES ==================== */

.header-container {
  --background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.main-toolbar {
  --background: #ffffff;
  --border-color: transparent;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 70px;
  --ion-color-base: transparent;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.chat-fab {
  display: none;
  z-index: 1000;
  margin-bottom: 16px;
  margin-right: 16px;
  align-items: center;
  flex-direction: row;
}

.chat-fab-button {
  --background: #1a7f34;
  --color: #ffffff;
  box-shadow: 0 10px 24px rgba(26, 127, 52, 0.35);
  position: relative;
}

.fab-badge {
  position: absolute;
  top: 2px;
  right: 4px;
  background: var(--ion-color-danger);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.chat-fab-list .chat-fab-item {
  --background: #ffffff;
  --color: #1a1a1a;
  width: 44px;
  height: 44px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

.fab-list-badge {
  position: absolute;
  top: 3px;
  right: 1px;
  background: var(--ion-color-danger);
  color: white;
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
  z-index: 10;
}

.chat-fab-list {
  position: static;
  display: none;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-right: 12px;
}

.chat-fab-list.fab-list-active {
  display: flex;
}

.chat-fab-list .chat-fab-item ion-icon {
  font-size: 20px;
}

@media (max-width: 768px) {
  .action-buttons .profile-btn,
  .action-buttons .favorites-btn,
  .action-buttons .purchases-btn,
  .action-buttons .login-btn {
    display: none;
  }

  .action-buttons .search-btn {
    display: flex;
  }

  .desktop-searchbar {
    display: none;
  }
}

@media (min-width: 769px) {
  .chat-fab {
    display: block;
  }

  .desktop-searchbar {
    display: block;
  }

  .action-buttons .search-btn {
    display: none;
  }
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  cursor: pointer;
}

.logo-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.brand-title {
  font-size: 24px;
  font-weight: 800 !important;
  color: #1a1a1a !important;
  letter-spacing: -0.5px;
  margin: 0 !important;
  padding: 0 !important;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.login-btn {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  border-radius: 8px;
  color: white !important;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(26, 127, 52, 0.15);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(26, 127, 52, 0.25);
}

.login-btn:active {
  transform: translateY(0);
}

.icon-btn {
  --padding: 8px;
  --border-radius: 10px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666 !important;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.icon-btn:hover {
  background: #e8e8e8;
  transform: scale(1.05);
}

.profile-btn:hover {
  background: #e8f5e9;
  color: #1a7f34 !important;
}

.favorites-btn:hover {
  background: #ffe8e8;
  color: #ff4444 !important;
}

.icon-btn:active {
  transform: scale(0.98);
}

.search-btn {
  display: none;
}


/* ==================== SEARCHBAR STYLES ==================== */

.custom-searchbar {
  --background: #ffffff;
  --border-radius: 12px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 14px;
  --padding-end: 14px;
  --placeholder-color: #999999;
  --placeholder-opacity: 1;
  border: 1.5px solid #e0e0e0;
  transition: border-color 0.3s ease, box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
}

.desktop-searchbar {
  flex: 1;
  max-width: 520px;
}

.custom-searchbar:focus-within {
  border-color: #1a7f34;
  --box-shadow: 0 4px 12px rgba(26, 127, 52, 0.12);
}

:deep(.searchbar-input-container) {
  padding: 0 !important;
}

:deep(.searchbar-search-icon) {
  color: #1a7f34;
  left: 12px;
}

:deep(.searchbar-input) {
  font-size: 15px;
  color: #333;
  font-family: inherit;
}

:deep(.searchbar-clear-button) {
  color: #999;
  margin-right: 8px;
  transition: color 0.2s ease;
}

:deep(.searchbar-cancel-button) {
  color: #1a7f34;
  font-weight: 600;
  transition: color 0.2s ease;
}

/* ==================== SEGMENT STYLES ==================== */

ion-segment-button {
  --indicator-color: #1a7f34;
  --color-checked: #1a7f34;
  --color: #666666;
  font-weight: 600;
  transition: color 0.3s ease;
}

/* ==================== ION-CONTENT STYLES ==================== */

#home-content {
  --background: #e8e8e8;
}

/* ==================== PRODUCT CARD STYLES ==================== */

.products-grid {
  width: 100%;
}

.market-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0f172a;
}

.section-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.section-header span {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.category-layout {
  display: block;
}

.category-products {
  flex: 1;
}

.filters-panel {
  display: none;
}

.filters-card {
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.filters-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #0f172a;
}

.filters-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.filters-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.filters-input {
  --background: #f8fafc;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 13px;
}

.filters-select {
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 13px;
}

.filters-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.mobile-filters-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.filters-button {
  --background: #ffffff;
  --color: #1a1a1a;
  --border-radius: 999px;
  --box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
}

.product-carousel {
  position: relative;
  padding: 8px 28px 18px;
}

.carousel-viewport {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 12px;
  align-items: stretch;
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 180px;
}

.carousel-nav {
  position: absolute;
  top: 46%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: #ffffff;
  color: #1a1a1a;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  z-index: 2;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.carousel-nav:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.18);
}

.carousel-nav:disabled {
  opacity: 0.45;
  cursor: default;
  box-shadow: none;
}

.carousel-nav.prev {
  left: 0;
}

.carousel-nav.next {
  right: 0;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: #d0d7de;
  cursor: pointer;
  transition: width 0.2s ease, background 0.2s ease;
}

.carousel-dot.active {
  width: 18px;
  background: #1a7f34;
}

.product-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.product-card {
  cursor: pointer;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e6ebf2;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.compact-card {
  flex: 0 0 180px;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
}

.product-image {
  height: 120px;
  object-fit: cover;
  border-bottom: 1px solid #eef2f7;
}

.product-image-container {
  position: relative;
  overflow: hidden;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
  z-index: 10;
  padding: 0;
  backdrop-filter: blur(4px);
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 1);
  color: #fbbf24;
}

.favorite-btn.active {
  color: #ef4444;
  background: rgba(255, 255, 255, 1);
}

.favorite-btn ion-icon {
  font-size: 18px;
}

.product-card ion-card-header {
  padding: 12px 12px 6px;
}

.product-card ion-card-content {
  padding: 0 12px 12px;
  margin-top: auto;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

.product-price {
  color: #1a7f34;
  font-weight: 700;
  font-size: 14px;
}

.product-location {
  color: #94a3b8;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

.rating-stars {
  color: #f59e0b;
  font-size: 13px;
}

.rating-value {
  font-weight: 600;
  color: #0f172a;
}

.rating-count {
  color: #94a3b8;
  font-size: 11px;
}

.empty-state {
  padding: 32px 16px;
  text-align: center;
  color: #888;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-title {
  min-height: 2.6rem;
  display: flex;
  align-items: center;
  font-size: 15px !important;
  line-height: 1.3;
  color: #0f172a;
}

/* ==================== ANIMATIONS ==================== */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.5s ease-out;
  will-change: opacity, transform;
}

/* ==================== RESPONSIVE DESIGN ==================== */

@media (max-width: 424px) {
  .main-toolbar {
    --min-height: 64px;
    --padding-start: 12px;
    --padding-end: 12px;
  }

  .brand-title {
    font-size: 20px !important;
  }

  .logo-icon-box {
    width: 40px;
    height: 40px;
  }

  .logo-icon {
    font-size: 24px;
  }

  .login-btn {
    font-size: 12px;
    --padding-start: 12px;
    --padding-end: 12px;
  }

  .icon-btn {
    width: 38px;
    height: 38px;
  }

  .icon-btn ion-icon {
    font-size: 20px;
  }

  .search-toolbar {
    --padding-start: 8px;
    --padding-end: 8px;
  }

  .custom-searchbar {
    --padding-start: 10px;
    --padding-end: 10px;
  }

  .grid {
    gap: 12px !important;
    padding: 8px !important;
  }

  .product-title {
    min-height: 3rem;
    font-size: 15px !important;
  }

  ion-fab-button {
    width: 48px !important;
    height: 48px !important;
  }

  .market-sections {
    padding: 12px;
  }
}

@media (min-width: 425px) and (max-width: 768px) {
  .main-toolbar {
    --min-height: 68px;
  }

  .brand-title {
    font-size: 22px !important;
  }

  .logo-icon-box {
    width: 42px;
    height: 42px;
  }

  .grid {
    gap: 14px !important;
  }

  .product-title {
    font-size: 16px !important;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .category-layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .filters-panel {
    display: block;
    width: 260px;
    position: sticky;
    top: 120px;
  }

  .mobile-filters-bar {
    display: none;
  }
}

@media (min-width: 992px) {
  .main-toolbar {
    --min-height: 72px;
    --padding-start: 24px;
    --padding-end: 24px;
  }

  .brand-title {
    font-size: 26px !important;
  }

  .logo-icon-box {
    width: 48px;
    height: 48px;
  }

  .logo-icon {
    font-size: 30px;
  }

  .login-btn {
    font-size: 15px;
    --padding-start: 20px;
    --padding-end: 20px;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
  }

  .icon-btn ion-icon {
    font-size: 26px;
  }

  .search-toolbar {
    --padding-start: 24px;
    --padding-end: 24px;
  }

  .grid {
    gap: 16px !important;
  }

  .product-title {
    min-height: 3.8rem;
    font-size: 18px !important;
  }

  ion-fab-button {
    width: 64px !important;
    height: 64px !important;
  }

  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* ==================== CATEGORIES MENU STYLES ==================== */

.categories-toolbar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.categories-toolbar::-webkit-scrollbar {
  display: none;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 0;
  --padding-bottom: 0;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a !important;
  background: #fff !important;
  --background: transparent !important;
  border-right: 1px solid #e8e8e8;
  min-width: max-content;
  height: 48px;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background: #f5f5f5 !important;
}

.menu-button ion-icon {
  font-size: 20px;
  color: #666;
}

.menu-wrapper {
  position: relative;
}

/* ==================== SIDE MENU STYLES ==================== */

.side-menu {
  --width: 280px;
}

.filters-menu {
  --width: 300px;
}

.menu-header {
  --background: #ffffff;
  --color: #1a1a1a;
  border-bottom: 1px solid #e8e8e8;
}

.menu-close {
  --padding-start: 8px;
  --padding-end: 8px;
  color: #666 !important;
}

.menu-content {
  --background: #ffffff;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 14px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease, color 0.2s ease;
}

.menu-item:hover {
  background: #f7f7f7;
  color: #1a7f34;
}

.categories-scroll {
  display: flex;
  gap: 0;
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  background: transparent;
}

.category-item:hover {
  color: #1a7f34;
  background: #f9f9f9;
}

.category-item.active {
  color: #1a7f34;
  border-bottom-color: #1a7f34;
  font-weight: 600;
}

@media (max-width: 424px) {
  .header-content {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .logo-section {
    order: 1;
  }

  .action-buttons {
    order: 2;
  }

  .custom-searchbar {
    order: 3;
    flex: 1 1 100%;
    width: 100%;
    margin-top: 8px;
  }

  .menu-button {
    --padding-start: 12px;
    --padding-end: 12px;
    font-size: 13px;
  }

  .menu-button span {
    display: none;
  }

  .category-item {
    padding: 0 14px;
    font-size: 13px;
  }

  .side-menu {
    --width: 85vw;
  }

  ion-fab {
    right: 12px;
    bottom: 12px;
  }
}

@media (min-width: 425px) and (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
  }

  .custom-searchbar {
    flex: 1 1 100%;
    width: 100%;
    margin-top: 8px;
  }

  .menu-button {
    --padding-start: 14px;
    --padding-end: 14px;
    font-size: 13px;
  }

  .category-item {
    padding: 0 16px;
    font-size: 13px;
  }

  .side-menu {
    --width: 320px;
  }
}
/* ==================== FAB BUTTON STYLES ==================== */

ion-fab-button {
    --background: #b7f399;
    --background-activated: #87d361;
    --background-hover: #a3e681;
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    --color: black;
  }

/* Ocultar FAB en dispositivos móviles */
@media (max-width: 1023px) {
  ion-fab {
    display: none;
  }
}
</style>