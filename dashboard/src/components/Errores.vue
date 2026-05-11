<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;

const categories = ['Módulo A','Módulo B','Módulo C','Módulo D','Módulo E'];
const seriesData = [
  { name:'Errores críticos', data: categories.map(() => Math.floor(Math.random() * 5)), stack:'total' },
  { name:'Errores menores', data: categories.map(() => Math.floor(Math.random() * 10)), stack:'total' },
];

const option = {
  title: { text: 'Errores del Sistema', textStyle:{ color:'#fff' } },
  tooltip: { trigger:'axis', axisPointer:{ type:'shadow' } },
  legend: { data:['Errores críticos','Errores menores'], textStyle:{ color:'#fff' } },
  xAxis: { type:'value', axisLine:{ lineStyle:{ color:'#fff' } } },
  yAxis: { type:'category', data: categories, axisLine:{ lineStyle:{ color:'#fff' } } },
  series: seriesData.map(s => ({ ...s, type:'bar', emphasis:{ focus:'series' } }))
};

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(option);

    intervalId = setInterval(() => {
      seriesData.forEach(s => { s.data = categories.map(() => Math.floor(Math.random() * 10)) });
      myChart!.setOption({ series: seriesData });
    }, 2000);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (myChart) {
    myChart.dispose();
  }
});
</script>

<style scoped>
.chart-container { width: 100%; height: 250px; }
</style>
