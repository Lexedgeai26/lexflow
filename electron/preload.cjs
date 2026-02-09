
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getApiKey: () => ipcRenderer.sendSync('get-api-key'),
  setApiKey: (key) => ipcRenderer.send('set-api-key', key),
  openSettings: () => ipcRenderer.send('open-settings'),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  cancelOnboarding: () => ipcRenderer.send('cancel-onboarding'),
  log: (level, message) => ipcRenderer.send('log-message', level, message)
});

contextBridge.exposeInMainWorld('api', {
  ping: () => 'pong'
});

window.onerror = function (message, source, lineno, colno, error) {
  ipcRenderer.send('log-message', 'error', `Global Error: ${message} at ${source}:${lineno}`);
};

// Floating key button removed - API key management is now in Settings
