# 🚀 Guía de Instalación y Uso - Remarket

Bienvenido a **Remarket**, tu plataforma de compraventa tipo Wallapop/BlackMarket.

## 📋 Requisitos Previos

- **Node.js** v16+ (descargar de [nodejs.org](https://nodejs.org/))
- **npm** (viene con Node.js)
- Editor como **VS Code**

## 🎯 Setup Inicial

### 1️⃣ Clonar/Descargar el Proyecto

```bash
cd "c:\Users\USER\Desktop\Pruebas\IONIC-remarket-proyect-Manel"
```

### 2️⃣ Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

Esto instalará:
- ✅ Vue 3
- ✅ IONIC Framework
- ✅ Vue Router
- ✅ Pinia (State Management)
- ✅ Axios (HTTP Client)
- ✅ Ionicons

## 🏃 Ejecutar la Aplicación

### Modo Desarrollo

```bash
cd frontend
npm run dev
```

La app se abrirá automáticamente en:
```
http://localhost:5173
```

### Modo Producción

```bash
npm run build      # Genera la compilación
npm run preview    # Vista previa del build
```

## 📱 Características Principales

### 🏠 Home (`/`)
- Listado de productos
- Búsqueda en tiempo real
- Filtros por categoría
- Sistema de favoritos

### 📦 Detalles del Producto (`/product/:id`)
- Galería de imágenes
- Info completa del producto
- Datos del vendedor
- Botón para chatear

### ➕ Crear Anuncio (`/sell`)
- Formulario completo
- Categorías y condiciones
- Selección de ubicación
- Upload de fotos (mock)

### 💬 Chat (`/chat/:id`)
- Interfaz de mensajería
- Historial de conversaciones
- Envío de mensajes

### ❤️ Favoritos (`/favorites`)
- Lista de productos guardados
- Eliminar de favoritos

### 👤 Perfil (`/profile`)
- Información del usuario
- Estadísticas
- Opciones de cuenta

## 🛠️ Estructura de Carpetas

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── AppHeader.vue
│   │   ├── ProductCard.vue
│   │   └── HelloWorld.vue
│   ├── views/               # Vistas/Páginas
│   │   ├── Home.vue
│   │   ├── ProductDetail.vue
│   │   ├── Sell.vue
│   │   ├── Chat.vue
│   │   ├── Profile.vue
│   │   └── Favorites.vue
│   ├── router/              # Enrutamiento
│   │   └── index.js
│   ├── stores/              # Estado (Pinia)
│   │   └── productStore.js
│   ├── services/            # Servicios API
│   │   └── apiService.js
│   ├── utils/               # Utilidades
│   │   └── constants.js
│   ├── assets/              # Estilos e imágenes
│   │   └── styles/
│   │       └── main.css
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
├── index.html               # HTML principal
├── vite.config.js           # Config de Vite
├── package.json
├── .env                     # Variables de entorno
└── README.md
```

## 🎨 Temas y Colores

**Colores principales** (definidos en `main.css`):
- Verde Remarket: `#1a7f34`
- Verde Oscuro: `#0f5223`
- Fondo Claro: `#f5f5f5`

## 🔌 Integración con API (Por hacer)

Cuando el backend esté listo:

1. **Actualizar `.env`:**
```env
VITE_API_URL=http://localhost:3000/api
```

2. **Los servicios ya están configurados** en `src/services/apiService.js`

3. **Las llamadas automáticamente** usarán los endpoints del backend

## 📝 Modificar Productos de Demo

Los productos demo están en el store:

**Archivo:** `frontend/src/stores/productStore.js`

Para añadir más productos, edita el array `products`:

```javascript
{
  id: 4,
  title: 'Mi producto',
  price: 99,
  image: 'https://via.placeholder.com/300',
  category: 'Electrónica',
  // ... resto de propiedades
}
```

## 🐛 Solución de Problemas

### Puerto 5173 en uso

```bash
npm run dev -- --port 3001
```

### Dependencias no actualizadas

```bash
npm install --legacy-peer-deps
```

### Limpiar caché

```bash
rm -r node_modules package-lock.json
npm install
```

## 🚀 Próximos Pasos

1. **Backend**: Configurar servidor Node.js/Express
2. **Autenticación**: Implementar login/register
3. **Chat en tiempo real**: Socket.io
4. **Upload de imágenes**: AWS S3 o Cloudinary
5. **Notificaciones**: Push notifications
6. **Deploy**: Vercel, Netlify o servidor propio

## 📚 Documentación Útil

- [Vue 3 Docs](https://vuejs.org/)
- [IONIC Docs](https://ionicframework.com/docs/vue)
- [Vue Router](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)

## ❓ Preguntas Frecuentes

**P: ¿Puedo modificar los colores?**
R: Sí, edita `src/assets/styles/main.css`

**P: ¿Cómo añado una nueva vista?**
R: 1. Crea el archivo en `views/` 2. Añade la ruta en `router/index.js`

**P: ¿Dónde van los datos del usuario?**
R: En el store de Pinia `stores/productStore.js` (por ahora)

---

**¡Listo para empezar!** 🎉

Ejecuta `npm run dev` en la carpeta `frontend` y abre http://localhost:5173
