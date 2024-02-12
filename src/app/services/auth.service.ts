import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../components/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signUp(registerData:any):Observable<any>{
    return this.http.post(environment.BASEURL+'/',registerData);
  }

  signIn(loginData:any):Observable<any>{
    return this.http.post(environment.BASEURL+'/',loginData);
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }
  setTokenInSessionStorage(token:string){
    sessionStorage.setItem('token' , token);
  }

}
