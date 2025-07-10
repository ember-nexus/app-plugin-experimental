import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Task/Card',
  component: 'ember-nexus-task-card',
  render: () => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-task-card
        element-id="976a753d-c47f-4305-a469-6c717eceb87f"
      >
      </ember-nexus-task-card>
      <ember-nexus-task-card
        element-id="d6390c95-c358-4015-a2f3-e0dd855bb730"
      >
      </ember-nexus-task-card>
      <ember-nexus-task-card
        element-id="36ab5c09-c637-44d1-8b0e-3284030d701c"
      >
      </ember-nexus-task-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const States: Story = {};
