
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor( private _HttpClient:HttpClient) { 

  }
  
  addUser(formData:any): Observable<any>{
   return this._HttpClient.post(``,formData);

  }
}
