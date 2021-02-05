import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { timeToSeconds, secToTimeString } from '@renderer/util';

import { Icon, Input } from '@components/Shared/index';
import { theme } from '@components/Styles/theme';

import {
  stringOptionStateFamily,
  intOptionsStateFamilyString,
  numberOptionStateFamily,
  boolOptionsStateFamily,
} from '@recoil/atoms/index';

import curIconSvg from './cut-icon.svg';
import filenameIconSvg from './filename-icon.svg';
import fpsIconSvg from './fps-icon.svg';
import paletteIconSvg from './palette-icon.svg';
import sizeIconSvg from './size-icon.svg';
import {
  StyledContainer,
  StyledTitle,
  StyledItemName,
  StyledItem,
  StyledItemSpacer,
  StyledIconSwitcher,
} from './Styled';

export const OptionContainer = () => {
  const [filenameState, setFilenameState] = useRecoilState(
    stringOptionStateFamily('option/filename')
  );
  const [widthState, setWidthState] = useRecoilState(
    intOptionsStateFamilyString('option/width')
  );
  const [heightState, setHeightState] = useRecoilState(
    intOptionsStateFamilyString('option/height')
  );
  const [fpsState, setFpsState] = useRecoilState(
    intOptionsStateFamilyString('option/fps')
  );
  const [paletteState, setPaletteState] = useRecoilState(
    boolOptionsStateFamily('option/palette')
  );
  const [startTime, setStartTime] = useRecoilState(
    numberOptionStateFamily('option/startTime')
  );
  const [endTime, setEndTime] = useRecoilState(
    numberOptionStateFamily('option/endTime')
  );

  const [inputStartTime, setInputStartTime] = useState('');
  const [inputEndTime, setInputEndTime] = useState('');

  const onStartTimeChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (value === '') {
        setStartTime(undefined);
      } else {
        const seconds = timeToSeconds(value);
        setInputStartTime(secToTimeString(seconds));
        setStartTime(seconds);
      }
    },
    [setStartTime]
  );

  const onEndTimeChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (value === '') {
        setEndTime(undefined);
      } else {
        const seconds = timeToSeconds(value);
        setInputEndTime(secToTimeString(seconds));
        setEndTime(seconds);
      }
    },
    [setEndTime]
  );

  useEffect(() => {
    setInputStartTime(
      startTime !== undefined ? secToTimeString(startTime) : ''
    );
  }, [startTime]);

  useEffect(() => {
    setInputEndTime(endTime !== undefined ? secToTimeString(endTime) : '');
  }, [endTime]);

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

      <StyledItemName>Cut</StyledItemName>
      <StyledItem>
        <StyledItemSpacer>
          <Icon icon={curIconSvg} size={22} />
        </StyledItemSpacer>
        <StyledItemSpacer>
          <Input
            type="text"
            value={inputStartTime}
            width={75}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setInputStartTime(e.target.value)}
            onBlur={onStartTimeChanged}
          />
        </StyledItemSpacer>
        <StyledItemSpacer>-</StyledItemSpacer>
        <StyledItemSpacer>
          <Input
            type="text"
            value={inputEndTime}
            width={75}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setInputEndTime(e.target.value)}
            onBlur={onEndTimeChanged}
          />
        </StyledItemSpacer>
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
