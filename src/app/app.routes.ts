import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'user-manangement', component: UserManagementComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: '**', component: NotfoundComponent },
];
