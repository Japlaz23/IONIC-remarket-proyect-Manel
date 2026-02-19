
<template>
	<ion-page>
		<ion-header>
			<ion-toolbar >
				<h1 class="text-black text-2xl font-bold">Bienvenido a Remarket</h1>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" class="bg-white">
			<div class="max-w-2xl mx-auto p-4">
				<h2 class="text-xl font-semibold text-green-700 mb-2">¡Explora productos y ofertas!</h2>
				<p class="text-gray-700 mb-4">Esta es la página principal de tu app. Aquí puedes mostrar banners, categorías, productos destacados o cualquier contenido inicial.</p>
				<div class="rounded-lg border-2 border-green-600 bg-green-200 p-4 text-green-900 font-bold text-lg">
					Ejemplo de bloque destacado con Tailwind + Ionic
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonContent } from '@ionic/vue'
</script>
