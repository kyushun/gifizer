<template>
  <input
    class="input"
    v-bind="{ value, type, placeholder }"
    @change="$emit('change', $event)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop()
  value!: any;
  @Prop({ default: false })
  type!: boolean;
  @Prop({ default: "" })
  placeholder?: string;
}
</script>

<style scoped lang="scss">
@import "../styles/palettes.scss";

input {
  margin-left: -0.25rem;
  padding: 0.25rem;
  width: 3rem;
  font-family: $--font !important;
  color: $--color-text-primary;
  border: none;
  border-radius: 4px;
  transition: box-shadow 0.25s;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:hover {
    box-shadow: $--box-shadow-light;
  }

  &:focus {
    outline: 0;
    box-shadow: $--box-shadow-light;
  }
}
</style>
