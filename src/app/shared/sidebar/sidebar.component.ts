import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { log } from 'node:console';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  openDropdown!: Boolean;

  constructor() {
    this.openDropdown = false;
  }

  ngOnInit(): void { }

  showSublinks(event: any) {
    this.openDropdown = !this.openDropdown;
  }

}
