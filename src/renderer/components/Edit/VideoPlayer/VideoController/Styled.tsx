import styled from 'styled-components';

export const StyledIconWrapper = styled.div`
  margin: 0 6px;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.active};
  }
`;

export const StyledVideoControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  width: 100%;
`;

export const StyledVideoControllerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSeekBarWrapper = styled.div`
  margin-top: 8px;
`;
