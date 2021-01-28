import { FC } from 'react';
import { createPortal } from 'react-dom';

import { StyledContainer } from './Styled';

type Props = {
  isVisible: boolean;
};

export const Modal: FC<Props> = ({ children, isVisible }) =>
  createPortal(
    <StyledContainer isVisible={isVisible}>{children}</StyledContainer>,
    document.getElementById('root') as Element
  );
