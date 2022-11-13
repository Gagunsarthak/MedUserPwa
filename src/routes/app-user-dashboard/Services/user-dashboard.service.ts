import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctorTimeline } from '../Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
 graphUrl:string="http://localhost:3000/user/userDetails/getMedicalDetails"
 addMedDetUrl="http://localhost:3000/user/userDetails/addMedicalDetails"
  url:string="http://localhost:3000/user/userDetails/favouriteDoctor"
  constructor(private httpClient: HttpClient) {
    
   }

  fetchFavorites(req:any): Observable<any> {

  
  return this.httpClient.post<any>(this.url, req)
 
  //return this.httpClient.post<IDoctorTimeline>(this.url)
  }

  fetchMedVitalDetails(req:any):Observable<any>{
    return this.httpClient.post<any>(this.graphUrl, req)
  }
  addMedDetails(req:any):Observable<any>{
    return this.httpClient.post<any>(this.addMedDetUrl, req)
 
  }
}
