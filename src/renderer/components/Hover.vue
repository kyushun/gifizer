<template>
  <div class="hover" ref="hover">
    <slot></slot>
    <transition name="hover-popup">
      <div v-if="hover" v-html="message" class="hover-popup"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Hover extends Vue {
  private hover = false;

  @Prop()
  message!: string;

  mounted() {
    const $hover = this.$refs.hover as HTMLElement;
    $hover.addEventListener("mouseover", () => {
      this.hover = true;
    });
    $hover.addEventListener("mouseleave", () => {
      this.hover = false;
    });
  }
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";
.hover {
  position: relative;
  display: inline-block;

  &-popup {
    position: absolute;
    padding: 0.5em 3em;
    top: 0;
    left: 50%;
    color: $--color-text-white;
    border-radius: 6px;
    text-align: center;
    white-space: nowrap;
    background-color: $--color-info;
    transform: translate(-50%, calc(-100% - 5px));
    transition: transform 0.25s, opacity 0.25s;
    pointer-events: none;

    &-enter,
    &-leave-to {
      transform: translate(-50%, -80%);
      opacity: 0;
    }
  }
}
</style>
