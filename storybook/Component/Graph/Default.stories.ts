import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Component/Graph',
  component: 'ember-nexus-graph',
  render: () => html`
    <div class="flex flex-col gap-2 w-xl">
      <ember-nexus-graph-card>
      </ember-nexus-graph-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
