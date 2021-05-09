import { Story, Meta } from '@storybook/react';

import { VideoController } from '.';

export default {
  title: 'Editor/VideoPlayer/VideoController',
  component: VideoController,
} as Meta;

const Template: Story = () => <VideoController />;

export const Default = Template.bind({});
