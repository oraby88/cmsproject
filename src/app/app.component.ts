import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/Authentication/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './shared/paginator/paginator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, ReactiveFormsModule,PaginatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crmproject';
}
