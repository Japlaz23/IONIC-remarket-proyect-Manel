<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;

const labels = Array.from({length: 20}, (_, i) => `Seg ${i+1}`);
const data = Array.from({length: 20}, () => Math.floor(Math.random() * 5000 + 2000));

onMounted(() => {
  if (!canvas.value) return;

  chart = new Chart(canvas.value, {
    type: 'line',
    data: { labels, datasets:[{ label:'Usuarios activos', data, borderColor:'#2979ff', backgroundColor:'rgba(41,121,255,0.2)', fill:true, tension:0.4 }] },
    options: { responsive:true, animation:false, plugins:{ legend:{ labels:{ color:'#fff' } } }, scales:{ x:{ ticks:{ color:'#fff' } }, y:{ ticks:{ color:'#fff' } } } }
  });

  intervalId = setInterval(() => {
    const next = Math.floor(Math.random() * 5000 + 2000);
    data.push(next);
    data.shift();
    chart!.data.datasets[0].data = data;
    chart!.update('none');
  }, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (chart) {
    chart.destroy();
  }
});
</script>

<style scoped>
canvas { width: 100%; height: 250px; }
</style>
