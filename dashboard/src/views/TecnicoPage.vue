<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>

        <ion-title>Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Técnico</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="dashboard-grid">

        <!-- FILA 1 -->
        <div class="row row-1">
          <div class="col col-full">
            <PlaceholderCard title="Usuarios Activos">
              <UsuariosActivosApexChart />
            </PlaceholderCard>
          </div>
        </div>

        <!-- FILA 2 -->
        <div class="row row-2">

          <!-- MAPA DE ERRORES -->
          <div class="col col-main">
            <PlaceholderCard>

              <!-- MES SOBRE LA LEYENDA-->
              <div class="errores-month-container">
                <span class="errores-month"></span>
              </div>

              <Errores />
            </PlaceholderCard>
          </div>

          <!-- GAUGE -->
          <div class="col col-side gauge-column">
            <PlaceholderCard title="Tiempo Medio de Carga">
              <div class="gauge-wrapper">
                <TiempodeCarga />
              </div>
            </PlaceholderCard>
          </div>

        </div>

        <!-- FILA 3 -->
        <div class="row row-3">
          <div class="col col-half">
            <PlaceholderCard></PlaceholderCard>
          </div>

          <div class="col col-half">
            <PlaceholderCard></PlaceholderCard>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';

import PlaceholderCard from '@/components/PlaceholderCard.vue';
import UsuariosActivosApexChart from '@/components/UsuariosActivosApexChart.vue';
import Errores from '@/components/Errores.vue';
import TiempodeCarga from '@/components/TiempodeCarga.vue';
</script>

<style scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
}

.row {
  display: flex;
  gap: 12px;
}

.row-1 {
  flex: 1;
}

.row-2 {
  flex: 2;
  align-items: stretch;
}

.row-3 {
  flex: 2;
}

.col {
  display: flex;
  flex-direction: column;
}

.col-full {
  width: 100%;
}

.col-main {
  flex: 3;
  min-width: 0;
}

.col-side {
  flex: 1.4;
  min-width: 320px;
}

.col-half {
  flex: 1;
  min-width: 0;
}

/* MES DEL MAPA DE CALOR */
.errores-month-container {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.errores-month {
  font-size: 15px;
  font-weight: 600;
  color: #666;
}

/* GAUGE */
.gauge-column {
  display: flex;
}

.gauge-wrapper {
  width: 100%;
  height: 100%;
  min-height: 420px;

  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 767px) {
  .row-2,
  .row-3 {
    flex-direction: column;
  }

  .col-side {
    min-width: 0;
  }

  .gauge-wrapper {
    min-height: 360px;
  }
}
</style>