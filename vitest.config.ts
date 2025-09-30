import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.ts'],
    css: true,
    coverage: { reporter: ['text','html','lcov'] }
  }
});