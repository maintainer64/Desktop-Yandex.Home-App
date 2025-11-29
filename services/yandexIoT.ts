// service.ts или component.tsx (пример использования)

import { YandexUserInfoResponse } from '../types';

// Используем глобально объявленный 'api'
const yandexApi = window.api;

export const fetchUserInfo = async (token: string): Promise<YandexUserInfoResponse> => {
    try {
        // Вызываем функцию через IPC-мост, а не fetch напрямую!
        const userInfo = await yandexApi.fetchUserInfo(token);
        return userInfo;
    } catch (error) {
        // Здесь вы получите ошибки, переданные из main.js
        console.error('Ошибка при загрузке данных через IPC:', error);
        throw error;
    }
};

export const toggleDevice = async (token: string, deviceId: string, newState: boolean): Promise<void> => {
    try {
        await yandexApi.toggleDevice(token, deviceId, newState);
        console.log('Устройство переключено успешно.');
    } catch (error) {
        console.error('Ошибка при переключении устройства через IPC:', error);
        throw error;
    }
};

// 2. ДОБАВЛЕНО: Не хватает функции executeScenario (должна быть вызвана из App.tsx)
export const executeScenario = async (token: string, scenarioId: string): Promise<void> => {
    try {
        await yandexApi.executeScenario(token, scenarioId);
        console.log('Сценарий запущен успешно.');
    } catch (error) {
        console.error('Ошибка при запуске сценария через IPC:', error);
        throw error;
    }
};