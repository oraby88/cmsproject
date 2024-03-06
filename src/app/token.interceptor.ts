import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.Token;

    const authReq = request.clone({

      headers: request.headers
        .set('Authorization', token)
        .append('Content-Type', 'text/plain')
        .append('Access-Control-Allow-Origin', '*'),
    });
    return next.handle(authReq);

  }
}