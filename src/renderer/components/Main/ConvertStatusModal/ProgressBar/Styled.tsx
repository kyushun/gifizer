import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number }>`
  margin: 0.25rem auto;
  background-color: ${({ theme }) => theme.palette.textSilent};
  width: ${({ width }) => width}px;
  border-radius: 10px;
`;

export const ProgressBar = styled.div<{
  width: number;
  progress: number;
  error: boolean;
}>`
  width: ${({ error, progress, width }) => (error ? width : progress)}px;
  height: 5px;
  background: ${({ error }) =>
    error
      ? 'rgb(255, 45, 83)'
      : `linear-gradient(
    to right,
    rgb(76, 217, 105),
    rgb(90, 200, 250),
    rgb(0, 132, 255),
    rgb(52, 170, 220),
    rgb(88, 86, 217),
    rgb(255, 45, 83)
  )`};
  background-size: ${({ width }) => width}px 5px;
  border-radius: 10px;
  transition: width 1s;
`;
