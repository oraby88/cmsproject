import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToggleService } from '../../services/toggleBtn/toggle.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  openDropdown!: Boolean;
  dropDownToggler!: Boolean;
  darkMode!: Boolean;
  sidebarToggler!: Boolean;

  constructor(private _Toggle: ToggleService) {
    this.openDropdown = true;
    this.darkMode = false;
    this.sidebarToggler = false;
  }

  ngOnInit(): void {
    this._Toggle.getToggleValue().subscribe({
      next: (value) => { this.sidebarToggler = value; }
    })
  }

  togglesidebar() {
    this._Toggle.toggle();
    this.sidebarToggler = !this.sidebarToggler;
  }


  Dropdowntoggle() {
    this.dropDownToggler = !this.dropDownToggler;
  }

  toggleAppearance() {
    this.darkMode = !this.darkMode;
  }

}
