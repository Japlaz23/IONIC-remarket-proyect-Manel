<template>
  <ion-menu content-id="main-content" type="overlay" class="side-menu">
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

  <ion-page id="main-content">
    <ion-header class="header-container">
      <!-- Main Header -->
      <ion-toolbar class="main-toolbar">
        <div class="header-content">
          <!-- Logo Section -->
          <div class="logo-section">
            <div class="logo-icon-box">
              <ion-icon :icon="storefrontOutline" class="logo-icon"></ion-icon>
            </div>
            <ion-title class="brand-title">ReMarket</ion-title>
          </div>

          <!-- Search Bar Toolbar -->
          <ion-searchbar
          v-model="store.searchQuery"
          placeholder="Buscar productos..."
          class="custom-searchbar"
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
  menuController,
} from '@ionic/vue'
import {
  heart,
  personCircle,
  storefrontOutline,
  menuOutline,
  closeOutline,
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const isLoggedIn = computed(() => !!localStorage.getItem('user'))

const categories = [
  { id: 'electronics', name: 'Electrónica' },
  { id: 'vehicles', name: 'Vehículos' },
  { id: 'fashion', name: 'Moda' },
  { id: 'home', name: 'Hogar' },
  { id: 'sports', name: 'Deportes' },
  { id: 'office', name: 'Oficina' },
]

const selectedCategory = computed({
  get: () => store.selectedCategory,
  set: (value) => {
    store.selectedCategory = value
  },
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

const goToLogin = () => {
  router.push('/login')
}

const goToProfileCustumer = () => {
  router.push('/profilecustomer')
}

const goToFavorites = () => {
  router.push('/favorites')
}

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

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.logo-icon-box {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(26, 127, 52, 0.2);
  flex-shrink: 0;
}

.logo-icon {
  font-size: 28px;
  color: white;
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

.custom-searchbar:focus-within {
  border-color: #1a7f34;
  --box-shadow: 0 4px 12px rgba(26, 127, 52, 0.12);
}

::v-deep .searchbar-input-container {
  padding: 0 !important;
}

::v-deep .searchbar-search-icon {
  color: #1a7f34;
  left: 12px;
}

::v-deep .searchbar-input {
  font-size: 15px;
  color: #333;
  font-family: inherit;
}

::v-deep .searchbar-clear-button {
  color: #999;
  margin-right: 8px;
  transition: color 0.2s ease;
}

::v-deep .searchbar-cancel-button {
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

/* ==================== PRODUCT CARD STYLES ==================== */

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-title {
  min-height: 3.5rem;
  display: flex;
  align-items: center;
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
}

@media (min-width: 425px) and (max-width: 768px) {
  .menu-button {
    --padding-start: 14px;
    --padding-end: 14px;
    font-size: 13px;
  }

  .category-item {
    padding: 0 16px;
    font-size: 13px;
  }
}
</style>