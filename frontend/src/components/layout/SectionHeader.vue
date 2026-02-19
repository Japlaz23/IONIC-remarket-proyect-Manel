<template>
  <div class="section-header">
    <h2>{{ title }}</h2>
    <span v-if="count !== undefined">{{ count }} productos</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String,
  count: Number
})
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
}
.section-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}
.section-header span {
  color: #888;
  font-size: 0.95rem;
}
</style>
