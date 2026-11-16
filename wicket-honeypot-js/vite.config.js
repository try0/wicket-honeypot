import { resolve } from 'path'
import { defineConfig } from 'vite'
import { webdriverio } from '@vitest/browser-webdriverio'

export default defineConfig({
  build: {
    // Vite 7 以降はデフォルトの target が変わるため、Vite 5 のデフォルト値を明示して出力を維持する
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    lib: {
      entry: resolve(import.meta.dirname, 'src/main.ts'),
      name: 'jp.try0.wicket',
      fileName: 'HoneypotBehavior',
      formats: ['es', 'umd'],
    },
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: webdriverio(),
      instances: [{ browser: 'chrome' }],
    },
    include: [
      'tests/browser/**/*.{test,spec}.ts',
      'tests/**/*.browser.{test,spec}.ts',
    ],
  }
})
