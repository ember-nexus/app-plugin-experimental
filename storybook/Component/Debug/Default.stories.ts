import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Debug',
  component: 'ember-nexus-debug',
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-debug-card
        element-id="${elementId}"
      >
      </ember-nexus-debug-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
