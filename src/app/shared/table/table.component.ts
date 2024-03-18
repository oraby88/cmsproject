import { Component, Input } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ManageUser } from '../../interfaces/manage-user';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input('headRow') headRow!: string[];
  @Input('bodyRow') bodyRow!: ManageUser[];

  rows: number = 2;
  constructor() {
    this.bodyRow = [];
    this.headRow = [];
  }

  getCount(e: number) {
    this.rows = e;
    console.log(this.rows, "rows number");
  }

  // activated selected class
  onChecked(e: Event) {
    (((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).classList.toggle('selected');
  }
}
