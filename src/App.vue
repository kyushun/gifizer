<template>
  <div id="app">
    <SourceFileInput />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as Types from "./store/mutation-types";
import SourceFileInput from "./components/SourceFileInput";

export default {
  name: "app",
  components: {
    SourceFileInput
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
  //margin-top: 60px;
}
</style>
