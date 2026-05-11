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
        <div class="row row-1">
          <div class="col col-half">
            <Errores />
          </div>
          <div class="col col-half">
            <TiempodeCarga />
          </div>
        </div>

        <div class="row row-2">
          <div class="col col-half">
            <UsuariosSctivos />
          </div>
          <div class="col col-half">
            <UsuariosSimultaneos />
          </div>
        </div>

        <div class="row row-3">
          <div class="col col-full">
            <EchartsMap />
          </div>
        </div>

        <div class="row row-4">
          <div class="col col-full">
            <RadarCategoryChart />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import Errores from '@/components/Errores.vue';
import TiempodeCarga from '@/components/TiempodeCarga.vue';
import UsuariosSctivos from '@/components/UsuariosSctivos.vue';
import UsuariosSimultaneos from '@/components/UsuariosSimultaneos.vue';
import EchartsMap from '@/components/EchartsMap.vue';
import RadarCategoryChart from '@/components/RadarCategoryChart.vue';
</script>

<style scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
}

.row { display: flex; gap: 12px; }
.row-1 { flex: 1; }
.row-2 { flex: 1; }
.row-3 { flex: 2; }
.row-4 { flex: 1.5; }

.col { display: flex; flex-direction: column; min-width: 0; }
.col-half { flex: 1; min-width: 0; }
.col-full { flex: 1; width: 100%; }

@media (max-width: 767px) {
  .row-1, .row-2, .row-3, .row-4 { flex-direction: column; }
  .col { min-height: 250px; }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .row-1, .row-2 { flex-direction: column; }
}
</style>
