<template>
  <div ref="chartRef" class="gauge-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);

let chart: echarts.ECharts | null = null;
let interval: ReturnType<typeof setInterval> | null = null;

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

      // 🔥 MÁS GRANDE VISUALMENTE
      radius: '95%',
      center: ['50%', '60%'],

      itemStyle: {
        color: '#58D9F9',
        shadowColor: 'rgba(0,138,255,0.35)',
        shadowBlur: 10
      },

      progress: {
        show: true,
        roundCap: true,
        width: 28
      },

      pointer: {
        length: '75%',
        width: 12
      },

      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 28
        }
      },

      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },

      splitLine: {
        length: 16,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },

      axisLabel: {
        distance: 26,
        color: '#999',
        fontSize: 12,
        formatter: (val: number) => `${val} ms`
      },

      title: {
        show: false
      },

      detail: {
        backgroundColor: '#fff',
        borderColor: '#999',
        borderWidth: 2,

        width: '70%',
        height: 55,

        borderRadius: 10,

        offsetCenter: [0, '45%'],

        valueAnimation: true,

        formatter: (val: number) =>
          `{value|${val.toFixed(0)}}{unit| ms}`,

        rich: {
          value: {
            fontSize: 38,
            fontWeight: 'bold',
            color: '#333'
          },
          unit: {
            fontSize: 16,
            color: '#666',
            padding: [0, 0, -6, 8]
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
  window.removeEventListener('resize', resizeChart);
  chart?.dispose();
});
</script>

<style scoped>
.gauge-container {
  width: 100%;
  height: 460px;
  min-height: 460px;
}
</style>