import type { Meta, StoryObj } from '@storybook/angular';

import { TableComponent } from './table.component';

const meta: Meta<TableComponent> = {
    title: 'Components/Header',
    component: TableComponent,
};

export default meta;
type Story = StoryObj<TableComponent>;

export const UserManagementTable: Story = {
    args: {
        headRow: [],
        bodyRow: [],
    },
};