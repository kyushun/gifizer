<template>
  <div>
    <FileSelector />
    <Button :disabled="!convertable" @click="convert">Convert</Button>
    <StatusModal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Converter from "../../store/Converter";
import FileSelector from "./FileSelector.vue";
import Button from "../../components/Button.vue";
import StatusModal from "./StatusModal.vue";

@Component({
  components: {
    FileSelector,
    Button,
    StatusModal
  }
})
export default class Root extends Vue {
  get convertable() {
    return (
      Converter.inspectReport.error === false &&
      Converter.report.status === null
    );
  }

  convert() {
    Converter.convert();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/palettes.scss";
</style>
