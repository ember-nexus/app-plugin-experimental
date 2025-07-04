import type { UserConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default {
  build: {
    outDir: 'dist/browser',
    sourcemap: true,
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
