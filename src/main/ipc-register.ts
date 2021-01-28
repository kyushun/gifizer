import { ipcMain, dialog } from 'electron';

import { inspectFile } from './lib/ffmpeg';

export const ipcRegister = () => {
  ipcMain.handle('inspect-file', async (_, filePath: string) => {
    const result = await inspectFile(filePath);
    return result;
  });

  ipcMain.handle('show-open-dialog', async () => {
    const result = await dialog.showOpenDialog({});
    return result;
  });
};
