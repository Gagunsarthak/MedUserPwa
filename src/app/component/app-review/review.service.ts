import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewTags } from 'src/routes/app-user-dashboard/Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  fetchHashTags(req: any): Observable<any> {
  
    return this.http.post<any>("http://localhost:3000/doctors/doctorReviews", req)
  }
}
