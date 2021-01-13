import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 40px 20px;
  width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.mainNormal};
  box-sizing: border-box;
`;

export const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const StyledItemName = styled.div`
  margin-top: 10px;
`;

export const StyledItem = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const StyledItemSpacer = styled.div`
  margin-right: 8px;
`;

export const StyledIconSwitcher = styled.div<{ selected: boolean }>`
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ selected, theme }) =>
    selected && theme.palette.active};
  border: solid 1px ${({ theme }) => theme.palette.hover};

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.active : theme.palette.hover};
  }
`;
