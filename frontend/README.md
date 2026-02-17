# 🛍️ Remarket - Frontend

Aplicación móvil de marketplace construida con **Ionic + Vue 3 + TypeScript**.

## 🚀 Tecnologías

- **Ionic 8.7.17** - Framework UI para aplicaciones móviles
- **Vue 3.5.25** - Framework JavaScript progresivo
- **TypeScript 5.4.5** - Superset tipado de JavaScript
- **Vite 7.3.1** - Build tool y dev server ultrarrápido
- **Pinia 3.0.4** - State management para Vue 3
- **Vue Router 4.6.4** - Enrutamiento oficial de Vue
- **Axios 1.6.0** - Cliente HTTP
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **Ionicons 8.0.0** - Librería de iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 🏃 Ejecutar el proyecto

```bash
# Modo desarrollo (http://localhost:5173)
npm ionic serve

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Verificación de tipos TypeScript
npm run type-check
```

## 📱 Estructura del Proyecto

```
frontend/
├── src/
│   ├── main.ts                    # Punto de entrada de la app
│   ├── App.vue                    # Componente raíz
│   ├── env.d.ts                   # Declaraciones TypeScript
│   │
│   ├── views/                     # Vistas/Páginas (17 vistas)
│   │   ├── Home.vue               # Página principal con carousel infinito
│   │   ├── Login.vue              # Autenticación avanzada
│   │   ├── Register.vue           # Registro de usuarios
│   │   ├── RestorePassword.vue    # Recuperación de contraseña (3 pasos)
│   │   ├── ProductDetail.vue      # Detalle con galería y reviews
│   │   ├── Sell.vue               # Crear anuncio (formulario avanzado)
│   │   ├── Search.vue             # Búsqueda avanzada con filtros
│   │   ├── Favorites.vue          # Productos favoritos
│   │   ├── Chat.vue               # Lista de conversaciones
│   │   ├── ChatConversation.vue   # Conversación individual
│   │   ├── Tabs.vue               # Navegación con tabs (móvil)
│   │   ├── ProfileCostumer.vue    # Perfil del comprador
│   │   ├── ProfielSeller.vue      # Perfil del vendedor
│   │   ├── Sales.vue              # Gestión de ventas activas/vendidas
│   │   ├── Purchases.vue          # Historial de compras y reviews
│   │   └── Settings.vue           # Configuración completa de usuario
│   │
│   ├── router/
│   │   └── index.ts               # 19+ rutas con autenticación
│   │
│   ├── stores/                    # State Management (Pinia)
│   │   ├── productStore.ts        # Productos y búsqueda
│   │   ├── chatStore.ts           # Mensajería en tiempo real
│   │   ├── reviewStore.ts         # Sistema de valoraciones
│   │   ├── favoriteStore.ts       # Gestión de favoritos
│   │   └── sellerStore.ts         # Datos de vendedores
│   │
│   ├── services/
│   │   └── apiService.ts          # Cliente API con Axios
│   │
│   ├── utils/
│   │   └── constants.ts           # Constantes y utilidades
│   │
│   └── assets/
│       └── styles/
│           └── main.css           # Estilos globales
│
├── public/                        # Archivos estáticos
├── index.html                     # HTML principal
├── vite.config.ts                 # Configuración de Vite
├── tsconfig.json                  # Configuración de TypeScript
├── tailwind.config.js             # Configuración de Tailwind
└── postcss.config.js              # Configuración de PostCSS
```

## 🎨 Características Principales

### ✨ Funcionalidades Destacadas

- **🎠 Carousel Infinito**: Desplazamiento continuo de productos destacados en Home
- **🔍 Búsqueda Avanzada**: Filtros multicapa (categoría, precio, estado, ubicación, ordenamiento)
- **💬 Sistema de Chat**: Mensajería en tiempo real para comprador/vendedor/soporte
- **⭐ Reviews y Valoraciones**: Sistema completo de reseñas con fotos y verificación de compra
- **❤️ Favoritos**: Gestión de productos guardados con sincronización
- **📱 Responsive**: Optimizado para móvil (tabs) y desktop (FAB flotante)
- **🛒 Gestión Completa**: Ventas activas, historial de compras, configuración de usuario
- **🔐 Autenticación Avanzada**: Login, registro, recuperación de contraseña en 3 pasos
- **📝 Formulario Profesional**: Crear anuncios con campos dinámicos por categoría
- **🎯 17 Vistas**: Cobertura completa del flujo comprador-vendedor

### 🔐 Autenticación Avanzada

- **Login.vue**: Diseño moderno con:
  - Fondo animado con formas flotantes
  - Layout responsivo (móvil/tablet/desktop)
  - Sección visual en desktop con features de la app
  - Integración con Google OAuth
  - Opción de login como invitado
  - Validación de formularios en tiempo real

