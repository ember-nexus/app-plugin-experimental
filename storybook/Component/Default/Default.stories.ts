import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Default',
  component: 'ember-nexus-default',
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-default-card
        element-id="${elementId}"
      >
      </ember-nexus-default-card>
      <ember-nexus-default-thumbnail
        element-id="${elementId}"
      >
      </ember-nexus-default-thumbnail>
      <ember-nexus-default-pill
        element-id="${elementId}"
      >
      </ember-nexus-default-pill>
      <ember-nexus-default-icon
        element-id="${elementId}"
      >
      </ember-nexus-default-icon>
      <ember-nexus-default-inline-text
        element-id="${elementId}"
      >
      </ember-nexus-default-inline-text>
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
