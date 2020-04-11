import { isDevelopment, isTest } from "./index";

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class logger {
  static log(...args: any[]) {
    if (isDevelopment && !isTest) console.log(args);
  }
  static error(...args: any[]) {
    if (isDevelopment && !isTest) console.error(args);
  }
}
