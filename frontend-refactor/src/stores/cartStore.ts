import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products = ref<number[]>([])

  function addProduct(id: number) {
    if (!products.value.includes(id)) {
      products.value.push(id)
    }
  }

  function removeProduct(id: number) {
    products.value = products.value.filter(pid => pid !== id)
  }

  function clearCart() {
    products.value = []
  }

  return {
    products,
    addProduct,
    removeProduct,
    clearCart
  }
})
