import { Story, Meta } from '@storybook/react';

import { ComponentProps } from '@renderer/util/component-props';

import { HeaderComponent } from '.';

export default {
  title: 'Header/Header',
  component: HeaderComponent,
  argTypes: {
    onClickOpenFile: { action: 'onClickOpenFile' },
    convert: { action: 'convert' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof HeaderComponent>> = (args) => (
  <HeaderComponent {...args} />
);

export const Mac = Template.bind({});
Mac.args = {
  isMac: true,
  inputFilePath: '',
};

export const MacFileInput = Template.bind({});
MacFileInput.args = {
  isMac: true,
  inputFilePath: '/tmp/movie.mp4',
};

export const Windows = Template.bind({});
Windows.args = {
  isMac: false,
  inputFilePath: '',
};

export const WindowsFileInput = Template.bind({});
WindowsFileInput.args = {
  isMac: false,
  inputFilePath: '/tmp/movie.mp4',
};
