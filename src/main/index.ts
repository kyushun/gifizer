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
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import logger from "@/shared/util/logger";
import * as updater from "./lib/updater";
import FFmpeg from "./lib/ffmpeg";
import Config from "../shared/config";
import { ConvertOptions } from "../shared/types";
import * as ipcs from "../shared/ipcs";
import { isDevelopment, isProduction, isMac } from "../shared/util";
import { packageJson } from "./util";
import * as contextMenuRegister from "./lib/contextMenuRegister";

let arg: string | undefined = process.argv.slice(isDevelopment ? 2 : 1)[0];
let win: BrowserWindow | null;
let converter: FFmpeg | null;

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
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      logger.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  // Check Update
  const diff =
    (new Date().getTime() - new Date(Config.updateLastCheckedAt).getTime()) /
    // h * m * s * ms
    (24 * 60 * 60 * 1000);
  if (isProduction && (!Config.updateLastCheckedAt || diff >= 30)) {
    checkUpdate(false, true);
  }
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
  converter = new FFmpeg(options).convertToGif(event.sender);
});

ipcMain.on(ipcs.CONVERT_CANCEL, () => {
  converter?.cancel();
});

ipcMain.on(ipcs.INSPECT_FILE, (event: any, filepath: string) => {
  FFmpeg.inspectFile(filepath, event.sender);
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
      submenu: [{ role: "reload" }, { role: "forceReload" }]
    },
    { role: "windowMenu" },
    ...(isDevelopment
      ? ([
          {
            label: "Development",
            submenu: [
              { role: "toggledevtools" },
              { type: "separator" },
              {
                label: "Clear Configs",
                click: () => {
                  Config.clear();
                }
              }
            ]
          }
        ] as Electron.MenuItemConstructorOptions[])
      : []),
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
              { type: "separator" },
              {
                label: "Add shortcut to context menu of Explorer",
                click: addContextMenu
              },
              {
                label: "Remove shortcut from context menu of Explorer",
                click: removeContextMenu
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
      nodeIntegration:
        typeof process.env.ELECTRON_NODE_INTEGRATION == "boolean"
          ? process.env.ELECTRON_NODE_INTEGRATION
          : false,
      webSecurity: false
    }
  });

  let url;
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    url = process.env.WEBPACK_DEV_SERVER_URL as string;
  } else {
    createProtocol("app");
    url = "app://./index.html";
  }

  if (arg) {
    url += `?file=${arg}`;
    arg = undefined;
  }
  win.loadURL(url);

  win.on("closed", () => {
    win = null;
    switchMenu("new-window", true);
  });
}

async function checkUpdate(
  showNoUpdateNotification = false,
  saveLastCheckedAt = false
) {
  const updateUrl = await updater.checkUpdate();
  if (updateUrl) {
    dialog
      .showMessageBox({
        type: "info",
        buttons: ["Yes", "No"],
        title: "An update is available",
        message: "An update is available",
        detail: "Do you want to download?"
      })
      .then(({ response }) => {
        if (response == 0) {
          shell.openExternal(updateUrl);
          app.quit();
        } else {
          if (saveLastCheckedAt)
            Config.updateLastCheckedAt = new Date().toISOString();
        }
      });
  } else if (showNoUpdateNotification) {
    dialog.showMessageBox({
      type: "info",
      title: "No updates are available",
      message: "No updates are available"
    });
  }
}

function addContextMenu() {
  contextMenuRegister
    .register()
    .then(() => {
      dialog.showMessageBox({
        type: "info",
        message: "The shortcut has been added successfully."
      });
    })
    .catch(err => {
      const message = "An error occurred when installing context menu shortcut";
      logger.error(message, err);
      dialog.showErrorBox("Cannot add shortcut", message);
    });
}

function removeContextMenu() {
  contextMenuRegister
    .remove()
    .then(() => {
      dialog.showMessageBox({
        type: "info",
        message: "The shortcut has been deleted successfully."
      });
    })
    .catch(err => {
      const message =
        "An error occurred when uninstalling context menu shortcut";
      logger.error(message, err);
      dialog.showErrorBox("Cannot remove shortcut", message);
    });
}
