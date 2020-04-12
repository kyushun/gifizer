export const isDevelopment = process.env.NODE_ENV !== "production";
// eslint-disable-next-line no-prototype-builtins
export const isElectron = process.versions.hasOwnProperty("electron");
export const isMac = process.platform === "darwin";
export const isTest = process.env.NODE_ENV === "test";
