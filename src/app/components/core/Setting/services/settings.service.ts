import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { SubscriptionPlan } from '../interfaces/subscriptionPlan';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseURL!: string;

  constructor(private _HttpClient: HttpClient) {
    this.baseURL = environment.BASEURL;
  }

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this._HttpClient.get<SubscriptionPlan[]>(`${this.baseURL}api/Subscription/GetAllSubscription`)
  }

}
