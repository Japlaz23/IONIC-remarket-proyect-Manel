// Categorías disponibles
export const PRODUCT_CATEGORIES = [
  { value: '', label: 'Todos' },
  { value: 'Electrónica', label: 'Electrónica' },
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Moda', label: 'Moda' },
  { value: 'Hogar', label: 'Hogar' },
  { value: 'Libros', label: 'Libros' },
  { value: 'Juguetes', label: 'Juguetes' },
  { value: 'Música', label: 'Música' },
  { value: 'Otro', label: 'Otro' },
]

// Condiciones de productos
export const PRODUCT_CONDITIONS = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Usado - Buen estado', label: 'Usado - Buen estado' },
  { value: 'Usado - Muy bien', label: 'Usado - Muy bien' },
  { value: 'Usado - Tiene daños', label: 'Usado - Tiene daños' },
  { value: 'Para reparar', label: 'Para reparar' },
]

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  titleRequired: 'El título es obligatorio',
  priceRequired: 'El precio es obligatorio',
  priceInvalid: 'El precio debe ser un número válido',
  descriptionRequired: 'La descripción es obligatoria',
  minLength: (field, length) => `${field} debe tener al menos ${length} caracteres`,
  maxLength: (field, length) => `${field} no puede exceder ${length} caracteres`,
}

// Rutas de la app
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/',
  SELL: '/sell',
  CHAT: '/chat/',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
}

// Utilitarios
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getTimeAgo = (date) => {
  const now = new Date()
  const diff = now - new Date(date)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Hace unos segundos'
  if (minutes < 60) return `Hace ${minutes}m`
  if (hours < 24) return `Hace ${hours}h`
  if (days < 30) return `Hace ${days}d`

  return formatDate(date)
}
