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
import { ManageUsersComponent } from './components/core/management/manage-users/manage-users.component';
import { ManageRolesComponent } from './components/core/management/manage-roles/manageroles.component';
import { BlogComponent } from './components/core/blog/blog.component';
import { CmsMainComponent } from './components/core/cms-main/cms-main.component';

export const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'sendmail', component: SendmailComponent },
    { path: 'emailverification', component: EmailVerificationComponent },
    { path: 'setnewpassword', component: SetnewpasswordComponent },
    { path: 'correctchange', component: CorrectchagesComponent },
    {
        path: 'cms', children: [
            {
                path: 'management', canActivate: [], children: [
                    { path: '', redirectTo: 'users', pathMatch: 'full' },
                    {
                        path: 'users', component: ManageUsersComponent
                    },
                    {
                        path: 'roles', component: ManageRolesComponent
                    }
                ], component: UserManagementComponent
            },
            { path: 'blogs', canActivate: [], component: BlogComponent },
        ], component: CmsMainComponent
    },

    { path: 'signupverification', component: SignupverificationComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: '**', component: NotfoundComponent },
];

