import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-search-card',
  templateUrl: './doctor-search-card.component.html',
  styleUrls: ['./doctor-search-card.component.scss']
})
export class DoctorSearchCardComponent implements OnInit {
  @Input() doc:any;
  numbers = Array(7).fill(0).map((x,i)=>i);
  constructor() { }

  ngOnInit(): void {
  }

}
