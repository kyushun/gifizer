import { MoviesAndTvRegular } from '@fluentui/react-icons';
import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import { MenuIcon } from '.';

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
  FluentIcon: MoviesAndTvRegular,
  text: 'Convert',
};
