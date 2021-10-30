import { app, BrowserWindow, dialog, protocol } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import path from 'path';

import { isProduction } from '@shared/util';

import { ipcRegister } from './ipc-register';
import MenuBuilder from './menu';

let win: BrowserWindow | null;

autoUpdater.logger = log;
log.transports.file.level = 'info';

const installExtensions = async () => {
  // eslint-disable-next-line global-require
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return installer
    .default([installer.REACT_DEVELOPER_TOOLS], forceDownload)
    .catch(log.debug);
};

const createWindow = async () => {
  if (!isProduction) await installExtensions();

  win = new BrowserWindow({
    show: false,
    width: 900,
    height: 550,
    minWidth: 700,
    minHeight: 400,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 20, y: 20 },
    resizable: true,
    maximizable: true,
    fullscreenable: true,
    webPreferences: {
      webSecurity: isProduction,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: isProduction
        ? path.join(process.resourcesPath, 'build', './preLoad.js')
        : path.join(__dirname, './preLoad.js'),
    },
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadFile('./build/index.html');
  } else {
    win.loadURL('http://localhost:8080/');
  }

  win.webContents.on('did-finish-load', () => {
    if (!win) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      win.minimize();
    } else {
      if (!win.isVisible()) {
        win.show();
        win.focus();
      }
      !isProduction && win.webContents.openDevTools({ mode: 'detach' });
    }
  });

  win.on('closed', () => {
    win = null;
  });

  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();
};

app
  .whenReady()
  .then(() => {
    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = decodeURI(request.url.replace('file:///', ''));
      callback(pathname);
    });
  })
  .then(ipcRegister)
  .then(createWindow)
  .then(async () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

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

autoUpdater.on('update-downloaded', () => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    defaultId: 0,
    message: 'Software Update',
    detail: 'A New version has been downloaded. Would you like to install now?',
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on('error', (err) => {
  log.error(process.pid, err);
});
