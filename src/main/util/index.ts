export const isDevelopment = process.env.NODE_ENV !== "production";
export const isElectron = process.versions.hasOwnProperty("electron");
export const isMac = process.platform === "darwin";

export const getAppPath = () => {
  return isElectron ? require("path").join(__dirname, "../") : process.cwd();
};

export const packageJson = (): {
  name: string;
  version: string;
  homepage: string;
} => {
  return require("../../../package.json");
};

export const calcfps = (formula: string | undefined) => {
  if (formula) {
    const splited = formula.split("/");
    if (splited.length == 2) {
      return parseInt(splited[0]) / parseInt(splited[1]);
    }
  }
  return 0;
};
