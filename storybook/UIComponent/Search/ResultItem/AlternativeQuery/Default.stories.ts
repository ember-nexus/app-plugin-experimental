import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { text: string, variant: string };

const meta: Meta<CustomArgs> = {
  title: 'UI Component/Search/Result Item/Alternative Query',
  component: 'ember-nexus-ui-search-result-item-alternative-query',
  render: ({text, variant}) => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-alternative-query
        text="${text}"
        variant="${variant}"
      >
        <p class="truncate">${text}</p>
      </ember-nexus-ui-search-result-item-alternative-query>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    text: 'Lily',
    variant: 'history'
  }
};
