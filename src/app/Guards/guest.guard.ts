import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isLoggedIn()) {
    return inject(Router).createUrlTree(['/']);
  } else {
    return true;
  }
};
