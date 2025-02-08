import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Tag/Card',
  component: 'ember-nexus-tag-card',
  render: ({elementId}) => html`
    <div class="d-flex flex-column gap-2 card-width">
      <ember-nexus-default-card
        element-id="${elementId}"
      >
      </ember-nexus-default-card>
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
