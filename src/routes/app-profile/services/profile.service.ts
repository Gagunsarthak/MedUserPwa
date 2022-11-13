import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocProfEditReq } from 'src/routes/app-user-dashboard/Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url:string="http://localhost:3000/doctors/updateDetails"
  constructor(private httpClient: HttpClient) { }

  updateProfileExperienceDetails(req:IDocProfEditReq): Observable<any>{
    console.log("Req being sent is ",req)
    return this.httpClient.put<any>(this.url, req)
    
  }

}