- **Register.vue**: Registro completo con:
  - Validación de email y contraseña
  - Confirmación de contraseña
  - Términos y condiciones
  - Registro con Google

- **RestorePassword.vue**: Flujo en 3 pasos:
  1. Verificación de email
  2. Código de confirmación
  3. Nueva contraseña con indicador de fortaleza

### 🏠 Home - Vista Principal

**Características únicas:**
- **Carousel Infinito**: Desplazamiento horizontal continuo de productos destacados
- **Sistema de Filtros Multicapa**:
  - Búsqueda en tiempo real con barra personalizada
  - Filtro por categorías (Electrónica, Moda, Hogar, Deportes, etc.)
  - Filtro por rango de precios (slider dual)
  - Filtro por estado (Nuevo, Como nuevo, Usado)
  - Filtro por ubicación
  - Ordenar por: Recientes, Precio ↑↓, Popularidad
- **Grid Responsivo**: 1 columna (móvil) → 2 (tablet) → 3-4 (desktop)
- **Infinite Scroll**: Carga progresiva de productos
- **FAB Flotante** (solo desktop > 1024px):
  - Botón de acceso rápido a: Publicar, Chat Vendedor, Chat Soporte
  - Contador de mensajes sin leer

### 🛒 Marketplace - Funcionalidades Completas

#### **ProductDetail.vue**
- Galería de imágenes con navegación
- Información detallada del producto (precio, estado, descripción)
- Sistema de reviews y valoraciones (⭐ rating)
- Botones de acción: Comprar, Favorito, Contactar vendedor
- Perfil del vendedor con puntuación
- Productos relacionados del mismo vendedor

#### **Sell.vue - Formulario Profesional** (711 líneas)
- **Gestión de Imágenes**: Subir hasta 5 fotos, reordenar, eliminar
- **Campos Dinámicos por Categoría**:
  - Electrónica: Marca, Modelo, características (caja original, accesorios, cargador)
  - Moda: Talla, características (nunca usado, etiqueta original)
  - Vehículos: Año, Kilómetros, características (historial, ITV)
- **Sistema de Garantías**: Ninguna / Vendedor / Fabricante / Extendida
- **Tags Personalizados**: Hasta 5 etiquetas con animación
- **Opciones de Seguridad**: Tipo de pago, encuentro en persona, negociable
- **Validación Completa**: Contadores de caracteres (título 6-80, descripción 11-500)
- **Barra de Progreso**: Tracking de completitud del formulario

#### **Search.vue**
- Búsqueda avanzada con filtros combinados
- Historial de búsquedas recientes
- Sugerencias automáticas
- Guardado de búsquedas favoritas

#### **Favorites.vue**
- Lista de productos guardados con marca de corazón
- Sincronización con `favoriteStore`
- Notificaciones de cambios de precio
- Eliminación con confirmación

### 💬 Sistema de Mensajería

#### **Chat.vue**
- Lista de conversaciones activas
- Filtros: Todas / Comprador / Vendedor / Soporte
- Contador de mensajes sin leer por chat
- Preview del último mensaje
- Estado online/offline

#### **ChatConversation.vue**
- Conversación en tiempo real
- Envío de mensajes con timestamp
- Indicadores de lectura
- Envío de imágenes
- Información del producto en contexto

### 👤 Perfiles y Gestión de Usuario

#### **ProfileCostumer.vue**
- Información del usuario (avatar, nombre, valoración)
- Estadísticas: Compras realizadas, Favoritos, Reviews
- Navegación a: Mis Compras, Mis Ventas, Configuración
- Menú de opciones: Métodos de pago, Direcciones, Notificaciones

#### **ProfielSeller.vue**
- Perfil público del vendedor
- Puntuación y número de ventas
- Productos activos del vendedor
- Reviews de compradores
- Tiempo de respuesta promedio

#### **Sales.vue** (550+ líneas)
- **Gestión de Productos en Venta**:
  - Vista vacía con CTA para crear anuncio
  - Tarjetas de estadísticas: Activos, Vendidos, Visualizaciones totales
  - Filtro por estado: Todos / Activos / Vendidos
  - Grid responsivo (1-2-3 columnas)
  - Acciones por producto: Editar, Eliminar (con confirmación)
  - Badges de estado (activo/vendido)
  - Contadores de vistas y mensajes

#### **Purchases.vue** (370+ líneas)
- **Historial de Compras**:
  - Vista vacía con CTA para explorar productos
  - Filtro por estado: Todos / Pendiente / Entregado
  - Información completa: Producto, vendedor, fecha, precio total
  - Badges de estado con iconos
  - Detalles: Cantidad, precio unitario, método de envío
  - Acciones: Ver detalles, Contactar vendedor, Dejar review
  - Sistema de reviews integrado

