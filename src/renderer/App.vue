<template>
  <div id="app">
    <Header v-if="isMac" />
    <Root msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isMac } from "./util/index";
import Header from "./Header.vue";
import Root from "./pages/Root/index.vue";

@Component({
  components: {
    Header,
    Root
  }
})
export default class App extends Vue {
  get isMac() {
    return isMac;
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
