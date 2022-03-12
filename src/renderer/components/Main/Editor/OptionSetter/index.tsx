import {
  BarcodeScannerRegular,
  ColorRegular,
  CropRegular,
  CutRegular,
  DocumentRegular,
  SlideSize24Regular,
} from '@fluentui/react-icons';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { timeToSeconds, secToTimeString } from '@renderer/util';

import { Input } from '@components/Shared/index';
import { theme } from '@components/Styles/theme';

import {
  stringOptionStateFamily,
  intOptionsStateFamilyString,
  numberOptionStateFamily,
  boolOptionsStateFamily,
  cropOptionState,
} from '@recoil/atoms/index';

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

  const setCropOption = useSetRecoilState(cropOptionState);

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

  const resetCropOption = useCallback(() => {
    setCropOption({ x: 0, y: 0, width: 100, height: 100 });
  }, [setCropOption]);

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
          <DocumentRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
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
          <SlideSize24Regular
            width={22}
            height={22}
            style={{ verticalAlign: 'middle' }}
          />
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
          <BarcodeScannerRegular
            fontSize={22}
            style={{ verticalAlign: 'middle' }}
          />
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
          <CutRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
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

      <Styled.ItemSummery>Crop</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Styled.IconButton onClick={resetCropOption}>
            <CropRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
            <Styled.IconButtonText>Reset Crop</Styled.IconButtonText>
          </Styled.IconButton>
        </Styled.ItemSpacer>
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Palette</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.ItemSpacer>
          <Styled.IconToggle
            selected={paletteState}
            onClick={() => setPaletteState((prev) => !prev)}
          >
            <ColorRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
          </Styled.IconToggle>
        </Styled.ItemSpacer>
        Use a palette to downsample an input video stream.
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};
