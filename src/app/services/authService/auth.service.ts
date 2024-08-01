import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl= "http://localhost:5039"

  constructor(private http: HttpClient) { 

  }

  addUser(user:any):Observable<any>{
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}/RegisterUser`,user);
  }

  login(loginCredential:any):Observable<any>{
    // console.log(loginCredential);
    return this.http.post<any>(`${this.apiUrl}/loginUser`,loginCredential);
  }

  sendEmailToForgotPassword(email:string):Observable<any>{
    // console.log(email);
     return this.http.get<any>(`${this.apiUrl}/reset-password-email/${email}`);
  }

  resetPassword(resetPassObj:any):Observable<any>{
   return this.http.post<any>(`${this.apiUrl}/reset-password`,resetPassObj);
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getAllUsers`);
  }

  getAdmindetail():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getAdmindetail`);
  }

  updateActiveStatus(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/updateActiveStatus/${id}`);
  }

  deleteUserById(id:any):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/deleteById/${id}`);
  }

  getUserDetails(id:any):Observable<any>{
     return this.http.get<any>(`${this.apiUrl}/getUserDetails/${id}`);
  }

  updateUser(user:any):Observable<any>{
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}/updateUser`,user);
  }
}
