import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Other/Toolbar/Toolbar2',
  component: 'ember-nexus-toolbar2',
  render: () => html`
    <div class="d-flex flex-column gap-2 mb-2 card-width">
      <ember-nexus-toolbar2
        orientation="horizontal"
        alignment="end"
      >
      </ember-nexus-toolbar2>
      <ember-nexus-toolbar2
        orientation="horizontal"
        alignment="start"
      >
      </ember-nexus-toolbar2>
    </div>
    <div class="d-flex flex-row gap-2 flex-height">
      <ember-nexus-toolbar2
        orientation="vertical"
        alignment="end"
      >
      </ember-nexus-toolbar2>
      <ember-nexus-toolbar2
        orientation="vertical"
        alignment="start"
      >
      </ember-nexus-toolbar2>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
