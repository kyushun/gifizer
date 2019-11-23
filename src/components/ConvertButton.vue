<template>
  <div class="convert">
    <div class="button" @click="onClick">
      Convert
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CONVERT } from "../store/mutation-types";

export default {
  name: "ConvertButton",
  computed: {
    ...mapGetters(["sourceFilePath", "options", "convert"])
  },
  methods: {
    ...mapActions([CONVERT]),
    onClick: function() {
      this.CONVERT();
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
  }
}
</style>
