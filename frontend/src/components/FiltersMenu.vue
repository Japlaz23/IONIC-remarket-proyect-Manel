<template>
	<ion-menu
		v-if="showFiltersLayout"
		menu-id="filters-menu"
		side="end"
		content-id="home-content"
		type="overlay"
		class="bg-white w-80 shadow-lg"
	>
		<ion-header>
			<ion-toolbar class="bg-green-700 text-white flex items-center justify-between px-4 py-2">
				<ion-title class="text-lg font-bold">Filtros</ion-title>
				<ion-buttons slot="end">
					<ion-button class="hover:bg-green-800 rounded-full p-2" @click="$emit('closeFiltersMenu')">
						<ion-icon :icon="closeOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="p-0">
			<div class="p-4 space-y-6">
				<div>
					<div class="text-sm font-semibold text-green-700 mb-1">Precio</div>
					<div class="flex gap-2">
						<ion-input
							v-model="localFilters.minPrice"
							type="number"
							inputmode="decimal"
							placeholder="Min"
							class="border border-gray-300 rounded px-2 py-1 w-1/2 focus:border-green-700"
						></ion-input>
						<ion-input
							v-model="localFilters.maxPrice"
							type="number"
							inputmode="decimal"
							placeholder="Max"
							class="border border-gray-300 rounded px-2 py-1 w-1/2 focus:border-green-700"
						></ion-input>
					</div>
				</div>

				<div>
					<div class="text-sm font-semibold text-green-700 mb-1">Condición</div>
					<ion-select v-model="localFilters.condition" interface="popover" class="w-full border border-gray-300 rounded px-2 py-1 focus:border-green-700">
						<ion-select-option value="all">Todas</ion-select-option>
						<ion-select-option value="Nuevo">Nuevo</ion-select-option>
						<ion-select-option value="Usado">Usado</ion-select-option>
					</ion-select>
				</div>

				<div>
					<div class="text-sm font-semibold text-green-700 mb-1">Ubicación</div>
					<ion-input
						v-model="localFilters.location"
						placeholder="Ciudad"
						class="border border-gray-300 rounded px-2 py-1 w-full focus:border-green-700"
					></ion-input>
				</div>

				<div>
					<div class="text-sm font-semibold text-green-700 mb-1">Ordenar</div>
					<ion-select v-model="localFilters.sort" interface="popover" class="w-full border border-gray-300 rounded px-2 py-1 focus:border-green-700">
						<ion-select-option value="recent">Más reciente</ion-select-option>
						<ion-select-option value="price-asc">Precio más bajo</ion-select-option>
						<ion-select-option value="price-desc">Precio más alto</ion-select-option>
					</ion-select>
				</div>

				<div v-if="availableBrands.length > 0">
					<div class="text-sm font-semibold text-green-700 mb-1">Marca</div>
					<ion-select v-model="localFilters.brand" interface="popover" class="w-full border border-gray-300 rounded px-2 py-1 focus:border-green-700">
						<ion-select-option
							v-for="brand in availableBrands"
							:key="(brand as any).value"
							:value="(brand as any).value"
						>
							{{ (brand as any).label }}
						</ion-select-option>
					</ion-select>
				</div>

				<div class="flex gap-2 justify-end pt-2">
					<ion-button fill="clear" size="small" @click="$emit('resetFilters')" class="text-green-700">Limpiar</ion-button>
					<ion-button size="small" @click="$emit('closeFiltersMenu')" class="bg-green-700 text-white rounded px-4">Ver resultados</ion-button>
				</div>
			</div>
		</ion-content>
	</ion-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonInput, IonSelect, IonSelectOption } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'

const props = defineProps({
	showFiltersLayout: Boolean,
	filters: {
		type: Object,
		required: true
	},
	availableBrands: {
		type: Array,
		default: () => []
	}
})

const emit = defineEmits(['closeFiltersMenu', 'resetFilters'])

const localFilters = ref({ ...props.filters })

watch(() => props.filters, (newVal) => {
	localFilters.value = { ...newVal }
})
</script>
