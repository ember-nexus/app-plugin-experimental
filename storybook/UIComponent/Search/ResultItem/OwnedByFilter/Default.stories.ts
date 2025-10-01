import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { Tag } from 'lucide-static';

type CustomArgs = { name: string, description: string };

const meta: Meta<CustomArgs> = {
  title: 'UI Component/Search/Result Item/Owned By Filter',
  component: 'ember-nexus-ui-search-result-item-owned-by-filter',
  render: ({name, description}) => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-owned-by-filter text="IS_MEMBER_OF:Lilieae">
        <ember-nexus-icon slot="thumbnail" title="Tag">${unsafeHTML(Tag)}</ember-nexus-icon>
        <div class="w-full">
          <p class="w-full truncate">${name}</p>
          <p class="w-full truncate text-sm">${description}</p>
        </div>
      </ember-nexus-ui-search-result-item-owned-by-filter>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'Lily',
    description: 'flowering plants in the lily family'
  }
};
