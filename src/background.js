"use strict";

import {
  app,
  protocol,
  Menu,
  BrowserWindow,
  ipcMain,
  dialog,
  shell
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import * as updater from "./lib/updater";
import { convertToGif } from "./lib/ffmpeg";
const isDevelopment = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

const checkUpdate = async noUpdateNotification => {
  const updateUrl = await updater.checkUpdate();
  if (updateUrl) {
    const ans = dialog.showMessageBoxSync({
      type: "info",
      buttons: ["Yes", "No"],
      title: "An update is available",
      message: "An update is available",
      detail: "Do you want to download?"
    });
    if (ans == 0) {
      shell.openExternal(updateUrl);
      app.quit();
    }
  } else if (noUpdateNotification) {
    dialog.showMessageBoxSync({
      type: "info",
      title: "No updates are available",
      message: "No updates are available"
    });
  }
};

const menu = Menu.buildFromTemplate([
  ...(isMac
    ? [
        {
          label: app.getName(),
          submenu: [
            { role: "about" },
            {
              label: "Check for Updates",
              click: () => {
                checkUpdate(true);
              }
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
          ]
        }
      ]
    : []),
  {
    label: "File",
    submenu: [
      ...(isMac
        ? [
            {
              id: "new-window",
              label: "New Window",
              enabled: false,
              click: createWindow,
              accelerator: "CmdOrCtrl+N"
            },
            { role: "close" }
          ]
        : [{ role: "quit" }])
    ]
  },
  { role: "editMenu" },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      ...(isDevelopment
        ? [{ type: "separator" }, { role: "toggledevtools" }]
        : [])
    ]
  },
  { role: "windowMenu" },
  {
    role: "help",
    submenu: [
      ...(!isMac
        ? [
            {
              label: "Check for Updates",
              click: () => {
                checkUpdate(true);
              }
            },
            { type: "separator" }
          ]
        : []),
      {
        label: "Open Repository",
        click: async () => {
          await shell.openExternal(require("../package.json").homepage);
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);

const switchMenu = (id, enabled) => {
  const _menu = Menu.getApplicationMenu();
  const item = _menu.getMenuItemById(id);
  if (item) item.enabled = enabled;
};

let win;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  switchMenu("new-window", false);
  win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: isDevelopment,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
    switchMenu("new-window", true);
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.on("convert-run", async (event, args) => {
  console.log(args);
  convertToGif(args, event.sender);
});
