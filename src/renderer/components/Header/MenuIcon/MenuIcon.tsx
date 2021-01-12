import { StyledContainer, StyledMenuIcon, StyledMenuIconText } from './Styled';

type Props = {
  width: number;
  icon: string;
  text: string;
};

export const MenuIcon = (props: Props) => (
  <StyledContainer width={props.width}>
    <StyledMenuIcon
      css={`
        background-image: url(${props.icon});
      `}
    />
    <StyledMenuIconText>{props.text}</StyledMenuIconText>
  </StyledContainer>
);
