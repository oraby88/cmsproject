import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { CardComponent } from '../app/shared/card/card.component';

import { action } from '@storybook/addon-actions';


export const actionsData = {
  onCall: action('onCall'),
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CardComponent> = {
  title: 'Example/mario/Button',
  component: CardComponent,
  tags: ['autodocs'],
  render: (args: CardComponent) => ({
    props: {
      ...args,
      onCall: actionsData.onCall,
    },
    template: `<app-card ${argsToTemplate(args)}></app-card>`,

  }),
  argTypes: {
    title: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FirstCard: Story = {
  args: {
    description: 'true',
    total_number: '5000',
  },
};

export const Secondary: Story = {
  args: {
    ...FirstCard.args,
    total_number: '90000'
  },
};

export const Large: Story = {
  args: {
    icon_path: 'large',
  },
};
