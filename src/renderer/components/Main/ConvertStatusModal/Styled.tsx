import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
`;

export const Title = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.textAccent};
  font-size: 24px;
  font-weight: bold;
`;

export const Message = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.textAccent};
  font-size: 12px;
`;

export const Button = styled.div`
  margin: 16px 4px 0;
  padding: 8px 16px;
  color: ${({ theme }) => theme.palette.textNormal};
  border: solid 1px ${({ theme }) => theme.palette.textNormal};
  border-radius: 6px;
  user-select: none;
  pointer-events: auto;

  &:hover {
    background-color: ${({ theme }) => theme.palette.textHide};
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
`;
