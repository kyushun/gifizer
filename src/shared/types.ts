export interface ConvertOptions {
  sourcePath: string;
  outputPath: string;
  fps?: number;
  width?: number;
  height?: number;
}

export interface InspectionReport {
  error: boolean | null;
  size?: number;
  codec?: string;
  width?: number;
  height?: number;
  aspect_ratio?: string;
  fps?: number;
}

export interface ConvertReport {
  status: "PROCESSING" | "ERROR" | "FINISHED" | null;
  progress?: number;
  errorDetail?: any;
}
