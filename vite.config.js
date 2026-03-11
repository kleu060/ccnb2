import { defineConfig } from 'vite';

export default defineConfig({
    base: '/ccnb2/',
    server: {
        host: 'ccnb2.test',   // your APP_URL domain
        port: 5173,
        strictPort: true
    },
    css: {
        devSourcemap: true
    }
});