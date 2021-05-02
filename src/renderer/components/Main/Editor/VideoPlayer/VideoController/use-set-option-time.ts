import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { useVideoController } from '@renderer/hooks';
import { numberOptionStateFamily } from '@renderer/recoil/atoms';

export const useSetOptionTime = () => {
  const { currentTime } = useVideoController();

  const setStartTime = useSetRecoilState(
    numberOptionStateFamily('option/startTime')
  );
  const setEndTime = useSetRecoilState(
    numberOptionStateFamily('option/endTime')
  );

  const onBackwardClicked = useCallback(() => {
    setStartTime(currentTime);
  }, [currentTime, setStartTime]);

  const onForwardClicked = useCallback(() => {
    setEndTime(currentTime);
  }, [currentTime, setEndTime]);

  return { onBackwardClicked, onForwardClicked };
};
