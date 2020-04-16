<template>
  <div id="app">
    <Header v-if="isMac" />
    <Root />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isMac } from "./util/index";
import Converter from "./store/Converter";
import Header from "./Header.vue";
import Root from "./pages/Root/index.vue";

@Component({
  components: {
    Header,
    Root
  }
})
export default class App extends Vue {
  created() {
    const file = new URL(location.href).searchParams.get("file");

    if (file) {
      Converter.setSourceFilePath(file);
    }
  }

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

*:focus {
  outline: none;
}
</style>
