import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Task/Card',
  component: 'ember-nexus-task-card',
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-task-card
        element-id="${elementId}"
      >
      </ember-nexus-task-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '976a753d-c47f-4305-a469-6c717eceb87f',
  }
};
