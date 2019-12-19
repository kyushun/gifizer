<template>
  <div
    class="file"
    @dragleave.prevent="dragover = false"
    @dragover.prevent="dragover = true"
    @drop.prevent="!disabled && onDropFile($event)"
    @click="!disabled && onClick($event)"
  >
    <div class="file-wrapper" :class="{ selectable: !disabled, dragover }">
      <div class="file-tag" v-if="tag">{{ tag }}</div>
      <div class="file-image">
        <video :src="movie" muted preload="metadata" v-if="movie"></video>
        <img src="../assets/gif.svg" v-else-if="defaultImage" />
      </div>
      <div class="file-content" :class="{ slot: $slots.default }">
        <div class="file-content-title">{{ title }}</div>
        <div class="file-content-detail">{{ detail }}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
const { BrowserWindow, dialog } = require("electron").remote;

@Component
export default class FileView extends Vue {
  dragover: boolean = false;

  @Prop({ default: "" })
  title?: string;
  @Prop({ default: "" })
  detail?: string;
  @Prop({ default: "" })
  tag?: string;
  @Prop({ default: false })
  disabled?: boolean;
  @Prop({ default: "" })
  movie?: string;
  @Prop({ default: false })
  defaultImage?: boolean;

  @Emit("file") fileEmitter(file: any): void {}

  onDropFile(e: DragEvent) {
    this.dragover = false;
    if (e.dataTransfer) {
      this.fileEmitter(e.dataTransfer.files[0].path);
    }
  }

  onClick() {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      dialog.showOpenDialog(win, { properties: ["openFile"] }, fileNames => {
        if (fileNames && fileNames.length > 0) {
          this.fileEmitter(fileNames[0]);
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";

.file {
  &-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0 0.75rem;
    padding: 10px;
    border: solid 1px $--border-color-light;
    border-radius: 8px;
    transition: all 0.25s;

    &.selectable {
      cursor: pointer;

      &:hover,
      &.dragover {
        border-color: transparent;
        box-shadow: $--box-shadow-light;
      }
    }
  }

  &-tag {
    position: absolute;
    top: -0.5rem;
    left: -0.75rem;
    padding: 0.1rem 0.5rem;
    color: white;
    font-size: 0.9rem;
    background-color: $--color-success;
    border-radius: 4px;
    box-shadow: $--box-shadow-light;
  }

  &-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    box-shadow: $--box-shadow-light;
    overflow: hidden;

    video {
      height: 100%;
    }

    img {
      width: 75%;
    }
  }

  &-content {
    flex: 1;
    text-align: left;
    overflow: hidden;

    &.slot {
      overflow: visible;
    }

    &-title {
      font-size: 1.1rem;
      font-weight: $--font-weight-primary;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-detail {
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &-input {
    display: none;
  }
}
</style>
