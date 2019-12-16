import ffmpeg from "fluent-ffmpeg";
import { platform, arch } from "os";
import path from "path";
import {
  IConvertOptions,
  IInspectionReport,
  IConvertReport
} from "../../shared/types";
import { INSPECT_FILE, CONVERT_REPORT } from "../../shared/ipcs";
import { calcfps } from "../util";

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

export const inspectFile = (
  filepath: string,
  sender: { send: (channel: string, response: IInspectionReport) => void }
) => {
  ffmpeg.ffprobe(filepath, (err, metadata) => {
    let response: IInspectionReport;
    const videos: ffmpeg.FfprobeStream[] = metadata
      ? metadata.streams.filter(v => v.codec_type === "video")
      : [];
    if (err || videos.length < 1) {
      response = {
        error: true
      };
    } else {
      response = {
        error: false,
        size: metadata.format.size,
        codec: videos[0].codec_name,
        width: videos[0].width,
        height: videos[0].height,
        aspect_ratio: videos[0].display_aspect_ratio,
        fps: calcfps(videos[0].r_frame_rate)
      };
    }

    console.log(response, metadata);
    sender.send(INSPECT_FILE, response);
  });
};

export const convertToGif = (
  options: IConvertOptions,
  sender: { send: (channel: string, status: IConvertReport) => void }
) => {
  const cmd = ffmpeg(options.sourcePath)
    .format("gif")
    .output(options.outputPath)
    .on("start", () => {
      sender.send(CONVERT_REPORT, {
        status: "PROCESSING",
        progress: 0
      });
    })
    .on("progress", progress => {
      console.log("Processing: " + progress.percent + "% done");
      sender.send(CONVERT_REPORT, {
        status: "PROCESSING",
        progress: progress.percent
      });
    })
    .on("error", err => {
      console.log("Cannot process video: " + err.message);
      sender.send(CONVERT_REPORT, {
        status: "ERROR",
        errorDetail: err.message
      });
    })
    .on("end", () => {
      console.log("Finished processing");
      sender.send(CONVERT_REPORT, {
        status: "FINISHED",
        progress: 100
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
