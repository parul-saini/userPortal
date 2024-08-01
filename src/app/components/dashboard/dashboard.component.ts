import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  allUsers: any = [];
  admin:any;
  sideBarOpen :boolean = true;


  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;

  constructor(private auth: AuthService, private toastr: ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.getAllUsers();
   // this.getAdmindetail();
  }


  active : any;
  InActive : any;
  getAllUsers(): void {
    this.active=0;
    this.InActive=0;
    this.auth.getAllUsers().subscribe(
      (res: any) => {
        this.allUsers = res.data;
          this.allUsers.forEach((element:any) => {
              if(element.active){
                this.active++;
              }
              if(!element.active){
                this.InActive++;
              }
          });
       // console.log('users',this.allUsers);
      },
      (error: any) => {
        this.toastr.error('Error', error.error.message);
      }
    );
  }

  getAdmindetail(){
    this.auth.getAdmindetail().subscribe(
      (res: any) => {
        this.admin = res.data;
       // console.log('admin',this.admin);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Error', error.error.message);
        }
        
      }
    )
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  updateActiveStatus(userId:any){
    this.auth.updateActiveStatus(userId).subscribe(
      (res: any) => {
        this.toastr.success('Success', res.message);
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Error', error.error.message);
      }
    )
  }

  deleteUser(userId:any){
    this.auth.deleteUserById(userId).subscribe(
      (res:any)=>{
        this.getAllUsers();
        this.toastr.success("Success",res.message);
      },
      (error:any)=>{
        this.toastr.success("Success",error.error.message);
      }
    )
  }

  getStateByCode(stateCode:any,countryCode:any){
    var state= State.getStateByCodeAndCountry(stateCode, countryCode);
    return state?.name;
  }

  UpdateUserDetails(userId:any){

  }

// Sorting an array of objects by a specific property
sortData(column: any) {
  this.allUsers.sort((a:any, b:any) => {
    return a[column] > b[column] ? 1 : -1;
  });
}

}
