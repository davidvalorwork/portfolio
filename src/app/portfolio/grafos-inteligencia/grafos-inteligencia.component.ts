import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { VisConfigService } from '../../services/neovis/vis-config.service';
import { facebookEdge } from './facebook-config/facebook-edge';
import { facebookNodes } from './facebook-config/facebook-nodes';
import { facebookCipher } from './facebook-config/facebook-cipher';
import { IVisDataSet } from '../models/IVisDataSet';
import { Neo4jService } from '../../services/neovis/neo4j.service';

@Component({
  selector: 'app-grafos-inteligencia',
  standalone: false,
  templateUrl: './grafos-inteligencia.component.html',
  styleUrl: './grafos-inteligencia.component.css'
})
export class GrafosInteligenciaComponent implements AfterViewInit {
  @ViewChild('vis', {static: false}) visContainer!: ElementRef;
  @Input() visData: any;
  network = null as any;

  constructor(
    public neo4jService: Neo4jService,
    public visConfig: VisConfigService
  ) {
    this.visConfig.addEdgeConfig(facebookEdge)
    this.visConfig.addNodeConfig(facebookNodes)
  }

  ngAfterViewInit(): void {
    this.network = new Network(
      this.visContainer.nativeElement, 
      this.visData, 
      this.visConfig.getOptions()
    );
  }
}
