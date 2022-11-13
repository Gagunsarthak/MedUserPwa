import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';
declare var MapmyIndia: any;
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: any;
  private token: string;

  constructor(private searchSvc: SearchService) { }

  ngOnInit(): void {
    this.map = new MapmyIndia.Map('map',
      {
        center: [18.527693, 73.856427],
        zoom: 15
      });

    this.searchSvc.getToken().then((data:any) => {
      this.token = data['access_token'];
    });
  }

  auto() {
    this.searchSvc.autoSuggest(this.token).then((data) => {
      console.log(data);
    });
  }

  nearby() {
    this.searchSvc.nearby(this.token).then((data) => {
      console.log(data);
    });
  }

}
