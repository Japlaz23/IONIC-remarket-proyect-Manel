# 🛍️ Remarket - App de Compraventa

Una aplicación tipo **Wallapop/BlackMarket** construida con **IONIC** + **Vue 3** para el frontend y Node.js/Express para el backend (próximamente).

## 📋 Descripción

Remarket es una plataforma donde los usuarios pueden:
- 📱 Explorar productos de segunda mano
- ➕ Publicar sus propios anuncios
- 💬 Chatear con compradores/vendedores
- ❤️ Guardar artículos favoritos
- 👤 Gestionar su perfil

## 🏗️ Estructura del Proyecto

```
IONIC-remarket-proyect-Manel/
├── frontend/                 # Aplicación Vue/Ionic (EN DESARROLLO)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── views/            # Páginas principales
│   │   ├── router/           # Configuración de rutas
│   │   ├── stores/           # Estado con Pinia
│   │   ├── services/         # Servicios API
│   │   ├── assets/           # Estilos e imágenes
│   │   ├── App.vue           # Componente raíz
│   │   └── main.js           # Punto de entrada
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/                  # API Rest Node.js/Express (PRÓXIMAMENTE)
    ├── src/
    ├── package.json
    └── README.md
```

## 🚀 Tecnologías

### Frontend
- **Vue 3** - Framework progresivo
- **IONIC 8** - Componentes mobile
- **Vue Router** - Enrutamiento
- **Pinia** - Gestión de estado
- **Axios** - Cliente HTTP
- **Vite** - Bundler rápido

### Backend (Por implementar)
- Node.js + Express
- MongoDB
- JWT para autenticación
- Socket.io para chat en tiempo real

## 📦 Instalación

### Requisitos
- Node.js v16+
- npm o yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 📱 Características Implementadas

### Home
- ✅ Listado de productos con filtros
- ✅ Búsqueda en tiempo real
- ✅ Botón flotante para crear anuncio
- ✅ Sistema de favoritos

### Detalles de Producto
- ✅ Galería de imágenes
- ✅ Info del vendedor
- ✅ Descripción completa
- ✅ Botón para chatear

### Crear Anuncio
- ✅ Formulario con validación
- ✅ Selección de categoría
- ✅ Información de condición
- ✅ Ubicación

### Chat
- ✅ Interfaz de mensajería
- ✅ Entrada de texto
- ✅ Historial de mensajes (mock)

### Perfil
- ✅ Información del usuario
- ✅ Estadísticas
- ✅ Links a mis anuncios, compras, etc.

### Favoritos
- ✅ Listado de productos guardados
- ✅ Opción eliminar favorito

## 🎨 Diseño y Estilos

- Colores principales: Verde remarket (#1a7f34)
- Componentes Ionic nativos
- Responsive para móvil y tablet
- Animaciones suaves

## 🔄 Flujo de datos

```
Component → Router → Store (Pinia) → API Service → Backend
```

## 📝 Variables de Entorno

Créa un archivo `.env` en la carpeta frontend:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Remarket
```

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build de producción
npm run lint     # Linting con ESLint (opcional)
```

## 📦 Estado de Desarrollo

### ✅ Completado (Frontend)
- Estructura base con IONIC/Vue
- Routing y navegación
- Componentes principales
- Store con Pinia
- API service setup

## 🚧 Por hacer

### Backend (Próximo)
- [ ] Configurar Express server
- [ ] Modelos de BD (Product, User, Chat, etc.)
- [ ] Rutas API RESTful
- [ ] Autenticación JWT
- [ ] WebSockets para chat
- [ ] Validaciones y errores

### Frontend Mejorado
- [ ] Autenticación completa
- [ ] Upload de imágenes
- [ ] Integración real con API
- [ ] Notificaciones push
- [ ] Offline mode
- [ ] Más componentes

## 👥 Contribuciones

Este es un proyecto personal. Siéntete libre de adaptarlo a tus necesidades.

## 📄 Licencia

MIT

---

**Última actualización:** Febrero 2026
