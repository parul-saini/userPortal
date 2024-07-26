import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   loginForm: FormGroup;
   loginEmail: any;

   constructor(
    private fb: FormBuilder, 
    private auth:AuthService,
    private toastr: ToastrService,
    private router: Router,
    ){
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
     })
   }

  public isValidEmail!: boolean;
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

   onSubmit(){
    if(this.loginForm.valid){
      // console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe(
        (response:any)=>{
          localStorage.setItem('token',response.token);
          this.router.navigate(['dashboard']);     
          this.toastr.success('Message', "Login SuccessFully:)", {
            timeOut: 3000
          });
        },
        (error)=>{
          console.log(error);
          this.toastr.error('Error',error.error.message, {
            timeOut: 3000
          });
        }
      )
      this.loginForm.reset();
      this.loginForm.clearValidators();
    }else{
      this.toastr.error('Error',"Invalid form", {
        timeOut: 3000
      });
      this.loginForm.reset();
    }
   }
}
