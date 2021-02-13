import { useEffect, useRef, useState, MouseEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { cropOptionState } from '@recoil/atoms/options';

import { ConvertOption } from '@shared/types';

import {
  StyledCropWrapper,
  StyledCropContent,
  StyledCropCorner,
} from './Styled';

export type CropType =
  | 'CONTENT'
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_LEFT';

export const Crop = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const prevMousePositionRef = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const prevCropRef = useRef<ConvertOption['crop']>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [cropTarget, setCropTarget] = useState<CropType | undefined>(undefined);

  const [crop, setCrop] = useRecoilState(cropOptionState);

  const onMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      event.preventDefault();

      if (event.button !== 0) return;

      const cropType = (event.target as HTMLDivElement).dataset
        .cropType as CropType;

      setCropTarget(cropType);
      prevMousePositionRef.current = { x: event.pageX, y: event.pageY };
    },
    []
  );

  useEffect(() => {
    const onMouseUp = () => {
      setCropTarget(undefined);
    };

    const onMouseMove = ({ pageX: x, pageY: y }: globalThis.MouseEvent) => {
      if (cropTarget === undefined) return;
      if (wrapperRef.current === null) return;

      const mouseMovedX = x - prevMousePositionRef.current.x;
      const mouseMovedY = y - prevMousePositionRef.current.y;

      const wrapperDomWidth = wrapperRef.current.clientWidth;
      const wrapperDomHeight = wrapperRef.current.clientHeight;

      const diffXPercent = (mouseMovedX / wrapperDomWidth) * 100;
      const diffYPercent = (mouseMovedY / wrapperDomHeight) * 100;

      let height = 0;
      let top = 0;
      let left = 0;
      let width = 0;

      if (cropTarget === 'TOP_LEFT') {
        if (prevCropRef.current.y > 0 || diffYPercent > 0) {
          top = diffYPercent;
          height = -diffYPercent;
        }
        if (prevCropRef.current.x > 0 || diffXPercent > 0) {
          left = diffXPercent;
          width = -diffXPercent;
        }
      } else if (cropTarget === 'TOP_RIGHT') {
        width = diffXPercent;

        if (prevCropRef.current.y > 0 || diffYPercent > 0) {
          top = diffYPercent;
          height = -diffYPercent;
        }
      } else if (cropTarget === 'BOTTOM_RIGHT') {
        height = diffYPercent;
        width = diffXPercent;
      } else if (cropTarget === 'BOTTOM_LEFT') {
        height = diffYPercent;

        if (prevCropRef.current.x > 0 || diffXPercent > 0) {
          left = diffXPercent;
          width = -diffXPercent;
        }
      } else if (cropTarget === 'CONTENT') {
        top = diffYPercent;
        left = diffXPercent;
      }

      const range = (num: number, min: number, max: number) =>
        Math.max(Math.min(num, max), min);

      const newState = {
        x: range(prevCropRef.current.x + left, 0, 100),
        y: range(prevCropRef.current.y + top, 0, 100),
        width: range(prevCropRef.current.width + width, 0, 100),
        height: range(prevCropRef.current.height + height, 0, 100),
      };

      if (
        newState.height < 5 * (wrapperDomWidth / wrapperDomHeight) ||
        newState.y + newState.height > 100
      ) {
        newState.y = prevCropRef.current.y;
        newState.height = prevCropRef.current.height;
      }
      if (newState.width < 5 || newState.x + newState.width > 100) {
        newState.x = prevCropRef.current.x;
        newState.width = prevCropRef.current.width;
      }

      setCrop(newState);
      prevCropRef.current = newState;

      prevMousePositionRef.current = { x, y };
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [cropTarget, setCrop]);

  return (
    <StyledCropWrapper ref={wrapperRef} style={{ opacity: cropTarget && 1 }}>
      <StyledCropContent
        style={{
          top: `${crop.y}%`,
          left: `${crop.x}%`,
          width: `${crop.width}%`,
          height: `${crop.height}%`,
        }}
        data-crop-type="CONTENT"
        onMouseDown={onMouseDown}
      >
        <StyledCropCorner data-crop-type="TOP_LEFT" />
        <StyledCropCorner data-crop-type="TOP_RIGHT" />
        <StyledCropCorner data-crop-type="BOTTOM_RIGHT" />
        <StyledCropCorner data-crop-type="BOTTOM_LEFT" />
      </StyledCropContent>
    </StyledCropWrapper>
  );
};
