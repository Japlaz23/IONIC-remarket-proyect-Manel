<template>
  <div class="echarts-map-container">
    <div v-if="loading" class="map-loading">
      <span>Cargando mapa...</span>
    </div>
    <div ref="chartRef" class="chart-inner"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, VisualMapComponent, TitleComponent } from 'echarts/components';

echarts.use([ MapChart, CanvasRenderer, TooltipComponent, VisualMapComponent, TitleComponent ]);

const chartRef = ref<HTMLElement | null>(null);
const loading = ref(true);
let chartInstance: echarts.ECharts | null = null;
let mapLoaded = false;
let geoData: any = null;

const usersWorldwide = [
  { name: "China", value: 45000 },
  { name: "India", value: 38000 },
  { name: "United States", value: 42000 },
  { name: "Brazil", value: 28000 },
  { name: "Russia", value: 22000 },
  { name: "Indonesia", value: 18000 },
  { name: "Germany", value: 16000 },
  { name: "France", value: 14000 },
  { name: "Spain", value: 12000 },
  { name: "Italy", value: 11000 },
  { name: "Mexico", value: 15000 },
  { name: "Canada", value: 13000 },
  { name: "United Kingdom", value: 15000 },
  { name: "Japan", value: 19000 },
  { name: "South Korea", value: 17000 },
  { name: "Australia", value: 10000 },
  { name: "Netherlands", value: 9000 },
  { name: "Poland", value: 8500 },
  { name: "Sweden", value: 7000 },
  { name: "Switzerland", value: 6500 },
];

async function loadMapData() {
  if (mapLoaded) return;
  const response = await fetch('/custom.geo.json');
  geoData = await response.json();
  echarts.registerMap('world', geoData);
  mapLoaded = true;
}

function renderChart() {
  if (!chartRef.value) return;
  
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption({
    title: {
      text: "USUARIOS POR PAÍS",
      subtext: 'Distribución global de usuarios activos en la plataforma',
      left: "left",
      textStyle: { color: "#8C8C8C", fontSize: 18, fontWeight: "bold" },
      subtextStyle: { color: "#8C8C8C", fontSize: 12 },
    },
    tooltip: { trigger: "item", formatter: "{b}: {c} usuarios" },
    visualMap: {
      min: 5000, max: 45000, left: "left", bottom: "20px",
      text: ["Más usuarios", "Menos usuarios"],
      textStyle: { color: "#B9B8CE" },
      calculable: true,
      inRange: { color: ["#50a3ba", "#eac736", "#d94e5d"] },
      outOfRange: { color: 'rgba(100, 100, 100, 0.2)' }
    },
    series: [{
      name: "Usuarios", type: "map", map: "world", roam: true,
      emphasis: { label: { show: true, color: "#fff" }, itemStyle: { areaColor: '#ffd700', borderWidth: 2, borderColor: '#fff' } },
      itemStyle: { areaColor: 'rgba(80, 163, 186, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 0.5 },
      data: usersWorldwide,
    }],
  });

  loading.value = false;
}

const resizeHandler = () => chartInstance?.resize();

onMounted(async () => {
  try {
    await loadMapData();
    renderChart();
    window.addEventListener('resize', resizeHandler);
  } catch (e) {
    console.error('Error loading map:', e);
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
.echarts-map-container {
  width: 100%;
  height: 360px;
  background: #0a0e27;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
}

.chart-inner {
  width: 100%;
  height: 100%;
}

.map-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e27;
  color: #8C8C8C;
  z-index: 10;
}

@media (max-width: 768px) { .echarts-map-container { height: 300px; } }
@media (max-width: 576px) { .echarts-map-container { height: 250px; } }
</style>
