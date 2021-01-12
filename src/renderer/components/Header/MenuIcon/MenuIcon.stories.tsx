import { Meta } from '@storybook/react';
import convertIconSvg from '../convert-icon.svg';
import { MenuIcon } from './MenuIcon';

export default {
  title: 'Header/MenuIcon',
  component: MenuIcon,
} as Meta;

export const Default = () => (
  <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
);
