import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Task/Pill',
  component: 'ember-nexus-task-pill',
  render: ({elementId}) => html`
    <ember-nexus-task-pill
      element-id="${elementId}"
    >
    </ember-nexus-task-pill>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '976a753d-c47f-4305-a469-6c717eceb87f',
  }
};
