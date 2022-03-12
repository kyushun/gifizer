import { useRef } from 'react';

import * as Styled from './Styled';
import { useCrop } from './use-crop';

export type CropType =
  | 'CONTENT'
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_LEFT';

export const Cropper = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cropperRef = useRef<HTMLDivElement>(null);

  const { isCropping, cropTarget, onMouseDown } = useCrop(
    cropperRef,
    wrapperRef
  );

  return (
    <Styled.Wrapper ref={wrapperRef} style={{ opacity: cropTarget && 1 }}>
      <Styled.Cropper
        ref={cropperRef}
        data-crop-type="CONTENT"
        onMouseDown={onMouseDown}
      >
        <Styled.Border isCropping={isCropping} />

        <Styled.Background>
          <Styled.Corner data-crop-type="TOP_LEFT" />
          <Styled.Corner data-crop-type="TOP_RIGHT" />
          <Styled.Corner data-crop-type="BOTTOM_RIGHT" />
          <Styled.Corner data-crop-type="BOTTOM_LEFT" />
        </Styled.Background>
      </Styled.Cropper>
    </Styled.Wrapper>
  );
};
