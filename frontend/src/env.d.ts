/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />

declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'vue-leaflet';
declare module 'vue3-apexcharts';