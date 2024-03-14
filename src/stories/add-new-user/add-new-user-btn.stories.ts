import type { Meta, StoryObj } from '@storybook/angular';
import { NewUserComponent } from './button.component';



//👇 This default export determines where your story goes in the story list
const meta: Meta<NewUserComponent> = {
    title: 'Components/NewUserButton',
    component: NewUserComponent,
};

export default meta;
type Story = StoryObj<NewUserComponent>;

export const userManagementCard: Story = {
    args: {
        btnIcon: 'add-circle.svg',
        btnName: 'Add User'
    },
};