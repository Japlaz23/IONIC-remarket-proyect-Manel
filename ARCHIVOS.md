# 🔑 Archivos Clave - Remarket

Referencia rápida de los archivos más importantes.

---

## 📱 Frontend

### `frontend/package.json`
**Qué es:** Dependencias y scripts de npm

**Comandos útiles:**
```bash
npm run dev      # Desarrollo
npm run build    # Compilar
npm run preview  # Preview build
```

**Dependencias clave:**
- `vue` - Framework
- `@ionic/vue` - Componentes mobile
- `vue-router` - Enrutamiento
- `pinia` - Estado
- `axios` - HTTP

---

### `frontend/src/main.js`
**Qué es:** Punto de entrada de la app

**Setup realizado:**
✅ Ionic framework inicializado
✅ Vue Router conectado
✅ Pinia store configurado
✅ CSS de Ionic importado

---

### `frontend/src/App.vue`
**Qué es:** Componente raíz

**Contenido:**
```vue
<ion-app>
  <ion-router-outlet />  <!-- Aquí se cargan las vistas -->
</ion-app>
```

---

### `frontend/src/router/index.js`
**Qué es:** Configuración de rutas

**6 Rutas mapeadas:**
| Ruta | Componente |
|------|-----------|
| `/` | Home.vue |
| `/product/:id` | ProductDetail.vue |
| `/sell` | Sell.vue |
| `/chat/:id` | Chat.vue |
| `/profile` | Profile.vue |
| `/favorites` | Favorites.vue |

**Cómo navegar:**
```javascript
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/product/1')
```

---

### `frontend/src/stores/productStore.js`
**Qué es:** Estado global con Pinia

**State:**
```javascript
products[]          // Array de productos
favorites[]         // IDs favoritos
searchQuery         // Búsqueda actual
selectedCategory    // Filtro categoría
```

**Métodos:**
```javascript
filteredProducts()       // Productos filtrados
getProductById(id)       // Obtener por ID
toggleFavorite(id)       // Añadir/quitar favorito
addProduct(data)         // Crear producto
```

**Cómo usar:**
```javascript
import { useProductStore } from '@/stores/productStore'
const store = useProductStore()
store.toggleFavorite(1)
```

---

### `frontend/src/services/apiService.js`
**Qué es:** Cliente HTTP para comunicarse con backend

**Servicios implementados:**

#### productService
```javascript
getAll(filters)              // GET /products
getById(id)                  // GET /products/:id
search(query)                // GET /products/search
create(data)                 // POST /products
update(id, data)             // PUT /products/:id
delete(id)                   // DELETE /products/:id
```

#### userService
```javascript
register(data)               // POST /auth/register
login(data)                  // POST /auth/login
getProfile()                 // GET /users/profile
updateProfile(data)          // PUT /users/profile
```

#### chatService
```javascript
getConversations()           // GET /chats
getMessages(id)              // GET /chats/:id
sendMessage(id, data)        // POST /chats/:id/messages
startConversation(uid, pid)  // POST /chats
```

#### favoriteService
```javascript
getAll()                     // GET /favorites
add(productId)               // POST /favorites
remove(productId)            // DELETE /favorites/:id
```

**Cómo usar:**
```javascript
import { productService } from '@/services/apiService'

const products = await productService.getAll()
const product = await productService.getById(1)
```

---

### `frontend/src/assets/styles/main.css`
**Qué es:** Estilos globales

**Variables definidas:**
```css
--remarket-green: #1a7f34      /* Verde principal */
--remarket-dark: #0f5223       /* Verde oscuro */
--remarket-light: #e8f5e9      /* Verde claro */
--text-primary: #333           /* Texto oscuro */
--text-secondary: #999         /* Texto opaco */
--border-color: #e0e0e0        /* Bordes */
--bg-light: #f5f5f5            /* Fondo claro */
```

