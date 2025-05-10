import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        'node_modules/',
        'coverage/',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.spec.tsx',
        '**/*.spec.ts',
        'src/tests/setup.ts',
        'src/tests/mocks.ts',
      ],
      reportsDirectory: './coverage',
      clean: false,
      reporter: ['text', 'json', 'html'],
    },
  },
});
