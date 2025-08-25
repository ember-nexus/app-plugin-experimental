import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';


const meta: Meta = {
  title: 'Page',
  component: 'ember-nexus-page-logout',
  render: () => html`
    <div class="flex flex-col gap-2 w-md">
      <ember-nexus-page-logout>
      </ember-nexus-page-logout>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Logout: Story = {};
