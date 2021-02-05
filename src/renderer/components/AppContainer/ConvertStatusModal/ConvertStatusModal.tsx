import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Modal } from '@components/Shared/Modal';

import { convertStatusState, stringOptionStateFamily } from '@recoil/atoms';

import { isDarwin } from '@shared/util';

import { ProgressBar } from './ProgressBar';
import {
  StyledConvertStatusModalWrapper,
  StyledConvertStatusModalTitle,
  StyledConvertStatusModalMessage,
  StyledConvertStatusModalButton,
  StyledConvertStatusModalButtonWrapper,
} from './Styled';

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

    return (
      <StyledConvertStatusModalTitle>
        {titleText[convertStatus.status]}
      </StyledConvertStatusModalTitle>
    );
  }, [convertStatus]);

  const MessageElement = useMemo(() => {
    if (convertStatus === undefined) return null;

    if (
      convertStatus.status === 'CANCELED' ||
      convertStatus.status === 'ERROR'
    ) {
      return (
        <StyledConvertStatusModalMessage>
          {convertStatus.message}
        </StyledConvertStatusModalMessage>
      );
    }

    const progressPercent =
      convertStatus.status === 'PROCESSING' ? convertStatus.progress : 100;

    return (
      <StyledConvertStatusModalMessage>
        {`${Math.round(progressPercent)}%`}
      </StyledConvertStatusModalMessage>
    );
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
      return (
        <StyledConvertStatusModalButton onClick={onClickCancel}>
          Cancel
        </StyledConvertStatusModalButton>
      );
    }

    if (convertStatus.status === 'END') {
      return (
        <StyledConvertStatusModalButtonWrapper>
          <StyledConvertStatusModalButton onClick={onClickReveal}>
            Reveal in&nbsp;
            {isDarwin ? 'Finder' : 'Explorer'}
          </StyledConvertStatusModalButton>

          <StyledConvertStatusModalButton onClick={onClickClose}>
            Close
          </StyledConvertStatusModalButton>
        </StyledConvertStatusModalButtonWrapper>
      );
    }

    return (
      <StyledConvertStatusModalButton onClick={onClickClose}>
        Close
      </StyledConvertStatusModalButton>
    );
  }, [convertStatus, onClickCancel, onClickClose, onClickReveal]);

  return (
    <Modal isVisible={isVisible}>
      <StyledConvertStatusModalWrapper>
        {TitleElement}
        {MessageElement}
        {ProgressBarElement}
        {FooterElement}
      </StyledConvertStatusModalWrapper>
    </Modal>
  );
};
