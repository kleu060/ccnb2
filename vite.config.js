import { defineConfig } from 'vite';
import { resolve } from 'path'


export default defineConfig({
    base: '/ccnb2/',
    server: {
        //host: 'ccnb2.test',   // your APP_URL domain
        host: '0.0.0.0',  
        port: 5173,
        strictPort: true,
        // hmr: {
        //     protocol: 'ws',
        //     host: '192.168.82.181', // 👈 The browser will use your Apache IP
        //     clientPort: 80,         // 👈 Connects over standard port 80
        //     path: 'ccnb2/'          // 👈 Matches your base folder layout
        // },
                hmr: false, // 👈 1. Completely disables the WebSocket client connection

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