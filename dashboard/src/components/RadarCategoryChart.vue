<template>
  <section class="chart-card">
    <div class="chart-copy">
      <p class="eyebrow">Distribución por categoría</p>
      <h3>Productos enviados con mayor frecuencia</h3>
      <p class="description">Radar de envíos para identificar en qué categorías se concentra la demanda.</p>
    </div>

    <div class="chart-shell">
      <canvas ref="canvasRef"></canvas>
    </div>
  </section>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function renderChart() {
  if (!canvasRef.value) return;

  const context = canvasRef.value.getContext('2d');
  if (!context) return;

  chartInstance?.destroy();

  chartInstance = new Chart(context, {
    type: 'radar',
    data: {
      labels: ['Electrónica', 'Hogar', 'Moda', 'Deportes', 'Accesorios', 'Juguetes'],
      datasets: [
        {
          label: 'Unidades enviadas',
          data: [92, 76, 68, 54, 43, 35],
          borderColor: '#4cc9f0',
          backgroundColor: 'rgba(76, 201, 240, 0.22)',
          pointBackgroundColor: '#4cc9f0',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#4cc9f0',
          pointRadius: 4,
          pointHoverRadius: 5,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#d7e2f1',
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          titleColor: '#ffffff',
          bodyColor: '#dbeafe',
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            color: '#9fb2cc',
            backdropColor: 'transparent',
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.18)',
          },
          angleLines: {
            color: 'rgba(148, 163, 184, 0.18)',
          },
          pointLabels: {
            color: '#d7e2f1',
            font: {
              size: 12,
              weight: 600,
            },
          },
        },
      },
    },
  });
}

onMounted(renderChart);

onBeforeUnmount(() => {
  chartInstance?.destroy();
  chartInstance = null;
});
</script>

<style scoped>
.chart-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 360px;
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(8, 15, 31, 0.98) 100%);
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.3);
}

.chart-copy {
  margin-bottom: 12px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #7dd3fc;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 18px;
  line-height: 1.2;
}

.description {
  margin: 6px 0 0;
  color: #9fb2cc;
  font-size: 13px;
  line-height: 1.45;
}

.chart-shell {
  position: relative;
  flex: 1;
  min-height: 280px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
