import { Component, EventEmitter, Output } from '@angular/core'
import { FacebookApiService } from '../..//services/facebook/facebook-api.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Neo4jService } from '../../services/neovis/neo4j.service'

@Component({
  standalone: false,
  selector: 'facebook-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Output() output = new EventEmitter()
  searchQuery: string = 'isrador.silva'
  loading: boolean = false
  searchLimit: number = 10

  constructor(
    public facebookApiService: FacebookApiService,
    public _snackbar: MatSnackBar,
    public neo4jService: Neo4jService
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
            let newResponse: any = {}
            Object.entries(response).forEach(([key, value]) => {
                newResponse[key.toLowerCase().replace(/\s+/g, '_').replace(/\W.*$/, '')] = value;
            });
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

  onSearchLimitChange() {
    if (this.searchLimit < 1) {
      this.searchLimit = 1;
    }
    console.log('Search limit changed to:', this.searchLimit);
    // Add any additional logic you need to handle the change in search limit
  }
}
