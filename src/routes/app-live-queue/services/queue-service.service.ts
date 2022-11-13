import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QueueServiceService {
  url:string="https://mocki.io/v1/c6c19a93-ebb3-40e5-af11-43a91d07b120"
  constructor(private httpClient: HttpClient) { }
  fetchLiveQueueData(req:any):Observable <any>{
    return this.httpClient.get<any>(this.url)
  }
}
