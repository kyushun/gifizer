import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import log from 'electron-log';
import { FfmpegCommand } from 'fluent-ffmpeg';

import { ConvertOption, ConvertStatus } from '@shared/types';

import { convert, inspectFile } from './lib/ffmpeg';

let ffcommand: FfmpegCommand | undefined;

export const ipcRegister = () => {
  ipcMain.on('minimize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.isMinimized() ? win.restore() : win?.minimize();
  });

  ipcMain.on('maximize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.isMaximized() ? win.unmaximize() : win?.maximize();
  });

  ipcMain.on('close-window', () => {
    app.quit();
  });

  ipcMain.handle('inspect-file', async (_, filePath: string) => {
    const result = await inspectFile(filePath);
    return result;
  });

  ipcMain.handle('show-open-dialog', async () => {
    const win = BrowserWindow.getFocusedWindow();
    const result = dialog.showOpenDialog(win || (undefined as any), {});
    return result;
  });

  ipcMain.handle('show-save-dialog', async (_, defaultPath: string) => {
    const win = BrowserWindow.getFocusedWindow();
    const result = dialog.showSaveDialog(win || (undefined as any), {
      defaultPath,
    });
    return result;
  });

  ipcMain.handle(
    'convert',
    async (event, filePath: string, option: ConvertOption) => {
      ffcommand = convert(filePath, option);

      const sendStatus = (status: ConvertStatus) => {
        event.sender.send('convert-status', status);
      };

      ffcommand
        .on('start', (commandLine) => {
          log.info(`Command: ${commandLine}`);
          sendStatus({ status: 'PROCESSING', progress: 0 });
        })
        .on('progress', (progress) => {
          log.info(`Processing: ${progress.percent}% done`);
          sendStatus({ status: 'PROCESSING', progress: progress.percent });
        })
        .on('error', (err) => {
          if (/SIGKILL/.test(err.message)) {
            log.info('Convert has been cancelled.');
            sendStatus({
              status: 'CANCELED',
              message: 'Convert has been cancelled.',
            });
          } else {
            log.error(`Cannot process video: ${err.message}`);
            sendStatus({ status: 'ERROR', message: err.message });
          }
        })
        .on('end', () => {
          log.info('Finished processing');
          sendStatus({ status: 'END' });
        });

      try {
        ffcommand.run();
      } catch (e) {
        Promise.reject(e);
      }
    }
  );

  ipcMain.on('cancel', () => {
    ffcommand?.kill('SIGKILL');
  });
};
