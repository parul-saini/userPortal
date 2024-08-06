import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Country, State, City } from 'country-state-city';
import { CloudinaryService } from 'src/app/services/cloud/cloudinary.service';


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

  // for edit the user details
  isUpdate:boolean= false;
 
  constructor(private fb:FormBuilder, private auth:AuthService, private toastr:ToastrService,
    private cloudservice:CloudinaryService, private router: Router,private activeLink: ActivatedRoute
  ){
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
      phone: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      alternatePhone: ['',[Validators.maxLength(10),Validators.minLength(10)]],
      password: [''],
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
     
    this.isUpdate=false;
    this.activeLink.queryParams.subscribe(
      (value:Params) =>{
      const userId = value['id']
      
        if(userId){
          this.isUpdate = true;
          this.updateuserDetails(userId);
        }
      }   
    );

  }

  
  ngOnInit():void{
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.stateListBasedOnCountryCode = State.getStatesOfCountry(this.countryCode);
  }


  // changing actice status
  onChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isActive = checkbox.checked? 0 : 1; //opp as it is inactive btn
    this.userForm.patchValue({active: this.isActive});
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

  
  //for side navbar
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    //console.log(this.sideBarOpen);
  }
  
  uploadedImageUrl:any;
  // uploadImage(event:any){
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     console.log(file.name);
    
  //     // Create a preview URL
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.previewUrl = e.target?.result as string;
  //       this.userForm.patchValue({
  //         imageUrl: this.previewUrl
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
   
  // }
  
  //use cloudinary to store the images 
  private cloudName = 'dh38nn2gn' ;
  private uploadPreset = 'User-portal';

  // to get the round shaped of image
  getCircularImageUrl(publicId: string): string {
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/ar_1:1,c_auto,g_auto,w_500/r_max/${publicId}.jpg`;
  }
   
  // upload the image in cloudinary
  uploadImage(event:any){
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      formData.append('cloud_name', this.cloudName);
      formData.append('folder', 'user-portal');
   
      this.cloudservice.uploadImage(formData).subscribe(
          (response: any) => {
          this.uploadedImageUrl = response.secure_url; 
          this.uploadedImageUrl= this.getCircularImageUrl(response.public_id)  ;       
        //  console.log('Cloudinary returns the image URL in the response:', this.uploadedImageUrl);
          this.userForm.patchValue({
            imageUrl: this.uploadedImageUrl 
          });
        }
      );
    }
   
  }



  PhoneNumberValidation(event : any) : boolean {
    return event.charCode >= 48 && event.charCode <= 57
  }

  blockSpaceValidaton(event : any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 61 && event.charCode <= 122
  }

  getControl(name: any): AbstractControl | null {
    return this.userForm.get(name);
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


  updateuserDetails(id:any){
    var detailsToPatch;
    this.auth.getUserDetails(id).subscribe(
      (response:any)=>{
        detailsToPatch = response;
        this.countryList = Country.getAllCountries();
        this.stateListBasedOnCountryCode = State.getStatesOfCountry(response.addresses[0]?.country);
        this.cityListBasedOnStateCode = City.getCitiesOfState(response.addresses[0]?.country, response.addresses[0]?.state);
        
      //  patch the form values
        this.userForm.patchValue({
          userId: response.userId,
          firstName: response.firstName,
          middleName: response.middleName,
          lastName: response.lastName,
          gender: response.gender,
          dateOfJoining: response.dateOfJoining,
          dob: response.dob,
          email: response.email,
          phone: response.phone,
          alternatePhone: response.alternatePhone,
          role: response.role,
          imageUrl: response.imageUrl,
          active: response.active? 1:0 ,
          
          // Patch the address fields
          addressId: response.addresses[0]?.addressId || 0, // If addresses array is not empty
          addressLine1: response.addresses[0]?.addressLine1 || '',
          city: response.addresses[0]?.city || '',
          state: response.addresses[0]?.state || '',
          country: response.addresses[0]?.country || '',
          zipCode: response.addresses[0]?.zipCode || '',
          addressLine2: response.addresses[0]?.addressLine2 || '',
          city2: response.addresses[0]?.city2 || '',
          state2: response.addresses[0]?.state2 || '',
          country2: response.addresses[0]?.country2 || '',
          zipCode2: response.addresses[0]?.zipCode2 || ''
        });

      },
      (err:any)=>{
          this.toastr.error("Internal server error try later! ");
      }
    );

  }

  addUserFirstTime(){
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
          this.toastr.error("Error",error.error.message);
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

  onSubmit():void{
    // console.log("submit");
    if(!this.isUpdate){
      this.addUserFirstTime()
    }else{
      if(this.userForm.valid){
        this.auth.updateUser(this.userForm.value).subscribe(
          (res:any)=>{
            this.toastr.success("Success",res.message);
            this.userForm.reset();
            this.isUpdate=false;
          },
          (error:any)=>{
            this.toastr.error("Error",error);
           // this.userForm.reset();
          //  this.isUpdate=false;
          }
        );
      }else{
        alert("Form is Invalid Check Again");
      }
    }
  }

}
