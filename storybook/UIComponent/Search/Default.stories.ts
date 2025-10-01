import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'UI Component/Search',
  component: 'ember-nexus-ui-search',
  render: () => html`
    <div class="flex flex-col gap-2 w-xl">
      <ember-nexus-ui-search>
      </ember-nexus-ui-search>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
