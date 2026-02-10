# 📚 Guía de Expansión - Remarket

Cómo extender la aplicación con nuevas funcionalidades.

---

## 🆕 Añadir una Nueva Vista

### Paso 1: Crear el componente
Crea `src/views/MiVista.vue`:

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Mi Vista</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h1>Contenido aquí</h1>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
</script>

<style scoped>
/* Tus estilos */
</style>
```

### Paso 2: Registrar ruta
Edita `src/router/index.js`:

```javascript
{
  path: '/mi-vista',
  name: 'MiVista',
  component: () => import('../views/MiVista.vue'),
}
```

### Paso 3: Navegar
En cualquier componente:

```javascript
import { useRouter } from 'vue-router'
const router = useRouter()

// Navegar
router.push('/mi-vista')
```

---

## 🧩 Crear un Nuevo Componente Reutilizable

### Archivo: `src/components/MiComponente.vue`

```vue
<template>
  <div class="mi-componente">
    <h2>{{ titulo }}</h2>
    <p>{{ contenido }}</p>
    <button @click="miFuncion">{% raw %}{{ 'Hacer Algo' }}{% endraw %}</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const miFuncion = () => {
  emit('click', 'dato')
}
</script>

<style scoped>
.mi-componente {
  padding: 16px;
  border-radius: 8px;
  background: white;
}
</style>
```

### Usar el componente:

```vue
<MiComponente 
  titulo="Hola"
  contenido="Texto"
  @click="manejarClick"
/>
```

---

## 💾 Agregar Estado Global (Nuevo Store)

### Crear: `src/stores/chatStore.js`

```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref([
    {
      id: 1,
      userId: 1,
      userName: 'Juan',
      lastMessage: 'Hola',
      unread: 2
    }
  ])

  const messages = ref([])

  const getConversation = (id) => {
    return conversations.value.find(c => c.id === id)
  }

  const addMessage = (conversationId, message) => {
    messages.value.push({
      conversationId,
      ...message
    })
  }

  return {
    conversations,
    messages,
    getConversation,
    addMessage
  }
})
```

### Usar en componente:

```javascript
import { useChatStore } from '@/stores/chatStore'

const chatStore = useChatStore()

// Acceder
chatStore.conversations

// Modificar
chatStore.addMessage(1, { text: 'Hola' })
```

---

## 🌐 Conectar con API Backend

### 1. Actualizar `.env`

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Usar en servicio

Los servicios ya están configurados en `src/services/apiService.js`:

```javascript
import { productService } from '@/services/apiService'

// En el store o componente
const products = await productService.getAll()
const product = await productService.getById(1)
await productService.create(newProduct)
```

### 3. Actualizar Store

```javascript
import { productService } from '@/services/apiService'

export const useProductStore = defineStore('product', () => {
  const fetchProducts = async () => {
    try {
      const response = await productService.getAll()
      products.value = response.data
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return { fetchProducts }
})
```

---

## 📸 Añadir Upload de Imágenes

### 1. Crear input file

```vue
<input 
  ref="fileInput"
  type="file" 
  @change="handleImageUpload"
  accept="image/*"
  multiple
/>
```

### 2. Procesar imagen

```javascript
const handleImageUpload = (event) => {
  const files = event.target.files
  
  for (let file of files) {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      images.value.push(e.target.result)
    }
    
    reader.readAsDataURL(file)
  }
}
```

### 3. Enviar al servidor

```javascript
const uploadImages = async (files) => {
  const formData = new FormData()
  
  for (let file of files) {
    formData.append('images', file)
  }
  
  try {
    const response = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (error) {
    console.error('Upload error:', error)
  }
}
```

---

## 🔐 Agregar Autenticación

### 1. Crear store de usuario

```javascript
// src/stores/userStore.js
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = async (email, password) => {
    const response = await userService.login({ email, password })
    const { token, user: userData } = response.data
    
    localStorage.setItem('auth_token', token)
    user.value = userData
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, logout }
})
```

### 2. Guard de rutas protegidas

```javascript
// En router/index.js
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})

// En rutas:
{
  path: '/profile',
  component: Profile,
  meta: { requiresAuth: true }
}
```

---

## 🎨 Personalizar Estilos

### Cambiar color principal

Edita `src/assets/styles/main.css`:

```css
:root {
  --remarket-green: #FF6B35;  /* Tu color */
  --remarket-dark: #FF4500;
  --remarket-light: #FFE5D9;
}
```

### Crear tema oscuro

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #fff;
    --text-secondary: #ddd;
    --bg-light: #1a1a1a;
  }
}
```

---

## ⚙️ Variables de Entorno

### .env disponibles

```env
VITE_API_URL=           # URL del servidor
VITE_APP_NAME=Remarket # Nombre de la app
```

### Usarlas en código

```javascript
const apiUrl = import.meta.env.VITE_API_URL
const appName = import.meta.env.VITE_APP_NAME
```

---

## 🧪 Testing (Próximo Paso)

### Instalar Vitest

```bash
npm install -D vitest @vue/test-utils jsdom
```

### Test de componente

```javascript
// Home.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renderiza el home', () => {
    const wrapper = mount(Home)
    expect(wrapper.exists()).toBe(true)
  })
})
```

---

## 🚀 Deploy en Producción

### Build

```bash
npm run build
```

Esto crea la carpeta `dist/` lista para servidor.

### Opciones de deploy:

1. **Vercel** (recomendado para frontend)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Conecta tu repo en netlify.com

3. **Heroku** (con backend)
   ```bash
   heroku create mi-app
   git push heroku main
   ```

---

## 📝 Checklist para Expandir

- ⬜ Decidir nueva funcionalidad
- ⬜ Crear vista / componente
- ⬜ Registrar rutas
- ⬜ Agregar estado si es necesario
- ⬜ Conectar con API si es necesario
- ⬜ Probar en dev
- ⬜ Testear bien
- ⬜ Deploy

---

**¡Ahora estás listo para expandir Remarket!** 🎉
