<template>
  <div class="box-pie">
    <div class="pie-header">
      <h3>Ventas por Categoría</h3>
    </div>
    <div ref="chartRef" class="pie-chart"></div>
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'apexcharts';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: ApexCharts | null = null;

const categoryData = [
  { name: 'Electrónica', value: 2060, color: '#0396FF' },
  { name: 'Vehículos', value: 22410, color: '#6be084' },
  { name: 'Moda', value: 430, color: '#EE9AE5' },
  { name: 'Hogar', value: 730, color: '#eac736' },
  { name: 'Deportes', value: 850, color: '#f31b4a' },
  { name: 'Oficina', value: 670, color: '#14b8a6' },
  { name: 'Música', value: 150, color: '#8b5cf6' },
];

const chartOptions: any = {
  chart: { type: 'pie', background: 'transparent', toolbar: { show: false } },
  labels: categoryData.map(c => c.name),
  colors: categoryData.map(c => c.color),
  legend: {
    position: 'bottom',
    labels: { colors: '#8C8C8C' },
    itemMargin: { horizontal: 8, vertical: 4 },
    fontSize: '12px',
  },
  stroke: { show: true, width: 1, colors: ['#1E1E1E'] },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`,
    style: { fontSize: '12px', colors: ['#fff'], fontWeight: 600 },
    dropShadow: { enabled: true, opacity: 0.6 },
  },
  tooltip: {
    theme: 'dark',
    y: { formatter: (val: number) => `€${val.toLocaleString()}` },
  },
  states: { hover: { filter: { type: 'darken' as const } } },
};

const series = categoryData.map(c => c.value);

function initChart() {
  if (!chartRef.value) return;
  if (chartInstance) chartInstance.destroy();

  chartInstance = new ApexCharts(chartRef.value, {
    ...chartOptions,
    series,
  });
  chartInstance.render();
}

const resizeHandler = () => chartInstance?.updateOptions({ chart: { height: getChartHeight() } }, false, false);

function getChartHeight(): number {
  const w = window.innerWidth;
  if (w < 576) return 200;
  if (w < 992) return 250;
  return 280;
}

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  chartInstance?.destroy();
});
</script>

<style scoped>
.box-pie {
  background: #1E1E1E;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 280px;
  overflow: hidden;
}

.pie-header {
  margin-bottom: 6px;
}

.pie-header h3 {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8C8C8C;
  text-align: center;
}

.pie-chart {
  flex: 1;
  min-height: 0;
  width: 100%;
}
</style>
