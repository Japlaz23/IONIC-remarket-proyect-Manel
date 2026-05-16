<template>
  <div class="errores-heatmap">
    <div class="heatmap-header">
      <div class="title-left">Mapa Calor Errores</div>
    </div>
    <ApexChart
      :options="chartOptions"
      :series="series"
      type="heatmap"
      height="420"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { ApexOptions } from 'apexcharts';
import ApexChart from 'vue3-apexcharts';

defineOptions({ name: 'ErroresHeatmap' });

const days = ['Domingo', 'Sábado', 'Viernes', 'Jueves', 'Miércoles', 'Martes', 'Lunes'];
const hours = Array.from({ length: 12 }).map((_, i) => `${String(i * 2).padStart(2, '0')}:00`);

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHeatmapData() {
  return days.map(day => ({
    name: day,
    data: hours.map(hour => ({
      x: hour,
      y: rand(0, 100),
    })),
  }));
}

const series = ref(generateHeatmapData());

const chartOptions = ref<ApexOptions>({
  chart: { toolbar: { show: false } },
  dataLabels: { enabled: false },
  title: { text: '' },
  legend: {
    labels: {
      colors: '#e5e7eb',
    },
  },
  xaxis: { 
    type: 'category' as const,
    categories: hours,
    labels: {
      style: {
        colors: '#cbd5e1',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Día de la Semana',
      style: {
        color: '#e5e7eb',
      },
    },
    labels: {
      style: {
        colors: '#cbd5e1',
      },
    },
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 2,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          { from: 0, to: 20, color: '#48c774', name: 'Bajo' },
          { from: 21, to: 50, color: '#ffdd57', name: 'Medio' },
          { from: 51, to: 80, color: '#ff7b25', name: 'Alto' },
          { from: 81, to: 100, color: '#ff3860', name: 'Crítico' },
        ],
      },
    },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} errores`,
    },
  },
});

let intervalId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  intervalId = setInterval(() => {
    series.value = generateHeatmapData();
  }, 2000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.errores-heatmap { width: 100%; }
.heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.title-left {
  font-size: 14px;
  font-weight: 600;
  color: #e5e7eb;
}
</style>
