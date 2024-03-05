import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleDeleteModalService {

  constructor() { }

  private toggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  private filterToggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  private sortToggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  toggle() {
    this.toggler.next(!this.toggler.value);
  }

  getToggleValue(): Observable<Boolean> {
    return this.toggler;
  }

  toggleFilter() {
    this.filterToggler.next(!this.filterToggler.value);
  }

  getFilterValue(): Observable<Boolean> {
    return this.filterToggler;
  }
  toggleSort() {
    this.sortToggler.next(!this.sortToggler.value);
  }

  getSortValue(): Observable<Boolean> {
    return this.sortToggler;
  }
}
