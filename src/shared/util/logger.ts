import { isDevelopment, isTest } from "./index";

export default class logger {
  static log(...args: any[]) {
    if (isDevelopment && !isTest) console.log(args);
  }
  static error(...args: any[]) {
    if (isDevelopment && !isTest) console.error(args);
  }
}
