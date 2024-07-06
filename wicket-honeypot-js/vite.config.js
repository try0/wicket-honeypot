import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'jp.try0.wicket',
      fileName: 'HoneypotBehavior',
      formats: ['es', 'umd'],
    },
  },
  test: {
    browser: {
      enabled: true,
      headless: true, 
      name: 'chrome',
    },
    include: [
      'tests/browser/**/*.{test,spec}.ts',
      'tests/**/*.browser.{test,spec}.ts',
    ],
  }
})