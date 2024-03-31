import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const router: Router = inject(Router)
  const protectedRoutes: string[] = ['/students', '/courses', '/addNewStudent', '/addNewCourse', '/patchCourse/:courseId', 'patchStudent/:studentId']

  console.log(isLoggedIn())

  if(isLoggedIn() == 'true')
  {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

function isLoggedIn()
{
  const token = localStorage.getItem('token')
  return token;
}