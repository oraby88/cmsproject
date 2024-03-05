import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent {

  openSort!: Boolean;
  @Output() onSort = new EventEmitter<void>();

  constructor(private _ToggleSortService: ToggleDeleteModalService) { }

  ngOnInit(): void {
    this._ToggleSortService.getSortValue().subscribe({
      next: (toggler) => { this.openSort = toggler }
    })
  }


  toggleSortMenu() {
    this._ToggleSortService.toggleSort()
    this.openSort = !this.openSort
  }
}
