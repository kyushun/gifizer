import ffmpeg from "fluent-ffmpeg";
import { platform, arch } from "os";
import path from "path";
import logger from "@/shared/util/logger";
import {
  ConvertOptions,
  InspectionReport,
  ConvertReport
} from "../../shared/types";
import { INSPECT_FILE, CONVERT_REPORT } from "../../shared/ipcs";
import { getAppPath, calcfps } from "../util";

const BIN_PATH = path.join(
  getAppPath(),
  "bin",
  platform().replace("win32", "win").replace("darwin", "mac"),
  arch()
);
ffmpeg.setFfmpegPath(
  path.join(BIN_PATH, platform() === "win32" ? "ffmpeg.exe" : "ffmpeg")
);
ffmpeg.setFfprobePath(
  path.join(BIN_PATH, platform() === "win32" ? "ffprobe.exe" : "ffprobe")
);

export default class FFmpeg {
  private command: ffmpeg.FfmpegCommand | null = null;

  constructor(options?: ConvertOptions) {
    if (options) this.setOption(options);
  }

  setOption(options: ConvertOptions) {
    this.command = ffmpeg(options.sourcePath)
      .format("gif")
      .output(options.outputPath)
      .withNoAudio();

    if (options.fps) this.command.videoFilters("fps=" + options.fps);
    if (options.width || options.height) {
      this.command.videoFilters(
        `scale=w=${options.width || -1}:h=${options.height || -1}`
      );
    }

    if (options.palette) {
      this.command
        .videoFilters("split[a]")
        .videoFilters("palettegen")
        .videoFilters("[a]paletteuse");
    }
    return this;
  }

  convertToGif(sender: {
    send: (channel: string, status: ConvertReport) => void;
  }) {
    if (this.command) {
      this.command
        .on("start", commandLine => {
          logger.log("Command: " + commandLine);
          sender.send(CONVERT_REPORT, {
            status: "PROCESSING",
            progress: 0
          });
        })
        .on("progress", progress => {
          logger.log("Processing: " + progress.percent + "% done");
          sender.send(CONVERT_REPORT, {
            status: "PROCESSING",
            progress: progress.percent
          });
        })
        .on("error", err => {
          logger.log("Cannot process video: " + err.message);
          sender.send(CONVERT_REPORT, {
            status: "ERROR",
            errorDetail: err.message
          });
        })
        .on("end", () => {
          logger.log("Finished processing");
          sender.send(CONVERT_REPORT, {
            status: "FINISHED",
            progress: 100
          });
        });

      this.command.run();
      return this;
    } else {
      throw new Error("command is not set.");
    }
  }

  static inspectFile(
    filepath: string,
    sender: { send: (channel: string, response: InspectionReport) => void }
  ) {
    ffmpeg.ffprobe(filepath, (err, metadata) => {
      let response: InspectionReport;
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

      logger.log(response, metadata, err);
      sender.send(INSPECT_FILE, response);
    });
  }
}
