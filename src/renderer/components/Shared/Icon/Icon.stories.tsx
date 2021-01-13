import { Story, Meta } from '@storybook/react';
import { Icon } from './Icon';
import convertIconSvg from './convert-icon.svg';

export default {
  title: 'Shared/Icon',
  component: Icon,
} as Meta;

export const Default: Story = () => <Icon size={22} icon={convertIconSvg} />;
Default.storyName = 'Icon';
