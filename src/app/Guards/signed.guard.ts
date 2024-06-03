import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const signedGuard: CanActivateFn = (route, state) => {
  return !!inject(AuthService).getAccessToken() ? inject(Router).createUrlTree(['/']) : true;
};
