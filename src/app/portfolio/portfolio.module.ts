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
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { FacebookApiService } from '../services/facebook/facebook-api.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HandleNodesService } from '../services/neovis/handle-nodes.service';
import { DetalleComponent } from './detalle/detalle.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    GrafosInteligenciaComponent,
    SearchComponent,
    DetalleComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgIconsModule.withIcons({
      heroHomeModernSolid,
      heroTrophySolid,
      heroUserSolid,
      heroAcademicCapSolid,
      matGrain
    }),
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    FacebookApiService,
    HandleNodesService
  ]
})
export class PortfolioModule { }
