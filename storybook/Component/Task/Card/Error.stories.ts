import type { Meta, StoryObj } from '@storybook/web-components-vite';
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

export const Error: Story = {
  args: {
    elementId: '40400000-0000-4000-8000-000000000404',
  }
};
