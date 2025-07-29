// Это конфигурация для Vite — сборщика и дев - сервера.
// В нём задаются настройки пути, плагины, alias, прокси и т.д.
// Не связан напрямую с TypeScript, но важен для корректной сборки проекта.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // меняй под свой бэкенд
      "/api": {
        target: "http://localhost:8080", // адрес твоего Spring Boot backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  }
})