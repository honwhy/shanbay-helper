import { defineConfig } from 'wxt'
import vue from '@vitejs/plugin-vue'

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  vite: () => ({
    plugins: [vue()],
    build: {
      // Enabling sourcemaps with Vue during development is known to cause problems with Vue
      sourcemap: false,
    },
  }),
  manifest: {
    name: '扇贝单词助手',
    host_permissions: [
      'https://dict.youdao.com/',
      'https://www.wordsmyth.net/',
      '*://*.shanbay.com/*',
    ],
    minimum_chrome_version: '88',
  },
})
