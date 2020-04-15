import ElectronStore from "electron-store";
import { ConvertOptions } from "./types";

const KEYS = {
  convertOptions: "convert.options",
  updateLastCheckedAt: "update.lastCheckedAt"
};

const schema = {
  convert: {
    options: {
      width: 640,
      height: null,
      fps: 10,
      palette: false
    }
  }
};

class Config {
  private store = new ElectronStore();

  get convertOptions(): ConvertOptions {
    return {
      ...schema.convert.options,
      ...this.store.get(KEYS.convertOptions)
    };
  }

  set convertOptions(options: ConvertOptions) {
    this.store.set(KEYS.convertOptions, options);
  }

  get updateLastCheckedAt() {
    return this.store.get(KEYS.updateLastCheckedAt);
  }

  set updateLastCheckedAt(date: string) {
    this.store.set(KEYS.updateLastCheckedAt, date);
  }

  clear() {
    this.store.clear();
  }
}

export default new Config();
