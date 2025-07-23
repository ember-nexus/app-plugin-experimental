import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Default/InlineText',
  component: 'ember-nexus-default-inline-text',
  render: ({elementId}) => html`
    <div class="d-flex flex-column gap-2">
      <div class="bigger">
        <ember-nexus-default-inline-text
          element-id="${elementId}"
        >
        </ember-nexus-default-inline-text>
      </div>
      <div class="normal">
        <ember-nexus-default-inline-text
          element-id="${elementId}"
        >
        </ember-nexus-default-inline-text>
      </div>
      <div class="smaller">
        <ember-nexus-default-inline-text
          element-id="${elementId}"
        >
        </ember-nexus-default-inline-text>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const SizeVariants: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
