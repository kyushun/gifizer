import * as ffmpeg from "@/main/lib/ffmpeg";
import path from "path";
import fs from "fs";

const testMovie = path.join(process.cwd(), "/tests/main/lib/assets/output.mp4");

const expected = {
  normalReport: {
    error: false,
    size: 4026,
    codec: "h264",
    width: 480,
    height: 270,
    aspect_ratio: "16:9",
    fps: 30
  },
  errorReport: {
    error: true
  },
  gifMd5: "320a64df6d1d0d8f24f217a87c7329f6"
};

describe("ffmpeg", () => {
  describe("inspectFile()", () => {
    describe("arg: movie file", () => {
      it("sends normal report", done => {
        ffmpeg.inspectFile(testMovie, {
          send: (_, report) => {
            expect(report).toEqual(expected.normalReport);
            done();
          }
        });
      });
    });

    describe("arg: except for movie file", () => {
      it("sends error report", done => {
        ffmpeg.inspectFile(
          path.join(process.cwd(), "/tests/main/lib/assets/"),
          {
            send: (_, report) => {
              expect(report).toEqual(expected.errorReport);
              done();
            }
          }
        );
      });
    });
  });

  describe("convertToGif()", () => {
    describe("arg: valid options", () => {
      it("generates gif file", done => {
        const outputPath = testMovie + ".gif";
        ffmpeg.convertToGif(
          {
            sourcePath: testMovie,
            outputPath
          },
          {
            send: (_, report) => {
              if (report.status === "FINISHED") {
                fs.stat(outputPath, async err => {
                  if (!err) {
                    const md5 = await getMD5(outputPath);
                    fs.unlink(outputPath, () => {});
                    expect(md5).toBe(expected.gifMd5);
                    done();
                  }
                });
              }
            }
          }
        );
      });
    });

    describe("arg: invalid options", () => {
      it("sends error report", done => {
        ffmpeg.convertToGif(
          {
            sourcePath: "invalid input",
            outputPath: "invalid output"
          },
          {
            send: (_, report) => {
              if (report.status === "ERROR") {
                done();
              }
            }
          }
        );
      });
    });
  });
});

function getMD5(filePath: string) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const md5hash = require("crypto").createHash("md5");
    md5hash.setEncoding("base64");
    readStream.pipe(md5hash);
    readStream.on("end", () => {
      resolve(md5hash.digest("hex"));
    });
    readStream.on("error", (e: any) => {
      reject(e);
    });
  });
}
