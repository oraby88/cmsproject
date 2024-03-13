import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISignupRequest } from '../interfaces/signupinterface';
import { ILogin } from '../interfaces/logininterface';
import { ISignUpResponse } from '../interfaces/isign-up-response';
import { AppUser } from '../interfaces/app-user';
import { LocalStorageKeys } from '../keys/local-storage-keys';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private _Route: Router) { }

  signUp(registerData: ISignupRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(
      environment.BASEURL + 'api/Authentication/Register',
      registerData
    );
  }

  verificationCode(otp: string): Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: otp.toString(),
      token: sessionStorage.getItem('token')?.toString(),
    };
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmEmail`,
      obj
    );
  }

  resendOTP() {
    var obj = {
      email: '17f68cb1f9@emailabox.pro',
    };
    return this.http.post(
      environment.BASEURL + `api/Authentication/ResendOTP?email=${obj.email}`,
      {}
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setTokenInSessionStorage(token: string) {
    sessionStorage.setItem('token', token);
  }

  get isLoggedIn(): boolean {
    const userData = localStorage.getItem(LocalStorageKeys.USER_SESSION);
    if (userData) {
      const jsonUserData: AppUser = JSON.parse(userData);
      const token = jsonUserData.token;
      const tokenExpireDate =
        jsonUserData.expireDate;
      return !!token && new Date(tokenExpireDate) >= new Date();
    }
    return false;
  }

  saveUserSession(applicationUser: AppUser) {
    localStorage.setItem(
      'userSession',
      JSON.stringify(applicationUser)
    );
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.USER_SESSION);
    this._Route.navigate(['signin']);
  }

  get Name() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(localStorage['userSession']);
      if (userData) return JSON.parse(userData)[localStorage['fullName']];
      return null;
    }
  }

  get Token() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(localStorage['userSession']);
      if (userData) return JSON.parse(userData)[localStorage['token']];
      return null;
    }
  }


  sendMail(email: string): Observable<any> {
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }


  resetVerificationCode(res: string): Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: res.toString(),
      //token: sessionStorage.getItem('token')?.toString(),
    };
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmForgetPasswordOTP`,
      obj
    );
  }


  Login(request: ILogin): Observable<AppUser> {
    return this.http.post<AppUser>(
      environment.BASEURL + 'api/Authentication/Login',
      request
    );
  }

  forgetPassword(email: string) {
    return this.http.post<any>(
      `${environment.BASEURL}api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }
}
