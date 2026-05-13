<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

const labels = Array.from({length: 20}, (_, i) => `Seg ${i+1}`);
const data = Array.from({length: 20}, () => Math.random() * 2 + 1); // simula tiempo de carga en segundos

const option = {
  title: { text: 'Tiempo de carga (s)', textStyle:{ color:'#fff' } },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: labels, axisLine:{ lineStyle:{ color:'#fff' } } },
  yAxis: { type: 'value', axisLine:{ lineStyle:{ color:'#fff' } } },
  series: [{ data, type: 'line', smooth: true, lineStyle:{ color:'#00e676' } }]
};

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(option);

    setInterval(() => {
      const next = Math.random()*2 + 1;
      data.push(next);
      data.shift();
      myChart!.setOption({ series:[{ data }] });
    }, 1000);
  }
});
</script>

<style scoped>
.chart-container { width: 100%; height: 250px; }
</style>