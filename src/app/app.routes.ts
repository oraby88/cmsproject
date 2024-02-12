import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { SetnewpasswordComponent } from './components/setnewpassword/setnewpassword.component';
import { CorrectchagesComponent } from './components/correctchages/correctchages.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    {path:'signin',component:SigninComponent},
    {path:'signup',component:SignupComponent},
    {path:'sendmail',component:SendmailComponent},
    {path:'emailverification',component:EmailVerificationComponent},
    {path:'setnewpassword',component:SetnewpasswordComponent},
    {path:'correctchange',component:CorrectchagesComponent},
    {path:'user-manangement', component:UserManagementComponent},
    {path:'', redirectTo:'/signup',pathMatch:'full'},
    {path:'**',component:NotfoundComponent},
];

