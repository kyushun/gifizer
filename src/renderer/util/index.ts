export const isMac = require("electron").remote.process.platform === "darwin";

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

export const changeFileExtension = (filename: string, newExtension: string) => {
  const extIndex = filename.lastIndexOf(".");
  if (extIndex != -1) {
    return filename.substring(0, extIndex + 1) + newExtension;
  } else {
    return filename;
  }
};
