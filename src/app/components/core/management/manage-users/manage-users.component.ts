import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { userManagementCard } from '../../../../../stories/card.stories';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }

}
