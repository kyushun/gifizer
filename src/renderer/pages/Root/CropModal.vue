<template>
  <Modal title="Crop" :visible="visible" @close="close">
    <div class="crop-modal">
      <div class="crop-modal-info-container">
        <div class="crop-modal-info">
          <label class="crop-modal-info-label">top</label>
          <Input
            class="crop-modal-info-value"
            type="string"
            disabled
            :value="crop.top"
          />
        </div>
        <div class="crop-modal-info">
          <label class="crop-modal-info-label">left</label>
          <Input
            class="crop-modal-info-value"
            type="string"
            disabled
            :value="crop.left"
          />
        </div>
        <div class="crop-modal-info">
          <label class="crop-modal-info-label">width</label>
          <Input
            class="crop-modal-info-value"
            type="string"
            disabled
            :value="crop.width"
          />
        </div>
        <div class="crop-modal-info">
          <label class="crop-modal-info-label">height</label>
          <Input
            class="crop-modal-info-value"
            type="string"
            disabled
            :value="crop.height"
          />
        </div>
        <Button
          class="crop-modal-info-reset-btn"
          color="danger"
          outline="true"
          @click="onResetClicked"
        >
          Reset
        </Button>
      </div>
      <div
        class="crop-modal-container"
        :style="{ width: renderWidth + 'px', height: height + 'px' }"
      >
        <video
          class="crop-modal-video"
          :style="{ width: renderWidth + 'px', height: height + 'px' }"
          :src="inputFilePath ? 'file:' + inputFilePath : ''"
          disablepictureinpicture
          controlslist="nodownload"
          autoplay
          loop
          muted
          ref="video"
        ></video>
        <Crop
          :styles="{
            top: 0 + cropTop,
            left: 0 + cropLeft,
            width: renderWidth + cropWidth,
            height: height + cropHeight
          }"
          @resize="cropResized"
        />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import Converter from "../../store/Converter";
import Modal from "../../components/Modal.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import Crop from "../../components/Crop.vue";
import { isMac } from "../../util/index";

@Component({
  components: {
    Modal,
    Input,
    Button,
    Crop
  }
})
export default class CropModal extends Vue {
  private height = isMac ? 170 : 145;

  @Prop() private visible!: string;

  @Emit("close") close(): void {}

  get inputFilePath() {
    return Converter.options.sourcePath;
  }

  get sourceWidth() {
    return Converter.inspectReport.width || 0;
  }

  get sourceHeight() {
    return Converter.inspectReport.height || 0;
  }

  get resizeRate() {
    return this.height / this.sourceHeight;
  }

  get crop() {
    return Object.assign(
      {},
      {
        top: 0,
        left: 0,
        width: this.sourceWidth,
        height: this.sourceHeight
      },
      Converter.options.crop || {}
    );
  }

  get cropTop() {
    return (Converter.options.crop?.top || 0) * this.resizeRate;
  }

  get cropLeft() {
    return (Converter.options.crop?.left || 0) * this.resizeRate;
  }

  get cropWidth() {
    return (
      ((Converter.options.crop?.width || this.sourceWidth) - this.sourceWidth) *
      this.resizeRate
    );
  }

  get cropHeight() {
    return (
      ((Converter.options.crop?.height || this.sourceHeight) -
        this.sourceHeight) *
      this.resizeRate
    );
  }

  get renderWidth() {
    return Math.round(this.sourceWidth * this.resizeRate);
  }

  cropResized(size: {
    top: number;
    left: number;
    width: number;
    height: number;
  }) {
    let newSize = {
      top: Math.max(this.cropTop + size.top, 0),
      left: Math.max(this.cropLeft + size.left, 0),
      width: Math.min(this.cropWidth + size.width, 0),
      height: Math.min(this.cropHeight + size.height, 0)
    };

    newSize.top = Math.min(newSize.top, -newSize.height);
    newSize.left = Math.min(newSize.left, -newSize.width);

    if (newSize.left <= 0 && size.left < 0) {
      newSize.left = 0;
      newSize.width = this.cropWidth + this.cropLeft;
    }

    if (newSize.top <= 0 && size.top < 0) {
      newSize.top = 0;
      newSize.height = this.cropHeight + this.cropTop;
    }

    if (
      -newSize.width == newSize.left &&
      size.width > 0 &&
      size.width != -size.left
    ) {
      newSize.width = -this.cropLeft;
      newSize.left = this.cropLeft;
    }
    if (
      -newSize.height == newSize.top &&
      size.height > 0 &&
      size.height != -size.top
    ) {
      newSize.height = -this.cropTop;
      newSize.top = this.cropTop;
    }

    if (
      this.renderWidth + newSize.width > 30 &&
      this.height + newSize.height > 30
    ) {
      newSize = {
        top: Math.round(newSize.top / this.resizeRate),
        left: Math.round(newSize.left / this.resizeRate),
        width: Math.round(newSize.width / this.resizeRate + this.sourceWidth),
        height: Math.round(newSize.height / this.resizeRate + this.sourceHeight)
      };
      Converter.setOptions({ crop: newSize });
    }
  }

  onResetClicked() {
    Converter.setOptions({ crop: {} });
  }
}
</script>

<style lang="scss">
.crop-modal {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: left;

  &-container {
    position: relative;
    display: inline-block;
  }

  &-info {
    margin: 1px 0;

    &-container {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
    }

    &-label {
      display: inline-block;
      width: 4em;
    }

    &-reset-btn {
      margin: 5px auto 0;
    }
  }
}
</style>
