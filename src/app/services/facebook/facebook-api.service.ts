import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
// import { IProfile } from 'src/app/portfolio/models/profile.model'
// import { IApiBaseActions, ParamsType } from "../../portfolio/models/api-base-actions.interface";

@Injectable({
  providedIn: 'root'
})
export class FacebookApiService {
  url: string = "http://localhost:8080"

  constructor(
    private httpClient: HttpClient
  ) { }

  private HandleResponse(response: any): void {
    console.log('Response from server:', response);
  }

  searchProfile(profileLink: string): Observable<any> {
    return this.httpClient.post(`${this.url}`, profileLink)
      .pipe(tap((x) => this.HandleResponse(x)))
  }

}
