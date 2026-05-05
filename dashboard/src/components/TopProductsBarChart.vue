<template>
  <section class="chart-card">
    <div class="chart-copy">
      <p class="eyebrow">Top ventas por usuario</p>
      <h3>Productos que más venden los usuarios</h3>
      <p class="description">Barra vertical para comparar los productos con mayor volumen de ventas.</p>
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
    type: 'bar',
    data: {
      labels: ['Auriculares', 'Camisetas', 'Silla gamer', 'Mochilas', 'Zapatillas', 'Smartwatch'],
      datasets: [
        {
          label: 'Unidades vendidas',
          data: [128, 116, 101, 88, 79, 66],
          backgroundColor: [
            'rgba(99, 102, 241, 0.78)',
            'rgba(59, 130, 246, 0.78)',
            'rgba(34, 197, 94, 0.78)',
            'rgba(245, 158, 11, 0.78)',
            'rgba(236, 72, 153, 0.78)',
            'rgba(20, 184, 166, 0.78)',
          ],
          borderColor: 'rgba(255, 255, 255, 0.18)',
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
          barPercentage: 0.72,
          categoryPercentage: 0.72,
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
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9fb2cc',
            stepSize: 20,
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
  min-height: 300px;
  padding: 14px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(8, 15, 31, 0.98) 100%);
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.3);
}

.chart-copy {
  margin-bottom: 8px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #f59e0b;
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
  flex: 1;
  min-height: 220px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
