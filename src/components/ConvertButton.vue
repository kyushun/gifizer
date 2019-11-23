<template>
  <div class="convert">
    <div class="button" :class="{ disabled: !executable }" @click="onClick">
      {{ executable ? "Convert" : "Converting..." }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CONVERT } from "../store/mutation-types";

export default {
  name: "ConvertButton",
  computed: {
    ...mapGetters(["sourceFilePath", "options", "convert"]),
    executable: function() {
      return !this.convert.status || this.convert.status == "finished";
    }
  },
  methods: {
    ...mapActions([CONVERT]),
    onClick: function() {
      if (this.executable) {
        this.CONVERT();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.convert {
  .button {
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    display: inline;
    color: #fff;
    font-size: 1.25rem;
    background-color: #1890ff;
    border-radius: 12px;
    transition: background-color 0.25s;

    &:hover {
      background-color: #40a9ff;
    }

    &.disabled {
      cursor: default;
      background-color: #bae7ff;
    }
  }
}
</style>
