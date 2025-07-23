import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {ServiceResolver} from "@ember-nexus/app-core/Service";
import {ElementCache} from "@ember-nexus/app-core/Cache";


const colors = [
  {name: 'default', id: '00000000-0000-4000-8000-000000000000'},
  {name: 'white', value: '#ffffff', id: '00000000-0000-4000-8000-000000000001'},
  {name: 'black', value: '#000000', id: '00000000-0000-4000-8000-000000000002'},
  {name: 'yellow', value: '#FFD800', id: '00000000-0000-4000-8000-000000000003'},
  {name: 'orange', value: '#FF8200', id: '00000000-0000-4000-8000-000000000004'},
  {name: 'red', value: '#FF073A', id: '00000000-0000-4000-8000-000000000005'},
  {name: 'purple', value: '#6F00FF', id: '00000000-0000-4000-8000-000000000006'},
  {name: 'blue', value: '#007BFF', id: '00000000-0000-4000-8000-000000000007'},
  {name: 'green', value: '#00A550', id: '00000000-0000-4000-8000-000000000008'},
];

const serviceResolver = (window as any).serviceResolver as ServiceResolver;
const elementCache = serviceResolver.getServiceOrFail<ElementCache>(ElementCache.identifier);
colors.map((color) => elementCache.set(color.id, {
  data: {
    id: color.id,
    type: 'Color',
    data: {
      name: `Color ${color.name}`,
      description: `Description of color with name ${color.name} and value ${color?.value ?? '"none"'}.`,
      ...(color?.value && {color: color.value})
    }
  },
  etag: undefined
}));


const meta: Meta = {
  title: 'Component/Default/Card',
  component: 'ember-nexus-default-card',
  render: () => html`
    <div class="flex flex-col gap-2">
      ${colors.map((color) =>
        html`<ember-nexus-default-card element-id="${color.id}"></ember-nexus-default-card>`
      )}
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const ColorVariants: Story = {};
