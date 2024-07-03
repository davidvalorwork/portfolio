import { Component } from '@angular/core'
import { FacebookApiService } from '../..//services/facebook/facebook-api.service'

@Component({
  standalone: false,
  selector:    'facebook-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(
    public facebookApiService: FacebookApiService
  ){

  }

  onSubmit(searchQuery: string): void {
    this.facebookApiService.searchProfile(searchQuery)
      .subscribe((response)=>{
        console.log('onSubmit Response from server:', response)
      })
  }
}
