import { contextBridge, ipcRenderer, OpenDialogReturnValue } from 'electron';
import path from 'path';

import { InspectData } from '@shared/types';

contextBridge.exposeInMainWorld('process', {
  env: process.env,
  platform: process.platform,
});

contextBridge.exposeInMainWorld('path', {
  ...path,
});

export const apiContextBridge = {
  inspectFile: (filePath: string): Promise<InspectData | undefined> =>
    ipcRenderer.invoke('inspect-file', filePath),
  showOpenDialog: (): Promise<OpenDialogReturnValue> =>
    ipcRenderer.invoke('show-open-dialog'),
};

contextBridge.exposeInMainWorld('api', apiContextBridge);
