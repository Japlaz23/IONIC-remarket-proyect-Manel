<template>
  <ion-menu content-id="home-content" type="overlay" class="bg-white w-64 shadow-lg">
    <ion-header>
      <ion-toolbar class="bg-green-700 text-white flex items-center justify-between px-4 py-2">
        <ion-title class="text-lg font-bold">Todas las categorías</ion-title>
        <ion-buttons slot="end">
          <ion-button class="hover:bg-green-800 rounded-full p-2" @click="closeCategoriesMenu">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-0">
      <div class="flex flex-col divide-y divide-gray-200">
        <div
          v-for="category in categories as any[]"
          :key="category.id"
          @click="selectCategoriesFromMenu((category as any).id)"
          class="cursor-pointer px-4 py-3 hover:bg-green-50 text-gray-800"
        >
          {{ category.name }}
        </div>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/vue'
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

</style>