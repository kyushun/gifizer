import { Meta } from '@storybook/react';

import { MenuIcon } from '.';
import convertIconSvg from '../convert-icon.svg';

export default {
  title: 'Header/MenuIcon',
  component: MenuIcon,
} as Meta;

export const Default = () => (
  <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
);
