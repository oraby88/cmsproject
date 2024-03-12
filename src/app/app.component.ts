import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/Authentication/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { style, transition, trigger, group, query, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
        ])
      ]),
    ])
  ],
})
export class AppComponent {

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  title = 'crmproject';
}
