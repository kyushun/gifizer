const os = require("os");
const path = require("path");

const BIN_PATH = path.join("bin", os.platform(), os.arch());

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraResources: [BIN_PATH],
        mac: {
          icon: "src/assets/icon.png"
        }
      },
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["process.env.FLUENTFFMPEG_COV"] = false;
          return args;
        });
      }
    }
  }
};
