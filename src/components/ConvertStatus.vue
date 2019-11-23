<template>
  <div class="status-wrapper" v-if="convert.status">
    <div class="status">
      <div class="content">
        <div class="summary">{{ convert.status }}</div>
        <div class="progress-bar">
          <progress max="100" :value="convert.progress"></progress>
          <label>
            {{ convert.progress ? Math.floor(convert.progress) : 0 }}%
          </label>
        </div>
        <div class="detail" v-if="convert.detail">
          {{ convert.detail }}
        </div>
        <div
          class="open-directory"
          @click="openDirectory"
          v-if="convert.status == 'finished'"
        >
          Open directory
        </div>
        <div class="close" @click="RESET" v-if="closable"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { shell } from "electron";
import { mapGetters, mapActions } from "vuex";
import { RESET } from "../store/mutation-types";

export default {
  name: "ConvertStatus",
  computed: {
    ...mapGetters(["convert", "options"]),
    closable: function() {
      return (
        this.convert.status &&
        (this.convert.status == "error" || this.convert.status == "finished")
      );
    }
  },
  methods: {
    ...mapActions([RESET]),
    openDirectory: function() {
      shell.showItemInFolder(this.options.destFilePath);
    }
  }
};
</script>

<style scoped lang="scss">
.status-wrapper {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.75);
  }

  .status {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 475px;
    background: #fff;
    box-shadow: 0 4px 32px 0 rgba(10, 14, 29, 0.02),
      0 8px 64px 0 rgba(10, 14, 29, 0.08);
    border-radius: 12px;
    transform: translate(-50%, -50%);

    .content {
      position: relative;
      padding: 2rem 1rem;

      .summary {
        margin-bottom: 1rem;
        padding-bottom: 0.25rem;
        font-size: 1.25rem;
        text-transform: uppercase;
        border-bottom: solid 1px #eee;
      }

      .progress-bar {
        progress {
          width: 300px;
        }

        label {
          margin-left: 0.5rem;
        }
      }

      .detail {
        margin-top: 0.5rem;
      }

      .open-directory {
        cursor: pointer;
        display: inline-block;
        margin-top: 0.5rem;
        padding: 0.4rem 1rem;
        color: white;
        background-color: #40a9ff;
        border-radius: 12px;
        transition: background-color 0.2s;

        &:hover {
          background-color: #69c0ff;
        }
      }

      .close {
        cursor: pointer;
        position: absolute;
        right: 32px;
        top: 16px;
        width: 18px;
        height: 18px;
        opacity: 0.3;
        transition: opacity 0.25s;

        &:hover {
          opacity: 1;
        }

        &:before,
        &:after {
          position: absolute;
          left: 15px;
          content: " ";
          height: 18px;
          width: 2px;
          background-color: #333;
        }

        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
