<template>
  <section class="chart-card">
    <div class="chart-copy">
      <p class="eyebrow">Rendimiento</p>
      <h3>Velocidad de carga</h3>
      <p class="description">Tiempo medio de respuesta del sistema en milisegundos.</p>
    </div>

    <div ref="chartRef" class="gauge-container"></div>
  </section>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);

let chart: echarts.ECharts | null = null;
let interval: ReturnType<typeof setInterval> | null = null;
let resizeObserver: ResizeObserver | null = null;

const generateRandomLoadTime = (): number => {
  return Math.floor(Math.random() * 2000);
};

const createOption = (value: number) => ({
  series: [
    {
      type: 'gauge',

      startAngle: 180,
      endAngle: 0,

      min: 0,
      max: 2000,
      splitNumber: 10,

      radius: '84%',
      center: ['50%', '62%'],

      itemStyle: {
        color: '#7dd3fc',
        shadowColor: 'rgba(125, 211, 252, 0.28)',
        shadowBlur: 8
      },

      progress: {
        show: true,
        roundCap: true,
        width: 24
      },

      pointer: {
        length: '72%',
        width: 10
      },

      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 24
        }
      },

      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 1,
          color: '#cbd5e1'
        }
      },

      splitLine: {
        length: 12,
        lineStyle: {
          width: 2,
          color: '#cbd5e1'
        }
      },

      axisLabel: {
        distance: 20,
        color: '#e2e8f0',
        fontSize: 11,
        formatter: (val: number) => `${val} ms`
      },

      title: {
        show: false
      },

      detail: {
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        borderColor: '#dbeafe',
        borderWidth: 1,

        width: '66%',
        height: 48,

        borderRadius: 9,

        offsetCenter: [0, '47%'],

        valueAnimation: true,

        formatter: (val: number) =>
          `{value|${val.toFixed(0)}}{unit| ms}`,

        rich: {
          value: {
            fontSize: 34,
            fontWeight: 'bold',
            color: '#0f172a'
          },
          unit: {
            fontSize: 14,
            color: '#475569',
            padding: [0, 0, -5, 7]
          }
        }
      },

      data: [{ value }]
    }
  ]
});

const resizeChart = () => chart?.resize();

onMounted(() => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  chart.setOption(createOption(generateRandomLoadTime()));

  resizeObserver = new ResizeObserver(() => {
    chart?.resize();
  });
  resizeObserver.observe(chartRef.value);

  interval = setInterval(() => {
    chart?.setOption({
      series: [
        {
          data: [{ value: generateRandomLoadTime() }]
        }
      ]
    });
  }, 2000);

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

.gauge-container {
  width: 100%;
  height: 390px;
  min-height: 390px;
  margin-top: 8px;
  overflow: hidden;
}
</style>