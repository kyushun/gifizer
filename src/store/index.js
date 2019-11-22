import Vue from "vue";
import Vuex from "vuex";
import * as Types from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceFilePath: ""
  },
  getters: {
    sourceFilePath: state => state.sourceFilePath
  },
  actions: {
    [Types.SET_SOURCEFILE]({ commit }, filePath) {
      commit(Types.SET_SOURCEFILE, filePath);
    }
  },
  mutations: {
    [Types.SET_SOURCEFILE](state, filePath) {
      state.sourceFilePath = filePath;
    }
  }
});
