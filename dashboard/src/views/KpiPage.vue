<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🎯 KPIs</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🎯 KPIs</ion-title>
        </ion-toolbar>
      </ion-header>

      <h1 class="ion-padding">🚀 KPIs de Negocio</h1>
      <ion-accordion-group expand="inset" :multiple="true">
        <ion-accordion v-for="item in smartGoals" :key="item.id" :value="item.id.toString()">
          <ion-item slot="header">
            <ion-label>{{ item.title }}</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <p>{{ item.description }}</p>
            <ul>
              <li v-for="element in item.smart" :key="element.letter">
                <strong>{{ element.letter }}:</strong> {{ element.content }}
              </li>
            </ul>
          </div>
        </ion-accordion>
        </ion-accordion-group>
      <br>
      <h1 class="ion-padding">📈 KPIs Técnicos</h1>
      <ion-accordion-group expand="inset" :multiple="true">
        <ion-accordion v-for="item in technicalKpis" :key="item.id" :value="item.id.toString()">
          <ion-item slot="header">
            <ion-label>{{ item.title }}</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <p>{{ item.description }}</p>
            <ul>
              <li v-for="element in item.smart" :key="element.letter">
                <strong>{{ element.letter }}:</strong> {{ element.content }}
              </li>
            </ul>
          </div>
        </ion-accordion>       
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';

import { ref } from 'vue';

// Definición de interfaces para los objetivos SMART
interface SmartElement {
    letter: string; // Letra del elemento SMART (S, M, A, R, T)
    content: string; // Contenido descriptivo del elemento
}

interface SmartGoal {
    id: number; // Identificador único del objetivo SMART
    title: string; // Título del objetivo SMART
    description: string; // Descripción detallada del objetivo SMART
    smart: SmartElement[]; // Array de elementos SMART asociados al objetivo
}


const smartGoals =  ref<SmartGoal[]>([
    { 
        id: 1, 
        title: "Augmentar visitas",
        description: "Aumentar las visitas de nuestro sitio wen en un 40% (de 1000 a 1400 visitas mensuales) en los próximos 6 meses, implementando estrategias de marketing digital y optimización SEO.",
        smart: [
            { letter: "S", content: "Específico: Aumentar visitas en un 40% en el próximo trimestre" },
            { letter: "M", content: "Medible: Medir el número de visitas diarias" },
            { letter: "A", content: "Alcanzable: Implementar estrategias de marketing digital" },
            { letter: "R", content: "Relevante: Aumentar visibilidad en motores de búsqueda" },
            { letter: "T", content: "Temporizado: Lograr el objetivo en los próximos 30 días" }
        ]
    },
    { 
        id: 2, 
        title: "Aumentar ventas",
        description: "Aumentar las ventas en un 20% (de $200,000 a $240,000) en los próximos 12 meses, ofreciendo nuestros nuevos productos a los clientes existentes.",
        smart: [
            { letter: "S", content: "Específico: Aumentar ventas en un 20% en el próximo año" },
            { letter: "M", content: "Medible: Medir el total de ventas mensuales" },
            { letter: "A", content: "Alcanzable: Ofrecer nuevos productos a clientes existentes" },
            { letter: "R", content: "Relevante: Incrementar ingresos y fidelización de clientes" },
            { letter: "T", content: "Temporizado: Lograr el objetivo en los próximos 12 meses" }
        ]
    },
    {
        id: 3, 
        title: "Mejorar retención de clientes por países",
        description: "Mejorar la retención de clientes en un 15% (de 70% a 85%) en los próximos 6 meses, implementando un programa de fidelización y mejorando el servicio al cliente.",
        smart: [
            { letter: "S", content: "Específico: Mejorar retención de clientes en un 15% en el próximo semestre" },
            { letter: "M", content: "Medible: Medir la tasa de retención mensual por país" },
            { letter: "A", content: "Alcanzable: Implementar programa de fidelización y mejorar servicio al cliente" },
            { letter: "R", content: "Relevante: Incrementar lealtad y satisfacción del cliente" },
            { letter: "T", content: "Temporizado: Lograr el objetivo en los próximos 6 meses" }
        ]
    },
    {
        id: 4,
        title: "Leads calificados",
        description: "Aumentar el número de leads calificados en un 25% (de 200 a 250 leads mensuales) en los próximos 3 meses, mejorando la segmentación de campañas publicitarias y optimizando el proceso de generación de leads.",
        smart: [
            { letter: "S", content: "Específico: Aumentar leads calificados en un 25% en el próximo trimestre" },
            { letter: "M", content: "Medible: Medir el número de leads calificados mensuales" },
            { letter: "A", content: "Alcanzable: Mejorar segmentación de campañas publicitarias y optimizar proceso de generación de leads" },
            { letter: "R", content: "Relevante: Incrementar oportunidades de venta y crecimiento del negocio" },
            { letter: "T", content: "Temporizado: Lograr el objetivo en los próximos 3 meses" }
        ]
    },
    {
        id: 5,
        title: "Alianzas estratégicas",
        description: "Crear 10 alianzas estratégicas en el próximo bienio por medio de la organización de foros, y así obtener más exposición de marca y mejorar la red de proveedores.",
        smart: [
            { letter: "S", content: "Específico: Crear alianzas estratégicas con otras empresas" },
            { letter: "M", content: "Medible: Medir el número de alianzas creadas" },
            { letter: "A", content: "Alcanzable: Organizar foros y eventos para establecer conexiones" },
            { letter: "R", content: "Relevante: Obtener más exposición de marca y mejorar red de proveedores" },
            { letter: "T", content: "Temporizado: Lograr el objetivo en los próximos 2 años" }
        ]
    }
]);

