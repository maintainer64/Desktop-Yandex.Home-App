// main.js

import { app, BrowserWindow, ipcMain } from 'electron'; // <-- Все модули Electron
import path from 'path';
import { fileURLToPath } from 'url';
// Импорт yandex-api.js
import * as yandexApi from './yandex-api.js'; 
import keytar from 'keytar';

// Установка __dirname и __filename для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVICE_NAME = 'SmartHomeControlApp'; 
// Уникальный аккаунт (можно использовать фиксированное имя, так как токен один)
const ACCOUNT_NAME = 'YandexToken';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // Это важно для безопасности, отключает Node.js API во фронтенде
      nodeIntegration: false, 
      contextIsolation: true,
      // В режиме разработки эта настройка может быть другой
	  preload: path.join(__dirname, 'preload.cjs')
    }
  });

  // В режиме разработки загружаем URL-адрес сервера Vite
  // В режиме сборки (production) загружаем index.html из папки dist
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); 
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// Когда Electron готов
app.whenReady().then(() => {
    createWindow();
    
    ipcMain.handle('yandex-api:fetchUserInfo', async (event, token) => {
        try {
            return await yandexApi.fetchUserInfo(token);
        } catch (error) {
            throw new Error(error.message); 
        }
    });

    ipcMain.handle('yandex-api:executeScenario', async (event, token, scenarioId) => {
        try {
            return await yandexApi.executeScenario(token, scenarioId);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    ipcMain.handle('yandex-api:toggleDevice', async (event, token, deviceId, newState) => {
        try {
            return await yandexApi.toggleDevice(token, deviceId, newState);
        } catch (error) {
            throw new Error(error.message);
        }
    });

	ipcMain.handle('secure:getToken', async () => {
        // Читает токен из системного хранилища
        return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    });

    ipcMain.handle('secure:setToken', async (event, token) => {
        // Сохраняет токен в системное хранилище
        await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
    });

    ipcMain.handle('secure:deleteToken', async () => {
        // Удаляет токен из системного хранилища
        await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
    });

});

// Закрыть приложение, когда закрыты все окна (кроме macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});