import { Icon } from '@components/Shared/index';
import { Modal } from '@components/Shared/Modal';

import addFileIconSvg from './add-file-icon.svg';
import { StyledContainer } from './Styled';

type Props = {
  isVisible: boolean;
};

export const DropNavigationModal = (props: Props) => {
  return (
    <Modal isVisible={props.isVisible}>
      <StyledContainer>
        <Icon icon={addFileIconSvg} size={100} />
      </StyledContainer>
    </Modal>
  );
};
