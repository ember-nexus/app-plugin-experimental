import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';


const meta: Meta = {
  title: 'Page',
  component: 'ember-nexus-page-login',
  render: () => html`
    <div class="flex flex-col gap-2 w-md">
      <ember-nexus-page-login>
      </ember-nexus-page-login>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Login: Story = {};
