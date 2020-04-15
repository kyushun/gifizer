import ElectronStore from "electron-store";
import { ConvertOptions } from "./types";

const KEYS = {
  convertOptions: "convert.options"
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
}

export default new Config();
