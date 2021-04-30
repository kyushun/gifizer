import * as Styled from './Styled';

type Props = {
  width: number;
  progressPercent: number;
  error: boolean;
};

export const ProgressBar = (props: Props) => {
  const progress = props.width * (props.progressPercent * 0.01);

  return (
    <Styled.Wrapper width={props.width}>
      <Styled.ProgressBar
        width={props.width}
        progress={progress}
        error={props.error}
      />
    </Styled.Wrapper>
  );
};
