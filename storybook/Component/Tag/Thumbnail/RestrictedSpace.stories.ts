import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Tag/Thumbnail',
  component: 'ember-nexus-tag-thumbnail',
  render: ({elementId}) => html`
    <div style="width: 4rem;">
      <ember-nexus-default-thumbnail
        element-id="${elementId}"
      >
      </ember-nexus-default-thumbnail>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const RestrictedSpace: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
