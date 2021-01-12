import { MenuIcon } from './MenuIcon';
import {
  StyledHeaderAppName,
  StyledHeaderWrapper,
  StyledMenuIconWrapper,
} from './Styled';
import convertIconSvg from './convert-icon.svg';
import cropIconSvg from './crop-icon.svg';
import cutIconSvg from './cut-icon.svg';

export const Header = () => (
  <StyledHeaderWrapper>
    <StyledMenuIconWrapper left={100}>
      <MenuIcon width={50} icon={cutIconSvg} text="Cut" />
    </StyledMenuIconWrapper>
    <StyledMenuIconWrapper left={150}>
      <MenuIcon width={50} icon={cropIconSvg} text="Crop" />
    </StyledMenuIconWrapper>

    <StyledHeaderAppName>Gifizer</StyledHeaderAppName>

    <StyledMenuIconWrapper right={30}>
      <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
    </StyledMenuIconWrapper>
  </StyledHeaderWrapper>
);
