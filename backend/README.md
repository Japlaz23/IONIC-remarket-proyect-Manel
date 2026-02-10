# Backend - Remarket API

API REST para la plataforma Remarket (Wallapop/BlackMarket clone).

## 🎯 Estado

🚧 **En Construcción** - Por iniciar

## 📋 Roadmap

### Fase 1: Setup Básico
- [ ] Inicializar servidor Node.js + Express
- [ ] Configurar MongoDB connection
- [ ] Setup variables de entorno
- [ ] Estructura de carpetas (controllers, models, routes, middleware)

### Fase 2: Autenticación
- [ ] Modelo de Usuario
- [ ] JWT authentication
- [ ] Register/Login endpoints
- [ ] Password hashing (bcrypt)
- [ ] Refresh tokens

### Fase 3: Productos
- [ ] Modelo de Producto
- [ ] CRUD endpoints
- [ ] Búsqueda y filtros
- [ ] Validaciones
- [ ] Subida de imágenes

### Fase 4: Chat
- [ ] Modelo de Conversación
- [ ] Modelo de Mensajes
- [ ] WebSocket setup (Socket.io)
- [ ] Mensajes en tiempo real
- [ ] Notificaciones

### Fase 5: Favoritos & Ratings
- [ ] Modelo de Favoritos
- [ ] Modelo de Ratings
- [ ] Endpoints para gestionar favoritos
- [ ] Endpoints para ratings

### Fase 6: Deployment
- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Deploy en servidor (Heroku, AWS, etc.)

## 🏗️ Estructura Planeada

```
backend/
├── src/
│   ├── controllers/       # Lógica de negocio
│   ├── models/            # Esquemas MongoDB
│   ├── routes/            # Definición de endpoints
│   ├── middleware/        # Auth, validación, errores
│   ├── services/          # Servicios auxiliares
│   ├── config/            # Configuración
│   ├── utils/             # Utilidades
│   └── app.js             # Configuración de Express
├── .env.example
├── server.js              # Punto de entrada
├── package.json
└── README.md
```

## 🔌 Endpoints Planeados

### Auth
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Detalle producto
- `POST /api/products` - Crear producto (auth)
- `PUT /api/products/:id` - Actualizar producto (auth)
- `DELETE /api/products/:id` - Eliminar producto (auth)
- `GET /api/products/search` - Búsqueda

### Usuarios
- `GET /api/users/profile` - Perfil actual (auth)
- `PUT /api/users/profile` - Actualizar perfil (auth)
- `GET /api/users/:id` - Perfil público
- `POST /api/users/:id/rate` - Calificar usuario

### Chat
- `GET /api/chats` - Mis conversaciones (auth)
- `GET /api/chats/:id` - Mensajes de conversación (auth)
- `POST /api/chats` - Iniciar conversación (auth)
- `POST /api/chats/:id/messages` - Enviar mensaje (auth)

### Favoritos
- `GET /api/favorites` - Mis favoritos (auth)
- `POST /api/favorites` - Añadir favorito (auth)
- `DELETE /api/favorites/:productId` - Quitar favorito (auth)

## 📦 Dependencias (Por instalar)

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.x",
  "dotenv": "^16.x",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.x",
  "cors": "^2.8.5",
  "socket.io": "^4.x",
  "multer": "^1.x",
  "express-validator": "^7.x"
}
```

## 🚀 Próximos Pasos

1. Crear estructura de carpetas
2. Instalar dependencias
3. Configurar MongoDB connection
4. Implementar modelos de datos
5. Crear endpoints de autenticación
6. Conectar con frontend (quando esté listo)

---

**Próximamente**: Configuración inicial
