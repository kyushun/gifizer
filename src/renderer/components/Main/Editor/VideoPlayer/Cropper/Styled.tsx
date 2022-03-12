import styled from 'styled-components';

import { CropType } from '.';

export const Wrapper = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
`;

export const Cropper = styled.div`
  position: absolute;
  cursor: pointer;
  will-change: top, left, width, height;
`;

export const Border = styled.div<{ isCropping: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 3px * 2);
  height: calc(100% - 3px * 2);
  background-color: rgba(255, 255, 255, 0.2);
  border: solid 3px rgba(255, 0, 0, 0.4);
  opacity: ${({ isCropping }) => (isCropping ? '1' : '0')};
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 2;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const Corner = styled.div<{ 'data-crop-type': CropType }>`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  border: 1px solid rgba(150, 150, 150, 1);
  background: #fff;
  top: ${({ 'data-crop-type': cropType }) =>
    cropType.includes('TOP') ? '-3px' : undefined};
  left: ${({ 'data-crop-type': cropType }) =>
    cropType.includes('LEFT') ? '-3px' : undefined};
  right: ${({ 'data-crop-type': cropType }) =>
    cropType.includes('RIGHT') ? '-3px' : undefined};
  bottom: ${({ 'data-crop-type': cropType }) =>
    cropType.includes('BOTTOM') ? '-3px' : undefined};
  cursor: ${({ 'data-crop-type': cropType }) => {
    if (cropType === 'TOP_LEFT') return 'nw-resize';
    if (cropType === 'TOP_RIGHT') return 'ne-resize';
    if (cropType === 'BOTTOM_RIGHT') return 'se-resize';
    if (cropType === 'BOTTOM_LEFT') return 'sw-resize';
    return undefined;
  }};
  z-index: 3;
`;
