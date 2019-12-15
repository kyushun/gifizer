<template>
  <div class="modal">
    <transition name="modal-bg">
      <div class="modal-background" v-if="visible" @click="handleClose"></div>
    </transition>
    <transition name="modal">
      <div class="modal-window" v-if="visible">
        <div class="modal-title">
          <div class="modal-close" v-if="closable" @click="handleClose"></div>
          {{ title }}
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop()
  title!: boolean;
  @Prop({ default: false })
  visible!: boolean;
  @Prop({ default: true })
  closable!: boolean;

  @Emit("close") close(): void {}

  handleClose() {
    if (this.closable) this.close();
  }
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.3s ease;
}
.modal-enter,
.modal-leave-to {
  transform: translateY(100%);
}

.modal-bg-enter-active,
.modal-bg-leave-active {
  transition: opacity 0.3s;
}
.modal-bg-enter,
.modal-bg-leave-to {
  opacity: 0;
}

.modal {
  &-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $--background-color-disabled-alpha;
  }

  &-window {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    max-height: calc(100vh - 75px);
    background-color: $--background-color-base;
    border-radius: 12px 12px 0 0;
  }

  &-title {
    height: 2.75rem;
    font-size: 1rem;
    font-weight: $--font-weight-extra-bold;
    line-height: 3rem;
    text-transform: uppercase;
    border-bottom: solid 1px $--border-color-base;
  }

  &-content {
    padding: 1.5rem;
    max-height: calc(100vh - 75px - 2.75rem - 2rem - 1px);
    overflow-y: auto;
  }

  &-close {
    position: absolute;
    display: inline-block;
    top: 0px;
    right: 8px;
    width: 32px;
    height: 32px;
    border: 0;
    background-color: $--color-text-secondary;
    border-radius: 32px;
    margin: 0;
    padding: 0;
    transform: scale(0.5);
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      background-color: $--color-text-regular;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      top: 4px;
      left: 13px;
      width: 6px;
      height: 24px;
      border: 0;
      margin: 0;
      padding: 0;
      background-color: $--color-text-white;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
