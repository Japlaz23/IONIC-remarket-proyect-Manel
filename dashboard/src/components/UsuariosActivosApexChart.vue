<template>
  <div class="usuarios-chart">
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
import ApexChart from 'vue3-apexcharts';

const allMonths = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

// split into 4 charts of 3 months each
const monthGroups: string[][] = [
  allMonths.slice(0,3),
  allMonths.slice(3,6),
  allMonths.slice(6,9),
  allMonths.slice(9,12)
];

function rand700to800() { return Math.floor(Math.random() * 101) + 700; }

const charts = ref(monthGroups.map((group, i) => {
  const data = group.map(() => rand700to800());
  return {
    title: `${group.join(' / ')}`,
    series: [{ name: 'Usuarios', data }],
    options: {
      chart: { type: 'line', toolbar: { show: false } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: { categories: group },
      yaxis: { min: 650, max: 820 },
      grid: { show: true }
    },
    activeIndex: 0
  };
}));

let intervalId: number | null = null;

onMounted(() => {
  intervalId = window.setInterval(() => {
    // update each chart advancing its activeIndex
    charts.value.forEach(c => {
      c.activeIndex = (c.activeIndex + 1) % c.series[0].data.length;
      const val = rand700to800();
      c.series[0].data[c.activeIndex] = val;
      // update title to include most recent value
      c.title = `${c.options.xaxis.categories[c.activeIndex]}: ${val}`;
    });
  }, 2000);
});

onBeforeUnmount(() => { if (intervalId) window.clearInterval(intervalId); });
</script>

<style scoped>
.usuarios-chart{ width:100%; height:100%; }
.grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; align-items:start; padding-bottom:6px }
.chart-card{ background:var(--ion-item-background, #fff); padding:8px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.04) }
.card-title{ font-weight:600; margin-bottom:6px; font-size:14px }
</style>