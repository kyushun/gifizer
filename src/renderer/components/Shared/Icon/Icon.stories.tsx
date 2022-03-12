import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import { Icon } from '.';
import convertIconSvg from './convert-icon.svg';

export default {
  title: 'Shared/Icon',
  component: Icon,
} as Meta;

const Template: Story<ComponentProps<typeof Icon>> = (args) => (
  <Icon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: 22,
  icon: convertIconSvg,
};
