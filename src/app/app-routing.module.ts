import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'', component:DashboardComponent, canActivate:[authGuard]},
  { path:'add-user' , component: AddUserComponent,canActivate:[authGuard]},
  { path:'login', component:LoginComponent},
  { path:'forgot-password', component:ForgotPasswordComponent},
  { path:'reset', component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
