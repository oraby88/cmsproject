import { Routes } from '@angular/router';
import { SigninComponent } from './components/Authentication/signin/signin.component';
import { SignupComponent } from './components/Authentication/signup/signup.component';
import { SendmailComponent } from './components/Authentication/sendmail/sendmail.component';
import { EmailVerificationComponent } from './components/Authentication/email-verification/email-verification.component';
import { SetnewpasswordComponent } from './components/Authentication/setnewpassword/setnewpassword.component';
import { CorrectchagesComponent } from './components/Authentication/correctchages/correctchages.component';
import { SignupverificationComponent } from './components/Authentication/signupverification/signupverification.component';
import { CmsMainComponent } from './components/core/cms-main/cms-main.component';
import { authGuard } from './guards/auth.guard';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { SettingComponent } from './components/core/Setting/setting.component';



export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signin', canActivate: [isLoggedInGuard], component: SigninComponent, data: { num: 1 } },
  { path: 'signup', canActivate: [isLoggedInGuard], component: SignupComponent, data: { num: 2 } },
  { path: 'sendmail', canActivate: [isLoggedInGuard], component: SendmailComponent, data: { num: 3 } },
  { path: 'emailverification', canActivate: [isLoggedInGuard], component: EmailVerificationComponent },
  { path: 'signupverification', canActivate: [isLoggedInGuard], component: SignupverificationComponent },
  { path: 'setnewpassword', canActivate: [isLoggedInGuard], component: SetnewpasswordComponent },
  { path: 'correctchange', canActivate: [isLoggedInGuard], component: CorrectchagesComponent },
  { path: 'cms', redirectTo: '/cms/management', pathMatch: 'full' },
  {
    path: 'cms',
    // canActivate: [authGuard],
    children: [
      {
        path: 'management',
        loadChildren: () => import('./components/core/management/management.routes').then(routes => routes.MANAGEMENT_ROUTES),
      },
      { path: 'blogs', loadComponent: () => import('./components/core/blog/blog.component').then(c => c.BlogComponent) },
      {
        path: 'setting',
        component: SettingComponent,
        loadChildren: () => import('./components/core/Setting/setting.routes').then(routes => routes.SETTING_ROUTES)
      },
    ],
    component: CmsMainComponent,
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) },
];
