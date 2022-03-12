import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import { MenuIcon } from '.';
import convertIconSvg from '../convert-icon.svg';

export default {
  title: 'Header/MenuIcon',
  component: MenuIcon,
} as Meta;

const Template: Story<ComponentProps<typeof MenuIcon>> = (args) => (
  <MenuIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 60,
  icon: convertIconSvg,
  text: 'Convert',
};
