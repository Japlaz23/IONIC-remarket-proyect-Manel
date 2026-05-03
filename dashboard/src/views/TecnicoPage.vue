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
          <div class="col col-third">
            <ApexMixedChart />
          </div>
          <div class="col col-third">
            <ApexMixedChart />
          </div>
          <div class="col col-third">
            <ApexMixedChart />
          </div>
        </div>

        <div class="row row-2">
          <div class="col col-side-small">
            <ApexMixedChart />
          </div>
          <div class="col col-side-big">
            <ApexMixedChart />
          </div>
        </div>

        <div class="row row-3">
          <div class="col col-third">
            <ApexMixedChart />
          </div>
          <div class="col col-third">
            <ApexMixedChart />
          </div>
          <div class="col col-third">
            <ApexMixedChart />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
</script>

<style scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
}

.row { display: flex; gap: 16px; }
.row-1 { flex: 1; }
.row-2 { flex: 2; }
.row-3 { flex: 1; }

.col { display: flex; flex-direction: column; min-width: 0; }
.col-third { flex: 1; }
.col-side-small { flex: 1; }
.col-side-big { flex: 3; }

@media (max-width: 767px) {
  .row-1, .row-2, .row-3 { flex-direction: column; }
  .col { min-height: 350px; }
}
</style>
