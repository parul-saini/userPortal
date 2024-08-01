import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidenavbarBtn: EventEmitter<any> = new EventEmitter();
  admin:any;

  constructor(private router: Router, private auth:AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAdmindetail();
  }

  toggleSidebar() {
    this.toggleSidenavbarBtn.emit();
  }

  getAdmindetail(){
    this.auth.getAdmindetail().subscribe(
      (res: any) => {
        this.admin = res.data;
      //  console.log('admin',this.admin);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Error', error.error.message);
        }
        
      }
    )
  }
 
}
