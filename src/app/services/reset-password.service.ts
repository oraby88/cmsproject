import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../components/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  authenticationURL!: string;
  baseURL!: string;

  constructor(private _HttpClient: HttpClient) {
    this.baseURL = environment.BASEURL;
    this.authenticationURL = '/api/Authentication'
  }

  resetPassword(password: string, confirm_password: string): Observable<any> {
    return this._HttpClient.post<any>(`${this.baseURL}${this.authenticationURL}/ConfirmForgetPassword`, {
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token'),
      newPassword: password,
      confirmNewPassword: confirm_password
    })
  }
}
