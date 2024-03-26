import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from './services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).Token;
  //start loading
  if (token) {
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .append('Content-Type', 'text/plain')
        .append('Access-Control-Allow-Origin', '*'),
    });
  }
  return next(req);
};