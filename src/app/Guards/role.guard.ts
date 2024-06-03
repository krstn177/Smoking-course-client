import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserInfo();

  if (user === null) {
    router.navigate(['/user/login']);
    return false;
  }

  const userRoles = user.roles;
  const requiredRoles = route.data['roles'] as Array<string>;
  const excludedRoles = route.data['excludedRoles'] as Array<string>;


  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
  const hasExcludedRole = excludedRoles ? excludedRoles.some(role => userRoles.includes(role)) : false;

  if(hasRequiredRole && !hasExcludedRole) return true;
  else {
    router.navigate(['/']);
    return false;
  }
};
