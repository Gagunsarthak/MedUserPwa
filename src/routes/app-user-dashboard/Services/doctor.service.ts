import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctorTimeline } from '../Models/doctor.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 url:string="http://localhost:3000/doctors/doctorDetail"
  constructor(private httpClient: HttpClient) {
    
   }

  fetchProfileData(id:String,type:String,field:String[]): Observable<any> {
  const req={id:[id], role:type,fields:field}
  
  return this.httpClient.post<IDoctorTimeline>(this.url, req)
 
  //return this.httpClient.post<IDoctorTimeline>(this.url)
  }
}
