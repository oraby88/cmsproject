import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { promises } from 'dns';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree => {
  var tokenService=inject(AuthService);
  let token = localStorage.getItem('token')
  if(token){
    return new Observable<true>;
  }else{
    return inject(Router).createUrlTree(['signin']);
  }
  
    
};
