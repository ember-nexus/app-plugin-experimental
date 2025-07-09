import type { UserConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default {
  build: {
    outDir: 'dist/browser',
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      input: [
        resolve(__dirname, './src/index.ts')
      ],
      output: {
        entryFileNames: "[name].js",
        assetFileNames: `[name].[ext]`
      }
    }
  },
  plugins: [
    tailwindcss()
  ],
} satisfies UserConfig;
