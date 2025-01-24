import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [
            { find: '~config', replacement: '/src/config' },
            { find: '~core', replacement: '/src/core' },
            { find: '~layouts', replacement: '/src/layouts' },
            { find: '~libs', replacement: '/src/libs' },
            { find: '~modules', replacement: '/src/modules' },
            { find: '~routes', replacement: '/src/routes' },
            { find: '~icon', replacement: '/src/shared/assets/icon' },
            { find: '~image', replacement: '/src/shared/assets/image' },
            { find: '~svg', replacement: '/src/shared/assets/svg' },
            { find: '~components', replacement: '/src/shared/components' },
            { find: '~hook', replacement: '/src/shared/hook' },
            { find: '~utils', replacement: '/src/shared/utils' },
            { find: '~view', replacement: '/src/view' },
        ],
    },
});
