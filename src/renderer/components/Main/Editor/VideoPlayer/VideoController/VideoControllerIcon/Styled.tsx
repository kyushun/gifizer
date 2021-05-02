import styled from 'styled-components';

export const Container = styled.div`
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
