<template>
  <apexchart type="area" height="250" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ApexCharts from 'apexcharts';
import ApexChart from 'vue3-apexcharts';

const series = ref([{ name:'Usuarios simultáneos', data: Array.from({length: 20}, () => Math.floor(Math.random() * 1000 + 100)) }]);
let intervalId: ReturnType<typeof setInterval> | null = null;

const chartOptions = ref({
  chart:{ id:'concurrent', animations:{ enabled:true, dynamicAnimation:{ speed:1000 } }, toolbar:{ show:false }, background:'transparent' },
  xaxis:{ categories: Array.from({length: 20}, (_, i) => `Seg ${i+1}`), labels:{ style:{ colors:'#fff' } } },
  yaxis:{ labels:{ style:{ colors:'#fff' } } },
  stroke:{ curve:'smooth', width:3 },
  fill:{ type:'gradient', gradient:{ shade:'light', opacityFrom:0.4, opacityTo:0.1 } },
  colors:['#ff9800'],
  tooltip:{ theme:'dark' }
});

onMounted(() => {
  intervalId = setInterval(() => {
    const next = Math.floor(Math.random() * 1000 + 100);
    series.value[0].data.push(next);
    series.value[0].data.shift();
  }, 1500);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
</style>
