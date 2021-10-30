import {
  contextBridge,
  ipcRenderer,
  OpenDialogReturnValue,
  shell,
} from 'electron';
import log from 'electron-log';
import path from 'path';

import { ConvertOption, ConvertStatus, InspectData } from '@shared/types';

contextBridge.exposeInMainWorld('process', {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  platform: process.platform,
});

contextBridge.exposeInMainWorld('path', {
  ...path,
});

contextBridge.exposeInMainWorld('log', log.functions);

export const apiContextBridge = {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  inspectFile: (filePath: string): Promise<InspectData | undefined> =>
    ipcRenderer.invoke('inspect-file', filePath),
  showOpenDialog: (): Promise<OpenDialogReturnValue> =>
    ipcRenderer.invoke('show-open-dialog'),
  convert: (filePath: string, option: ConvertOption) =>
    ipcRenderer.invoke('convert', filePath, option),
  onConvertStatus: (callback: (status: ConvertStatus) => void) => {
    const listener = (_: any, status: ConvertStatus) => callback(status);
    ipcRenderer.on('convert-status', listener);

    return () => {
      ipcRenderer.removeListener('convert-status', listener);
    };
  },
  cancel: () => ipcRenderer.send('cancel'),
  revealFile: (filePath: string) => shell.showItemInFolder(filePath),
};

contextBridge.exposeInMainWorld('api', apiContextBridge);
