import { CanActivateFn } from '@angular/router';

export const loggedGuardGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem('token') != undefined || sessionStorage.getItem('token') != null;
};
