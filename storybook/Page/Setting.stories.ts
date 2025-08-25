import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';


const meta: Meta = {
  title: 'Page',
  component: 'ember-nexus-page-setting',
  render: () => html`
    <div class="flex flex-col gap-2 w-md">
      <ember-nexus-page-setting>
      </ember-nexus-page-setting>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Setting: Story = {};
