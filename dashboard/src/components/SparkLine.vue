<template>
  <div class="sparklines-container">
    <div v-for="(metric, idx) in businessMetrics" :key="metric.title" :class="['box-sparkline', metric.bgColor, metric.textColor]">
      <div class="details">
        <div>
          <ion-icon :name="metric.iconName"></ion-icon>
          <span>{{ metric.title }}</span>
        </div>
        <span>{{ metric.value }}</span>
      </div>
      <div class="progress-info">
        <small>Meta: {{ metric.targetValue }}{{ metric.unit ? ` ${metric.unit}` : '' }}</small>
      </div>
      <div :ref="el => setChartRef(idx, el)" class="sparkline-chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { navigateOutline, logoIonic, eyeOutline, peopleOutline, cashOutline } from 'ionicons/icons';
import ApexCharts from 'apexcharts';
import { ref, onMounted, onUnmounted } from 'vue';

addIcons({
  'logo-ionic': logoIonic,
  'navigate-outline': navigateOutline,
  'eye-outline': eyeOutline,
  'people-outline': peopleOutline,
  'cash-outline': cashOutline,
});

const createSparklineOptions = (): any => ({
  chart: { type: 'line', sparkline: { enabled: true }, background: 'transparent', toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 4, colors: ['#ffffff'] },
  markers: { size: 3, colors: ['#ffffff'], strokeColors: '#ffffff' },
  grid: { show: false },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.15, stops: [20, 100] } },
  tooltip: { theme: 'dark', fixed: { enabled: false } },
  responsive: [{ breakpoint: 768, options: { stroke: { width: 3 } } }]
});

const businessMetrics = ref([
  { title: 'Aumentar Visitas', value: '500', iconName: 'eye-outline', bgColor: 'gradient-blue', textColor: 'white', targetValue: 1400, currentValue: 500, unit: 'visitas', goal: '40%', chartOptions: createSparklineOptions(), chartSeries: [{ name: 'Visitas', data: [800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400] }] },
  { title: 'Aumentar Ventas', value: '€150k', iconName: 'cash-outline', bgColor: 'gradient-green', textColor: 'white', targetValue: 240000, currentValue: 15000, unit: 'EUR', goal: '20%', chartOptions: createSparklineOptions(), chartSeries: [{ name: 'Ventas', data: [150, 160, 170, 180, 190, 200, 215, 230, 240] }] },
  { title: 'Retención de Clientes', value: '50%', iconName: 'people-outline', bgColor: 'gradient-pink', textColor: 'white', targetValue: 85, currentValue: 50, unit: '%', goal: '+15%', chartOptions: createSparklineOptions(), chartSeries: [{ name: 'Retención', data: [60, 62, 65, 68, 70, 75, 80, 82, 85] }] },
  { title: 'Leads Calificados', value: '100', iconName: 'navigate-outline', bgColor: 'gradient-orange', textColor: 'white', targetValue: 250, currentValue: 100, unit: 'leads', goal: '+25%', chartOptions: createSparklineOptions(), chartSeries: [{ name: 'Leads', data: [140, 155, 165, 175, 185, 200, 215, 235, 250] }] },
  { title: 'Productos Vendidos', value: '1,000', iconName: 'logo-ionic', bgColor: 'gradient-teal', textColor: 'white', targetValue: 1500, currentValue: 1000, unit: 'unidades', goal: '80%', chartOptions: createSparklineOptions(), chartSeries: [{ name: 'Productos', data: [200, 300, 350, 400, 450, 600, 800, 1000, 1200] }] },
]);

const chartRefs = ref<(HTMLElement | null)[]>([]);
const chartInstances: (ApexCharts | null)[] = [];

function setChartRef(idx: number, el: any) {
  if (el && el instanceof HTMLElement) {
    chartRefs.value[idx] = el;
  }
}

let simulationTimer: ReturnType<typeof setInterval> | null = null;

function initCharts() {
  businessMetrics.value.forEach((metric, idx) => {
    const el = chartRefs.value[idx];
    if (!el) return;
    
    if (chartInstances[idx]) {
      chartInstances[idx].destroy();
    }

    chartInstances[idx] = new ApexCharts(el, {
      ...metric.chartOptions,
      series: metric.chartSeries,
      chart: {
        ...metric.chartOptions.chart,
        height: getChartHeight(),
      },
    });
    chartInstances[idx].render();
  });
}

function updateCharts() {
  businessMetrics.value.forEach((metric, idx) => {
    if (chartInstances[idx]) {
      chartInstances[idx].updateOptions({ chart: { height: getChartHeight() } }, false, false);
      chartInstances[idx].updateSeries(metric.chartSeries, false);
    }
  });
}

function getChartHeight(): number {
  const width = window.innerWidth;
  if (width < 576) return 80;
  if (width < 768) return 100;
  if (width < 992) return 120;
  if (width < 1400) return 110;
  return 90;
}