#### **Settings.vue** (553 líneas)
- **Configuración Completa del Usuario**:
  1. **Mi Perfil**: Nombre, email, teléfono, bio
  2. **Dirección de Envío**: Calle, ciudad, código postal, país
  3. **Métodos de Pago**: Tarjetas y cuentas bancarias (añadir/eliminar)
  4. **Notificaciones**: Toggles para email, mensajes, promociones, pedidos
  5. **Privacidad y Seguridad**:
     - Cambiar contraseña
     - Perfil público/privado
     - Mostrar/ocultar valoración
     - Gestionar usuarios bloqueados
  6. **Preferencias**: Modo oscuro, idioma (es/en/fr)
  7. **Zona de Peligro**: Descargar datos, eliminar cuenta
  - Botones: Guardar cambios, Restablecer configuración

### 📊 Sistema de Reviews

- Valoración por estrellas (1-5 ⭐)
- Comentarios de texto
- Fotos en reviews
- Respuesta del vendedor
- Filtros: Todas / Positivas / Negativas
- Verificación de compra
- Reporte de reviews inapropiadas

## 🎯 Rutas Disponibles (19 rutas)

| Ruta                    | Componente          | Auth | Descripción                         |
|-------------------------|---------------------|------|-------------------------------------|
| `/`                     | Home                | No   | Página principal con carousel       |
| `/login`                | Login               | No   | Inicio de sesión                    |
| `/register`             | Register            | No   | Registro de cuenta                  |
| `/restorepassword`      | RestorePassword     | No   | Recuperar contraseña (3 pasos)      |
| `/product/:id`          | ProductDetail       | No   | Detalle de producto con reviews     |
| `/search`               | Search              | No   | Búsqueda avanzada con filtros       |
| `/tabs`                 | Tabs                | Sí   | Navegación por tabs (móvil)         |
| `/tabs/home`            | Home                | No   | Home dentro de tabs                 |
| `/tabs/favorites`       | Favorites           | Sí   | Favoritos en tab                    |
| `/tabs/sell`            | Sell                | Sí   | Crear anuncio desde tab             |
| `/tabs/chat`            | Chat                | Sí   | Lista de chats en tab               |
| `/tabs/profile`         | ProfileCostumer     | Sí   | Perfil de usuario en tab            |
| `/sell`                 | Sell                | Sí   | Crear anuncio (standalone)          |
| `/chat/:id`             | ChatConversation    | Sí   | Conversación individual             |
| `/profile`              | ProfileCostumer     | Sí   | Perfil del comprador                |
| `/seller/:id`           | ProfielSeller       | No   | Perfil público del vendedor         |
| `/sales`                | Sales               | Sí   | Gestión de productos en venta       |
| `/purchases`            | Purchases           | Sí   | Historial de compras                |
| `/settings`             | Settings            | Sí   | Configuración de usuario            |

**Rutas Protegidas**: Las rutas marcadas con Auth=Sí requieren autenticación y redirigen a `/login` si el usuario no está logueado.

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

### Colores Personalizados

El tema principal usa el color **remarket-green** (`#1a7f34`) definido en `tailwind.config.js`:

```js
colors: {
  'remarket-green': '#1a7f34',
}
```

### Alias de Importación

El alias `@/` está configurado para apuntar a `src/`:

```ts
import { useRouter } from 'vue-router'
import Home from '@/views/Home.vue'
```

## 📝 Scripts Disponibles

| Comando              | Descripción                                |
|----------------------|--------------------------------------------|
| `npm run dev`        | Inicia servidor de desarrollo             |
| `npm run build`      | Compila para producción                   |
| `npm run preview`    | Preview del build                         |
| `npm run type-check` | Verifica tipos TypeScript                 |

## 🎨 Guía de Estilos

### Componentes Ionic

Usa componentes de Ionic para UI nativa:

```vue
<template>
  <ion-page>
    <ion-content>
      <ion-button color="success">Click Me</ion-button>
    </ion-content>
  </ion-page>
</template>
```

### TypeScript en Vue

Todos los componentes usan `<script setup lang="ts">`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface User {
  name: string
  email: string
}

const user = ref<User>({
  name: 'John',
  email: 'john@example.com'
})
</script>
```

### API Service

El servicio API incluye interceptores para autenticación:

```ts
import { productService } from '@/services/apiService'

// GET request
const products = await productService.getAll()

// POST request con auth token automático
const newProduct = await productService.create(productData)
```

## 🌐 Integración con Backend

El frontend está configurado para conectarse al backend en `http://localhost:3000/api`.

