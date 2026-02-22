<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet :animated="true" :animation="tabTransition"></ion-router-outlet>

      <ion-tab-bar slot="bottom" class="mobile-tab-bar" :style="tabBarStyle">
        <div class="tab-indicator" aria-hidden="true"></div>
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="searchOutline"></ion-icon>
          <ion-label>Buscar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/tabs/favorites">
          <ion-icon :icon="heartOutline"></ion-icon>
          <ion-label>Favoritos</ion-label>
          <ion-badge v-if="favoriteCount > 0" class="tab-badge">{{ favoriteCount }}</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="sell" href="/tabs/sell">
          <ion-icon :icon="addCircleOutline"></ion-icon>
          <ion-label>Vender</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="purchases" href="/tabs/purchases">
          <ion-icon :icon="cartOutline"></ion-icon>
          <ion-label>Compras</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personCircleOutline"></ion-icon>
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  createAnimation,
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/vue'
import {
  homeOutline,
  searchOutline,
  heartOutline,
  addCircleOutline,
  personCircleOutline,
  cartOutline,
} from 'ionicons/icons'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
const favoriteCount = computed(() => store.favorites.length)
const route = useRoute()

const tabOrder = [
  '/tabs/home',
  '/tabs/search',
  '/tabs/favorites',
  '/tabs/purchases',
  '/tabs/sell',
  '/tabs/profile',
]

const activeIndex = computed(() => {
  const idx = tabOrder.findIndex((path) => route.path.startsWith(path))
  return idx === -1 ? 0 : idx
})

const tabBarStyle = computed(() => ({
  '--tab-index': activeIndex.value,
  '--tab-count': tabOrder.length,
}))

const tabTransition = (_: HTMLElement, opts: { direction?: 'forward' | 'back'; enteringEl: HTMLElement; leavingEl?: HTMLElement }) => {
  const enteringEl = opts.enteringEl
  const leavingEl = opts.leavingEl
  const backDirection = opts.direction === 'back'

  const enteringAnimation = createAnimation()
    .addElement(enteringEl)
    .duration(260)
    .easing('cubic-bezier(0.2, 0.0, 0.2, 1)')
    .fromTo('transform', `translateX(${backDirection ? '-30%' : '30%'})`, 'translateX(0)')
    .fromTo('opacity', 0.6, 1)

  if (!leavingEl) {
    return enteringAnimation
  }

  const leavingAnimation = createAnimation()
    .addElement(leavingEl)
    .duration(260)
    .easing('cubic-bezier(0.4, 0.0, 0.6, 1)')
    .fromTo('transform', 'translateX(0)', `translateX(${backDirection ? '30%' : '-30%'})`)
    .fromTo('opacity', 1, 0.6)

  return createAnimation().addAnimation([enteringAnimation, leavingAnimation])
}
</script>

<style scoped>
.mobile-tab-bar {
  --background: #ffffff;
  --border: 1px solid #e8e8e8;
  height: 60px;
  position: relative;
  overflow: visible;
}

.tab-indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  height: 3px;
  width: calc(100% / var(--tab-count));
  background: #1a7f34;
  border-radius: 999px;
  transform: translateX(calc(var(--tab-index) * 100%));
  transition: transform 220ms ease;
  pointer-events: none;
}

.mobile-tab-bar ion-tab-button {
  --color: #666;
  --color-selected: #1a7f34;
  font-size: 12px;
  transition: transform 180ms ease, color 180ms ease;
}

.mobile-tab-bar ion-icon {
  font-size: 22px;
  transition: transform 200ms ease, color 200ms ease;
}

.mobile-tab-bar ion-label {
  transition: transform 200ms ease, color 200ms ease;
}

.mobile-tab-bar :deep(ion-tab-button) {
  position: relative;
  transition: transform 200ms ease, background-color 200ms ease;
}

.mobile-tab-bar :deep(ion-tab-button)::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 3px;
  border-radius: 999px;
  background: transparent;
  transform: scaleX(0.4);
  transition: transform 220ms ease, background-color 220ms ease;
}

.mobile-tab-bar :deep(ion-tab-button.tab-selected) {
  transform: translateY(-2px);
}

.mobile-tab-bar :deep(ion-tab-button.tab-selected)::after {
  background: #1a7f34;
  transform: scaleX(1);
}

.mobile-tab-bar :deep(ion-tab-button.tab-selected) ion-icon {
  transform: translateY(-2px) scale(1.08);
}

.mobile-tab-bar :deep(ion-tab-button.tab-selected) ion-label {
  transform: translateY(1px);
}

.mobile-tab-bar :deep(ion-tab-button.tab-selected) ion-icon {
  animation: tabPulse 320ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-tab-bar ion-tab-button,
  .mobile-tab-bar ion-icon,
  .mobile-tab-bar ion-label,
  .mobile-tab-bar :deep(ion-tab-button) {
    transition: none;
  }

  .tab-indicator {
    transition: none;
  }

  .mobile-tab-bar :deep(ion-tab-button) {
    transform: none;
  }
}

@keyframes tabPulse {
  0% {
    transform: translateY(-2px) scale(1.08);
  }
  50% {
    transform: translateY(-2px) scale(1.18);
  }
  100% {
    transform: translateY(-2px) scale(1.08);
  }
}

.tab-badge {
  margin-left: 6px;
  font-size: 10px;
  height: 16px;
  min-width: 16px;
}

@media (min-width: 769px) {
  .mobile-tab-bar {
    display: none;
  }
}
</style>
