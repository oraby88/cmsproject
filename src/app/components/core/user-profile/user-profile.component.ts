import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterOutlet ,RouterModule, RouterLink, ReactiveFormsModule, FormsModule] ,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
