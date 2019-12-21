import Vue from "vue";
import Vuex from "vuex";
import { IConverter } from "./Converter";

Vue.use(Vuex);

export interface IRootState {
  converter: IConverter;
}

export default new Vuex.Store<IRootState>({});
