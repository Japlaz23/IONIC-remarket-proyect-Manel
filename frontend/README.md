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
npm run dev

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
│   ├── main.ts                 # Punto de entrada de la app
│   ├── App.vue                 # Componente raíz
│   ├── env.d.ts               # Declaraciones TypeScript
│   │
│   ├── views/                  # Vistas/Páginas
│   │   ├── Home.vue           # Listado de productos
│   │   ├── Login.vue          # Autenticación (diseño avanzado)
│   │   ├── Register.vue       # Registro de usuarios
│   │   ├── RestorePassword.vue # Recuperación de contraseña
│   │   ├── ProductDetail.vue  # Detalle de producto
│   │   ├── Sell.vue           # Crear anuncio
│   │   ├── Chat.vue           # Mensajería
│   │   ├── Profile.vue        # Perfil de usuario
│   │   └── Favorites.vue      # Productos favoritos
│   │
│   ├── router/
│   │   └── index.ts           # Configuración de rutas
│   │
│   ├── stores/
│   │   └── productStore.ts    # Store de productos (Pinia)
│   │
│   ├── services/
│   │   └── apiService.ts      # Cliente API con Axios
│   │
│   ├── utils/
│   │   └── constants.ts       # Constantes y utilidades
│   │
│   └── assets/
│       └── styles/
│           └── main.css       # Estilos globales
│
├── public/                     # Archivos estáticos
├── index.html                 # HTML principal
├── vite.config.ts             # Configuración de Vite
├── tsconfig.json              # Configuración de TypeScript
├── tailwind.config.js         # Configuración de Tailwind
└── postcss.config.js          # Configuración de PostCSS
```

## 🎨 Características Principales

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

### 🏠 Vista Principal (Home)

- Listado de productos con búsqueda y filtros
- Integración con Pinia store
- Navegación a detalle de producto

### 🛒 Funcionalidades

- **ProductDetail**: Vista completa del producto
- **Sell**: Formulario para crear anuncios
- **Favorites**: Gestión de productos favoritos
- **Chat**: Sistema de mensajería
- **Profile**: Perfil y configuración de usuario

## 🎯 Rutas Disponibles

| Ruta               | Componente         | Descripción                    |
|--------------------|--------------------|--------------------------------|
| `/`                | Home               | Página principal              |
| `/login`           | Login              | Inicio de sesión              |
| `/register`        | Register           | Registro de cuenta            |
| `/restorepassword` | RestorePassword    | Recuperar contraseña          |
| `/product/:id`     | ProductDetail      | Detalle de un producto        |
| `/sell`            | Sell               | Crear nuevo anuncio           |
| `/chat/:id`        | Chat               | Conversación con vendedor     |
| `/profile`         | Profile            | Perfil de usuario             |
| `/favorites`       | Favorites          | Productos guardados           |

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

Los servicios disponibles son:
- `productService` - CRUD de productos
- `userService` - Gestión de usuarios
- `chatService` - Mensajería
- `favoriteService` - Favoritos

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

La aplicación está optimizada para:
- **Móvil**: < 769px
- **Tablet**: 769px - 991px
- **Desktop**: > 992px

Las vistas de autenticación incluyen breakpoints específicos para cada tamaño.

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
