<template>
	<ion-page>

	</ion-page>
</template>

<script setup lang="ts">

</script>

<style scoped>
.dashboard-shell {
	min-height: 100vh;
	background: linear-gradient(180deg, #f3f6fb 0%, #eef3f8 100%);
}

.dashboard-content {
	--background: transparent;
}

.menu-content {
	--background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
	color: #e5eefb;
}

.menu-user-card {
	padding: 20px 18px 10px;
}

.menu-user-card h2 {
	margin: 12px 0 4px;
	font-size: 1.15rem;
}

.menu-user-card p {
	margin: 0;
	color: #cbd5e1;
	overflow-wrap: anywhere;
}

.menu-list {
	background: transparent;
	padding: 0 8px;
}

.menu-list ion-list-header {
	color: #94a3b8;
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
}

.menu-item-active {
	--background: rgba(59, 130, 246, 0.18);
	--color: #ffffff;
}

.menu-actions {
	padding: 16px;
	display: grid;
	gap: 10px;
}

.hero-card {
	margin-top: 12px;
}

.quick-actions {
	display: grid;
	gap: 12px;
}

ion-card-title {
	color: #0f172a;
}

ion-card-subtitle {
	color: #64748b;
}

@media (max-width: 768px) {
	ion-toolbar ion-title {
		font-size: 1rem;
	}
}
</style>