
const { app, BrowserWindow, ipcMain, Menu, dialog, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const Store = require('electron-store');
const log = require('electron-log');

// Configure Logging
log.transports.file.level = 'info';
log.info('App starting...');

const store = new Store();
let mainWindow = null;
let backendProcess = null;

// Global Error Handling
process.on('uncaughtException', (error) => {
  log.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  log.error('Unhandled Rejection:', reason);
});

function createWindow() {
  log.info('Creating window...');
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'LexEdge Flow',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
      .catch(e => log.error('Failed to load index.html:', e));
  }
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Update Gemini API Key...',
          click: () => {
            mainWindow.loadFile(path.join(__dirname, 'onboarding.html'));
          }
        },
        { type: 'separator' },
        {
          label: 'Reset API Key (Debug)',
          click: async () => {
            const { response } = await dialog.showMessageBox(mainWindow, {
              type: 'warning',
              buttons: ['Cancel', 'Reset & Restart'],
              title: 'Reset API Key',
              message: 'Are you sure you want to delete the stored API key?',
              detail: 'This will restart the onboarding flow.',
            });

            if (response === 1) { // Reset & Restart
              store.delete('GEMINI_API_KEY');
              log.info("API Key deleted by user.");
              mainWindow.loadFile(path.join(__dirname, 'onboarding.html'));
            }
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        {
          label: 'Open Logs Folder',
          click: () => {
            shell.openPath(path.dirname(log.transports.file.getFile().path));
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function startBackend() {
  const isDev = !app.isPackaged;
  let backendPath;

  if (isDev) {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const projectRoot = path.join(__dirname, '..');
    log.info('Starting backend in dev mode via npm run dev from:', projectRoot);
    backendProcess = spawn(npmCmd, ['run', 'dev'], {
      cwd: path.join(projectRoot, 'server'),
      env: { ...process.env, PORT: '8787' },
      stdio: 'pipe',
      shell: true
    });
  } else {
    // Packaged mode logic
    backendPath = path.join(process.resourcesPath, 'backend', 'lexflow-server');
    if (process.platform === 'win32') backendPath += '.exe';
    log.info('Spawning backend binary...', backendPath);

    if (require('fs').existsSync(backendPath)) {
      backendProcess = spawn(backendPath, [], {
        env: { ...process.env, PORT: '8787' },
        stdio: 'pipe'
      });
    } else {
      log.error('Backend binary not found at:', backendPath);
      log.error('Please ensure the backend is built and included in the package.');
      return; // Exit early to avoid null reference errors
    }
  }

  if (backendProcess) {
    backendProcess.stdout.on('data', (data) => {
      log.info(`[Backend]: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
      log.error(`[Backend Error]: ${data}`);
    });

    backendProcess.on('close', (code) => {
      log.info(`Backend process exited with code ${code}`);
      backendProcess = null;
    });

    backendProcess.on('error', (err) => {
      log.error('Failed to start backend process:', err);
      backendProcess = null;
    });
  }
}

function killBackend() {
  if (backendProcess) {
    console.log('Killing backend process...');
    backendProcess.kill();
    backendProcess = null;
  }
}

// IPC Handlers
ipcMain.on('get-api-key', (event) => {
  event.returnValue = store.get('GEMINI_API_KEY', '');
});

ipcMain.on('set-api-key', (event, key) => {
  store.set('GEMINI_API_KEY', key);
  log.info('New API Key saved');
  if (mainWindow) {
    if (!app.isPackaged) mainWindow.loadURL('http://localhost:3000');
    else mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
});

ipcMain.on('log-message', (event, level, message) => {
  if (log[level]) {
    log[level](`[Renderer] ${message}`);
  } else {
    log.info(`[Renderer] ${message}`);
  }
});

ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});

ipcMain.on('open-settings', () => {
  if (mainWindow) mainWindow.loadFile(path.join(__dirname, 'onboarding.html'));
});

ipcMain.on('cancel-onboarding', () => {
  if (mainWindow) {
    const apiKey = store.get('GEMINI_API_KEY');
    if (apiKey) {
      if (!app.isPackaged) mainWindow.loadURL('http://localhost:3000');
      else mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    } else {
      dialog.showMessageBox(mainWindow, { message: "You must enter an API key to continue." });
    }
  }
});

app.whenReady().then(() => {
  startBackend();
  createMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  killBackend();
});

app.on('quit', () => {
  killBackend();
});

app.on('before-quit', () => {
  killBackend();
});
