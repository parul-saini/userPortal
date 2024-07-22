import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   loginForm: FormGroup;
   loginEmail: any;

   constructor(private fb: FormBuilder){
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
      console.log(this.loginForm.value);
      this.loginForm.reset();
    }else{
      console.log("form is invalid");
    }
   }
}
