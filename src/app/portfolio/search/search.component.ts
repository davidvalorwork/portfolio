import { Component, EventEmitter, Output } from '@angular/core'
import { FacebookApiService } from '../..//services/facebook/facebook-api.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  standalone: false,
  selector: 'facebook-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Output() output = new EventEmitter()
  searchQuery: string = 'isrador.silva'
  loading: boolean = false

  constructor(
    public facebookApiService: FacebookApiService,
    public _snackbar: MatSnackBar
  ) {

  }

  onSubmit(searchQuery: string): void {
    this.loading = true
    this.facebookApiService.searchProfile(searchQuery)
      .subscribe({
        next: response => {
          if (response) {
            console.log('onSubmit Response from server:', response)
            this.openSnackBar('Profile found!', 'Close')
            this.loading = false
            let newResponse: any = {}
            Object.entries(response).forEach(([key, value]) => {
              key = key.replaceAll(' ', '_')
              key = key.replace(/\W.*/, '');
              key = key.toLowerCase()
              newResponse[key] = value
            })
            this.output.emit(newResponse)
          }
        },
        error: error => {
          console.log('onSubmit Error:', error)
          this.openSnackBar('Profile not found!', 'Close')
          this.loading = false
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
