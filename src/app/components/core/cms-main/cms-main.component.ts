import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-cms-main',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './cms-main.component.html',
  styleUrl: './cms-main.component.css'
})
export class CmsMainComponent {

}
