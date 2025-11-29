import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Загрузка переменных окружения
    const env = loadEnv(mode, '.', '');
    
    return {
        
        // Генерирует относительные пути к ресурсам (./assets/...)
        base: './', 
        
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        
        // Определение переменных окружения для Frontend (если нужно)
        define: {
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        
        resolve: {
            alias: {
                // Предполагая, что исходный код находится в 'src'
                '@': path.resolve(__dirname, 'src'), 
            }
        }
    };
});