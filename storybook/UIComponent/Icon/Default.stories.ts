import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import { Tag, Leaf } from 'lucide-static';

const meta: Meta = {
  title: 'UI Component/Icon',
  render: () => html`
    <div class="card bg-base-100 w-sm shadow-sm p-3 gap-2">
      <ember-nexus-ui-icon title="Tag">${unsafeHTML(Tag)}</ember-nexus-ui-icon>
      <ember-nexus-ui-icon-image
        title="Tag"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg/330px-Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg"
      ></ember-nexus-ui-icon-image>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
