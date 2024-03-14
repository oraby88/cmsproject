import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';


import { PaginatorComponent } from '../paginator/paginator.component';
import { ManageUser } from '../../app/interfaces/manage-user';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input('headRow') headRow!: string[];
  @Input('bodyRow') bodyRow!: ManageUser[];

  rows: number = 2;

  constructor() { }

  ngOnInit(): void { }

  getCount(e: number) {
    this.rows = e;
    console.log(this.rows, "rows number");
  }

  // activated selected class
  onChecked(e: Event) {
    (((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).classList.toggle('selected');
  }
}
