import { useRecoilState } from 'recoil';
import {
  StyledContainer,
  StyledTitle,
  StyledItemName,
  StyledItem,
  StyledItemSpacer,
  StyledIconSwitcher,
} from './Styled';
import filenameIconSvg from './filename-icon.svg';
import fpsIconSvg from './fps-icon.svg';
import paletteIconSvg from './palette-icon.svg';
import sizeIconSvg from './size-icon.svg';
import { Icon, Input } from '@components/Shared/index';
import { theme } from '@components/Styles/theme';
import {
  stringOptionStateFamily,
  numberOptionsStateFamilyString,
  boolOptionsStateFamily,
} from '@renderer/recoil/atoms/index';

export const OptionContainer = () => {
  const [filenameState, setFilenameState] = useRecoilState(
    stringOptionStateFamily('option/filename')
  );
  const [widthState, setWidthState] = useRecoilState(
    numberOptionsStateFamilyString('option/width')
  );
  const [heightState, setHeightState] = useRecoilState(
    numberOptionsStateFamilyString('option/height')
  );
  const [fpsState, setFpsState] = useRecoilState(
    numberOptionsStateFamilyString('option/fps')
  );
  const [paletteState, setPaletteState] = useRecoilState(
    boolOptionsStateFamily('option/palette')
  );

  return (
    <StyledContainer>
      <StyledTitle>Output</StyledTitle>

      <StyledItemName>File Name</StyledItemName>
      <StyledItem>
        <StyledItemSpacer>
          <Icon icon={filenameIconSvg} size={22} />
        </StyledItemSpacer>
        <Input
          value={filenameState}
          backgroundColor={theme.palette.mainSilent}
          onChange={(e) => setFilenameState(e.target.value)}
        />
      </StyledItem>

      <StyledItemName>Size</StyledItemName>
      <StyledItem>
        <StyledItemSpacer>
          <Icon icon={sizeIconSvg} size={22} />
        </StyledItemSpacer>
        <StyledItemSpacer>
          <Input
            type="number"
            value={widthState}
            width={40}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setWidthState(e.target.value)}
          />
        </StyledItemSpacer>
        <StyledItemSpacer>x</StyledItemSpacer>
        <Input
          value={heightState}
          width={40}
          backgroundColor={theme.palette.mainSilent}
          center
          placeholder="Auto"
          onChange={(e) => setHeightState(e.target.value)}
        />
      </StyledItem>

      <StyledItemName>Framerate</StyledItemName>
      <StyledItem>
        <StyledItemSpacer>
          <Icon icon={fpsIconSvg} size={22} />
        </StyledItemSpacer>
        <StyledItemSpacer>
          <Input
            value={fpsState}
            width={30}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setFpsState(e.target.value)}
          />
        </StyledItemSpacer>
        FPS
      </StyledItem>

      <StyledItemName>Palette</StyledItemName>
      <StyledItem>
        <StyledItemSpacer>
          <StyledIconSwitcher
            selected={paletteState}
            onClick={() => setPaletteState((prev) => !prev)}
          >
            <Icon icon={paletteIconSvg} size={22} />
          </StyledIconSwitcher>
        </StyledItemSpacer>
        Use a palette to downsample an input video stream.
      </StyledItem>
    </StyledContainer>
  );
};
