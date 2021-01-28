import { useRecoilValue } from 'recoil';

import { Modal } from '@components/Shared/Modal';

import { messagesState } from '@recoil/atoms';

export const MessageModal = () => {
  const messages = useRecoilValue(messagesState);

  const message = messages.length > 0 ? messages[0] : undefined;
  const isModalVisible = message !== undefined;

  return (
    <Modal isVisible={isModalVisible}>
      <div css="pointer-events: auto;" onClick={() => console.log('hoge')}>
        {JSON.stringify(message)}
      </div>
    </Modal>
  );
};
