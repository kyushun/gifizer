<template>
  <div class="options">
    <p class="description">
      Each field will be set the default value if it is empty.
    </p>
    <label>
      Framerate:
      <input
        type="number"
        :value="options.framerate"
        @change="onChange('framerate', $event)"
      />
    </label>
    <label>
      Width:
      <input
        type="number"
        :value="options.width"
        @change="onChange('width', $event)"
      />
    </label>
    <label>
      Height:
      <input
        type="number"
        :value="options.height"
        @change="onChange('height', $event)"
      />
    </label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ADD_OPTIONS } from "../store/mutation-types";

export default {
  name: "OptionSelect",
  computed: {
    ...mapGetters(["options"])
  },
  methods: {
    ...mapActions([ADD_OPTIONS]),
    onChange: function(key, event) {
      const value = event.target.value;
      if (!isNaN(value)) {
        this.ADD_OPTIONS({ [key]: parseInt(value) });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.options {
  margin: 0 0 2rem;

  .description {
    font-size: 0.75rem;
  }

  label {
    margin: 0 0.25rem;

    input {
      width: 2rem;
      padding: 0.25rem 0.5rem;
      border: solid 1px #ccc;
      border-radius: 8px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }
  }
}
</style>