function formatMetricValue(unit: string, value: number): string {
  if (unit === 'EUR') return `€${Math.round(value / 1000)}k`;
  if (unit === '%') return `${Math.round(value)}%`;
  return Math.round(value).toLocaleString('es-ES');
}

function toChartPoint(unit: string, value: number) {
  if (unit === 'EUR') return Math.round(value / 1000);
  return Math.round(value);
}

function getDelta(unit: string, targetValue: number) {
  if (unit === '%') return Math.round((Math.random() - 0.45) * 4);
  const ratio = unit === 'EUR' ? 0.012 : 0.025;
  const base = Math.max(1, Math.round(targetValue * ratio));
  return Math.round((Math.random() - 0.35) * base);
}

function simulateRealtimeData() {
  businessMetrics.value.forEach((metric) => {
    const delta = getDelta(metric.unit, metric.targetValue);
    const upperLimit = Math.round(metric.targetValue * 1.2);
    const nextValue = Math.max(0, Math.min(upperLimit, metric.currentValue + delta));
    metric.currentValue = nextValue;
    metric.value = formatMetricValue(metric.unit, nextValue);
    const dataSeries = metric.chartSeries[0].data;
    dataSeries.push(toChartPoint(metric.unit, nextValue));
    if (dataSeries.length > 9) dataSeries.shift();
  });
  updateCharts();
}

const resizeHandler = () => {
  chartInstances.forEach((chart, idx) => {
    if (chart && chartRefs.value[idx]) {
      chart.updateOptions({ chart: { height: getChartHeight() } }, false, false);
    }
  });
};

onMounted(() => {
  initCharts();
  window.addEventListener('resize', resizeHandler);
  simulationTimer = setInterval(simulateRealtimeData, 2500);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  if (simulationTimer) clearInterval(simulationTimer);
  chartInstances.forEach(chart => chart?.destroy());
  chartInstances.length = 0;
});
</script>

<style scoped>
.sparklines-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  width: 100%;
  padding: 4px;
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
  box-sizing: border-box;
}

@media (max-width: 575px) { .sparklines-container { grid-template-columns: 1fr; gap: 10px; padding: 4px; } }
@media (min-width: 576px) and (max-width: 767px) { .sparklines-container { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
@media (min-width: 768px) and (max-width: 991px) { .sparklines-container { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
@media (min-width: 992px) and (max-width: 1199px) { .sparklines-container { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
@media (min-width: 1200px) and (max-width: 1919px) { .sparklines-container { grid-template-columns: repeat(5, 1fr); gap: 18px; } }
@media (min-width: 1920px) { .sparklines-container { grid-template-columns: repeat(5, 1fr); gap: 20px; } }

.box-sparkline {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 190px;
  width: 100%;
  padding: 6px;
  border-radius: 8px;
  container: box / inline-size;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  overflow: hidden;
}

@media (min-width: 1200px) { .box-sparkline { height: 250px; padding: 12px; } }
@media (min-width: 1920px) { .box-sparkline { height: 270px; } }

.box-sparkline:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); }

.details { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 6px; }
.details > div { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.details > div > ion-icon { font-size: 1.6rem; --ionicon-stroke-width: 18px; }
.details > div > span { font-size: 0.82rem; font-weight: 600; }
.details > span { font-size: 1.6rem; font-weight: 700; }

@media (min-width: 1200px) { .details > div > span { font-size: 0.84rem; } .details > span { font-size: 1.8rem; } }
@media (min-width: 1920px) { .details > div > span { font-size: 0.88rem; } .details > span { font-size: 1.9rem; } }

.progress-info { font-size: 0.76rem; opacity: 0.95; margin-bottom: 6px; font-weight: 500; }

.sparkline-chart { min-width: 50px; width: 100%; flex-grow: 1; }

@container box (width >= 324px) {
  .details { flex-direction: row; justify-content: space-between; align-items: start; gap: 16px; }
  .details > span { font-size: 6cqmax; }
  .details > div > ion-icon { font-size: 4cqmax; }
  .details > div > span { font-size: 2cqmax; }
}

@media (min-width: 992px) {
  @container box (width <= 356px) {
    .details { flex-direction: row; justify-content: space-between; align-items: start; gap: 16px; }
    .details > span { font-size: max(1.7rem, 16cqw); }
    .details > div > ion-icon { font-size: max(1.7rem, 5cqw); }
    .details > div > span { font-size: max(0.8rem, 5cqw); }
  }
}

.gradient-blue { background-image: linear-gradient(135deg, #071c49 10%, #0396FF 100%); }
.gradient-green { background-image: linear-gradient(135deg, #054d43 10%, #6be084 100%); }
.gradient-orange { background-image: linear-gradient(135deg, #f31b4a 10%, #e78f30 100%); }
.gradient-pink { background-image: linear-gradient(135deg, #383ead 10%, #EE9AE5 100%); }
.gradient-teal { background-image: linear-gradient(135deg, #0d6b5e 10%, #14b8a6 100%); }

.black { color: black }
.white { color: white; }
</style>
