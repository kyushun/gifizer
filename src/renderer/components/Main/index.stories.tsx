/* eslint-disable prefer-const,  @typescript-eslint/no-unused-vars */
import { Story, Meta } from '@storybook/react';

import {
  useSetFileStateWrapper,
  sampleVideoArgs,
  UseSetFileStateWrapperProps,
} from '@components/Shared/storybook';

import { Main } from '.';

export default {
  title: 'Main/Main',
  component: Main,
} as Meta;

declare let window: {
  api: any;
};

window.api = {
  onConvertStatus: () => {},
};

const Template: Story<UseSetFileStateWrapperProps> = (props) => {
  useSetFileStateWrapper(props);

  return (
    <div
      css={`
        display: flex;
        width: 900px;
        height: 500px;
        border: solid 1px #666;
      `}
    >
      <Main />
    </div>
  );
};

export const NoInput = Template.bind({});
NoInput.args = {
  filePath: '',
  inspectData: undefined,
};

export const videoInput = Template.bind({});
videoInput.args = sampleVideoArgs;
