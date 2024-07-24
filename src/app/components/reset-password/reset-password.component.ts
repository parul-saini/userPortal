import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder){
   this.resetPasswordForm = this.fb.group({
    password:['',[Validators.required, 
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
    )]],
     confirmPassword : ['', Validators.required]
    },{validator: this.PasswordMatch })
  }
  
  PasswordMatch(resetPasswordForm:FormGroup){
    return resetPasswordForm.controls['password'].value === resetPasswordForm.controls['confirmPassword'].value  ? null : { 'mismatch': true };
  }

  onSubmit(){
   if(this.resetPasswordForm.valid){
     console.log(this.resetPasswordForm.value);
     this.resetPasswordForm.reset();
   }else{
     console.log("form is invalid");
   }
  }
}
