<template>
  <ion-menu content-id="home-content" type="overlay" class="bg-white w-64 shadow-lg">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title class="title">Todas las categorías</ion-title>
        <ion-buttons slot="end">
          <ion-button class="menu-close-button" @click="closeCategoriesMenu">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-0">
        <ion-list> 
        <ion-item
          v-for="category in categories as any[]"
          :key="category.id"
          @click="selectCategoriesFromMenu((category as any).id)"
          class="item-menu"
        >
          {{ category.name }}
        </ion-item>
     </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonItem } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'

const props = defineProps({
  categories: Array,
})

const emits = defineEmits(['closeCategoriesMenu', 'selectCategoriesFromMenu'])

function closeCategoriesMenu() {
  emits('closeCategoriesMenu')
}

function selectCategoriesFromMenu(id: string) {
  emits('selectCategoriesFromMenu', id)
}
</script>

<style scoped>
.title {
  font-size: 1.25rem;
  font-weight: 600;
}
.menu-close-button {
  color: var(--ion-color-light);
  font-size: 20px;
}
:hover .menu-close-button {
  background-color: var(--ion-color-secondary);
  border-radius: 10px;
}

:hover .item-menu {
  background-color: var(--ion-color-secondary-tint);
}
</style>