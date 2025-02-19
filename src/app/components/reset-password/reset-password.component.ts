import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  email:string="";
  code :any;
  resetPassObj:any;

  constructor(private fb: FormBuilder, private auth:AuthService,private route:ActivatedRoute,private toastr: ToastrService){
   this.resetPasswordForm = this.fb.group({
    password:['',[Validators.required, 
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
    )]],
     confirmPassword : ['', Validators.required]
    },{validator: this.PasswordMatch })

    this.resetPassObj = {
      email: '',
      code: '',
      password: ''
    };
  }
  
  ngOnInit(): void {
    // Subscribe to route params to get email and code from the URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      let uriToken = params['code'];
      this.code = uriToken.replace(/ /g, '+');
    });
  }

  PasswordMatch(resetPasswordForm:FormGroup){
    return resetPasswordForm.controls['password'].value === resetPasswordForm.controls['confirmPassword'].value  ? null : { 'mismatch': true };
  }

  onSubmit(){
   if(this.resetPasswordForm.valid){
     this.resetPassObj.email = this.email;
     this.resetPassObj.code = this.code;
     this.resetPassObj.password = this.resetPasswordForm.value.password;
   //  console.log("code",this.resetPassObj );

     this.auth.resetPassword(this.resetPassObj).subscribe(
      (res)=>{
        this.toastr.success('Success',res.message, {
          timeOut: 3000
        });
      },
      (error)=>{
        this.toastr.error('Error',error.error, {
          timeOut: 3000
        });
      }
     )
   }else{
     //console.log("form is invalid");
     this.toastr.warning('Error',"form is invalid", {
      timeOut: 3000
    });
   }
   this.resetPasswordForm.reset();
  }
}
