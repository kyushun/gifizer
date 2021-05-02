export type InspectData = {
  size: number;
  codec: string;
  width: number;
  height: number;
  fps: number;
};

export type ConvertOption = {
  outputPath: string;
  width?: number;
  height?: number;
  fps?: number;
  palette?: boolean;
  startTime?: number;
  endTime?: number;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type ConvertProcessingStatus = {
  status: 'PROCESSING';
  progress: number;
};
export type ConvertErrorStatus = {
  status: 'ERROR' | 'CANCELED';
  message: string;
};
export type ConvertEndStatus = {
  status: 'END';
};

export type ConvertStatus =
  | ConvertProcessingStatus
  | ConvertErrorStatus
  | ConvertEndStatus;
