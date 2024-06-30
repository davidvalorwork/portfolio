import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full',  loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule) },
  {path: '**', component: PagenotfoundComponent}
];
