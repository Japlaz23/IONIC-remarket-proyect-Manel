<template>
  <section class="chart-card">
    <div class="chart-copy">
      <p class="eyebrow">Capacidad</p>
      <h3>Almacenamiento usado</h3>
      <p class="description">Porcentaje de capacidad ocupada en la plataforma.</p>
    </div>

    <div ref="chartRef" class="storage-gauge"></div>
  </section>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);

let chart: echarts.ECharts | null = null;
let interval: ReturnType<typeof setInterval> | null = null;
let resizeObserver: ResizeObserver | null = null;

const generateUsage = (): number => {
  return Math.floor(62 + Math.random() * 24);
};

const createOption = (value: number) => ({
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 100,
      radius: '90%',
      center: ['50%', '55%'],
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        roundCap: true,
        width: 20,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 20,
          color: [[value / 100, '#38bdf8'], [1, 'rgba(148, 163, 184, 0.18)']],
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { show: false },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '8%'],
        formatter: (val: number) => `{value|${val.toFixed(0)}%}\n{unit|Capacidad usada}`,
        rich: {
          value: {
            fontSize: 34,
            fontWeight: '700',
            color: '#e2e8f0',
          },
          unit: {
            fontSize: 13,
            color: '#94a3b8',
            padding: [8, 0, 0, 0],
          },
        },
      },
      data: [{ value }],
    },
  ],
});

const resizeChart = () => chart?.resize();

onMounted(() => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);
  chart.setOption(createOption(generateUsage()));

  resizeObserver = new ResizeObserver(() => {
    chart?.resize();
  });
  resizeObserver.observe(chartRef.value);

  interval = setInterval(() => {
    chart?.setOption({
      series: [
        {
          data: [{ value: generateUsage() }],
        },
      ],
    });
  }, 2500);

  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
  resizeObserver?.disconnect();
  window.removeEventListener('resize', resizeChart);
  chart?.dispose();
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

.storage-gauge {
  width: 100%;
  height: 320px;
  min-height: 320px;
  overflow: hidden;
}
</style>