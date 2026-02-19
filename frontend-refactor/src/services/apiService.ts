import axios from 'axios'
export const api = axios.create({
  baseURL: 'https://api.tuapp.com',
})
export async function fetchProducts() {
  const { data } = await api.get('/products')
  return data
}