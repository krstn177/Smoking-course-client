import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable, map } from 'rxjs';
import { LoaderService } from '../Services/loader.service';

export const userGuard: CanActivateFn = (
  route,
  state
  ) : Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree => {
    inject(LoaderService).showLoader();
    const environmentInjector = inject(EnvironmentInjector);

    return inject(AuthService).userPass().pipe(
      map((isUser: boolean) : boolean | UrlTree => {
        if (isUser) {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return true;
        } else {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return runInInjectionContext(environmentInjector, () => inject(Router).createUrlTree(['/']));
        }
      })
    );
};
