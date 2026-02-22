/// <reference types="vite/client" />

// Type declarations for Vue SFC imports
// This allows importing .vue files without TypeScript errors
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
