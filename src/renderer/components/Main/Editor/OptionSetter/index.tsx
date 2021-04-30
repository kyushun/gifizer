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
import * as Styled from './Styled';

export const OptionSetter = () => {
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
    <Styled.Container>
      <Styled.Subtitle>Output</Styled.Subtitle>

      <Styled.ItemSummery>File Name</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Icon icon={filenameIconSvg} size={22} />
        </Styled.ItemSpacer>
        <Input
          value={filenameState}
          backgroundColor={theme.palette.mainSilent}
          onChange={(e) => setFilenameState(e.target.value)}
        />
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Size</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Icon icon={sizeIconSvg} size={22} />
        </Styled.ItemSpacer>
        <Styled.ItemSpacer>
          <Input
            type="number"
            value={widthState}
            width={40}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setWidthState(e.target.value)}
          />
        </Styled.ItemSpacer>
        <Styled.ItemSpacer>x</Styled.ItemSpacer>
        <Input
          value={heightState}
          width={40}
          backgroundColor={theme.palette.mainSilent}
          center
          placeholder="Auto"
          onChange={(e) => setHeightState(e.target.value)}
        />
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Framerate</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Icon icon={fpsIconSvg} size={22} />
        </Styled.ItemSpacer>
        <Styled.ItemSpacer>
          <Input
            value={fpsState}
            width={30}
            backgroundColor={theme.palette.mainSilent}
            center
            placeholder="Auto"
            onChange={(e) => setFpsState(e.target.value)}
          />
        </Styled.ItemSpacer>
        FPS
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Cut</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Icon icon={curIconSvg} size={22} />
        </Styled.ItemSpacer>
        <Styled.ItemSpacer>
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
        </Styled.ItemSpacer>
        <Styled.ItemSpacer>-</Styled.ItemSpacer>
        <Styled.ItemSpacer>
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
        </Styled.ItemSpacer>
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Palette</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Styled.IconButton
            selected={paletteState}
            onClick={() => setPaletteState((prev) => !prev)}
          >
            <Icon icon={paletteIconSvg} size={22} />
          </Styled.IconButton>
        </Styled.ItemSpacer>
        Use a palette to downsample an input video stream.
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};
