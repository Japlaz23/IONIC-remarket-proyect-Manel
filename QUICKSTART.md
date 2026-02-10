# 🚀 QUICK START - Remarket

## 30 segundos para empezar

```bash
cd frontend
npm install
npm run dev
```

**Abre:** http://localhost:5173

---

## ✨ Qué Verás

### Home `/`
- 🔍 Busca productos
- 🏷️ Filtra por categoría
- ❤️ Añade a favoritos
- ➕ Click en verde para crear anuncio

### Producto `/product/1`
- 📸 Ver detalles
- 💬 Chatear con vendedor
- ❤️ Favorito

### Crear Anuncio `/sell`
- 📝 Formulario completo
- 📸 Upload fotos (demo)

### Chat `/chat/1`
- 💬 Interfaz mensajería

### Perfil `/profile`
- 👤 Tu info
- 📊 Estadísticas

### Favoritos `/favorites`
- ❤️ Tus guardados

---

## 📂 Archivos Principales

| Archivo | Qué Hace |
|---------|---------|
| `src/main.js` | Setup Ionic + Router |
| `src/App.vue` | Componente raíz |
| `src/router/index.js` | 6 rutas |
| `src/stores/productStore.js` | Estado productos |
| `src/services/apiService.js` | Cliente HTTP |
| `src/assets/styles/main.css` | Estilos globales |

---

## 💡 Tips

1. **Agregar producto**: Edita `src/stores/productStore.js`
2. **Cambiar color**: Modifica `--remarket-green` en `main.css`
3. **Nueva vista**: `src/views/MiVista.vue` + actualiza `router/index.js`
4. **Datos del servidor**: Usa `src/services/apiService.js`

---

## 🎯 Estado

✅ Frontend 100% listo
⏳ Backend por hacer

---

**Lee RESUMEN.md para más detalles**
