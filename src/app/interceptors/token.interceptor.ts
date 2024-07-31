import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/authService/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private toastr: ToastrService,private router: Router) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

     // Check if the request URL contains 'cloudinary'
     if (request.url.includes('https://api.cloudinary.com')) {
      // If it's a Cloudinary request, pass it without modifying
      return next.handle(request);
    }
    
    const myToken = localStorage.getItem('token');
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
        
      });
    }

    // also handle if the token is expired
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.warning('Token has expired. Please login again.', 'Error');
       //   this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );

  }
}
