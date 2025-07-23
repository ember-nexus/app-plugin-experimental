import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Task',
  component: 'ember-nexus-task',
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-task-card
        element-id="${elementId}"
      >
      </ember-nexus-task-card>
      <ember-nexus-task-thumbnail
        element-id="${elementId}"
      >
      </ember-nexus-task-thumbnail>
      <ember-nexus-task-pill
        element-id="${elementId}"
      >
      </ember-nexus-task-pill>
      <ember-nexus-task-icon
        element-id="${elementId}"
      >
      </ember-nexus-task-icon>
      <ember-nexus-task-inline-text
        element-id="${elementId}"
      >
      </ember-nexus-task-inline-text>
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
