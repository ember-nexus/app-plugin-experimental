import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'UI Component/Search/Result',
  component: 'ember-nexus-ui-search-result',
  render: () => html`
    <div class="flex flex-col gap-2 w-sm">
      <ember-nexus-ui-search-result>
      </ember-nexus-ui-search-result>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Result: Story = {};
