<template>
  <div class="progress-bar" :style="{ maxWidth: maxWidth + 'px' }">
    <div
      class="progress-bar-content"
      :class="{ error }"
      :style="{ width, backgroundSize: maxWidth + 'px 5px' }"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 0 })
  percent!: number;
  @Prop({ default: 500 })
  maxWidth!: number;
  @Prop({ default: false })
  error!: boolean;

  get width() {
    return this.error
      ? this.maxWidth + "px"
      : this.maxWidth * this.percent * 0.01 + "px";
  }
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";

.progress-bar {
  margin: 0.25rem auto;
  background-color: $--border-color-light;
  border-radius: 10px;

  &-content {
    width: 350px;
    height: 5px;
    background: linear-gradient(
      to right,
      rgb(76, 217, 105),
      rgb(90, 200, 250),
      rgb(0, 132, 255),
      rgb(52, 170, 220),
      rgb(88, 86, 217),
      rgb(255, 45, 83)
    );
    border-radius: 10px;
    transition: width 1s;

    &.error {
      background: $--color-danger;
    }
  }
}
</style>
