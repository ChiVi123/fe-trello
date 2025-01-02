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
            { find: '~modules', replacement: '/src/modules' },
            { find: '~components', replacement: '/src/shared/components' },
            { find: '~icon', replacement: '/src/shared/assets/icon' },
            { find: '~svg', replacement: '/src/shared/assets/svg' },
            { find: '~utils', replacement: '/src/shared/utils' },
            { find: '~view', replacement: '/src/view' },
        ],
    },
});
