<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Negocio</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="dashboard-grid">
        <div class="row row-1">
          <SparkLine />
        </div>

        <div class="row row-2">
          <div class="col col-main">
            <EchartsMap />
          </div>
          <div class="col col-side">
            <CategoryPieChart />
          </div>
        </div>

        <div class="row row-3">
          <div class="col col-half">
            <RadarCategoryChart />
          </div>
          <div class="col col-half">
            <TopProductsBarChart />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import SparkLine from '@/components/SparkLine.vue';
import EchartsMap from '@/components/EchartsMap.vue';
import CategoryPieChart from '@/components/CategoryPieChart.vue';
import RadarCategoryChart from '@/components/RadarCategoryChart.vue';
import TopProductsBarChart from '@/components/TopProductsBarChart.vue';
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
.row-2 { flex: 2; }
.row-3 { flex: 2; }

.col { display: flex; flex-direction: column; }
.col-main { flex: 3; min-width: 0; }
.col-side { flex: 1; min-width: 0; }
.col-half { flex: 1; min-width: 0; }

@media (max-width: 767px) {
  .row-2, .row-3 { flex-direction: column; }
  .col-side { min-height: 320px; }
  .col-half { min-height: 280px; }
}
</style>
