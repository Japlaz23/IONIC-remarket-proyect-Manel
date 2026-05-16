<template>
  <div class="usuarios-chart">
    <div class="chart-copy">
      <p class="eyebrow">Seguridad</p>
      <h3>Accesos de usuarios</h3>
      <p class="description">Seguimiento de usuarios que inician sesión frente a intentos sin acceso autenticado.</p>
    </div>

    <div class="grid">
      <div class="chart-card" v-for="(c, idx) in charts" :key="idx">
        <div class="card-title">{{ c.title }}</div>
        <ApexChart :options="c.options" :series="c.series" type="line" height="220" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { ApexOptions } from 'apexcharts';
import ApexChart from 'vue3-apexcharts';

const allMonths = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

// split into 4 charts of 3 months each
const monthGroups: string[][] = [
  allMonths.slice(0,3),
  allMonths.slice(3,6),
  allMonths.slice(6,9),
  allMonths.slice(9,12)
];

function randLoggedIn() { return Math.floor(Math.random() * 101) + 700; }
function randNotLoggedIn() { return Math.floor(Math.random() * 121) + 80; }

const charts = ref(monthGroups.map((group) => {
  const loggedInData = group.map(() => randLoggedIn());
  const notLoggedInData = group.map(() => randNotLoggedIn());
  const options: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 3] },
    colors: ['#38bdf8', '#f59e0b'],
    legend: {
      position: 'top',
      labels: { colors: '#d7e2f1' },
    },
    xaxis: { categories: group },
    yaxis: { min: 0, max: 850 },
    grid: { show: true },
    tooltip: {
      theme: 'dark',
    },
  };
  return {
    title: `${group.join(' / ')}`,
    series: [
      { name: 'Usuarios logueados', data: loggedInData },
      { name: 'Usuarios no logueados', data: notLoggedInData },
    ],
    options,
    activeIndex: 0
  };
}));

let intervalId: number | null = null;

onMounted(() => {
  intervalId = window.setInterval(() => {
    charts.value.forEach(c => {
      c.activeIndex = (c.activeIndex + 1) % c.series[0].data.length;
      const loggedInValue = randLoggedIn();
      const notLoggedInValue = randNotLoggedIn();
      c.series[0].data[c.activeIndex] = loggedInValue;
      c.series[1].data[c.activeIndex] = notLoggedInValue;
      c.title = `${c.options.xaxis.categories[c.activeIndex]}: acceso actualizado`;
    });
  }, 2000);
});

onBeforeUnmount(() => { if (intervalId) window.clearInterval(intervalId); });
</script>

<style scoped>
.usuarios-chart{ width:100%; height:100%; }
.chart-copy{ margin-bottom: 10px; }
.eyebrow {
  margin: 0 0 6px;
  color: #60a5fa;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 16px;
  line-height: 1.2;
}
.description {
  margin: 4px 0 0;
  color: #9fb2cc;
  font-size: 12px;
  line-height: 1.35;
}
.grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; align-items:start; padding-bottom:6px }
.chart-card{ background:var(--ion-item-background, #fff); padding:8px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.04) }
.card-title{ font-weight:600; margin-bottom:6px; font-size:14px }
</style>