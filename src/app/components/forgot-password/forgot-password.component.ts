import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  loginForm: FormGroup;
  loginEmail: any;
  isSentEmail:boolean= false;

  constructor(private fb: FormBuilder){
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
     this.loginForm.reset();
     this.isSentEmail= true;
   }else{
     console.log("form is invalid");
   }
  }
}
