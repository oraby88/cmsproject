import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  signUp(registerData: any): Observable<any> {
    return this.http.post(environment.BASEURL + 'api/Authentication/Register', registerData);
  }

  signIn(loginData: any): Observable<any> {
    return this.http.post(environment.BASEURL + '/', loginData);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setTokenInSessionStorage(token: string) {
    sessionStorage.setItem('token', token);
  }


  get isLoggedIn(): boolean {
    // return true;
    const userData = localStorage.getItem(localStorage['token'].userSession);
    if (userData) {
      const jsonUserData = JSON.parse(userData);
      const token = jsonUserData[localStorage['token']];
      const tokenExpireDate = jsonUserData[localStorage['token'].tokenExpireDate];
      return token && new Date(tokenExpireDate) >= new Date();
    }
    return false;
  }

  saveUserSession(applicationUser: any) {
    localStorage.setItem(
      localStorage['userSession'],
      JSON.stringify(applicationUser)
    );
  }

  logout() {
    localStorage.removeItem(localStorage['userSession']);
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

  Login(request: any): Observable<any> {
    return this.http.post<any>(
      environment.BASEURL + "api/Authentication/Login",
      request
    );
  }

  verificationCode(res:string){
    var obj={
      email: sessionStorage.getItem('email')?.toString(),
      otp: res.toString(),
      token: sessionStorage.getItem('token')?.toString()
    }
    console.log(obj);
    return this.http.post(
      environment.BASEURL + "api/Authentication/ConfirmEmail", obj)
  }

  sendMail(email:string):Observable<any>{
    return this.http.post<any>(environment.BASEURL + "api/Authentication/ForgetPassword", email)
  }
}
