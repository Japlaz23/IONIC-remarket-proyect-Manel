<template>
  <ion-menu
    v-if="showFiltersLayout"
    menu-id="filters-menu"
    side="end"
    content-id="home-content"
    type="overlay"
    class="w-[300px]"
  >
    <ion-header>
      <ion-toolbar class="bg-white text-[#1a1a1a] border-b border-[#e8e8e8]">
        <ion-title>Filtros</ion-title>
        <ion-buttons slot="end">
          <ion-button class="px-2 text-gray-500" @click="$emit('close')">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="menu-content bg-white">
      <div class="p-4 flex flex-col gap-6">
        <!-- Precio -->
        <div class="filters-group">
          <div class="filters-label text-base font-semibold mb-2">Precio</div>
          <ion-range
            v-model="filters.priceRange"
            :min="0"
            :max="1000"
            :step="10"
            dual-knobs
            class="w-full mt-2"
          >
            <template #label-start>
              <span class="text-xs">{{ filters.priceRange[0] }}</span>
            </template>
            <template #label-end>
              <span class="text-xs">{{ filters.priceRange[1] }}</span>
            </template>
          </ion-range>
        </div>

        <!-- Condición -->
        <div class="filters-group">
          <div class="filters-label mb-1">Condición</div>
          <ion-select v-model="filters.condition" interface="popover" class="w-full">
            <ion-select-option value="all">Todas</ion-select-option>
            <ion-select-option value="Nuevo">Nuevo</ion-select-option>
            <ion-select-option value="Usado">Usado</ion-select-option>
          </ion-select>
        </div>

        <!-- Ubicación -->
        <div class="filters-group">
          <div class="filters-label mb-1">Ubicación</div>
          <ion-input
            v-model="filters.location"
            placeholder="Ciudad"
            class="w-full"
          ></ion-input>
        </div>

        <!-- Ordenar -->
        <div class="filters-group">
          <div class="filters-label mb-1">Ordenar</div>
          <ion-select v-model="filters.sort" interface="popover" class="w-full">
            <ion-select-option value="recent">Más reciente</ion-select-option>
            <ion-select-option value="price-asc">Precio más bajo</ion-select-option>
            <ion-select-option value="price-desc">Precio más alto</ion-select-option>
          </ion-select>
        </div>

        <!-- Marca (si hay disponibles) -->
        <div class="filters-group" v-if="availableBrands && availableBrands.length > 0">
          <div class="filters-label mb-1">Marca</div>
          <ion-select v-model="filters.brand" interface="popover" class="w-full">
            <ion-select-option
              v-for="brand in availableBrands"
              :key="brand.value"
              :value="brand.value"
            >
              {{ brand.label }}
            </ion-select-option>
          </ion-select>
        </div>

        <!-- Acciones -->
        <div class="filters-actions flex gap-2 justify-end mt-4">
          <ion-button fill="clear" size="small" @click="$emit('reset')">Limpiar</ion-button>
          <ion-button size="small" @click="$emit('close')">Ver resultados</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'

defineProps({
  showFiltersLayout: Boolean,
  filters: Object,
  availableBrands: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close', 'reset'])
</script>
