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

export const brandsByCategory: Record<string, Array<{ value: string; label: string }>> = {
  'Electrónica': [
    { value: 'all', label: 'Todas' },
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'huawei', label: 'Huawei' },
    { value: 'msi', label: 'MSI' },
    { value: 'sony', label: 'Sony' },
    { value: 'lg', label: 'LG' },
  ],
  'Moda': [
    { value: 'all', label: 'Todas' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'zara', label: 'Zara' },
    { value: 'nike', label: 'Nike' },
    { value: 'h&m', label: 'H&M' },
    { value: 'gucci', label: 'Gucci' },
    { value: 'prada', label: 'Prada' },
  ],
  'Vehículos': [
    { value: 'all', label: 'Todas' },
    { value: 'mazda', label: 'Mazda' },
    { value: 'seat', label: 'Seat' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'mercedes', label: 'Mercedes' },
  ],
  'Hogar': [
    { value: 'all', label: 'Todas' },
    { value: 'ikea', label: 'IKEA' },
    { value: 'philips', label: 'Philips' },
    { value: 'dyson', label: 'Dyson' },
    { value: 'bosch', label: 'Bosch' },
  ],
  'Deportes': [
    { value: 'all', label: 'Todas' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'nike', label: 'Nike' },
    { value: 'puma', label: 'Puma' },
    { value: 'decathlon', label: 'Decathlon' },
  ],
}

