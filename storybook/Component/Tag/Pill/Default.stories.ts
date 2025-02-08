import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Tag/Pill',
  component: 'ember-nexus-tag-pill',
  render: ({elementId}) => html`
    <ember-nexus-default-pill
      element-id="${elementId}"
    >
    </ember-nexus-default-pill>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
