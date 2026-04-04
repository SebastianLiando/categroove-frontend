import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';

export const loginCallbackGuard: CanActivateFn = (route) => {
  const router = inject(Router)
  const code = route.queryParamMap.get('code')

  if (code === null || code.trim().length === 0) {
    return new RedirectCommand(router.parseUrl('/login'))
  }

  return true;
};
