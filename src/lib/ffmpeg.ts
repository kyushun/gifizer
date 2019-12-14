import ffmpeg from "fluent-ffmpeg";
import { platform, arch } from "os";
import path from "path";
import { ConvertOptions } from "../shared/types";

const BIN_PATH = path.join(
  __dirname,
  "../",
  "bin",
  platform()
    .replace("win32", "win")
    .replace("darwin", "mac"),
  arch()
);
ffmpeg.setFfmpegPath(
  path.join(BIN_PATH, platform() === "win32" ? "ffmpeg.exe" : "ffmpeg")
);
ffmpeg.setFfprobePath(
  path.join(BIN_PATH, platform() === "win32" ? "ffprobe.exe" : "ffprobe")
);

export const convertToGif = (options: ConvertOptions, logSender: any) => {
  const cmd = ffmpeg(options.sourcePath)
    .format("gif")
    .output(options.outputPath)
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

  if (options.fps) cmd.fps(options.fps);
  if (options.width || options.height) {
    cmd.size(
      (() => {
        const w = options.width || "?";
        const h = options.height || "?";
        return w + "x" + h;
      })()
    );
  }

  cmd.run();
};
