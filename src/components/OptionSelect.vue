<template>
  <div class="options">
    <p class="description">
      Each field will be set the default value if it is empty.
    </p>
    <div class="input-field">
      <label>
        Framerate:
        <input
          type="number"
          :value="options.framerate"
          @change="onChangeInt('framerate', $event)"
        />
      </label>
      <label>
        Width:
        <input
          type="number"
          :value="options.width"
          @change="onChangeInt('width', $event)"
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          :value="options.height"
          @change="onChangeInt('height', $event)"
        />
      </label>
    </div>
    <div class="input-field">
      <label>
        Output filename:
        <input
          class="long"
          type="text"
          :value="options.destFilePath"
          @change="onChangeStr('destFilePath', $event)"
        />
      </label>
    </div>
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
    onChangeStr: function(key, event) {
      const value = event.target.value;
      if (value) {
        this.ADD_OPTIONS({ [key]: value });
      }
    },
    onChangeInt: function(key, event) {
      const value = event.target.value;
      if (value == "") {
        this.ADD_OPTIONS({ [key]: value });
      } else if (!isNaN(value)) {
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

  .input-field {
    margin: 0 0 0.5rem;

    label {
      margin: 0 0.25rem;

      input {
        width: 2rem;
        padding: 0.25rem 0.5rem;
        border: solid 1px #ccc;
        border-radius: 8px;

        &.long {
          width: 12rem;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          margin: 0;
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>
