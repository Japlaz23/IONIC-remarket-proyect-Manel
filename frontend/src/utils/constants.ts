export const PRODUCT_CATEGORIES = [
  { value: '', label: 'Todos' },
  { value: 'Electrónica', label: 'Electrónica' },
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Moda', label: 'Moda' },
]

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
