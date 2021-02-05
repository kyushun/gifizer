import { StyledProgressBarWrapper, StyledProgressBarLine } from './Styled';

type Props = {
  width: number;
  progressPercent: number;
  error: boolean;
};

export const ProgressBar = (props: Props) => {
  const progress = props.width * (props.progressPercent * 0.01);

  return (
    <StyledProgressBarWrapper width={props.width}>
      <StyledProgressBarLine
        width={props.width}
        progress={progress}
        error={props.error}
      />
    </StyledProgressBarWrapper>
  );
};
