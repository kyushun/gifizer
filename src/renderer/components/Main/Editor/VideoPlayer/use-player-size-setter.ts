/* eslint-disable no-param-reassign */
import { RefObject, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { inputFileInfoState } from '@renderer/recoil/atoms';

import { useResizeObserver } from '@hooks/use-resize-observer';

export const usePlayerSizeSetter = (
  ref: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>
) => {
  const fileInfo = useRecoilValue(inputFileInfoState);

  const { width: containerWidth, height: containerHeight } = useResizeObserver(
    containerRef
  );

  useEffect(() => {
    if (!fileInfo || !ref.current) return;

    const wph = fileInfo?.width / fileInfo?.height;
    const containerWph = containerWidth / containerHeight;

    let width;
    let height;
    if (wph > containerWph) {
      width = containerWidth;
      height = containerWidth * (fileInfo.height / fileInfo.width);
    } else {
      width = containerHeight * (fileInfo.width / fileInfo.height);
      height = containerHeight;
    }

    ref.current.style.width = `${Math.round(width)}px`;
    ref.current.style.height = `${Math.round(height)}px`;
  }, [containerHeight, containerWidth, fileInfo, ref]);
};
