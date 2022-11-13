import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {   IUserReviewTags } from 'src/routes/app-user-dashboard/Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url:string="http://localhost:3000/doctors/doctorReviews/create"
  constructor(private httpClient: HttpClient) { }
  createReview(req:IUserReviewTags): Observable<any> {
   
    console.log("Create review func called")
    return this.httpClient.post<IUserReviewTags>(this.url, req)
   
    //return this.httpClient.post<IDoctorTimeline>(this.url)
    }

}
