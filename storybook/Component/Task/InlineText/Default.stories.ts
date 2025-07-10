import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Task/InlineText',
  component: 'ember-nexus-task-inline-text',
  render: ({elementId}) => html`
    <ember-nexus-task-inline-text
      element-id="${elementId}"
    >
    </ember-nexus-task-inline-text>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '976a753d-c47f-4305-a469-6c717eceb87f',
  }
};
