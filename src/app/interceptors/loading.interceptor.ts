import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { InterceptorLoaderRequestService } from '../services/request/interceptor-loader-request.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  inject(InterceptorLoaderRequestService).setIncomingRequests();


  return next(req).pipe(finalize(() => {
    inject(InterceptorLoaderRequestService).setIncomingRequests();
  }));
};
