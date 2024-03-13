import { Routes } from '@angular/router';
import { SigninComponent } from './components/Authentication/signin/signin.component';
import { SignupComponent } from './components/Authentication/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SendmailComponent } from './components/Authentication/sendmail/sendmail.component';
import { EmailVerificationComponent } from './components/Authentication/email-verification/email-verification.component';
import { SetnewpasswordComponent } from './components/Authentication/setnewpassword/setnewpassword.component';
import { CorrectchagesComponent } from './components/Authentication/correctchages/correctchages.component';
import { SignupverificationComponent } from './components/Authentication/signupverification/signupverification.component';
import { UserManagementComponent } from './components/core/management/user-role-combine/user-management.component';
import { BlogComponent } from './components/core/blog/blog.component';
import { CmsMainComponent } from './components/core/cms-main/cms-main.component';
import { UserProfileComponent } from './components/core/user-profile/user-profile.component';
import { AddUserComponent } from './components/core/add-user/add-user.component';
import { TableComponent } from './shared/table/table.component';
import { CardModalComponent } from './shared/pop-up-card/card-modal/card-modal.component';
import { FilterComponent } from './shared/filter/filter/filter.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, data: { num: 1 } },
  { path: 'signup', component: SignupComponent, data: { num: 2 } },
  { path: 'sendmail', component: SendmailComponent, data: { num: 3 } },
  { path: 'emailverification', component: EmailVerificationComponent },
  { path: 'signupverification', component: SignupverificationComponent },
  { path: 'setnewpassword', component: SetnewpasswordComponent },
  { path: 'correctchange', component: CorrectchagesComponent },
  {
    path: 'cms',
    children: [
      {
        path: 'management',
        canActivate: [authGuard],
        loadChildren: () => import('./components/core/management/management.routes').then(routes => routes.MANAGEMENT_ROUTES),
      },
      { path: 'blogs', canActivate: [], loadComponent: () => import('./components/core/blog/blog.component').then(c => c.BlogComponent) },
    ],
    component: CmsMainComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'filter',
    component: FilterComponent,
  },
  { path: 'table', component: TableComponent },
  { path: 'cardmodal', component: CardModalComponent },
  { path: '**', component: NotfoundComponent },
];
