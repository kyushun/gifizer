var os = require("os");
var path = require("path");
var platform = os.platform();

const BIN_PATH = path.join(__dirname, "bin", platform, os.arch());
const FFMPEG_PATH = path.join(
  BIN_PATH,
  platform === "win32" ? "ffmpeg.exe" : "ffmpeg"
);
const FFPROBE_PATH = path.join(
  BIN_PATH,
  platform === "win32" ? "ffprobe.exe" : "ffprobe"
);

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        mac: {
          icon: "src/assets/icon.png"
        }
      },
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["process.env.FLUENTFFMPEG_COV"] = false;
          args[0]["process.env.FFMPEG_PATH"] = JSON.stringify(FFMPEG_PATH);
          args[0]["process.env.FFPROBE_PATH"] = JSON.stringify(FFPROBE_PATH);
          return args;
        });
      }
    }
  }
};
