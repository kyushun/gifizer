<template>
  <Modal
    class="status"
    :title="report.status || ''"
    :visible="!!report.status"
    @close="close"
  >
    <div v-if="report.progress || report.progress == 0" class="status-progress">
      {{ Math.floor(report.progress) }}%
    </div>
    <div v-if="report.message" class="status-error">
      {{ report.message }}
    </div>
    <ProgressBar
      v-if="report.progress || report.progress == 0 || status.isError"
      :percent="report.progress"
      :error="status.isError"
      :maxWidth="420"
    />
    <Button
      v-if="status.isProcessing || status.isFinished"
      :disabled="status.isProcessing"
      class="btn-show-in-directory"
      color="primary"
      @click="openDirectory"
    >
      Show in directory
    </Button>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { shell } from "electron";
import Converter from "../../store/Converter";
import Modal from "../../components/Modal.vue";
import ProgressBar from "../../components/ProgressBar.vue";
import Button from "../../components/Button.vue";

@Component({
  components: {
    Modal,
    ProgressBar,
    Button
  }
})
export default class FileSelector extends Vue {
  get report() {
    return Converter.report;
  }

  get status() {
    return Converter.status;
  }

  close() {
    if (this.status.isProcessing) {
      Converter.cancel();
    }
    Converter.reset();
  }

  openDirectory() {
    shell.showItemInFolder(Converter.options.outputPath);
  }
}
</script>

<style lang="scss">
.status {
  &-progress {
    font-weight: bold;
  }

  &-error {
    padding: 0.25rem 0 0.25rem;
    font-size: 0.9rem;
  }

  .btn {
    &-show-in-directory {
      margin-top: 1rem;
    }
  }
}
</style>
