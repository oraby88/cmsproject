import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  openDropdown!: Boolean;

  constructor() {
    this.openDropdown = false;
  }

  ngOnInit(): void { }

  showSublinks(event: any) {
    this.openDropdown = !this.openDropdown;
  }

}
