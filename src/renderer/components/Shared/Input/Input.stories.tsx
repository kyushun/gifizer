import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';
import { theme } from '@components/Styles/theme';
import { ComponentProps } from '@renderer/util/index';

export default {
  title: 'Shared/Input',
  component: Input,
} as Meta;

const Template: Story<ComponentProps<typeof Input>> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <div
      css={`
        padding: 20px;
        background-color: ${theme.palette.mainAccent};
      `}
    >
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const NoValue = Template.bind({});
NoValue.args = {
  value: '',
  width: 200,
  backgroundColor: theme.palette.mainSilent,
};

export const NoValueWithPlaceholder = Template.bind({});
NoValueWithPlaceholder.args = {
  value: '',
  width: 200,
  backgroundColor: theme.palette.mainSilent,
  placeholder: 'Placeholder',
};

export const ValueExists = Template.bind({});
ValueExists.args = {
  value: '/User/username/Movie.gif',
  width: 200,
  backgroundColor: theme.palette.mainSilent,
};
