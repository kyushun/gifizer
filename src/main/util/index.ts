import { isElectron } from "../../shared/util";

export const getAppPath = () => {
  return isElectron ? require("path").join(__dirname, "../") : process.cwd();
};

export const packageJson: {
  name: string;
  version: string;
  homepage: string;
} = require("../../../package.json");

export const calcfps = (formula: string | undefined) => {
  if (formula) {
    const splited = formula.split("/");
    if (splited.length == 2) {
      return (
        Math.round((parseInt(splited[0]) / parseInt(splited[1])) * 100) / 100
      );
    }
  }
  return 0;
};
