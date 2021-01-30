export const getFilename = (filepath: string) => window.path.basename(filepath);

export const changeExtension = (filePath: string, newExtension: string) =>
  filePath.replace(/\.[^.]+$/, `.${newExtension}`);
