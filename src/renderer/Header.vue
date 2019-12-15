<template>
  <div class="header"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
@import "./styles/palettes.scss";

.header {
  height: 22px;
  -webkit-app-region: drag;
}
</style>
