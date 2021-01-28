import { Edit } from '@components/Edit';

import { useFileInputController } from '@hooks/use-file-input-controller';

import { DropNavigationModal } from './DropNavigationModal';
import { MessageModal } from './MessageModal';
import { StyledContent } from './Styled';

export const AppContainer = () => {
  const { getRootProps, isDragActive } = useFileInputController();

  return (
    <StyledContent {...(getRootProps() as any)}>
      <Edit />

      <DropNavigationModal isVisible={isDragActive} />
      <MessageModal />
    </StyledContent>
  );
};
