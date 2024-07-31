import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const isloggedIn = !!localStorage.getItem('token');
  if(isloggedIn){
    return true;
  }
  else
  {
     toastr.error("Error","Please login first!");
    router.navigate(['/login']);
    return false;
  }
};


