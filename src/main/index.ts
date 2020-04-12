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
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
import logger from "@/shared/util/logger";
import * as updater from "./lib/updater";
import * as ffmpeg from "./lib/ffmpeg";
import { ConvertOptions } from "../shared/types";
import * as ipcs from "../shared/ipcs";
import { isDevelopment, isMac } from "../shared/util";
import { packageJson } from "./util";

let win: BrowserWindow | null;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

createMenu();

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
    try {
      await installVueDevtools();
    } catch (e) {
      logger.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

process.on("uncaughtException", function (err) {
  logger.error(err);
});

process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at:", p, "reason:", reason);
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

ipcMain.on(ipcs.CONVERT, async (event: any, options: ConvertOptions) => {
  logger.log(options);
  ffmpeg.convertToGif(options, event.sender);
});

ipcMain.on(ipcs.INSPECT_FILE, (event: any, filepath: string) => {
  ffmpeg.inspectFile(filepath, event.sender);
});

function createMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    ...((isMac
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
      : []) as Electron.MenuItemConstructorOptions[]),
    {
      label: "File",
      submenu: [
        ...((isMac
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
          : [{ role: "quit" }]) as Electron.MenuItemConstructorOptions[])
      ]
    },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        ...((isDevelopment
          ? [{ type: "separator" }, { role: "toggledevtools" }]
          : []) as Electron.MenuItemConstructorOptions[])
      ]
    },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        ...((!isMac
          ? [
              {
                label: `${app.getName()} v${app.getVersion()}`,
                enabled: false
              },
              {
                label: "Check for Updates",
                click: () => {
                  checkUpdate(true);
                }
              },
              { type: "separator" }
            ]
          : []) as Electron.MenuItemConstructorOptions[]),
        {
          label: "Open Repository",
          click: async () => {
            await shell.openExternal(packageJson.homepage);
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function switchMenu(id: string, enabled: boolean) {
  const _menu = Menu.getApplicationMenu();
  if (_menu) {
    const item = _menu.getMenuItemById(id);
    if (item) item.enabled = enabled;
  }
}

function createWindow() {
  switchMenu("new-window", false);
  win = new BrowserWindow({
    width: 500,
    height: isMac ? 280 : 270,
    useContentSize: true,
    titleBarStyle: "hidden",
    resizable: isDevelopment,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
    switchMenu("new-window", true);
  });
}

async function checkUpdate(noUpdateNotification = false) {
  const updateUrl = await updater.checkUpdate();
  if (updateUrl) {
    dialog.showMessageBox(
      {
        type: "info",
        buttons: ["Yes", "No"],
        title: "An update is available",
        message: "An update is available",
        detail: "Do you want to download?"
      },
      res => {
        if (res == 0) {
          shell.openExternal(updateUrl);
          app.quit();
        }
      }
    );
  } else if (noUpdateNotification) {
    dialog.showMessageBox({
      type: "info",
      title: "No updates are available",
      message: "No updates are available"
    });
  }
}
