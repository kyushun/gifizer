import { useEffect } from 'react';

import { useSetFileState } from '@renderer/hooks/use-set-file-state';

import { InspectData } from '@shared/types';

export type UseSetFileStateWrapperProps = {
  filePath: string;
  inspectData: InspectData;
};

export const useSetFileStateWrapper = (props: UseSetFileStateWrapperProps) => {
  const setFileState = useSetFileState();

  useEffect(() => {
    if (props.filePath && props.inspectData) {
      setFileState(props.filePath, props.inspectData);
    }
  }, [props.filePath, props.inspectData, setFileState]);
};

export const sampleVideoArgs: UseSetFileStateWrapperProps = {
  filePath: 'https://cdn.kyushun.com/app/gifizer/sample-video.mp4',
  inspectData: {
    codec: 'h264',
    fps: 30,
    height: 270,
    size: 4026,
    width: 480,
  },
};