**Cómo personalizar:**
Edita los valores en `:root`

---

### `frontend/src/utils/constants.js`
**Qué es:** Constantes y funciones auxiliares

**Categorías:**
```javascript
PRODUCT_CATEGORIES = [
  { value: 'Electrónica', label: 'Electrónica' },
  { value: 'Deportes', label: 'Deportes' },
  // ...
]
```

**Funciones:**
```javascript
formatPrice(price)           // Formato currency
formatDate(date)             // Fecha legible
getTimeAgo(date)             // "Hace 5 minutos"
```

**Cómo usar:**
```javascript
import { formatPrice, PRODUCT_CATEGORIES } from '@/utils/constants'

console.log(formatPrice(450))  // "450,00 €"
```

---

### `frontend/.env`
**Qué es:** Variables de entorno

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Remarket
```

**Cómo usar:**
```javascript
const api = import.meta.env.VITE_API_URL
```

---

## 📁 Vistas

### `frontend/src/views/Home.vue`
**Página principal**
- Listado de productos
- Searchbar
- Filtros por categoría
- FAB para crear anuncio

### `frontend/src/views/ProductDetail.vue`
**Detalle de producto**
- Imagen del producto
- Información completa
- Datos del vendedor
- Botón chat

### `frontend/src/views/Sell.vue`
**Crear anuncio**
- Formulario con validación
- Selección categoría/condición
- Upload fotos

### `frontend/src/views/Chat.vue`
**Mensajería**
- Historial de mensajes
- Input para escribir
- Interfaz conversacional

### `frontend/src/views/Profile.vue`
**Perfil de usuario**
- Avatar e información
- Estadísticas
- Opciones de cuenta

### `frontend/src/views/Favorites.vue`
**Productos guardados**
- Lista de favoritos
- Opción eliminar
- Estado vacío

---

## 🧩 Componentes

### `frontend/src/components/AppHeader.vue`
**Header reutilizable**

```vue
<AppHeader 
  title="Mi Página"
  :show-back-button="true"
/>
```

### `frontend/src/components/ProductCard.vue`
**Card de producto**

```vue
<ProductCard 
  :product="producto"
  @click="goToDetail"
/>
```

---

## ⚙️ Configuración

### `frontend/vite.config.js`
**Configuración del bundler**
- Setup de alias `@`
- Puerto 5173
- Code splitting automático

### `frontend/index.html`
**HTML principal**
- Meta tags para PWA
- Meta tags para iOS
- Script de main.js

---

## 📚 Documentación

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Documentación principal |
| `SETUP.md` | Instrucciones instalación |
| `QUICKSTART.md` | 30 segundos para empezar |
| `RESUMEN.md` | Resumen completo |
| `CHECKLIST.md` | Estado del proyecto |
| `EXPANSION.md` | Cómo extender |
| `ARCHIVOS.md` | Este archivo |

---

## 🔍 Flujo Típico

### Ejemplo: Buscar producto

1. **Usuario escribe en searchbar** (Home.vue)
   ```vue
   <ion-searchbar v-model="store.searchQuery" />
   ```

2. **Store actualiza state** (productStore.js)
   ```javascript
   searchQuery.value = "iPhone"
   ```

3. **Componente usa computed** (Home.vue)
   ```javascript
   const items = computed(() => store.filteredProducts())
   ```

4. **Se renderiza lista filtrada** (Home.vue)
   ```vue
   <ion-item v-for="product in items">
   ```

---

## 💾 Dónde Guardar Nueva Funcionalidad

| Funcionalidad | Dónde |
|--------------|--------|
| Nueva página | `src/views/` |
| Componente pequeño | `src/components/` |
| Estado global | `src/stores/` |
| Función auxiliar | `src/utils/` |
| Llamada API | `src/services/` |
| Estilos globales | `src/assets/styles/` |

---

**Consulta EXPANSION.md para ejemplos de código** 📚
