<template>
  <div :class="['box-sparkline', goalReached ? 'gradient-success' : bgColor, textColor]">
    <div class="details">
      <div>
        <ion-icon :name="iconName"></ion-icon>
        <span>{{title}}</span>  
      </div>
      <span>{{value}}</span>
    </div>
    <Vapexchart 
      class="sparkline-chart"
      :height="chartHeight" 
      :options="chartOptions"
      :series="chartSeries">
    </vapexChart>
  </div>
</template>


<script setup lang="ts">


import { IonIcon } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { navigateOutline, logoIonic, eyeOutline, peopleOutline, cashOutline } from 'ionicons/icons';
import vapexChart from 'vue3-apexcharts';
import { ref, watchEffect, onUnmounted } from 'vue';


// 📌 Registrar iconos
addIcons({
  'logo-ionic': logoIonic,
  'navigate-outline': navigateOutline,
  'eye-outline': eyeOutline,
  'people-outline': peopleOutline,
  'cash-outline': cashOutline,
});


// 📌 Definir Props para datos dinámicos
const props = defineProps({
  title: { type: String, default: 'Metrica',  },
  value: { type: String, default: '#Value',   },
  chartOptions: {type: Object, required: true, }, // Se espera un objeto de configuración de ApexCharts
  chartSeries: { type: Array, required: true, }, // Se espera un array con los datos de la serie
  bgColor: { type: String, default: '', },
  textColor: { type: String, default: '', },
  iconName: { type: String, default: 'logo-ionic', },
  goalReached: { type: Boolean, default: false, }, // Indica si se alcanzó la meta
});

/******* Control altura gráfico según ancho ********************/

const chartHeight = ref("50%");


// Función que ajusta la altura dinámicamente
const updateChartHeight = () => {
  const width = window.innerWidth;


  if (width < 576) chartHeight.value = "30%"; // Breakpoint xs
  else if (width < 768) chartHeight.value = "40%"; // Breakpoint sm
  else chartHeight.value = "50%"; // Breakpoint md y superiores
};


// Ejecutar al cargar y escuchar cambios en el tamaño de la ventana
watchEffect(() => {
  updateChartHeight();
  window.addEventListener("resize", updateChartHeight);
});


// Limpiar el listener cuando el componente se desmonta
onUnmounted(() => {
  window.removeEventListener("resize", updateChartHeight);
});


/************************************************************ */


</script>

<style scoped>


/* Mobile first */

.box-sparkline{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 16px;
  border-radius:5px;
  container: box / inline-size;
}


.details{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}


.details > div{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}


.details > div > ion-icon{
  font-size: 1.5rem;
  --ionicon-stroke-width: 16px;
}

.details > div > span{ font-size: .7rem; }
.details > span{ font-size: 2rem; }


.sparkline-chart {
  min-width: 50px;
  width: 100%;
}


/* Siendo más ancho, pasamos dato a la derecha de título */


@container box (width >= 324px) {
  .details{
    flex-direction: row;
    justify-content: space-start;
    align-items: start;
    gap: 16px;
  }


  .details > span {
    font-size: 4cqmax;
  }
  .details > div > ion-icon{
    font-size: 3cqmax;
  }
  .details > div > span{
    font-size: 1.5cqmax;
  }
}


/* 🖥️ En pantallas grandes (>=lg=992) */
@media (min-width: 992px) {
  /* Si el componente no es muy ancho: detalles izquierda, datos derecha*/
  @container box (width <= 356px){
    .details{
      flex-direction: row;
      justify-content: space-start;
      align-items: start;
      gap: 16px;
    }
   /* Para anchos de contenedores muy pequeños */
    .details > span {
      font-size: max(1.4rem, 12cqw);
    }
    .details > div > ion-icon{
      font-size: max(1.3rem, 4cqw);
    }
    .details > div > span{
      font-size: max(0.7rem, 3.5cqw);
    }
  }
}


/* 🎨 Colores de fondo */
.gradient-blue {background-image: linear-gradient( 135deg, #071c49 10%, #0396FF 100%);}
.gradient-green {background-image: linear-gradient( 135deg, #054d43 10%, #6be084 100%);}
.gradient-orange {background-image: linear-gradient( 135deg, #f31b4a 10%, #e78f30 100%);}
.gradient-pink {background-image: linear-gradient( 135deg, #383ead 10%, #EE9AE5 100%);}
.gradient-purple {background-image: linear-gradient( 135deg, #4a148c 10%, #9c27b0 100%);}
.gradient-success {background-image: linear-gradient( 135deg, #1b5e20 10%, #4caf50 100%);}

/* 🎨 Colores de texto */
.black{ color: black }
.white{ color: white; }
.red{ color: #ff4444; }


.black{ color: black }
.white{ color: white; }


</style>
