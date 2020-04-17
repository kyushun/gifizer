<template>
  <div>
    <FileSelector @openEditModal="switchEditModal" />
    <Button :disabled="!convertable" @click="convert">Convert</Button>
    <StatusModal />
    <EditModal :visible="isEditModalOpened" @close="switchEditModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Converter from "../../store/Converter";
import FileSelector from "./FileSelector.vue";
import Button from "../../components/Button.vue";
import StatusModal from "./StatusModal.vue";
import EditModal from "./EditModal.vue";

@Component({
  components: {
    FileSelector,
    Button,
    StatusModal,
    EditModal
  }
})
export default class Root extends Vue {
  private isEditModalOpened = false;

  get convertable() {
    return (
      Converter.inspectReport.error === false &&
      Converter.report.status === null
    );
  }

  get inputFilePath() {
    return Converter.options.sourcePath;
  }

  switchEditModal() {
    this.isEditModalOpened = !this.isEditModalOpened;
  }

  convert() {
    Converter.convert();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/palettes.scss";
</style>
