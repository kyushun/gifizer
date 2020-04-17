<template>
  <div
    class="btn"
    :class="{
      ['btn-' + color]: true,
      outline,
      float,
      disabled
    }"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ default: "primary" })
  color?: "primary" | "success" | "warning" | "danger";
  @Prop({ default: false })
  outline?: boolean;
  @Prop({ default: false })
  float?: boolean;
  @Prop({ default: false })
  disabled?: boolean;

  @Emit("click") click(): void {}

  onClick() {
    if (!this.disabled) this.click();
  }
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";

$colors: (
  primary: $--color-primary,
  success: $--color-success,
  warning: $--color-warning,
  danger: $--color-danger
);

.btn {
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  color: $--color-text-white;
  font-size: 1rem;
  border-radius: $--border-radius-base;
  transition: background-color 0.25s, box-shadow 0.25s, border-color 0.25s;

  &.disabled {
    cursor: not-allowed;
  }

  @each $name, $color in $colors {
    &-#{$name} {
      background-color: $color;

      &:hover {
        background-color: --color-lighter($color, 1);
        box-shadow: $--box-shadow-light;
      }

      &.disabled {
        background-color: --color-lighter($color, 5);
      }

      &.outline {
        color: $color;
        background-color: $--background-color-base;
        border: solid 1px $color;

        &:hover {
          color: $--color-text-white;
          background-color: $color;
        }

        &.float {
          &:hover {
            color: $color;
            background-color: $--background-color-base;
            border-color: transparent;
          }
        }

        &.disabled {
          color: --color-lighter($color, 5);
          background-color: $--background-color-base;
          border-color: --color-lighter($color, 5);
        }
      }
    }
  }
}
</style>
