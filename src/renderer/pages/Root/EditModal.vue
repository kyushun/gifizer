<template>
  <Modal class="edit-modal" title="Edit" :visible="visible" @close="close">
    <div class="edit-modal-cut-container">
      <div class="edit-modal-cut-param">
        <div class="edit-modal-cut-input">
          <label class="edit-modal-cut-label">Start</label>
          <Input
            class="edit-modal-cut-start"
            type="string"
            placeholder="00:00:00.000"
            :value="startTimeFormatted"
            @change="onOptionTimeChanged('startSec', $event)"
          />
          <Button
            class="edit-modal-cut-button"
            color="success"
            outline="true"
            float="true"
            @click="onSetClicked('startSec')"
          >
            [-
          </Button>
        </div>
        <div class="edit-modal-cut-input">
          <label class="edit-modal-cut-label">End</label>
          <Input
            class="edit-modal-cut-end"
            type="string"
            placeholder="00:00:00.000"
            :value="endTimeFormatted"
            @change="onOptionTimeChanged('endSec', $event)"
          />
          <Button
            class="edit-modal-cut-button"
            color="success"
            outline="true"
            float="true"
            @click="onSetClicked('endSec')"
          >
            -]
          </Button>
        </div>
        <div class="edit-modal-cut-input">
          <label class="edit-modal-cut-label">Play</label>
          <Input
            class="edit-modal-cut-end"
            type="string"
            placeholder="00:00:00.000"
            :value="currentTimeFormatted"
            @change="onCurrentTimeChanged"
          />
        </div>
        <Button color="danger" outline="true" @click="onResetClicked">
          Reset
        </Button>
      </div>
      <video
        class="edit-modal-cut-video"
        :src="inputFilePath ? 'file:' + inputFilePath : ''"
        controls
        disablepictureinpicture
        controlslist="nodownload"
        ref="video"
      ></video>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import Converter from "../../store/Converter";
import { toSeconds, toFormattedTime } from "../../../shared/util";
import Modal from "../../components/Modal.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";

@Component({
  components: {
    Modal,
    Input,
    Button
  }
})
export default class EditModal extends Vue {
  private currentTime = 0;

  @Prop() private visible!: string;

  @Emit("close") close(): void {}

  get inputFilePath() {
    return Converter.options.sourcePath;
  }

  get options() {
    return Converter.options;
  }

  get currentTimeFormatted() {
    return toFormattedTime(this.currentTime);
  }

  get startTimeFormatted() {
    return toFormattedTime(Converter.options.startSec || 0);
  }

  get endTimeFormatted() {
    return toFormattedTime(Converter.options.endSec || 0);
  }

  @Watch("visible", { immediate: false })
  visibleChanged(newValue: boolean) {
    if (newValue) {
      this.currentTime = 0;
      this.$nextTick(() => {
        (this.$refs.video as HTMLMediaElement).addEventListener(
          "timeupdate",
          this.setCurrentTime
        );
      });
    } else {
      (this.$refs.video as HTMLMediaElement).removeEventListener(
        "timeupdate",
        this.setCurrentTime
      );
    }
  }

  setCurrentTime(e: Event) {
    this.currentTime = (e.target as HTMLMediaElement).currentTime || 0;
  }

  onSetClicked(key: string) {
    Converter.setOptions({ [key]: toSeconds(this.currentTime) });
  }

  onOptionTimeChanged(key: string, event: { target: HTMLInputElement }) {
    const sec = toSeconds(event.target.value);
    this.setVideoCurrentTime(sec);
    Converter.setOptions({ [key]: sec });
  }

  onCurrentTimeChanged(event: { target: HTMLInputElement }) {
    this.setVideoCurrentTime(toSeconds(event.target.value));
  }

  onResetClicked() {
    this.setVideoCurrentTime(0);
    Converter.setOptions({ startSec: 0, endSec: 0 });
  }

  setVideoCurrentTime(sec: number) {
    (this.$refs.video as HTMLMediaElement).currentTime = sec;
  }
}
</script>

<style lang="scss">
.edit-modal {
  &-cut {
    &-container {
      display: flex;
    }

    &-param {
      flex: 1;
    }

    &-input {
      margin-bottom: 7.5px;
      text-align: left;
    }

    &-label {
      display: inline-block;
      width: 3em;
    }

    &-start,
    &-end {
      width: 6.5em !important;
    }

    &-button {
      display: inline-block !important;
      margin: 0 0.25em !important;
      padding: 0.25rem 0.5rem !important;
      font-size: 0.8em !important;
    }

    &-video {
      height: 150px;
      max-width: 270px;
    }
  }
}
</style>
