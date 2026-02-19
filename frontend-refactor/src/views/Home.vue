
<template>
	<ion-page>
		<ion-header>
			<ion-toolbar class="backdrop-blur-md bg-white/80 shadow-sm border-b border-gray-200">
				<div class="flex items-center w-full px-2 sm:px-6 py-2 gap-2 sm:gap-4 justify-between">
					<div class="flex items-center gap-1">
						<ion-img src="/logo.png" class="h-10 w-10 sm:h-14 sm:w-14 border-2 border-gray-300 rounded-xl shadow-md bg-white"></ion-img>
						<h1 class="hidden sm:inline text-black text-lg sm:text-2xl md:text-3xl font-bold whitespace-nowrap drop-shadow-sm tracking-tight">Remarket</h1>
					</div>
					<div class="flex-1 flex justify-center min-w-[100px] max-w-xs sm:max-w-md">
						<ion-searchbar
							class="custom-searchbar w-full"
							placeholder="Buscar productos..."
							show-cancel-button="always"
						></ion-searchbar>
					</div>
					<div class="flex gap-1 sm:gap-3 items-center ml-1">
						<ion-icon :icon="heart" class="text-2xl sm:text-3xl text-gray-600 hover:text-red-500 transition-all duration-200 cursor-pointer hover:scale-110"></ion-icon>
						<ion-icon :icon="cart" class="text-3xl sm:text-4xl text-gray-600 hover:text-green-600 transition-all duration-200 cursor-pointer hover:scale-110"></ion-icon>
						<ion-icon :icon="personCircleOutline" class="text-3xl sm:text-4xl text-gray-600 hover:text-primary transition-all duration-200 cursor-pointer hover:scale-110"></ion-icon>
					</div>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" class="bg-white">
			
		</ion-content>
	</ion-page>
</template>

<script setup>
import { 
	IonPage, 
	IonHeader, 
	IonContent,
	IonToolbar,
	IonImg,
	IonSearchbar,
	IonIcon,

	 } from '@ionic/vue'
import { 
	personCircleOutline,
	heart,
	cart
 } from 'ionicons/icons'
</script>

<style scoped>
/* ==================== HEADER PRINCIPAL ==================== */
ion-toolbar {
  --background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

/* Logo */
.header-container ion-img {
  height: 3rem;
  width: 3rem;
  min-width: 3rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(200, 200, 200, 0.5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease;
}

.header-container ion-img:hover {
  transform: scale(1.1);
}

/* Título */
.header-container h1 {
  font-weight: 700;
  font-size: 1.5rem;
  color: #111;
  text-shadow: 0 1px 2px rgba(0,0,0,0.08);
  white-space: nowrap;
}

/* Iconos de acción */
.header-container ion-icon {
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.header-container ion-icon:hover {
  transform: scale(1.15);
}

/* Iconos individuales con colores */
.header-container ion-icon.heart:hover {
  color: #ef4444; /* rojo */
}
.header-container ion-icon.cart:hover {
  color: #10b981; /* verde */
}
.header-container ion-icon.person:hover {
  color: #3b82f6; /* azul */
}

/* Searchbar mejorada (ya tenemos la custom-searchbar) */
.header-container .custom-searchbar {
  flex: 1;
  min-width: 150px;
  max-width: 500px;
}

/* ==================== SEARCHBAR PERSONALIZADA ==================== */

.custom-searchbar {
  --background: #f9fafb; /* fondo suave */
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 9999px; /* estilo “pill” */
  --color: #111; /* texto principal */
  --placeholder-color: #9ca3af; /* gris claro */
  --border-width: 0; /* sin borde extra */
  --highlight-color-focused: #10b918; /* verde vibrante al enfocar */
  --icon-color: #6b7280; /* icono de búsqueda gris */
  --clear-icon-color: #ef4444; /* icono de “clear” rojo suave */
  padding: 0.25rem 1rem; /* espacio interno */
  transition: all 0.25s ease-in-out;
}

.custom-searchbar:focus-within {
  --background: #ffffff;
  --box-shadow: 0 4px 16px rgba(7, 145, 19, 0.25);
}

.custom-searchbar .searchbar-input {
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
}

.custom-searchbar .searchbar-clear-icon {
  transition: transform 0.2s ease-in-out;
}

.custom-searchbar .searchbar-clear-icon:hover {
  transform: scale(1.2);
}

.custom-searchbar .searchbar-search-icon {
  font-size: 1.2rem;
}

</style>