import { Icon } from '@components/Shared/index';
import { Modal } from '@components/Shared/Modal';

import addFileIconSvg from './add-file-icon.svg';
import * as Styled from './Styled';

type Props = {
  isVisible: boolean;
};

export const DropNavigationModal = (props: Props) => {
  return (
    <Modal isVisible={props.isVisible}>
      <Styled.Container>
        <Icon icon={addFileIconSvg} size={100} />
      </Styled.Container>
    </Modal>
  );
};
