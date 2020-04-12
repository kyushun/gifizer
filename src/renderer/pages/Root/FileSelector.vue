<template>
  <div>
    <FileView
      class="file-view"
      :title="inputFilePath || 'Drop or Select Movie'"
      :detail="inputFileInspection"
      :movie="inputFilePath ? 'file:' + inputFilePath : ''"
      tag="Source"
      @file="onFile"
    />
    <FileView
      class="file-view"
      tag="Output"
      disabled="true"
      :defaultImage="true"
      @file="onFile"
    >
      <Input
        class="output-path"
        type="text"
        placeholder="Output Path"
        :value="outputFilePath"
        @change="onChangeStr('outputPath', $event)"
      />
      <div class="output-option">
        GIF
        <Input
          class="output-option-width"
          type="number"
          placeholder="width"
          :value="options.width"
          @change="onChangeInt('width', $event)"
        />x
        <Input
          class="output-option-height"
          type="number"
          placeholder="height"
          :value="options.height"
          @change="onChangeInt('height', $event)"
        />
        <Input
          class="output-option-fps"
          type="number"
          placeholder="fps"
          :value="options.fps"
          @change="onChangeInt('fps', $event)"
        />FPS
      </div>
    </FileView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Converter from "../../store/Converter";
import { formatBytes } from "../../util/index";
import FileView from "../../components/FileView.vue";
import Input from "../../components/Input.vue";

@Component({
  components: {
    FileView,
    Input
  }
})
export default class FileSelector extends Vue {
  get report() {
    return Converter.report;
  }
  get inputFilePath() {
    return Converter.options.sourcePath;
  }

  get inputFileInspection() {
    if (Converter.inspectReport.error == null) {
      return "";
    } else if (Converter.inspectReport.error) {
      return "ERROR";
    } else {
      const { codec, size, width, height, fps } = Converter.inspectReport;
      return `${codec} ${width}x${height} ${fps}fps ${formatBytes(size || 0)}`;
    }
  }

  get outputFilePath() {
    return Converter.options.outputPath;
  }

  get options() {
    return Converter.options;
  }

  onFile(filename: string) {
    if (filename) {
      Converter.setSourceFilePath(filename);
    }
  }

  onChangeStr(key: string, event: { target: HTMLInputElement }) {
    const value = event.target.value;
    if (value) {
      Converter.setOptions({ [key]: value });
    }
  }

  onChangeInt(key: string, event: { target: HTMLInputElement }) {
    const value = event.target.value;
    if (value == "") {
      Converter.setOptions({ [key]: value });
    } else {
      Converter.setOptions({ [key]: parseInt(value) });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/palettes.scss";

.file-view {
  margin: 1rem 1.5rem 1rem 1rem;

  &.input {
    cursor: pointer;
  }

  .output {
    &-path {
      margin-bottom: 5px;
      width: 100%;
      font-size: 1.1rem;
      font-weight: $--font-weight-primary;
    }

    &-option {
      font-size: 0.9rem;

      &-width,
      &-height {
        width: 2rem;
        text-align: center;
      }

      &-width {
        margin-left: 0.1rem;
      }

      &-fps {
        margin-left: 0.1rem;
        width: 1rem;
        text-align: center;
      }
    }
  }
}
</style>
