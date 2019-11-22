<template>
  <div id="app">
    <div>{{ sourceFilePath }}</div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as Types from "./store/mutation-types";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters(["sourceFilePath"])
  },
  methods: {
    ...mapActions([Types.SET_SOURCEFILE])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
