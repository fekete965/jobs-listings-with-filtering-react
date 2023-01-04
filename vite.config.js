import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()]
// });

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.jsx']
	},
	plugins: [
		react({
			babel: {
				plugins: [
					[
						'babel-plugin-styled-components',
						{
							displayName: true,
							fileName: false,
							ssr: false
						}
					]
				]
			}
		})
	]
});
