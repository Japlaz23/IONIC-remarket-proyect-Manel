<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

// Datos iniciales
const labels = Array.from({ length: 20 }, (_, i) => Seg ${i + 1});
const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 1000 + 200)); // velocidad en ms

const option = {
  title: {
    text: 'Velocidad de carga (ms)',
    left: 'center',
    textStyle: { color: '#fff' }
  },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: labels,
    axisLine: { lineStyle: { color: '#fff' } }
  },
  yAxis: {
    type: 'value',
    name: 'ms',
    axisLine: { lineStyle: { color: '#fff' } }
  },
  series: [
    {
      name: 'Velocidad',
      type: 'line',
      smooth: true,
      data: data,
      areaStyle: { color: 'rgba(33,150,243,0.3)' },
      lineStyle: { color: '#2196f3', width: 3 },
      symbol: 'circle',
      symbolSize: 6
    }
  ]
};

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(option);

    // Actualización en tiempo real cada segundo
    setInterval(() => {
      const next = Math.floor(Math.random() * 1000 + 200); // simula ms
      data.push(next);
      data.shift();
      myChart!.setOption({
        series: [{ data }]
      });
    }, 1000);
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 250px;
}
</style>