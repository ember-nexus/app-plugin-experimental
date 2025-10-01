import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { Tag, History } from 'lucide-static';

const meta: Meta = {
  title: 'UI Component/Search/Result Item/Owned By Filter',
  component: 'ember-nexus-ui-search-result-item-owned-by-filter',
  render: () => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-owned-by-filter>
        <ember-nexus-ui-icon slot="thumbnail" title="Tag">${unsafeHTML(History)}</ember-nexus-ui-icon>
        <div class="w-full">
          <p class="w-full truncate">Lily</p>
          <p class="w-full truncate text-sm">flowering plants in the <strong>lily</strong> family</p>
        </div>
      </ember-nexus-ui-search-result-item-owned-by-filter>
      <ember-nexus-ui-search-result-item-owned-by-filter>
        <ember-nexus-ui-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-ui-icon>
        <div class="w-full">
          <p class="w-full truncate">Lily</p>
          <p class="w-full truncate text-sm">Long text: Lorem <strong>lily</strong> ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
        </div>
      </ember-nexus-ui-search-result-item-owned-by-filter>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Variants: Story = {};
