export interface ConvertOptions {
  [key: string]: any;
  sourcePath: string;
  outputPath: string;
  fps?: number;
  width?: number;
  height?: number;
  palette?: boolean;
  startSec?: number;
  endSec?: number;
  crop?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
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
  status: "PROCESSING" | "ERROR" | "FINISHED" | "CANCELLED" | null;
  progress?: number;
  message?: any;
}
