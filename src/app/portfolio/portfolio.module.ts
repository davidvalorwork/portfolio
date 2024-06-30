/** Angular */
import { NgModule } from '@angular/core';
import { routes } from './portfolio.routes';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { heroAcademicCapSolid, heroHomeModernSolid, heroTrophySolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { matGrain } from '@ng-icons/material-icons/baseline';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { GrafosInteligenciaComponent } from './grafos-inteligencia/grafos-inteligencia.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    GrafosInteligenciaComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ 
      heroHomeModernSolid, 
      heroTrophySolid, 
      heroUserSolid,
      heroAcademicCapSolid,
      matGrain
    }),
  ],
  providers: [provideRouter(routes)]
})
export class PortfolioModule { }
