<template>
  <div
    class="frame"
    @click="onClick"
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <div class="border">
      <div class="content">
        <p v-if="sourceFilePath">
          {{ sourceFilePath }}
        </p>
        <p v-else>
          Drop or Select Movie
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { SET_SOURCEFILE } from "../store/mutation-types";

export default {
  name: "SourceFileInput",
  computed: {
    ...mapGetters(["sourceFilePath"])
  },
  methods: {
    ...mapActions([SET_SOURCEFILE]),
    onClick: function() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "video/*";
      input.onchange = e => {
        this.setSourceFile(e.target.files);
      };
      input.click();
    },
    onDrop: function(e) {
      let files = e.target.files ? e.target.files : e.dataTransfer.files;
      this.setSourceFile(files);
    },
    setSourceFile: function(files) {
      if (files.length >= 1) {
        this.SET_SOURCEFILE(files[0].path);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.frame {
  cursor: pointer;
  margin: 2rem auto;
  padding: 1rem;
  width: 500px;
  height: 150px;
  border-radius: 8px;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: 0 4px 32px 0 rgba(10, 14, 29, 0.02),
      0 8px 64px 0 rgba(10, 14, 29, 0.08);
  }

  .border {
    position: relative;
    height: 100%;
    border: solid 2px #eee;
    border-radius: 8px;

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
