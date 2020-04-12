import Vue from "vue";
import Vuex from "vuex";
import { ConverterStore } from "./Converter";

Vue.use(Vuex);

export interface RootStore {
  converter: ConverterStore;
}

export default new Vuex.Store<RootStore>({});
