import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable, map, of } from 'rxjs';
import { LoaderService } from '../Services/loader.service';

export const activatedGuard: CanActivateFn = (
  route,
  state
  ) : Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree => {
    inject(LoaderService).showLoader();
    const environmentInjector = inject(EnvironmentInjector);

    return inject(AuthService).activatedPass().pipe(
      map((isActivated: boolean) : boolean | UrlTree => {
        if (isActivated) {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return true;
        } else {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return runInInjectionContext(environmentInjector, () => inject(Router).createUrlTree(['/']));
        }
      })
    );
};
