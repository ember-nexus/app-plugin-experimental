import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { Tag } from 'lucide-static';

const meta: Meta = {
  title: 'UI Component/Search/Result Item',
  render: () => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-alternative-query>
        <p class="truncate">Lily</p>
      </ember-nexus-ui-search-result-item-alternative-query>
      <ember-nexus-ui-search-result-item-owned-by-filter>
        <ember-nexus-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-icon>
        <div class="w-full">
          <p class="w-full truncate">Lily</p>
          <p class="w-full truncate text-sm">flowering plants in the <strong>lily</strong> family</p>
        </div>
      </ember-nexus-ui-search-result-item-owned-by-filter>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
