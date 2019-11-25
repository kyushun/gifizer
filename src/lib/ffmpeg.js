import ffmpeg from "fluent-ffmpeg";
import { platform, arch } from "os";
import path from "path";

const BIN_PATH = path.join(__dirname, "../", "bin", platform(), arch());
ffmpeg.setFfmpegPath(
  path.join(BIN_PATH, platform() === "win32" ? "ffmpeg.exe" : "ffmpeg")
);
ffmpeg.setFfprobePath(
  path.join(BIN_PATH, platform() === "win32" ? "ffprobe.exe" : "ffprobe")
);

export const convertToGif = (args, logSender) => {
  const cmd = ffmpeg(args.sourceFilePath)
    .format("gif")
    .output(args.destFilePath)
    .on("start", () => {
      logSender.send("convert-status", {
        status: "processing",
        progress: 0
      });
    })
    .on("progress", progress => {
      console.log("Processing: " + progress.percent + "% done");
      logSender.send("convert-status", {
        status: "processing",
        progress: progress.percent
      });
    })
    .on("error", err => {
      console.log("Cannot process video: " + err.message);
      logSender.send("convert-status", {
        status: "error",
        detail: err.message
      });
    })
    .on("end", () => {
      console.log("Finished processing");
      logSender.send("convert-status", {
        status: "finished"
      });
    });

  if (args.framerate) cmd.fps(args.framerate);
  if (args.width || args.height) {
    cmd.size(
      (() => {
        const w = args.width || "?";
        const h = args.height || "?";
        return w + "x" + h;
      })()
    );
  }

  cmd.run();
};
