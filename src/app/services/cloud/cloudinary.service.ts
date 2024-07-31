import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}

  uploadImage(data:any):Observable<any> {
     return this.http.post<any>(`https://api.cloudinary.com/v1_1/dh38nn2gn/image/upload/`, data);
  }
}
