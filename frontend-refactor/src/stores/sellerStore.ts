import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Seller {
	id: number
	name: string
	location: string
	rating?: number
}

export const useSellerStore = defineStore('seller', () => {
	const sellers = ref<Seller[]>([
		{ id: 1, name: 'Juan Pérez', location: 'Madrid', rating: 4.8 },
		{ id: 2, name: 'María García', location: 'Barcelona', rating: 4.7 },
		{ id: 3, name: 'Lucia Ortiz', location: 'Valencia', rating: 4.6 },
		// ...otros vendedores
	])

	function getSellerById(id: number) {
		return sellers.value.find(s => s.id === Number(id)) || { id, name: 'Vendedor desconocido', location: '', rating: 0 }
	}

	return {
		sellers,
		getSellerById,
	}
})
