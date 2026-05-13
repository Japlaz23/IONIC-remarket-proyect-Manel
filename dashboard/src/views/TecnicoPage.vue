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

      <div class="dashboard-shell">
        <div class="dashboard-heading">
          <h2>Panel técnico</h2>
          <p>Visión rápida de carga, errores, usuarios simultáneos y rendimiento general.</p>
        </div>

        <div class="dashboard-grid">
          <section class="row row-1">
            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Tiempo de carga</h3>
              </header>
              <div class="chart-card__body">
                <ApexChartArea />
              </div>
            </article>

            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Errores del sistema</h3>
              </header>
              <div class="chart-card__body">
                <ErroresEchart />
              </div>
            </article>

            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Usuarios simultáneos</h3>
              </header>
              <div class="chart-card__body">
                <UsuariosSimultaneosApexChart />
              </div>
            </article>
          </section>

          <section class="row row-2">
            <article class="chart-card chart-card--compact">
              <header class="chart-card__header">
                <h3>Velocidad de carga</h3>
              </header>
              <div class="chart-card__body chart-card__body--centered">
                <VelocidadCargaSimpleGauge />
              </div>
            </article>

            <article class="chart-card chart-card--wide">
              <header class="chart-card__header">
                <h3>Actividad combinada</h3>
              </header>
              <div class="chart-card__body">
                <ApexMixedChart />
              </div>
            </article>
          </section>

          <section class="row row-3">
            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Tendencia operativa</h3>
              </header>
              <div class="chart-card__body">
                <ApexMixedChart />
              </div>
            </article>

            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Comparativa de carga</h3>
              </header>
              <div class="chart-card__body">
                <ApexMixedChart />
              </div>
            </article>

            <article class="chart-card">
              <header class="chart-card__header">
                <h3>Estado general</h3>
              </header>
              <div class="chart-card__body">
                <ApexMixedChart />
              </div>
            </article>
          </section>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
import ApexChartArea from '@/components/ApexChartArea.vue';
import ErroresEchart from '@/components/ErroresEchart.vue';
import UsuariosSimultaneosApexChart  from '@/components/UsuariosSimultaneosApexChart.vue';
import VelocidadCargaSimpleGauge from '@/components/VelocidadCargaSimpleGauge.vue';
</script>

<style scoped>
.dashboard-shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
}

.dashboard-heading h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.dashboard-heading p {
  margin: 6px 0 0;
  color: var(--ion-color-medium);
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: grid;
  gap: 16px;
}

.row-1,
.row-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.row-2 {
  grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
}

.chart-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 360px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
}

.chart-card--compact {
  min-height: 320px;
}

.chart-card--wide {
  min-height: 320px;
}

.chart-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.chart-card__header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.chart-card__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.chart-card__body--centered {
  align-items: center;
  justify-content: center;
}

@media (max-width: 767px) {
  .row-1,
  .row-2,
  .row-3 {
    grid-template-columns: 1fr;
  }

  .chart-card {
    min-height: 300px;
  }
}
</style>
