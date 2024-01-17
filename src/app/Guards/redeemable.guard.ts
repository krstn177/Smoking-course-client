import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoaderService } from '../Services/loader.service';
import { OrderService } from '../Services/order.service';

export const redeemableGuard: CanActivateFn = (
  route,
  state
  ) : Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree => {
    inject(LoaderService).showLoader();
    const environmentInjector = inject(EnvironmentInjector);

    return inject(OrderService).hasOrderedPass().pipe(
      map((hasntOrdered: boolean) : boolean | UrlTree => {
        if (!hasntOrdered) {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return true;
        } else {
          runInInjectionContext(environmentInjector, () => inject(LoaderService).hideLoader());
          return runInInjectionContext(environmentInjector, () => inject(Router).createUrlTree(['/']));
        }
      })
    );
};
