import { defineConfig } from 'vite';
import { resolve } from 'path'


export default defineConfig({
    base: '/ccnb2/',
    server: {
        //host: 'ccnb2.test',   // your APP_URL domain
        host: '0.0.0.0',  
        port: 5173,
        strictPort: true,
    },
    css: {
        devSourcemap: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                print: resolve(__dirname, 'print.html'),
                printBlacklist: resolve(__dirname, 'print_blacklist.html')
            }
        }
    }
});