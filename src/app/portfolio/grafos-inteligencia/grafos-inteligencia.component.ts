import { AfterViewInit, Component } from '@angular/core';
import NeoVis, { Neo4jConfig, NeovisConfig, Node } from 'neovis.js';
import { NeovisConfigService } from '../../services/neovis/neovis-config.service';
import { facebookEdge } from './facebook-config/facebook-edge';
import { facebookNodes } from './facebook-config/facebook-nodes';
import { facebookLabels } from './facebook-config/facebook-labels';
import { facebookRelationships } from './facebook-config/facebook-relationships';
import { facebookCipher } from './facebook-config/facebook-cipher';

@Component({
  selector: 'app-grafos-inteligencia',
  standalone: false,
  templateUrl: './grafos-inteligencia.component.html',
  styleUrl: './grafos-inteligencia.component.css'
})
export class GrafosInteligenciaComponent implements AfterViewInit {
  constructor(
    public neovisConfig: NeovisConfigService
  ) {
    this.neovisConfig.addEdgeConfig(facebookEdge)
    this.neovisConfig.addNodeConfig(facebookNodes)
    this.neovisConfig.addLabels(facebookLabels)
    this.neovisConfig.addRelationships(facebookRelationships)
    this.neovisConfig.setInitialCypher(facebookCipher)
  }

  ngAfterViewInit(): void {
    const viz = new NeoVis(this.neovisConfig.getConfig() as NeovisConfig);
    viz.render();
  }
}
