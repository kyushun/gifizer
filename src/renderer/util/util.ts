export const getFilename = (filepath: string) => window.path.basename(filepath);

export const changeExtension = (filePath: string, newExtension: string) =>
  filePath.replace(/\.[^.]+$/, `.${newExtension}`);

export const zeroPadding = (num: number, length: number) =>
  String(num).padStart(length, '0');

export const secToTimeString = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds - min * 60);
  const point = String(seconds).split('.')[1];
  const pointStr = point ? `.${point.slice(0, 3)}` : '';

  return `${zeroPadding(min, 2)}:${zeroPadding(sec, 2)}${pointStr}`;
};
