import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { userManagementCard } from '../../../../../stories/card.stories';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {



}
