import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import content from '@originjs/vite-plugin-content'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), content()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'docs'
  },
  base: '/gretapp/'
})
