import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import { Cropper } from '.';

export default {
  title: 'Editor/VideoPlayer/Cropper',
  component: Cropper,
} as Meta;

const Template: Story<ComponentProps<typeof Cropper>> = () => (
  <div
    css={`
      position: relative;
      width: 854px;
      height: 480px;
      border: solid 1px #666;
    `}
  >
    <Cropper />
  </div>
);

export const Default = Template.bind({});
