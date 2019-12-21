export interface IConvertOptions {
  sourcePath: string;
  outputPath: string;
  fps?: number;
  width?: number;
  height?: number;
}

export interface IInspectionReport {
  error: boolean | null;
  size?: number;
  codec?: string;
  width?: number;
  height?: number;
  aspect_ratio?: string;
  fps?: number;
}

export interface IConvertReport {
  status: "PROCESSING" | "ERROR" | "FINISHED" | null;
  progress?: number;
  errorDetail?: any;
}
