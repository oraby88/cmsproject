import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../../interfaces/iuser';
import { environment } from '../../../environments/environment';
import { ManageUser } from '../../interfaces/manage-user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementsService {
  IsDescending: boolean = false;
  constructor(private _HttpClient: HttpClient) {

  }

  addUser(formData: IUser): Observable<any> {
    return this._HttpClient.post(``, formData);

  }

  getAllUsers(): Observable<ManageUser[]> {
    return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/GetUserAllUsers?IsDescending=${this.IsDescending}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIwYmEyNmZiLWJlYWEtNGNmYS1iNTViLWU2NGYzYzcxODdjZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFyYWZhQGdtYWlsLmNvbSIsIlJvbGVJZCI6IjEwZGVmMGZjLWRiZTctNDgwNy1iMDFjLTlkNzVkZmRjNjdkZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyIEFkbWluIiwiQmxvZ0lkIjoiMyIsIlBlcm1pc3Npb25zIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiMTAwIiwiMTAxIiwiMTAyIiwiMTAzIiwiMTA0IiwiMTA1IiwiMjAwIiwiMjAxIiwiMjAyIiwiMjAzIiwiMjA0IiwiMjA1IiwiMjA2IiwiMzAwIiwiMzAxIiwiMzAyIiwiMzAzIiwiMzA0IiwiMzA1IiwiNDAwIiwiNDAxIiwiNDAyIiwiNDAzIiwiNDA0IiwiNDA1IiwiNTAwIiwiNTAxIiwiNTAyIiwiNTAzIiwiNTA0IiwiNTA1Il0sImV4cCI6MTcwOTgwNDUwNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEwOSIsImF1ZCI6IioifQ.hNkB2Aeoxu3bwcREwKGGW0l_yd-iKjZaVzHFGkcA6vI'
      })
    });
  }
}
