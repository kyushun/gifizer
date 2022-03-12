import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 20px;
  width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.mainNormal};
  box-sizing: border-box;
  overflow-y: auto;
`;

export const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const ItemSummery = styled.div`
  margin-top: 10px;
`;

export const ItemWrapper = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.hover};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.active};
  }
`;

export const IconButtonText = styled.span`
  margin: 0 4px;
`;

export const IconToggle = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ selected, theme }) =>
    selected && theme.palette.active};
  border: solid 1px ${({ theme }) => theme.palette.hover};
  cursor: pointer;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.active : theme.palette.hover};
  }
`;

export const FlexWrapper = styled.div`
  flex: 1;
`;
