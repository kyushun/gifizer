import styled from 'styled-components';

type StyledProgressBarWrapperProps = {
  width: number;
};

export const StyledProgressBarWrapper = styled.div<StyledProgressBarWrapperProps>`
  margin: 0.25rem auto;
  background-color: ${({ theme }) => theme.palette.textSilent};
  width: ${({ width }) => width}px;
  border-radius: 10px;
`;

type StyledProgressBarLineProps = {
  width: number;
  progress: number;
  error: boolean;
};

export const StyledProgressBarLine = styled.div<StyledProgressBarLineProps>`
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
