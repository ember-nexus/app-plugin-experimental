import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

function getTextDataString(name: string, description: string, color: null | string): string {
  let data = {
    type: 'Data',
    data: {
      name: name,
      description: description
    }
  };
  if (color) {
    data.data['color'] = color;
  }
  return JSON.stringify(data);
}

const texts = [
  {name: 'EN | Hello world', description: 'Hello world', color: '#0A3161'},
  {name: 'KO | 안녕하세요 세상', description: '안녕하세요 세상', color: '#FFFFFF'},
  {name: 'AR | مرحبا بالعالم', description: 'مرحبا بالعالم', color: '#165d31'},
  {name: 'EN | Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', color: '#0A3161'}
];

const meta: Meta = {
  title: 'Component/Default/Card',
  component: 'ember-nexus-default-card',
  render: () => html`
    <div class="d-flex flex-column gap-2 card-width">
      ${texts.map((text) =>
        html`<div class="">
          <ember-nexus-mock-element-data-provider
            element-id="00000000-0000-4000-8000-000000000000"
            element-data="${getTextDataString(text.name, text.description, text.color)}">
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

export const TextVariants: Story = {};
