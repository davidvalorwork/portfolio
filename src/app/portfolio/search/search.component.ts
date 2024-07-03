import { Component } from '@angular/core'
import { FacebookApiService } from '../..//services/facebook/facebook-api.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  standalone: false,
  selector:    'facebook-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchQuery: string = ''
  loading: boolean = false

  constructor(
    public facebookApiService: FacebookApiService,
    public _snackbar: MatSnackBar
  ){

  }

  onSubmit(searchQuery: string): void {
    this.loading = true
    this.facebookApiService.searchProfile(searchQuery)
      .pipe(
        catchError(error => {
          console.error('Error during search:', error);
          this.openSnackBar('Profile search failed. Please try again.', 'Close');
          this.loading = false;
          return of(null);
        })
      )
      .subscribe((response)=>{
        if(response){
          console.log('onSubmit Response from server:', response)
          this.openSnackBar('Profile found!', 'Close')
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
