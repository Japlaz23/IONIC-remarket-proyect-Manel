import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useProductStore } from '@/stores/productStore';

export interface Seller {
	phone: string;
	avatar: string;
	id: number;
	name: string;
    email: string;
	location: string;
}

export const useSellerStore = defineStore('seller', () => {
	const productStore = useProductStore();

	// Genera la lista de vendedores únicos a partir de los productos
	const sellers = computed<Seller[]>(() => {
		const map = new Map<number, Seller>();
		for (const p of productStore.products) {
			if (!map.has(p.sellerId)) {
				map.set(p.sellerId, {
					id: p.sellerId,
					name: p.seller,
					email: p.sellerEmail || '', 
					avatar: p.sellerAvatar || '',
					phone: (p as { phone?: string }).phone || '',
					location: p.location,
				});
			}
		}
		return Array.from(map.values());
	});

	// Obtener vendedor por id
	const getSellerById = (id: number | string) => {
		return sellers.value.find(s => String(s.id) === String(id)) || null;
	};

	return {
		sellers,
		getSellerById,
	};
});
