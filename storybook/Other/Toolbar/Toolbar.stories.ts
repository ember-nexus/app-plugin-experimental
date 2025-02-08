import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Other/Toolbar/Toolbar',
  component: 'ember-nexus-toolbar',
  render: () => html`
    <div class="d-flex flex-column gap-2 card-width">
      <ember-nexus-toolbar>
      </ember-nexus-toolbar>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
