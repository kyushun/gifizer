import { ipcRenderer } from "electron";
import Vue from "vue";
import Vuex from "vuex";
import * as Types from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceFilePath: "",
    options: {},
    convert: {}
  },
  getters: {
    sourceFilePath: state => state.sourceFilePath,
    options: state => state.options,
    convert: state => state.convert
  },
  actions: {
    [Types.SET_SOURCEFILE]({ commit }, filePath) {
      commit(Types.SET_SOURCEFILE, filePath);
      commit(Types.ADD_OPTIONS, { destFilePath: filePath + ".gif" });
    },
    [Types.ADD_OPTIONS]({ commit }, options) {
      commit(Types.ADD_OPTIONS, options);
    },
    [Types.CONVERT]({ state }) {
      const args = state.options;
      args.sourceFilePath = state.sourceFilePath;
      ipcRenderer.send("convert-run", args);

      ipcRenderer.on("convert-status", (_, response) => {
        this.commit(Types.CONVERT, response);
      });
    },
    [Types.RESET]({ commit }) {
      commit(Types.RESET);
    }
  },
  mutations: {
    [Types.SET_SOURCEFILE](state, filePath) {
      state.sourceFilePath = filePath;
    },
    [Types.ADD_OPTIONS](state, options) {
      for (const key in options) {
        Vue.set(state.options, key, options[key]);
      }
    },
    [Types.CONVERT](state, response) {
      switch (response.status) {
        case "processing":
          state.convert = { progress: response.progress };
          break;
        case "error":
          state.convert = {
            detail: (() => {
              const splited = response.detail.split(":");
              return splited.length == 3 ? splited[2] : response.detail;
            })()
          };
          break;
        case "finished":
          state.convert = { progress: 100 };
          break;
        default:
          state.convert = {};
          break;
      }

      state.convert.status = response.status;
    },
    [Types.RESET](state) {
      state.sourceFilePath = "";
      state.convert = {};
      Vue.set(state.options, "destFilePath", null);
    }
  }
});
