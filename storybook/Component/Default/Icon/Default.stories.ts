import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Default/Icon',
  component: 'ember-nexus-default-icon',
  render: ({elementId}) => html`
    <ember-nexus-default-icon
      element-id="${elementId}"
    >
    </ember-nexus-default-icon>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
