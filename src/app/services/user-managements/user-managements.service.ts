import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/iuser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementsService {
  IsDescending:boolean = false;
  constructor( private _HttpClient:HttpClient) { 

  }
  
  addUser(formData:IUser): Observable<any>{
   return this._HttpClient.post(``,formData);

  }

  getAllUsers():Observable<any>{
    return this._HttpClient.get(`${environment.BASEURL}api/UserManagment/GetUserAllUsers?IsDescending=${this.IsDescending}`);
  }
}
