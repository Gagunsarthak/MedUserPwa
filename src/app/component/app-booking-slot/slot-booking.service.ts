import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotBookingService {
getBookUrl:string="http://localhost:3000/api/v1/appointment/schedule/"
bookUrl:string="http://localhost:3000/api/v1/appointment/book"
  constructor(private httpClient:HttpClient) { }
  getSchedule(id:string):Observable<any>{
    return this.httpClient.get(this.getBookUrl +  id)
  }
  bookAppointment(req:any):Observable<any>{
    return this.httpClient.post<any>(this.bookUrl,req);
  }
}
