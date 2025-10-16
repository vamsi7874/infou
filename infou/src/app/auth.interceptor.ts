// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HomecommonService } from './components/home/homecommon.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly PUBLIC_ROUTES = ['/api/auth/login', '/api/auth/signup'];

  constructor(private auth: HomecommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const isPublic = this.PUBLIC_ROUTES.some((route) =>
      req.url.includes(route)
    );

    if (!isPublic) {
      const token = this.auth.getToken();
      if (token) {
        authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.auth.logout();
          }
        }
        return throwError(() => error);
      })
    );
  }
}
