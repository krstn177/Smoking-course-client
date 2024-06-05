import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(errorObj => {
        this.loaderService.showLoader();

        if (errorObj.status === 403 && errorObj.error.message === 'jwt expired') {
          // Token expired, try to refresh the token
          return this.authService.refreshAccessToken().pipe(
            switchMap((response: any) => {
              this.authService.setAuthInfoInLocalStorage(response.accessToken, undefined, undefined);
              this.authService.setAccessToken(response.accessToken);
              // Retry the failed request with the new access token
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              });
              this.loaderService.hideLoader();
              return next.handle(request);
            }),
            catchError(err => {
              this.loaderService.hideLoader();
              this.authService.removeAuthInfo();
              this.authService.removeAuthInfoStorage();
              this.router.navigate(['/user/login']);
              
              return throwError(() => err);
            })
          );
        } else if (errorObj.status == 400){
          this.loaderService.hideLoader();
          return throwError(() => errorObj);
        } else{
          this.loaderService.hideLoader();
          this.authService.removeAuthInfo();
          this.authService.removeAuthInfoStorage();
          this.router.navigate(['/user/login']);
  
          return throwError(() => errorObj);
        }
      })
    );
  }
}
