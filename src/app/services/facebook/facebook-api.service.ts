import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
// import { IProfile } from 'src/app/portfolio/models/profile.model'
// import { IApiBaseActions, ParamsType } from "../../portfolio/models/api-base-actions.interface";

@Injectable({
  providedIn: 'root'
})
export class FacebookApiService {
  url: string = "http://18.117.243.194:4000"

  constructor(
    private httpClient: HttpClient
  ) { }

  searchProfile(profileLink: string): Observable<any> {
    console.log("Consulting this profile in ", this.url, profileLink)
    return this.httpClient.post(`${this.url}/`, profileLink)
  }

}
