import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/Authentication/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { style, transition, trigger, group, query, animate } from '@angular/animations';
import { NavigationService } from './globalAnimation/navigation.service';
import { AuthService } from './services/auth.service';
import { LocalStorageKeys } from './keys/local-storage-keys';
import { AppUser } from './interfaces/app-user';

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
export class AppComponent implements OnInit {

  user!: AppUser;
  constructor(private navigationService: NavigationService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    //this._AuthService.saveUserSession(JSON.parse(localStorage.getItem(LocalStorageKeys.USER_SESSION) || ""));
    this._AuthService.setUser(JSON.parse(localStorage.getItem(LocalStorageKeys.USER_SESSION) || ""));
  }

  getState(outlet: any) {
    return this.navigationService.animationValue;
  }

  title = 'crmproject';
}
