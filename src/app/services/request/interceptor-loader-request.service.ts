import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorLoaderRequestService {

  private incomingRequests: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  constructor() { }

  setIncomingRequests() {
    this.incomingRequests.next(!this.incomingRequests.value);
  }

  getIncomingRequests(): Observable<Boolean> {
    return this.incomingRequests
  }
}
