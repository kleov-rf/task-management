import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        globals: true
    },
});