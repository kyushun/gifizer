<template>
  <div>
    <FileSelector
      @openEditModal="switchEditModal"
      @openCropModal="switchCropModal"
    />
    <Button :disabled="!convertable" @click="convert">Convert</Button>
    <StatusModal />
    <EditModal :visible="isEditModalOpened" @close="switchEditModal" />
    <CropModal :visible="isCropModalOpened" @close="switchCropModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Converter from "../../store/Converter";
import FileSelector from "./FileSelector.vue";
import Button from "../../components/Button.vue";
import StatusModal from "./StatusModal.vue";
import EditModal from "./EditModal.vue";
import CropModal from "./CropModal.vue";

@Component({
  components: {
    FileSelector,
    Button,
    StatusModal,
    EditModal,
    CropModal
  }
})
export default class Root extends Vue {
  private isEditModalOpened = false;
  private isCropModalOpened = false;

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

  switchCropModal() {
    this.isCropModalOpened = !this.isCropModalOpened;
  }

  convert() {
    Converter.convert();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/palettes.scss";
</style>
