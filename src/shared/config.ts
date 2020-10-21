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
      height: undefined,
      fps: 10,
      palette: false
    }
  }
};

class Config {
  private store = new ElectronStore();

  get convertOptions(): Partial<ConvertOptions> {
    return {
      ...schema.convert.options,
      ...(this.store.get(KEYS.convertOptions) as Partial<ConvertOptions>)
    };
  }

  set convertOptions(options: Partial<ConvertOptions>) {
    this.store.set(KEYS.convertOptions, options);
  }

  get updateLastCheckedAt() {
    return this.store.get(KEYS.updateLastCheckedAt) as string;
  }

  set updateLastCheckedAt(date: string) {
    this.store.set(KEYS.updateLastCheckedAt, date);
  }

  clear() {
    this.store.clear();
  }
}

export default new Config();
