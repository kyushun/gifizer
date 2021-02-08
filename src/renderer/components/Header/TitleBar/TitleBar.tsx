import { useRecoilValue } from 'recoil';

import { inputFilePathState } from '@renderer/recoil/atoms';
import { getFilename } from '@renderer/util';

import { Icon } from '@components/Shared/index';

import closeIconSvg from './close-icon.svg';
import maximizeIconSvg from './maximize-icon.svg';
import minimizeIconSvg from './minimize-icon.svg';
import {
  StyledTitleBarWrapper,
  StyledTitleBarText,
  StyledTitleBarControllWrapper,
  StyledTitleBarControllIcon,
  StyledTitleBarControllCloseIcon,
} from './Styled';

export const TitleBar = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);

  const titleFileName = inputFilePath && ` - ${getFilename(inputFilePath)}`;

  return (
    <StyledTitleBarWrapper>
      <StyledTitleBarText>
        Gifizer
        {titleFileName}
      </StyledTitleBarText>
      <StyledTitleBarControllWrapper>
        <StyledTitleBarControllIcon onClick={() => window.api.minimizeWindow()}>
          <Icon icon={minimizeIconSvg} size={12} />
        </StyledTitleBarControllIcon>
        <StyledTitleBarControllIcon onClick={() => window.api.maximizeWindow()}>
          <Icon icon={maximizeIconSvg} size={12} />
        </StyledTitleBarControllIcon>
        <StyledTitleBarControllCloseIcon
          onClick={() => window.api.closeWindow()}
        >
          <Icon icon={closeIconSvg} size={12} />
        </StyledTitleBarControllCloseIcon>
      </StyledTitleBarControllWrapper>
    </StyledTitleBarWrapper>
  );
};
