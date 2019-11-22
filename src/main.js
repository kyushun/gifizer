import Vue from "vue";
import store from "./store/index";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
