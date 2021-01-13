import { StyledContainer, StyledMenuIconText } from './Styled';
import { Icon } from '@components/Shared/index';

type Props = {
  width: number;
  icon: string;
  text: string;
};

export const MenuIcon = (props: Props) => (
  <StyledContainer width={props.width}>
    <Icon icon={props.icon} size={22} />
    <StyledMenuIconText>{props.text}</StyledMenuIconText>
  </StyledContainer>
);
