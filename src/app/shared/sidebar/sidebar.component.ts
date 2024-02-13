import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  openDropdown!: Boolean;
  active!: Boolean;

  constructor(private route: ActivatedRoute) {
    this.openDropdown = true;
  }

  ngOnInit(): void { }

  Dropdowntoggle() {
    this.active = !this.active;
    console.log(this.active);

  }

  showSublinks(event: any) {
    this.openDropdown = true;
  }

  ngOnDestroy(): void {
    this.openDropdown = false;
    console.log(this.openDropdown);
  }

}
