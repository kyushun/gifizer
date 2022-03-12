import crypto from 'crypto';
import log from 'electron-log';
import fs from 'fs';
import path from 'path';

import * as FFmpeg from '@main/lib/ffmpeg';

import { InspectData } from '@shared/types';

log.transports.file.level = false;
log.transports.console.level = false;

function getMD5(filePath: string) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const md5hash = crypto.createHash('md5');
    md5hash.setEncoding('base64');
    readStream.pipe(md5hash);
    readStream.on('end', () => {
      resolve(md5hash.digest('hex'));
    });
    readStream.on('error', (e: any) => {
      reject(e);
    });
  });
}

describe('FFmpeg', () => {
  const testMovie = path.join(
    process.cwd(),
    '/tests/main/lib/assets/output.mp4'
  );

  const expected: {
    normalReport: InspectData | undefined;
    errorReport: InspectData | undefined;
    md5: {
      noOptions: string;
      withOptions: string;
    };
  } = {
    normalReport: {
      size: 4026,
      codec: 'h264',
      width: 480,
      height: 270,
      fps: 30,
    },
    errorReport: undefined,
    md5: {
      noOptions: '320a64df6d1d0d8f24f217a87c7329f6',
      withOptions: '08ccd92434d0147b8a9481aa045a5ee5',
    },
  };

  describe('inspectFile()', () => {
    describe('arg: movie file', () => {
      it('sends normal report', (done) => {
        FFmpeg.inspectFile(testMovie).then((data) => {
          expect(data).toEqual(expected.normalReport);
          done();
        });
      });
    });

    describe('arg: except for movie file', () => {
      it('sends error report', (done) => {
        FFmpeg.inspectFile(
          path.join(process.cwd(), '/tests/main/lib/assets/')
        ).then((data) => {
          expect(data).toEqual(expected.errorReport);
          done();
        });
      });
    });
  });

  describe('convertToGif()', () => {
    describe('with no options', () => {
      it('generates gif file', (done) => {
        const outputPath = `${testMovie}-with-no-options1.gif`;
        FFmpeg.convert(testMovie, {
          outputPath,
          crop: { x: 0, y: 0, width: 100, height: 100 },
        })
          .on('end', () => {
            fs.stat(outputPath, async (err) => {
              if (!err) {
                const md5 = await getMD5(outputPath);
                fs.unlink(outputPath, () => {});
                expect(md5).toBe(expected.md5.noOptions);
                done();
              }
            });
          })
          .run();
      });
    });

    describe('with options', () => {
      it('generates gif file', (done) => {
        const outputPath = `${testMovie}-with-options2.gif`;

        FFmpeg.convert(testMovie, {
          outputPath,
          width: 320,
          height: undefined,
          fps: 10,
          palette: true,
          endTime: 0.5007,
          crop: { x: 240, y: 135, width: 50, height: 50 },
        })
          .on('end', () => {
            fs.stat(outputPath, async (err) => {
              if (!err) {
                const md5 = await getMD5(outputPath);
                fs.unlink(outputPath, () => {});
                expect(md5).toBe(expected.md5.withOptions);
                done();
              }
            });
          })
          .run();
      });
    });

    describe('arg: invalid options', () => {
      it('sends error report', (done) => {
        FFmpeg.convert('invalid input', {
          outputPath: 'invalid output',
          crop: { x: 0, y: 0, width: 100, height: 100 },
        })
          .on('error', () => {
            done();
          })
          .run();
      });
    });
  });
});
