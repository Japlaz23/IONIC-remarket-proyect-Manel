import { createApp } from 'vue';
import Vue3Pagination from 'vue3-pagination';

// This file is only for plugin registration if needed
export default (app) => {
  app.component('Vue3Pagination', Vue3Pagination);
};
