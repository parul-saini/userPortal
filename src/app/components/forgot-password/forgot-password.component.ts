import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  loginForm: FormGroup;
  loginEmail: any;
  isSentEmail:boolean= false;

  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private toastr: ToastrService,
  ){
   this.loginForm = this.fb.group({
     email : ['', [Validators.required, Validators.email]],
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
     console.log(this.loginForm.value);
     var email= this.loginForm.value.email;
     this.auth.sendEmailToForgotPassword(email).subscribe(
      (res:any)=>{
        // console.log(res);
        this.toastr.success('Success', res.message, {
          timeOut: 3000
        });
        this.isSentEmail= true;
      },
      (error:any)=>{
        // console.log(error);
        this.toastr.error('Error', error.error.message, {
          timeOut: 3000
        });
      }
     )
    }else{
      this.toastr.error('', "Check Your Mail", {
        timeOut: 3000
      });
    }
    this.loginForm.reset();
  }
}
