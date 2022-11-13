import { Component, OnInit } from '@angular/core';
import { ISearch } from './search.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss'],
})
export class AppSearchComponent implements OnInit {
  docList: ISearch[];
  loading = false;
  constructor(private searchSvc: SearchService) {}

  ngOnInit(): void {
    this.getSearchData();
  }

  getSearchData() {
    this.loading = true;
    this.searchSvc.getSearchData().then((doc) => {
      this.docList = doc;
      this.loading = false;
    });
  }
}
