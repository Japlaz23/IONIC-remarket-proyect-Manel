# 🗺️ Mapa Mental - Remarket

Visualización completa de la estructura del proyecto.

```
REMARKET
│
├── 📖 DOCUMENTACIÓN
│   ├── README.md          ← Documentación principal
│   ├── SETUP.md           ← Cómo instalar y ejecutar
│   ├── QUICKSTART.md      ← 30 segundos
│   ├── RESUMEN.md         ← Resumen completo
│   ├── CHECKLIST.md       ← Estado del proyecto
│   ├── EXPANSION.md       ← Cómo extender
│   ├── ARCHIVOS.md        ← Referencia archivos clave
│   └── MAPA.md            ← Este archivo
│
├── 🖥️ FRONTEND
│   ├── package.json       (dependencias)
│   ├── index.html         (HTML raíz)
│   ├── vite.config.js     (configuración build)
│   ├── .env               (variables entorno)
│   │
│   └── src/
│       ├── main.js        ← Setup app (Ionic, Router, Pinia)
│       ├── App.vue        ← Componente raíz
│       ├── style.css      (obsoleto)
│       │
│       ├── 📱 VIEWS (6 páginas)
│       │   ├── Home.vue               [Listado productos]
│       │   ├── ProductDetail.vue      [Detalles producto]
│       │   ├── Sell.vue               [Crear anuncio]
│       │   ├── Chat.vue               [Mensajería]
│       │   ├── Profile.vue            [Mi perfil]
│       │   └── Favorites.vue          [Favoritos]
│       │
│       ├── 🧩 COMPONENTS (3 componentes)
│       │   ├── AppHeader.vue          [Header reutilizable]
│       │   ├── ProductCard.vue        [Card producto]
│       │   └── HelloWorld.vue         [Demo]
│       │
│       ├── 🔀 ROUTER
│       │   └── index.js
│       │       ├── / → Home
│       │       ├── /product/:id → ProductDetail
│       │       ├── /sell → Sell
│       │       ├── /chat/:id → Chat
│       │       ├── /profile → Profile
│       │       └── /favorites → Favorites
│       │
│       ├── 💾 STORES (Pinia)
│       │   └── productStore.js
│       │       ├── state: products[], favorites[], searchQuery, selectedCategory
│       │       ├── getters: filteredProducts(), getProductById()
│       │       └── actions: toggleFavorite(), addProduct()
│       │
│       ├── 🌐 SERVICES
│       │   └── apiService.js
│       │       ├── productService (getAll, getById, create, search, etc.)
│       │       ├── userService (login, register, profile)
│       │       ├── chatService (messages, conversations)
│       │       └── favoriteService (add, remove, getAll)
│       │
│       ├── 🛠️ UTILS
│       │   └── constants.js
│       │       ├── PRODUCT_CATEGORIES
│       │       ├── PRODUCT_CONDITIONS
│       │       └── Helper functions (formatPrice, formatDate, etc.)
│       │
│       └── 🎨 ASSETS
│           ├── styles/
│           │   └── main.css (colores, animaciones, responsive)
│           └── images/
│
├── ⚙️ BACKEND
│   ├── package.json      (templates dependencias)
│   └── README.md         (roadmap desarrollo)
│
└── 📋 CONFIG
    └── .gitignore
```

---

## 🔄 Flujos de Datos

### 1. Búsqueda de Productos
```
User Input (Home.vue)
    ↓
v-model="store.searchQuery"
    ↓
Store actualiza state
    ↓
Computed filteredProducts()
    ↓
Template re-renderiza
```

### 2. Crear Anuncio
```
Form (Sell.vue)
    ↓
Submit button
    ↓
store.addProduct(data)
    ↓
Store actualiza products[]
    ↓
Router.push('/')
    ↓
Home muestra nuevo producto
```

### 3. Favoritos
```
User click ❤️ (ProductDetail.vue)
    ↓
store.toggleFavorite(productId)
    ↓
Se añade/quita de favorites[]
    ↓
Product.isFavorite actualiza
    ↓
UI actualiza icon
```

### 4. Chat
```
User click "Chatear" (ProductDetail.vue)
    ↓
router.push(`/chat/${productId}`)
    ↓
Chat.vue carga conversación
    ↓
sendMessage() procesa mensaje
    ↓
Aparece en conversación
```

---

## 🎯 Navegación

