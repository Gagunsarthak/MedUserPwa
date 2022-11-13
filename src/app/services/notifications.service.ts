import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
    console.log("Entered Notification Service")
  }

   addSubscription(sub: PushSubscription) {
    return lastValueFrom(
      this.http.post('http://localhost:3000/api/subscription', { sub })
    );
  }

  notifications(data: string) {
    console.log("Notification function from service called")
    return lastValueFrom(
      this.http.post('http://localhost:3000/api/notifications', { data })
    );
  } 
  
}
