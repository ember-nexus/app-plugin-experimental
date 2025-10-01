import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'UI Component/Search/Result Item/Alternative Query',
  component: 'ember-nexus-ui-search-result-item-alternative-query',
  render: ({text, variant}) => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-alternative-query variant="history">
        <p class="truncate">Lily (from history)</p>
      </ember-nexus-ui-search-result-item-alternative-query>
      <ember-nexus-ui-search-result-item-alternative-query>
        <p class="truncate">Lily (no result from history)</p>
      </ember-nexus-ui-search-result-item-alternative-query>
      <ember-nexus-ui-search-result-item-alternative-query>
        <p class="truncate">Long text: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
      </ember-nexus-ui-search-result-item-alternative-query>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Variants: Story = {};
