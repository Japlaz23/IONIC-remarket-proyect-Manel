import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para añadir el token de autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Servicios de productos
export const productService = {
  getAll: (filters = {}) => apiClient.get('/products', { params: filters }),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
  search: (query) => apiClient.get('/products/search', { params: { q: query } }),
}

// Servicios de usuarios
export const userService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
}

// Servicios de chat
export const chatService = {
  getConversations: () => apiClient.get('/chats'),
  getMessages: (conversationId) => apiClient.get(`/chats/${conversationId}`),
  sendMessage: (conversationId, data) =>
    apiClient.post(`/chats/${conversationId}/messages`, data),
  startConversation: (userId, productId) =>
    apiClient.post('/chats', { userId, productId }),
}

// Servicios de favoritos
export const favoriteService = {
  getAll: () => apiClient.get('/favorites'),
  add: (productId) => apiClient.post('/favorites', { productId }),
  remove: (productId) => apiClient.delete(`/favorites/${productId}`),
}

export default apiClient
