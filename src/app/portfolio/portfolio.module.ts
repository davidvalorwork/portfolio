/** Angular */
import { NgModule } from '@angular/core';
import { routes } from './portfolio.routes';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideRouter(routes)]
})
export class PortfolioModule { }
