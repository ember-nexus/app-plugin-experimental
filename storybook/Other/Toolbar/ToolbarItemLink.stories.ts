import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Other/Toolbar/Toolbar Item Link',
  component: 'ember-nexus-toolbar-item-link',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: () => html`
    <div class="d-flex flex-column gap-2 mb-2 card-width">
      <ember-nexus-toolbar-item-link
        label="Some Link"
        link="/test"
      >
      </ember-nexus-toolbar-item-link>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
