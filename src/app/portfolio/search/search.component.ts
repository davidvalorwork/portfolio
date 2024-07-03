import { Component } from '@angular/cli'
import { FacebookApiService } from 'src/app/services/facebook/facebook-api.service'

@Component({
  standalone: false,
  selector:    'search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor(){

  }
}
