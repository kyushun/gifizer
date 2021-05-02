import { useRecoilValue } from 'recoil';

import { inputFilePathState } from '@renderer/recoil/atoms';
import { getFilename } from '@renderer/util';

import { Icon } from '@components/Shared/index';

import closeIconSvg from './close-icon.svg';
import maximizeIconSvg from './maximize-icon.svg';
import minimizeIconSvg from './minimize-icon.svg';
import * as Styled from './Styled';

export const TitleBar = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);

  const titleFileName = inputFilePath && ` - ${getFilename(inputFilePath)}`;

  return (
    <Styled.Container>
      <Styled.TitleText>
        Gifizer
        {titleFileName}
      </Styled.TitleText>

      <Styled.Controller>
        <Styled.IconWrapper onClick={() => window.api.minimizeWindow()}>
          <Icon icon={minimizeIconSvg} size={12} />
        </Styled.IconWrapper>
        <Styled.IconWrapper onClick={() => window.api.maximizeWindow()}>
          <Icon icon={maximizeIconSvg} size={12} />
        </Styled.IconWrapper>
        <Styled.CloseIconWrapper onClick={() => window.api.closeWindow()}>
          <Icon icon={closeIconSvg} size={12} />
        </Styled.CloseIconWrapper>
      </Styled.Controller>
    </Styled.Container>
  );
};
