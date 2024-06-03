import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const orderedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserInfo();

  if (user === null) {
    router.navigate(['/user/login']);
    return false;
  }

  const userHasOrdered = user.hasOrdered;
  const requiredOrderState = route.data['orderState'] as Boolean;
  if (userHasOrdered == requiredOrderState) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
