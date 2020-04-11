<template>
  <Modal
    class="status"
    :title="report.status || ''"
    :visible="!!report.status"
    :closable="closable"
    @close="close"
  >
    <div class="status-progress">
      {{ report.progress ? Math.floor(report.progress) : 0 }}%
    </div>
    <div class="status-error" v-if="report.errorDetail">
      {{ report.errorDetail }}
    </div>
    <ProgressBar
      :percent="report.progress"
      :error="!!report.errorDetail"
      :maxWidth="420"
    />
    <Button class="btn-show-in-directory" color="primary" @click="openDirectory"
      >Show in directory</Button
    >
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

  get closable() {
    return (
      Converter.report.status == "ERROR" ||
      Converter.report.status == "FINISHED"
    );
  }

  close() {
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
