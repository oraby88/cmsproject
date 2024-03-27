import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { InterceptorLoaderRequestService } from '../services/request/interceptor-loader-request.service';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(InterceptorLoaderRequestService);
  loader.setIncomingRequests();


  return next(req).pipe(tap(() => {
    // loader.setIncomingRequests();
    // console.log(loader.getIncomingRequests());

  }));
};
