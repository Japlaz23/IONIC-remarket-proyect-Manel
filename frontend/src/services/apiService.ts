import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const productService = {
  getAll: (filters = {}) => apiClient.get('/products', { params: filters }),
  getById: (id: string | number) => apiClient.get(`/products/${id}`),
  create: (data: Record<string, any>) => apiClient.post('/products', data),
  update: (id: string | number, data: Record<string, any>) =>
    apiClient.put(`/products/${id}`, data),
  delete: (id: string | number) => apiClient.delete(`/products/${id}`),
  search: (query: string) => apiClient.get('/products/search', { params: { q: query } }),
}

export const userService = {
  register: (data: Record<string, any>) => apiClient.post('/auth/register', data),
  login: (data: Record<string, any>) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: Record<string, any>) => apiClient.put('/users/profile', data),
}

export const chatService = {
  getConversations: () => apiClient.get('/chats'),
  getMessages: (conversationId: string | number) =>
    apiClient.get(`/chats/${conversationId}`),
  sendMessage: (conversationId: string | number, data: Record<string, any>) =>
    apiClient.post(`/chats/${conversationId}/messages`, data),
  startConversation: (userId: string | number, productId: string | number) =>
    apiClient.post('/chats', { userId, productId }),
}

export const favoriteService = {
  getAll: () => apiClient.get('/favorites'),
  add: (productId: string | number) => apiClient.post('/favorites', { productId }),
  remove: (productId: string | number) => apiClient.delete(`/favorites/${productId}`),
}

export default apiClient
