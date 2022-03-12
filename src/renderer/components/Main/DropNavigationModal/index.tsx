import { DocumentAddRegular } from '@fluentui/react-icons';

import { Modal } from '@components/Shared/Modal';

import * as Styled from './Styled';

type Props = {
  isVisible: boolean;
};

export const DropNavigationModal = (props: Props) => {
  return (
    <Modal isVisible={props.isVisible}>
      <Styled.Container>
        <DocumentAddRegular fontSize={100} />
      </Styled.Container>
    </Modal>
  );
};
