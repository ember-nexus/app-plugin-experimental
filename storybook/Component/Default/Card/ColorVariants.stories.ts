import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

function getColorDataString(colorName: string, colorValue: string): string {
  return JSON.stringify({
    type: 'Data',
    data: {
      name: `Color ${colorName}`,
      description: `Description of color with name ${colorName} and value ${colorValue}.`,
      color: colorValue
    }
  });
}

const colors = [
  {name: 'white', value: '#ffffff'},
  {name: 'black', value: '#000000'},
  {name: 'yellow', value: '#FFD800'},
  {name: 'orange', value: '#FF8200'},
  {name: 'red', value: '#FF073A'},
  {name: 'purple', value: '#6F00FF'},
  {name: 'blue', value: '#007BFF'},
  {name: 'green', value: '#00A550'},
];

const meta: Meta = {
  title: 'Component/Default/Card',
  component: 'ember-nexus-default-card',
  render: () => html`
    <div class="d-flex flex-column gap-2 card-width">
      ${colors.map((color) =>
        html`<div class="">
          <ember-nexus-mock-element-data-provider
            element-id="00000000-0000-4000-8000-000000000000"
            element-data="${getColorDataString(color.name, color.value)}">
            <ember-nexus-default-card
              element-id="00000000-0000-4000-8000-000000000000"
            >
            </ember-nexus-default-card>
          </ember-nexus-mock-element-data-provider>
        </div>`
      )}
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const ColorVariants: Story = {};
