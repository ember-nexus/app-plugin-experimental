import type { UserConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default {
  build: {
    outDir: 'dist/browser',
    sourcemap: true,
    minify: 'terser',
    lib: {
      entry: './src/index.ts',
      formats: ['cjs']
    },
    cssCodeSplit: true,
    rollupOptions: {
      input: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/Style/index.css'),
      ],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: '[name].js',
        assetFileNames: `[name].[ext]`
      }
    }
  },
  plugins: [
    tailwindcss()
  ],
} satisfies UserConfig;
