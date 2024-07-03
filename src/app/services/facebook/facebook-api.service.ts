import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { IProfile } from 'src/app/portfolio/models/profile.model'
import { IApiBaseActions, ParamsType } from "../interfaces/api-base-actions.interface";

@Injectable({
  providedIn: 'root'
})
export class FacebookApiService {
  url: string = "http://localhost:8080"

  constructor() { }

  searchProfile(profileLink: string): Observable<IProfile> {
    this.httpClient.post(`${url}`, profileLink)
      .pipe(tap((x) => this.HandleResponse(x)))
  }

}
