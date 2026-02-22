
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
			<ion-label>Precio máximo</ion-label>
			<ion-range
			v-model.number="maxPrice"
			:min="0"
			:max="1000"
			:step="10"
			>
				<ion-label slot="end">{{ maxPrice }}€</ion-label>
			</ion-range>
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
const maxPrice = ref(500);
const onlyAvailable = ref(false);


function applyFilters() {
	// Aquí puedes emitir un evento o manejar los filtros
	// Ejemplo: console.log(selectedCategory.value, maxPrice.value, onlyAvailable.value);
}
</script>

<style scoped>
ion-list {
	margin: 16px;
}
</style>
