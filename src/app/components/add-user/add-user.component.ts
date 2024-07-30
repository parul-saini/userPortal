import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  sideBarOpen:boolean= true;
  
  userForm!: FormGroup;
  // forms related data 
  dateNow:any;
  countryList:any;
  stateListBasedOnCountryCode:any;
  countryCode : any;
  cityListBasedOnStateCode:any;
  isActive:any;
 
  constructor(private fb:FormBuilder, private auth:AuthService, private toastr:ToastrService){
    this.countryList = Country.getAllCountries();
    this.userForm = this.fb.group({
      userId: [0],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfJoining: [''],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      alternatePhone: [''],
      password: ['',Validators.required],
      role: ['user'],
      imageUrl: [''],
      active: [1],
      addressId: [0],
      addressLine1: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      addressLine2: [''],
      city2: [''],
      state2: [''],
      country2: [''],
      zipCode2: ['']
    });
  }

  
  ngOnInit():void{
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');
   // this.countryList = Country.getAllCountries();
    this.stateListBasedOnCountryCode = State.getStatesOfCountry(this.countryCode);
  }


  // chaning actice status
  onChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isActive = checkbox.checked? 1 : 0;
  }
  
  generatePassword(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  onSubmit():void{
    console.log("submit");
    var generatedPassword= this.generatePassword();
    this.userForm.patchValue({ password: generatedPassword });
    if(this.userForm.valid){
      this.auth.addUser(this.userForm.value).subscribe(
        (res:any)=>{
          // console.log(res);
          this.toastr.success("Success",res.message);
          this.userForm.reset();
        },
        (error:any)=>{
          this.toastr.error("Success",error.error.message);
        }
      );
    }
    else{
      alert("Form is invalid");
      this.userForm.markAsDirty();
      // to show errors in exact field 
      Object.keys(this.userForm.controls).forEach((field)=>{
        var  control = this.userForm.get(field);
        if(control instanceof FormControl){
          control.markAsTouched({onlySelf:true});
            if(control.errors){
              console.log(field,control.errors);
            }
        }
      });

    }
  }
 

  //for side navbar
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    console.log(this.sideBarOpen);
  }
  
  previewUrl:any;
  uploadImage(event:any){
    const file: File = event.target.files[0];
    if (file) {
      console.log(file.name);
    
      // Create a preview URL
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewUrl = e.target?.result as string;
        this.userForm.patchValue({
          imageUrl: this.previewUrl
        });
      };
      reader.readAsDataURL(file);
    }
   
  }

  PhoneNumberValidation(event : any) : boolean {
    return event.charCode >= 48 && event.charCode <= 57
  }

  blockSpaceValidaton(event : any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 61 && event.charCode <= 122
  }

  setCountryCode(event:any){
    this.countryCode = event.target.value;
    // console.log(this.countryCode,"codeeee");
    this.stateListBasedOnCountryCode = State.getStatesOfCountry(this.countryCode);
  }

  setStateCode(event : any) {
    // console.log(event.target.value,"city codee");
    this.cityListBasedOnStateCode = City.getCitiesOfState(this.countryCode,event.target.value);
  }

  getControl(name: any): AbstractControl | null {
    return this.userForm.get(name);
  }
}
