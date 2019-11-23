import Vue from "vue";
import Vuex from "vuex";
import * as Types from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceFilePath: "",
    options: {}
  },
  getters: {
    sourceFilePath: state => state.sourceFilePath,
    options: state => state.options
  },
  actions: {
    [Types.SET_SOURCEFILE]({ commit }, filePath) {
      commit(Types.SET_SOURCEFILE, filePath);
    },
    [Types.ADD_OPTIONS]({ commit }, options) {
      commit(Types.ADD_OPTIONS, options);
    }
  },
  mutations: {
    [Types.SET_SOURCEFILE](state, filePath) {
      state.sourceFilePath = filePath;
    },
    [Types.ADD_OPTIONS](state, options) {
      for (const key in options) {
        state.options[key] = options[key];
      }
    }
  }
});
