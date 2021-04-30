import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Modal } from '@components/Shared/Modal';

import { convertStatusState, stringOptionStateFamily } from '@recoil/atoms';

import { isDarwin } from '@shared/util';

import { ProgressBar } from './ProgressBar';
import * as Styled from './Styled';

export const ConvertStatusModal = () => {
  const [convertStatus, setConvertStatus] = useRecoilState(convertStatusState);
  const outputFilePath = useRecoilValue(
    stringOptionStateFamily('option/filename')
  );

  useEffect(() => {
    const removeListener = window.api.onConvertStatus((status) => {
      setConvertStatus(status);
    });

    return removeListener;
  }, [setConvertStatus]);

  const isVisible = convertStatus !== undefined;

  const onClickCancel = useCallback(() => {
    window.api.cancel();
  }, []);

  const onClickReveal = useCallback(() => {
    window.api.revealFile(outputFilePath);
  }, [outputFilePath]);

  const onClickClose = useCallback(() => {
    setConvertStatus(undefined);
  }, [setConvertStatus]);

  const TitleElement = useMemo(() => {
    if (convertStatus === undefined) return null;

    type StatusType = Pick<
      Exclude<typeof convertStatus, undefined>,
      'status'
    >['status'];

    const titleText: { [key in StatusType]: string } = {
      PROCESSING: 'Converting...',
      END: 'Finished',
      CANCELED: 'Canceled',
      ERROR: 'An error occurred',
    };

    return <Styled.Title>{titleText[convertStatus.status]}</Styled.Title>;
  }, [convertStatus]);

  const MessageElement = useMemo(() => {
    if (convertStatus === undefined) return null;

    if (
      convertStatus.status === 'CANCELED' ||
      convertStatus.status === 'ERROR'
    ) {
      return <Styled.Message>{convertStatus.message}</Styled.Message>;
    }

    const progressPercent =
      convertStatus.status === 'PROCESSING' ? convertStatus.progress : 100;

    return <Styled.Message>{`${Math.round(progressPercent)}%`}</Styled.Message>;
  }, [convertStatus]);

  const ProgressBarElement = useMemo(() => {
    if (convertStatus === undefined) return null;

    const error =
      convertStatus.status === 'CANCELED' || convertStatus.status === 'ERROR';

    const progressPercent =
      convertStatus.status === 'PROCESSING' ? convertStatus.progress : 100;

    return (
      <ProgressBar
        width={500}
        progressPercent={progressPercent}
        error={error}
      />
    );
  }, [convertStatus]);

  const FooterElement = useMemo(() => {
    if (convertStatus === undefined) return null;

    if (convertStatus.status === 'PROCESSING') {
      return <Styled.Button onClick={onClickCancel}>Cancel</Styled.Button>;
    }

    if (convertStatus.status === 'END') {
      return (
        <Styled.ButtonContainer>
          <Styled.Button onClick={onClickReveal}>
            Reveal in&nbsp;
            {isDarwin ? 'Finder' : 'Explorer'}
          </Styled.Button>

          <Styled.Button onClick={onClickClose}>Close</Styled.Button>
        </Styled.ButtonContainer>
      );
    }

    return <Styled.Button onClick={onClickClose}>Close</Styled.Button>;
  }, [convertStatus, onClickCancel, onClickClose, onClickReveal]);

  return (
    <Modal isVisible={isVisible}>
      <Styled.Container>
        {TitleElement}
        {MessageElement}
        {ProgressBarElement}
        {FooterElement}
      </Styled.Container>
    </Modal>
  );
};
