import { Routes } from '@angular/router';
import { SigninComponent } from './components/Authentication/signin/signin.component';
import { SignupComponent } from './components/Authentication/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SendmailComponent } from './components/Authentication/sendmail/sendmail.component';
import { EmailVerificationComponent } from './components/Authentication/email-verification/email-verification.component';
import { SetnewpasswordComponent } from './components/Authentication/setnewpassword/setnewpassword.component';
import { CorrectchagesComponent } from './components/Authentication/correctchages/correctchages.component';
import { UserManagementComponent } from './components/user-managment/user-management/user-management.component';
import { SignupverificationComponent } from './components/Authentication/signupverification/signupverification.component';
import { ManageUsersComponent } from './components/user-managment/manage-users/manage-users.component';
import { ManagerolesComponent } from './components/user-managment/manageroles/manageroles.component';

export const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'sendmail', component: SendmailComponent },
    { path: 'emailverification', component: EmailVerificationComponent },
    { path: 'setnewpassword', component: SetnewpasswordComponent },
    { path: 'correctchange', component: CorrectchagesComponent },
    {
        path: 'user-management', children: [
            {
                path: 'manageusers', component: ManageUsersComponent
            },
            {
                path: 'manageroles', component: ManagerolesComponent
            }
        ], component: UserManagementComponent
    },
    { path: 'signupverification', component: SignupverificationComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: '**', component: NotfoundComponent },
];

