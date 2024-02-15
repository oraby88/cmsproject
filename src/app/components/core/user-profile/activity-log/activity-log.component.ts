import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent {
  searchText: any;
}
