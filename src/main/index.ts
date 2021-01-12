import { app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
import { isProduction } from '@main/util';

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    show: false,
    width: 900,
    height: 550,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 20, y: 36 },
    resizable: !isProduction,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
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
      win.show();
      win.focus();
      !isProduction && win.webContents.openDevTools({ mode: 'detach' });
    }
  });

  win.on('closed', () => {
    win = null;
  });

  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();
};

app.whenReady().then(createWindow);

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
