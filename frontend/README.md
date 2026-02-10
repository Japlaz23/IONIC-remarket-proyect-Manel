# Frontend - Remarket

App mobile/web con IONIC + Vue 3 para la plataforma Remarket.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📂 Estructura de Carpetas

```
src/
├── components/      # Componentes reutilizables (Header, Card, etc.)
├── views/           # Páginas completas (Home, ProductDetail, etc.)
├── router/          # Configuración de rutas
├── stores/          # Estado global con Pinia
├── services/        # Servicios API y utilidades
├── assets/          # Estilos CSS e imágenes
├── App.vue          # Componente raíz
└── main.js          # Punto de entrada
```

## 🔀 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Listado principal de productos |
| `/product/:id` | ProductDetail | Detalle de un producto |
| `/sell` | Sell | Formulario para crear anuncio |
| `/chat/:id` | Chat | Conversación con vendedor |
| `/profile` | Profile | Perfil del usuario |
| `/favorites` | Favorites | Productos guardados |

## 🎯 Vistas Implementadas

### 1. **Home** (`/`)
- Listado de productos con imagen, título, precio
- Barra de búsqueda
- Filtros por categoría (todos, Electrónica, Deportes, Moda)
- Favoritos deslizables
- FAB para crear anuncio

### 2. **ProductDetail** (`/product/:id`)
- Galería de imágenes
- Información del producto (precio, estado, categoría)
- Datos del vendedor con rating
- Descripción completa
- Botón para chatear

### 3. **Sell** (`/sell`)
- Formulario para crear anuncio
- Campos: título, descripción, precio, categoría, condición, ubicación
- Upload de fotos (mock)
- Validación básica

### 4. **Chat** (`/chat/:id`)
- Interfaz de mensajería
- Historial de mensajes
- Input para escribir mensajes
- Diseño conversacional

### 5. **Profile** (`/profile`)
- Avatar e info del usuario
- Rating y estadísticas (12 anuncios, 8 vendidos)
- Links a: mis anuncios, mis chats, mis compras, configuración
- Botón logout

### 6. **Favorites** (`/favorites`)
- Listado de productos favoritos
- Botón para eliminar de favoritos
- Estado vacío con CTA

## 🎨 Componentes Principales

### Ionic Components Utilizados
- `IonHeader` / `IonToolbar` - Navegación superior
- `IonContent` - Área de contenido scrollable
- `IonList` / `IonItem` - Listas
- `IonButton` - Botones
- `IonIcon` - Iconografía (ionicons)
- `IonCard` - Tarjetas
- `IonInput` / `IonTextarea` - Inputs
- `IonSegment` - Selector de filtros
- `IonFab` - Botón flotante
- `IonSearchbar` - Búsqueda
- `IonItemSliding` - Items con opciones deslizables
- `IonFooter` - Pie de página

## 🗂️ State Management (Pinia)

### Store: `productStore`

```javascript
// Getters
filteredProducts()   // Productos filtrados por búsqueda/categoría
getProductById(id)   // Obtener producto por ID

// Actions
toggleFavorite(id)   // Añadir/quitar de favoritos
addProduct(data)     // Crear nuevo anuncio

// State
products[]          // Listado de productos
favorites[]         // IDs de favoritos
searchQuery         // Término de búsqueda
selectedCategory    // Categoría seleccionada
```

## 🌐 API Service

Archivo: `src/services/apiService.js`

Define servicios para:
- **productService** - CRUD de productos, búsqueda
- **userService** - Auth, perfil
- **chatService** - Mensajes, conversaciones
- **favoriteService** - Gestión de favoritos

### Ejemplo de uso:

```javascript
import { productService } from '@/services/apiService'

// En setup()
const products = await productService.getAll()
```

## 🎨 Estilos

### Colores Principales
```css
--remarket-green: #1a7f34      /* Verde principal */
--remarket-dark: #0f5223       /* Verde oscuro */
--text-primary: #333           /* Texto oscuro */
--text-secondary: #999         /* Texto opaco */
```

### CSS Global
- Archivo: `src/assets/styles/main.css`
- Animaciones suaves (fadeIn)
- Responsive design
- Ionicons para iconografía

## 🔧 Configuración Vite

El proyecto usa **Vite** como bundler:
- Dev server en `http://localhost:5173`
- Hot Module Replacement (HMR) habilitado
- Build optimizado para producción

## 📦 Dependencias Principales

```json
{
  "@ionic/vue": "^8.7.17",
  "@ionic/core": "^8.7.17",
  "vue": "^3.5.25",
  "vue-router": "^4.x",
  "pinia": "^2.x",
  "axios": "^1.x",
  "ionicons": "^8.0.13"
}
```

## 🚀 Scripts

```bash
npm run dev           # Dev server
npm run build         # Build producción
npm run preview       # Preview build
```

## 📱 Responsive Design

- Mobile first approach
- Tested on iOS y Android
- Tablet compatibility
- Breakpoints: 640px, 768px

## 🔐 Autenticación (Por implementar)

Cuando se conecte el backend:
1. Login/Register con email
2. JWT token en `localStorage`
3. Interceptor de Axios para añadir token
4. Rutas protegidas con guards

## 💬 Chat (Por implementar)

- WebSockets para mensajes en tiempo real
- Historial persistente
- Notificaciones
- Estados (visto, entregado)

---

**Próximos pasos**: Conectar con backend Node.js/Express
