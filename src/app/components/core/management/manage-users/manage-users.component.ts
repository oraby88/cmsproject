import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardComponent } from '../../../../shared/card/card.component';
import { TableComponent } from '../../../../shared/table/table.component';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { FilterComponent } from '../../../../shared/filter/filter/filter.component';
import { NewUserComponent } from '../../../../shared/add-new-user/button.component';
import { AddUserComponent } from '../../add-user/add-user.component';
import { ToggleDeleteModalService } from '../../../../services/toggleModal/toggle-delete-modal.service';
import { SortComponent } from '../../../../shared/sort/sort/sort.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CardComponent, TableComponent, FilterComponent, NewUserComponent, AddUserComponent, SortComponent, CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  row1 = [12345];
  row2 = 2;
  headdata = this.row1;
  bodydata = [12345];

  addUserToggler!: Boolean;
  filterValue!: Boolean;
  constructor(private _BreadCurmb: BreadcrumbService, private _ToggleModal: ToggleDeleteModalService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
    this._ToggleModal.getToggleValue().subscribe({
      next: (toggleValue) => {
        this.addUserToggler = toggleValue;
      }
    })

    this._ToggleModal.getFilterValue().subscribe({
      next: (toggleValue) => {
        this.filterValue = toggleValue;
      }
    })
  }

  toggleUserModal() {
    this._ToggleModal.toggle();
  }

  openFilterModal() {
    this._ToggleModal.toggleFilter();
  }



}
