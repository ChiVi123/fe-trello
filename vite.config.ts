import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '~config', replacement: '/src/config' },
            { find: '~core', replacement: '/src/core' },
            { find: '~layouts', replacement: '/src/layouts' },
            { find: '~components', replacement: '/src/shared/components' },
            { find: '~utils', replacement: '/src/shared/utils' },
            { find: '~view', replacement: '/src/view' },
        ],
    },
});
