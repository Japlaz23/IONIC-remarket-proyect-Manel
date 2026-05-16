<template>
  <div class="placeholder-card">
    <h3>{{ title }}</h3>
    <div class="placeholder-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({ title: { type: String, default: '' } })
</script>

<style scoped>
.placeholder-card{ display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; height:100%; padding:16px; border-radius:8px; background:var(--ion-item-background, #fff); box-shadow:0 1px 3px rgba(0,0,0,0.05);} 
.placeholder-card h3{ margin:0 0 8px 0; font-size:16px; color:var(--ion-color-medium); }
.placeholder-body{ width:100%; flex:1; display:flex; align-items:center; justify-content:center; }
</style>
