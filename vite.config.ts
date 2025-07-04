import type { UserConfig } from 'vite';
import { resolve } from 'path';
import presetAttributify from '@unocss/preset-attributify';
import presetTypography from '@unocss/preset-typography';
import presetWind4 from '@unocss/preset-wind4';
import UnoCSS from 'unocss/vite';
import { presetDaisy } from '@ameinhardt/unocss-preset-daisy';
import theme from 'daisyui/functions/variables.js';

export default {
  build: {
    outDir: 'dist/browser',
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, './src/index.ts'),
      output: {
        entryFileNames: "[name].js"
      }
    }
  },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      shortcuts: [],
      presets: [
        presetAttributify(),
        presetTypography(),
        presetWind4(),
        presetDaisy({
          themes: ['light --default', 'dark']
        })
      ],
      inspector: false,
      separators: [':'],
      theme: {
        ...theme
      }
    }),
  ],
} satisfies UserConfig;
