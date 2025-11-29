// preload.cjs

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // ... (Существующие функции API)
    fetchUserInfo: (token) => ipcRenderer.invoke('yandex-api:fetchUserInfo', token),
    executeScenario: (token, scenarioId) => ipcRenderer.invoke('yandex-api:executeScenario', token, scenarioId),
    toggleDevice: (token, deviceId, newState) => ipcRenderer.invoke('yandex-api:toggleDevice', token, deviceId, newState),
    
    // !!! НОВЫЕ ФУНКЦИИ БЕЗОПАСНОСТИ !!!
    // Запрашивает токен из Keytar
    getSecureToken: () => ipcRenderer.invoke('secure:getToken'), 
    // Сохраняет токен в Keytar
    setSecureToken: (token) => ipcRenderer.invoke('secure:setToken', token),
    // Удаляет токен из Keytar
    deleteSecureToken: () => ipcRenderer.invoke('secure:deleteToken'), 
});