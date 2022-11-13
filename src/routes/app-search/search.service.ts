import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearch } from './search.model';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  private grantType: string = "client_credentials";
  private clientId: string = "33OkryzDZsJ66YIWxJGoE_f0MDoSWki22IyuizwkCPBsYMhCO85o-z5u8OLiX6gxWBXzYWY02lbjWC9vEJqs-g==";
  private clientSecret: string = "lrFxI-iSEg8DewTRVHJ2ZOu909ISc5vtLzZb6pTc7Ui0Cjog9tKO9_1daU4UvAieOqhB8Crj_yHpDNsPjz8vnPM0v7FrVaY1";
  private securityURL: string = "https://outpost.mapmyindia.com/api/security/v3.0.5/oauth/token?grant_type=" + this.grantType + "&client_id=" + this.clientId + "&client_secret=" + this.clientSecret;
  private autoSuggestURL: string = "https://atlas.mapmyindia.com/api/places/search/json?query=agra&location=28.5454,77.455454&bridge&explain&username=balmukand";
  private nearbyURL: string = "https://atlas.mapmyindia.com/api/places/nearby/json?explain&richData&username=balmukand&refLocation=28.467470,77.077518&keywords=FINATM";
  private geocodeURL: string = "https://atlas.mapmyindia.com/api/places/geocode?address=mapmyindia 237 okhla phase 3";
  private textsearchURL: string = "https://atlas.mapmyindia.com/api/places/textsearch/json?query=okhla phase 3&region=ind";

  constructor(private httpClient: HttpClient) { }

  getSearchData() {
    return this.httpClient
      .get<any>('/assets/search-data.json')
      .toPromise()
      .then((res) => <ISearch[]>res.searchData)
      .then((searchData) => {
        return searchData;
      });
  }

  getToken() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.securityURL;
      this.httpClient.post(apiURL, null)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }

  autoSuggest(token: string) {
    const _url = this.autoSuggestURL + "&access_token=" + token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
          res => { // Success
            // console.log(res);
            resolve(res);
          }
        );
    });
    return promise;
  }

  nearby(token: string) {
    const _url = this.nearbyURL + "&access_token=" + token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

  geocode(token: string) {
    const _url = this.geocodeURL + "&access_token=" + token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

  textsearch(token: string) {
    const _url = this.textsearchURL + "&access_token=" + token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

}
