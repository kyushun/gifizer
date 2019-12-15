export const isDevelopment = process.env.NODE_ENV !== "production";
export const isMac = process.platform === "darwin";

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
