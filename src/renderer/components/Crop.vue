<template>
  <div class="crop" :style="cropStyle" data-crop-action="move">
    <div
      class="crop-line crop-line-top"
      data-crop-action="resize"
      data-crop-direction="top"
    ></div>
    <div
      class="crop-line crop-line-right"
      data-crop-action="resize"
      data-crop-direction="right"
    ></div>
    <div
      class="crop-line crop-line-bottom"
      data-crop-action="resize"
      data-crop-direction="bottom"
    ></div>
    <div
      class="crop-line crop-line-left"
      data-crop-action="resize"
      data-crop-direction="left"
    ></div>
    <div
      class="crop-corner crop-corner-top-left"
      data-crop-action="resize"
      data-crop-direction="top-left"
    ></div>
    <div
      class="crop-corner crop-corner-top-right"
      data-crop-action="resize"
      data-crop-direction="top-right"
    ></div>
    <div
      class="crop-corner crop-corner-bottom-right"
      data-crop-action="resize"
      data-crop-direction="bottom-right"
    ></div>
    <div
      class="crop-corner crop-corner-bottom-left"
      data-crop-action="resize"
      data-crop-direction="bottom-left"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class Crop extends Vue {
  private isMouseDown = false;
  private mousePosition = { x: 0, y: 0 };
  private cropAction: string | null = null;
  private cropDirection: string | null = null;

  @Prop() private styles!: {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("resize") resize(size: {
    top: number;
    left: number;
    width: number;
    height: number;
  }): void {}

  mounted() {
    window.addEventListener("mousedown", this.mousedown);
    window.addEventListener("mousemove", this.mousemove);
    window.addEventListener("mouseup", this.mouseup);
  }

  beforeDestroy() {
    window.removeEventListener("mousedown", this.mousedown);
    window.removeEventListener("mousemove", this.mousemove);
    window.removeEventListener("mouseup", this.mouseup);
  }

  mousedown(e: MouseEvent) {
    const $el = e.target as HTMLElement;
    const action = $el.dataset.cropAction;

    if (action) {
      this.isMouseDown = true;
      this.mousePosition = { x: e.pageX, y: e.pageY };
      this.cropAction = action || null;
      this.cropDirection = $el.dataset.cropDirection || null;
      e.preventDefault();
    }
  }

  mousemove(e: MouseEvent) {
    if (this.isMouseDown) {
      const diffX = e.pageX - this.mousePosition.x;
      const diffY = e.pageY - this.mousePosition.y;

      let height = 0,
        top = 0,
        left = 0,
        width = 0;
      if (this.cropAction == "resize") {
        if (/right/.test(this.cropDirection || "")) {
          width = diffX;
        } else if (/left/.test(this.cropDirection || "")) {
          left = diffX;
          width = -diffX;
        }
        if (/top/.test(this.cropDirection || "")) {
          top = diffY;
          height = -diffY;
        } else if (/bottom/.test(this.cropDirection || "")) {
          height = diffY;
        }
      } else if (this.cropAction == "move") {
        top = diffY;
        left = diffX;
      }

      this.resize({ top, left, width, height });
      this.mousePosition = { x: e.pageX, y: e.pageY };
      e.preventDefault();
    }
  }

  mouseup(e: MouseEvent) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      e.preventDefault();
    }
  }

  get cropStyle() {
    return {
      top: this.styles.top + "px",
      left: this.styles.left + "px",
      width: this.styles.width + "px",
      height: this.styles.height + "px"
    };
  }
}
</script>

<style scoped lang="scss">
.crop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: rgba(245, 108, 108, 0.5);
  cursor: move;

  .crop-line {
    position: absolute;
    transition: border-color 0.25s;
    border: 0 solid rgba(150, 150, 150, 0.25);

    &-top {
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      border-top-width: 1px;
      cursor: n-resize;
    }
    &-right {
      top: 0;
      right: 0;
      bottom: 0;
      width: 5px;
      border-right-width: 1px;
      cursor: e-resize;
    }
    &-bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      border-bottom-width: 1px;
      cursor: s-resize;
    }
    &-left {
      top: 0;
      left: 0;
      bottom: 0;
      width: 5px;
      border-left-width: 1px;
      cursor: w-resize;
    }
  }
  &:hover .crop-line {
    border-color: rgba(150, 150, 150, 1);
  }

  .crop-corner {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 2px;
    border: 1px solid rgba(150, 150, 150, 1);
    background: #fff;
    opacity: 0;
    transition: opacity 0.25s;

    &-top-left {
      top: -3px;
      left: -3px;
      cursor: nw-resize;
    }
    &-top-right {
      top: -3px;
      right: -3px;
      cursor: ne-resize;
    }
    &-bottom-right {
      bottom: -3px;
      right: -3px;
      cursor: se-resize;
    }
    &-bottom-left {
      bottom: -3px;
      left: -3px;
      cursor: sw-resize;
    }
  }
  &:hover .crop-corner {
    opacity: 1;
  }
}
</style>
