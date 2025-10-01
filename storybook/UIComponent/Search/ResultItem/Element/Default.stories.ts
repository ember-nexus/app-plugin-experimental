import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { Leaf } from 'lucide-static';

type CustomArgs = { name: string, description: string };

const meta: Meta<CustomArgs> = {
  title: 'UI Component/Search/Result Item/Element',
  component: 'ember-nexus-ui-search-result-item-element',
  render: ({name, description}) => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-search-result-item-element text="IS_MEMBER_OF:Lilieae">
        <ember-nexus-ui-icon slot="thumbnail" title="Plant">${unsafeHTML(Leaf)}</ember-nexus-ui-icon>
        <div class="w-full">
          <p class="w-full truncate">${name}</p>
          <p class="w-full truncate text-sm">${description}</p>
        </div>
      </ember-nexus-ui-search-result-item-element>
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
