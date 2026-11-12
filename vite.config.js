import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            // Исключаем папку Visual Studio и сам конфиг, чтобы не было цикла перезапусков
            ignored: ['**/.vs/**', '**/vite.config.js'],
        },
    },
})