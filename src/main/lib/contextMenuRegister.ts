import { app } from "electron";
import sudo from "sudo-prompt";

/* eslint-disable */
const REGISTRY_COMMAND = [
  `reg add HKCU\\Software\\Classes\\*\\shell\\${app.getName()} /ve /t REG_EXPAND_SZ /d "Convert to GIF" /f`,
  `reg add HKCU\\Software\\Classes\\*\\shell\\${app.getName()} /v Icon /t REG_EXPAND_SZ /d "\\"${app.getPath("exe")}\\"" /f`,
  `reg add HKCU\\Software\\Classes\\*\\shell\\${app.getName()}\\command /ve /t REG_EXPAND_SZ /d "\\"${app.getPath("exe")}\\" \\"%%1\\"" /f`
].join(" && ");

const REMOVE_COMMAND = `reg delete HKCU\\Software\\Classes\\*\\shell\\${app.getName()} /f`;
/* eslint-enable */

const exec = (command: string) =>
  new Promise((resolve, reject) => {
    sudo.exec(
      command,
      {
        name: app.getName()
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });

export const register = async () => await exec(REGISTRY_COMMAND);

export const remove = async () => await exec(REMOVE_COMMAND);
