import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Cargar variables de entorno que empiezan con VITE_
    const env = loadEnv(mode, process.cwd());

    // Mapear las variables VITE_* a process.env.*
    const processEnv = Object.keys(env)
        .filter((key) => key.startsWith('VITE_'))
        .reduce((acc, key) => {
            const newKey = key.replace(/^VITE_/, '');
            acc[`process.env.${newKey}`] = JSON.stringify(env[key]);
            return acc;
        }, {});

    return {
        optimizeDeps: {
  noDiscovery: true,
  include: ['maplibre-gl']
},

        plugins: [
            vue(),
            Components({
                resolvers: [PrimeVueResolver()]
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        define: processEnv
    };
});
