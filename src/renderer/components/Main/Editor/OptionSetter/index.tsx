import {
  BarcodeScannerRegular,
  ColorRegular,
  CropRegular,
  CutRegular,
  DocumentRegular,
  FolderRegular,
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

  const openSaveDialog = useCallback(async () => {
    const result = await window.api.showSaveDialog(filenameState);
    if (result.canceled || !result.filePath) return;

    setFilenameState(result.filePath);
  }, [filenameState, setFilenameState]);

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
        <DocumentRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
        <Styled.FlexWrapper>
          <Input
            value={filenameState}
            backgroundColor={theme.palette.mainSilent}
            disabled
          />
        </Styled.FlexWrapper>
        <Styled.IconButton onClick={openSaveDialog}>
          <FolderRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
        </Styled.IconButton>
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Size</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <SlideSize24Regular
          width={22}
          height={22}
          style={{ verticalAlign: 'middle' }}
        />
        <Input
          type="number"
          value={widthState}
          width={40}
          backgroundColor={theme.palette.mainSilent}
          center
          placeholder="Auto"
          onChange={(e) => setWidthState(e.target.value)}
        />
        x
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
        <BarcodeScannerRegular
          fontSize={22}
          style={{ verticalAlign: 'middle' }}
        />
        <Input
          value={fpsState}
          width={30}
          backgroundColor={theme.palette.mainSilent}
          center
          placeholder="Auto"
          onChange={(e) => setFpsState(e.target.value)}
        />
        FPS
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Cut</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <CutRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
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
        -
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
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Crop</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.IconButton onClick={resetCropOption}>
          <CropRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
          <Styled.IconButtonText>Reset Crop</Styled.IconButtonText>
        </Styled.IconButton>
      </Styled.ItemWrapper>

      <Styled.ItemSummery>Palette</Styled.ItemSummery>
      <Styled.ItemWrapper>
        <Styled.IconToggle
          selected={paletteState}
          onClick={() => setPaletteState((prev) => !prev)}
        >
          <ColorRegular fontSize={22} style={{ verticalAlign: 'middle' }} />
        </Styled.IconToggle>
        Use a palette to downsample an input video stream.
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};
