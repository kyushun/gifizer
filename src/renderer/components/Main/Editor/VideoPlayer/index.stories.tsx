import { Story, Meta } from '@storybook/react';

import {
  sampleVideoArgs,
  useSetFileStateWrapper,
  UseSetFileStateWrapperProps,
} from '@renderer/components/Shared/storybook';

import { VideoPlayer } from '.';

export default {
  title: 'Editor/VideoPlayer',
  component: VideoPlayer,
} as Meta;

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
      <VideoPlayer />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = sampleVideoArgs;
