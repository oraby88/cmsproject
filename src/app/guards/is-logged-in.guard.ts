import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../interfaces/app-user';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const token = inject(AuthService).Token;
  if (token) {
    inject(Router).navigate(['/cms']);
    return false;
  }
  else
    return true;
};
