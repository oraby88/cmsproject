import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class NewUserComponent implements OnInit {

  @Input('btnName') btnName!: string;
  @Input('btnIcon') btnIcon!: string;
  @Output() onAddUser = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  addNewUser() {
    this.onAddUser.emit();
  }
}
