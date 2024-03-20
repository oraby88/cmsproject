import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ToggleService } from '../../../services/toggleBtn/toggle.service';

@Component({
  selector: 'app-cms-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './cms-main.component.html',
  styleUrl: './cms-main.component.css'
})
export class CmsMainComponent {

  toggler_val!: Boolean;

  constructor(private _Toggle: ToggleService) { }

  ngOnInit() {
    this._Toggle.getToggleValue().subscribe({
      next: (res) => {
        this.toggler_val = res;
      }
    });
  }

}
