import { StyledContainer } from './Styled';
import addFileIconSvg from './add-file-icon.svg';
import { Modal } from '@components/Shared/Modal';
import { Icon } from '@components/Shared/index';

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