### Stores de Pinia (5 stores)

1. **productStore.ts**
   - Listado de productos con paginación
   - Búsqueda y filtros multicapa
   - CRUD de productos
   - Productos destacados y relacionados

2. **chatStore.ts**
   - Gestión de conversaciones
   - Mensajes en tiempo real
   - Contador de no leídos
   - Persistencia en localStorage

3. **reviewStore.ts**
   - Sistema de valoraciones
   - Comentarios y fotos en reviews
   - Filtrado de reviews
   - Verificación de compra

4. **favoriteStore.ts**
   - Añadir/eliminar favoritos
   - Sincronización entre vistas
   - Notificaciones de cambios de precio
   - Persistencia local

5. **sellerStore.ts**
   - Información de vendedores
   - Estadísticas de ventas
   - Reputación y valoraciones
   - Productos del vendedor

### Servicios API Disponibles

- `productService` - CRUD de productos, búsqueda, filtros
- `userService` - Gestión de usuarios, perfiles
- `chatService` - Mensajería en tiempo real
- `favoriteService` - Favoritos y listas de deseos
- `reviewService` - Valoraciones y comentarios
- `sellerService` - Información de vendedores

## 🔒 Autenticación

El token JWT se almacena en `localStorage` y se inyecta automáticamente en las peticiones HTTP mediante interceptores de Axios.

```ts
// El token se añade automáticamente a todas las peticiones
axios.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    config.headers.Authorization = `Bearer ${userData.token}`
  }
  return config
})
```

## 📱 Responsive Design

### Breakpoints Principales

- **Móvil Small**: < 425px
- **Móvil Large**: 425px - 768px
- **Tablet**: 769px - 1023px
- **Desktop**: > 1024px

### Diferencias Móvil vs Desktop

#### 📱 **En Móvil (< 1024px)**

1. **Navegación por Tabs**:
   - Tab bar inferior con 5 secciones
   - Iconos: Home, Favoritos, Vender, Chat, Perfil
   - Transiciones suaves entre tabs

2. **Layout Optimizado**:
   - Grid de productos: 1 columna (< 425px), 2 columnas (425-768px)
   - Menú lateral deslizante para filtros
   - Headers compactos con menos información
   - Botones full-width en formularios

3. **FAB Oculto**:
   - El botón flotante (FAB) NO aparece en móvil
   - Acciones disponibles desde tabs y menús

4. **Carousel Táctil**:
   - Deslizamiento horizontal optimizado para touch
   - Indicadores de posición más grandes

5. **Formularios Verticales**:
   - Campos de formulario apilados
   - Teclado virtual optimizado por tipo de input

#### 💻 **En Desktop (> 1024px)**

1. **Navegación de Escritorio**:
   - Header fijo con logo, búsqueda y menú
   - Sin tab bar inferior
   - Breadcrumbs para navegación

2. **Layout Expandido**:
   - Grid de productos: 3-4 columnas
   - Filtros laterales siempre visibles
   - Paneles de información expandidos
   - Multi-columna en formularios

3. **FAB Flotante Activo**:
   - Botón flotante en esquina inferior derecha
   - Despliega menú con: Publicar, Chat Vendedor, Soporte
   - Badge con contador de mensajes sin leer

4. **Hover Effects**:
   - Tarjetas con efecto hover y sombras
   - Tooltips en iconos
   - Animaciones suaves en botones

5. **Vistas en Paralelo**:
   - Chat con lista de conversaciones + mensaje activo
   - Filtros + resultados en mismo viewport
   - Modales más grandes y centrados

### Componentes Específicos por Dispositivo

```vue
<!-- Mostrar solo en desktop -->
<div class="desktop-only">
  <ion-fab>...</ion-fab>
</div>

<!-- Mostrar solo en móvil -->
<div class="mobile-only">
  <ion-tabs>...</ion-tabs>
</div>
```

### Media Queries Personalizadas

```css
/* Ocultar FAB en dispositivos móviles */
@media (max-width: 1023px) {
  ion-fab {
    display: none;
  }
}

/* Grid responsivo de productos */
@media (max-width: 424px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 425px) and (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🐛 Debugging

### Errores Comunes

1. **Error de módulo 'path'**: Instala `@types/node`
   ```bash
   npm install -D @types/node
   ```

2. **Error de Tailwind CSS**: Verifica que uses `@tailwindcss/postcss` en `postcss.config.js`

3. **Routing no funciona**: El proyecto usa `createWebHashHistory` para compatibilidad

## 📄 Licencia

Este proyecto es parte de **Remarket** - Marketplace de segunda mano.

---

## 👨‍💻 Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

**¿Preguntas o problemas?** Abre un issue en el repositorio.

🚀 **¡Happy coding!**
