import { Story, Meta } from '@storybook/react';

import { ComponentProps } from '@renderer/util/component-props';

import { OptionSetter } from '.';

export default {
  title: 'Editor/OptionSetter',
  component: OptionSetter,
} as Meta;

const Template: Story<ComponentProps<typeof OptionSetter>> = () => (
  <OptionSetter />
);

export const Default = Template.bind({});
