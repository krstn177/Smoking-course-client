// auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SecureHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers
        .set('Referrer-Policy', 'strict-origin-when-cross-origin')
        .set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        .set('X-Frame-Options', 'SAMEORIGIN')
        .set('X-Content-Type-Options', 'nosniff')
    });
    return next.handle(clonedRequest);
  }
}