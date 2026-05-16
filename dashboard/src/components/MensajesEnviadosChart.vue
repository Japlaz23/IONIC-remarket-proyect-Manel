<template>
  <section class="chart-card">
    <div class="chart-copy">
      <p class="eyebrow">Actividad</p>
      <h3>Mensajes enviados</h3>
      <p class="description">Evolución semanal del volumen de mensajes enviados.</p>
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
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Mensajes enviados',
          data: [145, 168, 132, 191, 204, 176, 152],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.18)',
          pointBackgroundColor: '#e0f2fe',
          pointBorderColor: '#38bdf8',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#38bdf8',
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          fill: true,
          tension: 0.36,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          titleColor: '#ffffff',
          bodyColor: '#dbeafe',
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#d7e2f1',
            font: {
              size: 11,
            },
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9fb2cc',
            stepSize: 50,
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.14)',
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
}

.chart-copy {
  margin-bottom: 8px;
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
  font-size: 16px;
  line-height: 1.2;
}

.description {
  margin: 4px 0 0;
  color: #9fb2cc;
  font-size: 12px;
  line-height: 1.35;
}

.chart-shell {
  position: relative;
  width: 100%;
  min-height: 320px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>