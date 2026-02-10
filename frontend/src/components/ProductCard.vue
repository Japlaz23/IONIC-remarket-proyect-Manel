<template>
  <ion-item @click="onClick" button>
    <ion-thumbnail slot="start">
      <img :src="product.image" :alt="product.title" />
    </ion-thumbnail>
    <ion-label>
      <h2>{{ product.title }}</h2>
      <p class="price">{{ product.price }}€</p>
      <p>{{ product.location }} • {{ product.condition }}</p>
    </ion-label>
    <ion-icon slot="end" :icon="product.isFavorite ? heart : heartOutline"></ion-icon>
  </ion-item>
</template>

<script setup>
import { IonItem, IonLabel, IonThumbnail, IonIcon } from '@ionic/vue'
import { heart, heartOutline } from 'ionicons/icons'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['click', 'favorite'])

const onClick = () => {
  emit('click', product.id)
}
</script>

<style scoped>
ion-item {
  border-bottom: 1px solid #e0e0e0;
}

ion-thumbnail {
  width: 100px;
  height: 100px;
  --border-radius: 8px;
}

.price {
  font-weight: bold;
  color: #1a7f34;
  font-size: 1.1em;
  margin-top: 0.5em;
}
</style>