// Datos para KPIs técnicos 

const technicalKpis = ref<SmartGoal[]>([
  {
    id: 1,
    title: "Reducir el tiempo de carga del sitio web",
    description: "Reducir el tiempo de carga del sitio web en un 30% (de 5 segundos a 3.5 segundos) en los próximos 30 días, optimizando las imágenes, implementando técnicas de almacenamiento en caché y mejorando el rendimiento del servidor.",
    smart: [
      { letter: "S", content: "Reducir el tiempo de carga del sitio web en un 30%" },
      { letter: "M", content: "30% (de 5 segundos a 3.5 segundos)" },
      { letter: "A", content: "optimizando imágenes, implementando almacenamiento en caché y mejorando rendimiento del servidor" },
      { letter: "R", content: "(mejorar experiencia de usuario y SEO)" },
       { letter: "T", content: "en los próximos 30 días" }
    ]
  },
  {
    id: 2,
    title: "Mejorar el almacenamiento en la nube",
    description: "Mejorar la eficiencia del almacenamiento en la nube en un 25% (de 80% a 60% de uso) en los próximos 3 meses, implementando políticas de retención de datos, optimizando el uso de recursos y migrando a soluciones de almacenamiento más eficientes.",
    smart: [
        { letter: "S", content: "Mejorar la eficiencia del almacenamiento en la nube en un 25%" },
        { letter: "M", content: "25% (de 80% a 60% de uso)" },
        { letter: "A", content: "implementando políticas de retención de datos, optimizando uso de recursos y migrando a soluciones de almacenamiento más eficientes" },
        { letter: "R", content: "(reducir costos y mejorar rendimiento)" },
        { letter: "T", content: "en los próximos 3 meses" }
        ]
    },
  {
    id: 3,
    title: "Numero de errores críticos",
    description: "Reducir el número de errores críticos en un 40% (de 50 a 30 errores mensuales) en los próximos 6 meses, implementando un proceso de revisión de código más riguroso, mejorando las pruebas automatizadas y estableciendo un sistema de monitoreo proactivo.",
    smart: [
        { letter: "S", content: "Reducir el número de errores críticos en un 40%" },
        { letter: "M", content: "40% (de 50 a 30 errores mensuales)" },
        { letter: "A", content: "implementando revisión de código más riguroso, mejorando pruebas automatizadas y estableciendo sistema de monitoreo proactivo" },
        { letter: "R", content: "(mejorar estabilidad y confiabilidad del sistema)" },
        { letter: "T", content: "en los próximos 6 meses" }
        ]
    },
    {
    id: 4,
    title: "Mejorar la seguridad de la aplicación",
    description: "Mejorar la seguridad de la aplicación reduciendo las vulnerabilidades críticas en un 50% (de 20 a 10 vulnerabilidades mensuales) en los próximos 4 meses, implementando un programa de concientización sobre seguridad, realizando auditorías de seguridad regulares y aplicando parches de seguridad de manera oportuna.",
    smart: [
        { letter: "S", content: "Mejorar la seguridad de la aplicación reduciendo vulnerabilidades críticas en un 50%" },
        { letter: "M", content: "50% (de 20 a 10 vulnerabilidades mensuales)" },
        { letter: "A", content: "implementando programa de concientización sobre seguridad, realizando auditorías de seguridad regulares y aplicando parches de seguridad de manera oportuna" },
        { letter: "R", content: "(proteger datos de usuarios y mantener confianza)" },
        { letter: "T", content: "en los próximos 4 meses" }
        ]
    },
    {
    id: 5,
    title: "Mejorar la escalabilidad del sistema",
    description: "Mejorar la escalabilidad del sistema aumentando la capacidad de manejo de tráfico en un 50% (de 1000 a 1500 solicitudes por segundo) en los próximos 6 meses, implementando una arquitectura de microservicios, optimizando el uso de recursos y utilizando tecnologías de balanceo de carga.",
    smart: [
        { letter: "S", content: "Mejorar la escalabilidad del sistema aumentando la capacidad de manejo de tráfico en un 50%" },
        { letter: "M", content: "50% (de 1000 a 1500 solicitudes por segundo)" },
        { letter: "A", content: "implementando arquitectura de microservicios, optimizando uso de recursos y utilizando tecnologías de balanceo de carga" },
        { letter: "R", content: "(mejorar rendimiento y experiencia de usuario)" },
        { letter: "T", content: "en los próximos 6 meses" }
        ]
    }
]);
</script>
<style scoped>


ion-accordion.accordion-collapsing ion-item[slot='header'],
  ion-accordion.accordion-collapsed ion-item[slot='header'] {
    --background: var(--ion-color-light);
    --color: var(--ion-color-light-contrast);
  }


  ion-accordion.accordion-expanding ion-item[slot='header'],
  ion-accordion.accordion-expanded ion-item[slot='header'] {
    --background: rgba(var(--ion-color-primary-rgb), 0.14);
    --color: var(--ion-color-primary);
  }


</style>