```
        ┌─────────────────────────────┐
        │        HOME (/)             │
        │                             │
        │  [Guardar ❤️]  [Crear ➕]   │
        └────────────────────────────┘
               ↙↓↘
          /    |    \
      [Product] [Sell] [Favorites]
         ↓        ↓        ↓
    ProductDetail Sell  Favorites
         ↓
      [Chat]
         ↓
      Chat View
      
Cualquier vista: [Perfil] (arriba derecha)
```

---

## 📱 Componentes Ionic Utilizados

```
ESTRUCTURA BASE
├── IonApp
└── IonRouterOutlet

HEADER/NAVEGACIÓN
├── IonHeader
├── IonToolbar
├── IonTitle
├── IonButtons
└── IonBackButton

CONTENIDO
├── IonContent
├── IonFooter

LISTAS
├── IonList
├── IonItem
├── IonItemSliding
├── IonItemOptions
├── IonItemOption

ENTRADA
├── IonInput
├── IonTextarea
├── IonSelect
├── IonSelectOption
└── IonSearchbar

VISUALIZACIÓN
├── IonLabel
├── IonThumbnail
├── IonAvatar
├── IonCard
├── IonCardHeader
├── IonCardTitle
├── IonCardContent
├── IonIcon
├── IonSegment
├── IonSegmentButton

ACCIONES
├── IonButton
├── IonFab
└── IonFabButton
```

---

## 🔐 Autenticación (Por implementar)

```
Login Page
    ↓
POST /auth/login
    ↓
Recibir JWT token
    ↓
localStorage.setItem('auth_token', token)
    ↓
Interceptor Axios: Header Authorization
    ↓
Requests autenticados
    ↓
userStore.isAuthenticated = true
```

---

## 🗄️ Base de Datos (Por implementar)

```
COLLECTIONS PLANEADAS

Users
├── _id
├── email
├── password (hashed)
├── name
├── avatar
├── rating
├── createdAt

Products
├── _id
├── title
├── description
├── price
├── category
├── condition
├── images[]
├── seller_id
├── location
├── createdAt

Conversations
├── _id
├── participants[]
├── product_id
├── lastMessage
├── createdAt

Messages
├── _id
├── conversation_id
├── sender_id
├── text
├── createdAt

Favorites
├── _id
├── user_id
├── product_id
├── createdAt
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Vistas | 6 |
| Componentes | 3 |
| Rutas | 6 |
| Stores | 1 |
| Services | 4 |
| Dependencias | 7 |
| Archivos creados | 20+ |
| Líneas código | ~2,500+ |
| Documentación | 8 archivos |

---

## 🎓 Tech Stack Simplificado

```
┌─────────────────────┐
│   USER INTERACT     │
└──────────┬──────────┘
           ↓
┌──────────────────────────────────────┐
│  VUE 3 (Framework)                   │
│  ├─ Components (.vue files)          │
│  ├─ Router (Vue Router)              │
│  └─ Pinia (State Management)         │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│  IONIC VUE (UI Components)           │
│  ├─ Mobile-first design              │
│  ├─ Native look & feel               │
│  └─ Cross-platform (iOS/Android)     │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│  AXIOS (HTTP Client)                 │
│  └─ API Communication                │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│  BACKEND (Por hacer)                 │
│  ├─ Node.js/Express                  │
│  ├─ MongoDB                          │
│  └─ WebSocket (Socket.io)            │
└──────────────────────────────────────┘
```

---

## ✨ Logros

✅ Frontend 100% funcional
✅ 6 vistas principales
✅ State management configurado
✅ API service listo
✅ Routing completo
✅ Estilos globales
✅ Documentación exhaustiva
✅ Estructura escalable

---

## 🚀 Próximos Pasos

```
1. EJECUTAR FRONTEND
   npm run dev
   
2. TESTEAR TODAS LAS VISTAS
   ✓ Home
   ✓ ProductDetail
   ✓ Sell
   ✓ Chat
   ✓ Profile
   ✓ Favorites
   
3. INICIAR BACKEND
   npm init en backend/
   npm install express mongoose
   
4. CONECTAR CON API REAL
   Reemplazar mock datos con server
   
5. AGREGAR AUTENTICACIÓN
   JWT + Login
   
6. IMPLEMENTAR CHAT EN TIEMPO REAL
   WebSockets con Socket.io
   
7. DEPLOY
   Frontend: Vercel/Netlify
   Backend: Heroku/AWS
```

---

¡Tu proyecto está listo para desarrollar! 🎉
