import { useRecoilValue } from 'recoil';
import { MenuIcon } from './MenuIcon';
import {
  StyledHeaderAppName,
  StyledHeaderWrapper,
  StyledMenuIconWrapper,
} from './Styled';
import convertIconSvg from './convert-icon.svg';
import cropIconSvg from './crop-icon.svg';
import cutIconSvg from './cut-icon.svg';
import { inputFilePathState } from '@renderer/recoil/atoms';
import { getFilename } from '@renderer/util';

export const Header = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);

  return (
    <StyledHeaderWrapper>
      <StyledMenuIconWrapper left={100}>
        <MenuIcon width={50} icon={cutIconSvg} text="Cut" />
      </StyledMenuIconWrapper>
      <StyledMenuIconWrapper left={150}>
        <MenuIcon width={50} icon={cropIconSvg} text="Crop" />
      </StyledMenuIconWrapper>

      <StyledHeaderAppName>
        {getFilename(inputFilePath) || 'Gifizer'}
      </StyledHeaderAppName>

      <StyledMenuIconWrapper right={30}>
        <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
      </StyledMenuIconWrapper>
    </StyledHeaderWrapper>
  );
};
