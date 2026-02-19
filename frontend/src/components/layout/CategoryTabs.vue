<template>
  <div class="categories-scroll">
    <div
      v-for="category in categories"
      :key="category.id"
      :class="['category-item', { active: selected === category.id }]"
      @click="$emit('select', category.id)"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  categories: Array,
  selected: String
})
</script>

<style scoped>
.categories-scroll {
  display: flex;
  gap: 0;
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.categories-scroll::-webkit-scrollbar {
  display: none;
}
.category-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  background: transparent;
}
.category-item:hover {
  color: #1a7f34;
  background: #f9f9f9;
}
.category-item.active {
  color: #1a7f34;
  border-bottom-color: #1a7f34;
  font-weight: 600;
}
</style>
