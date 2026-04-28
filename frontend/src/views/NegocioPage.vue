<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📈 Negocio</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"> 📈 Negocio</ion-title>
        </ion-toolbar>
      </ion-header>


      <!-- Grid principal del Dashboard -->
      <ion-grid class="dashboard-grid">
        <!-- 🟢 Fila 1: 4 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="6" size-lg="3">
            <div class="box">
             <!-- Columna 1: Ventas -->
              <SparkLine
                title="Ventas del mes"
                :value="ventasActuales + ' / ' + objetivoMensualVentas"
                iconName="cash-outline"
                :bgColor="ventasActuales >= objetivoMensualVentas ? '' : 'gradient-green'"
                textColor="white"
                :chartOptions="chartOptionsVentas"
                :chartSeries="chartSeriesVentas"
                :goalReached="ventasActuales >= objetivoMensualVentas"
              />
            </div>
          </ion-col>
          <!-- Columna 2: Visitas -->
          <ion-col size="6" size-lg="3">
            <div class="box">
              <SparkLine
                title="Visitas"
                :value="visitasActuales + ' / ' + objetivoMensualVisitas"
                iconName="eye-outline"
                :bgColor="visitasActuales >= objetivoMensualVisitas ? '' : 'gradient-blue'"
                textColor="white"
                :chartOptions="chartOptionsVisitas"
                :chartSeries="chartSeriesVisitas"
                :goalReached="visitasActuales >= objetivoMensualVisitas"
              />
            </div>
          </ion-col>
          <!-- Columna 3: Clientes -->
          <ion-col size="6" size-lg="3">
            <div class="box">
              <SparkLine
                title="Clientes"
                :value="clientesActuales + ' / ' + objetivoMensualClientes"
                iconName="people-outline"
                :bgColor="clientesActuales >= objetivoMensualClientes ? '' : 'gradient-purple'"
                textColor="white"
                :chartOptions="chartOptionsClientes"
                :chartSeries="chartSeriesClientes"
                :goalReached="clientesActuales >= objetivoMensualClientes"
              />
            </div>
          </ion-col>
          <!-- Columna 4: Comisiones -->
          <ion-col size="6" size-lg="3">
            <div class="box">
              <SparkLine
                title="Productos"
                :value="productosActuales + ' / ' + objetivoMensualProductos"
                iconName="cube-outline"
                :bgColor="productosActuales >= objetivoMensualProductos ? '' : 'gradient-orange'"
                textColor="white"
                :chartOptions="chartOptionsProductos"
                :chartSeries="chartSeriesProductos"
                :goalReached="productosActuales >= objetivoMensualProductos"
              />
            </div>
          </ion-col>
        </ion-row>


<!-- 🔵 Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="9">
           <div class="box">Contenido principal</div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="box">Columna Pequeña</div>
          </ion-col>
        </ion-row>


        <!-- 🟠 Fila 3: 2 Columnas -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="6">
            <div class="box">Columna 1</div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">Columna 2</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol 
  } from '@ionic/vue';
  
import SparkLine from '@/components/SparkLine.vue';
import { ref, onMounted, onUnmounted } from 'vue';
// KPIs
//Ventas
const objetivoMensualVentas = 400; // Objetivo de tener por lo menos 400 ventas al mes
const ventasActuales = ref(50); // Ventas actuales reducido para mayor duración

const chartSeriesVentas = ref([
  { data: [10, 20, 30, 35, 40, 45, 50] }
])

const chartOptionsVentas = {
  chart: {
    type: 'area',
    sparkline: { enabled: true }
  },
  stroke: { curve: 'smooth', colors: ['#ffffff'] },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#ffffff'],
      inverseColors: false,
      opacityFrom: 0.6,
      opacityTo: 0.2,
      stops: [0, 100]
    }
  },
  colors: ['#ffffff']
};

let interval: any;

onMounted(()  => {
  interval = setInterval(() => {

    const nuevasVentas = Math.floor(Math.random() * 6 + 1); // Simula entre 0 y 5 nuevas ventas
    ventasActuales.value += nuevasVentas;

    const data = chartSeriesVentas.value[0].data;
    data.shift(); // Elimina el primer punto de datos
    data.push(ventasActuales.value); // Agrega el nuevo valor al final

    chartSeriesVentas.value = [{ data: [...data] }]; // Actualiza la serie para disparar la reactividad
  }, 3000); // Actualiza cada 3 segundos
});

onUnmounted(() => {
  clearInterval(interval);
})

