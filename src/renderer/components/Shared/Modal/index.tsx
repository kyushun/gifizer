import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './Styled';

type Props = {
  isVisible: boolean;
};

export const Modal: FC<Props> = ({ children, isVisible }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsRendered(true);
        });
      });
    } else {
      setIsRendered(false);
    }
  }, [isVisible]);

  return createPortal(
    isVisible && (
      <Styled.Container isVisible={isRendered}>{children}</Styled.Container>
    ),
    document.getElementById('root') as Element
  );
};
