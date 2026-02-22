
<template>
	<ion-list>
		<ion-item>
			<ion-label>Categoria</ion-label>
			<ion-select v-model="selectedCategory" placeholder="Selecciona una categoría">
				<ion-select-option v-for="category in categories" :key="category" :value="category">
					{{ category }}
				</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-label>Rango de precio</ion-label>
			<ion-range
				v-model="priceRange"
				:min="0"
				:max="1000"
				:step="10"
				dual-knobs
			>
				<ion-label slot="start">{{ priceRange[0] }}€</ion-label>
				<ion-label slot="end">{{ priceRange[1] }}€</ion-label>
			</ion-range>
		</ion-item>
		<ion-item>
			<ion-label>Estado</ion-label>
			<ion-select v-model="selectedCondition" placeholder="Selecciona estado">
				<ion-select-option value="Nuevo">Nuevo</ion-select-option>
				<ion-select-option value="Usado">Usado</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-label>Solo disponibles</ion-label>
			<ion-toggle v-model="onlyAvailable" />
		</ion-item>
		<ion-button expand="block" @click="applyFilters">Aplicar filtros</ion-button>
	</ion-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonRange, IonToggle, IonButton } from '@ionic/vue';

const categories = ref([
	'Electrónica',
	'Ropa',
	'Hogar',
	'Deporte',
	'Libros',
]);
const selectedCategory = ref('');
const priceRange = ref([0, 1000]);
const selectedCondition = ref('');
const onlyAvailable = ref(false);

</script>

<style scoped>
ion-list {
	margin: 16px;
}
</style>