//Visitas
const objetivoMensualVisitas = 1000; // Objetivo de tener por lo menos 1000 visitas al mes
const visitasActuales = ref(200); // Visitas actuales reducido para mayor duración
const chartSeriesVisitas = ref([
  { data: [50, 80, 120, 150, 170, 185, 200] }
])

const chartOptionsVisitas = {
  chart: {
    type: 'bar',
    sparkline: { enabled: true }
  },
  stroke: { curve: 'smooth', colors: ['#ffffff'] },
  colors: ['#ffffff'],
  fill: {
    opacity: 0.7
  }
};

let visitasInterval: any;

onMounted(()  => {
  visitasInterval = setInterval(() => {

    const nuevasVisitas = Math.floor(Math.random() * 21 + 10); // Simula entre 10 y 30 nuevas visitas
    visitasActuales.value += nuevasVisitas;

    const data = chartSeriesVisitas.value[0].data;
    data.shift(); // Elimina el primer punto de datos
    data.push(visitasActuales.value); // Agrega el nuevo valor al final

    chartSeriesVisitas.value = [{ data: [...data] }]; // Actualiza la serie para disparar la reactividad
  }, 3000); // Actualiza cada 3 segundos
});

onUnmounted(() => {
  clearInterval(visitasInterval);
})

// Clientes 
const objetivoMensualClientes = 300; // Objetivo de tener por lo menos 300 clientes al mes
const clientesActuales = ref(30); // Clientes actuales reducido para mayor duración

const chartSeriesClientes = ref([
  { data: [5, 10, 15, 20, 25, 28, 30] }
])

const chartOptionsClientes = {
  chart: {
    type: 'line',
    sparkline: { enabled: true }
  },
  stroke: { curve: 'smooth', colors: ['#ffffff'] },
  colors: ['#ffffff'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#ffffff'],
      inverseColors: false,
      opacityFrom: 0.6,
      opacityTo: 0.2,
      stops: [0, 100]
    }
  }
};

let clientesInterval: any;

onMounted(()  => {
  clientesInterval = setInterval(() => {

    const nuevosClientes = Math.floor(Math.random() * 4 + 1); // Simula entre 0 y 3 nuevos clientes
    clientesActuales.value += nuevosClientes;

    const data = chartSeriesClientes.value[0].data;
    data.shift(); // Elimina el primer punto de datos
    data.push(clientesActuales.value); // Agrega el nuevo valor al final

    chartSeriesClientes.value = [{ data: [...data] }]; // Actualiza la serie para disparar la reactividad
  }, 3000); // Actualiza cada 3 segundos
});

onUnmounted(() => {
  clearInterval(clientesInterval);
})



// Productos
const objetivoMensualProductos = 50; // Objetivo de tener por lo menos 50 productos al mes
const productosActuales = ref(8); // Productos actuales reducido para mayor duración

const chartSeriesProductos = ref([
  { data: [2, 3, 4, 5, 6, 7, 8] }
])

const chartOptionsProductos = {
  chart: {
    type: 'bar',
    sparkline: { enabled: true }
  },
  plotOptions: {
    bar: {
      horizontal: false,     // 👈 columnas (vertical)
      columnWidth: '60%',
      borderRadius: 4
    }
  },
  stroke: { curve: 'smooth', colors: ['#ffffff'] },
  colors: ['#ffffff'],
  fill: {
    opacity: 0.7
  },
  dataLabels: {
    enabled: false
  }
};

let productosInterval: any;

onMounted(()  => {
  productosInterval = setInterval(() => {

    const nuevosProductos = Math.floor(Math.random() * 6 + 1); // Simula entre 0 y 5 nuevos productos
    productosActuales.value += nuevosProductos;

    const data = chartSeriesProductos.value[0].data;
    data.shift(); // Elimina el primer punto de datos
    data.push(productosActuales.value); // Agrega el nuevo valor al final

    chartSeriesProductos.value = [{ data: [...data] }]; // Actualiza la serie para disparar la reactividad
  }, 3000); // Actualiza cada 3 segundos
});

onUnmounted(() => {
  clearInterval(productosInterval);
})
</script>


<style scoped>


ion-row{
  overflow: hidden;
}


ion-col {
  max-height: 100%;
  --ion-grid-column-padding:10px;
}


/* El contenido real de cada columna */
.box {
  background: #1E1E1E;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius:5px;
  display: flex;
  justify-content: center;
  align-items: start;
}


/* Aplicar altura total y por filas, solo en pantallas ≥ md */
@media (min-width: 992px) {  
  ion-grid{height: 100%;}
  .ion-row-1{height: 20%; max-height: 20%;}
  .ion-row-2{height: 40%; max-height: 40%;}
  .ion-row-3{height: 40%; max-height: 40%;}
}


</style>
