import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { VisConfigService } from '../../services/neovis/vis-config.service';
import { facebookEdge } from './facebook-config/facebook-edge';
import { facebookNodes } from './facebook-config/facebook-nodes';
import { IVisDataSet } from '../models/IVisDataSet';
import { Neo4jService } from '../../services/neovis/neo4j.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-grafos-inteligencia',
  standalone: false,
  templateUrl: './grafos-inteligencia.component.html',
  styleUrl: './grafos-inteligencia.component.css'
})
export class GrafosInteligenciaComponent implements AfterViewInit, OnChanges {
  @ViewChild('vis', { static: false }) visContainer!: ElementRef;
  @Input() visData: any;
  @Output('output') output = new EventEmitter();
  network = null as any;

  constructor(
    public neo4jService: Neo4jService,
    public visConfig: VisConfigService,
    public dialog: MatDialog
  ) {
    this.visConfig.addEdgeConfig(facebookEdge)
    this.visConfig.addNodeConfig(facebookNodes)
  }

  ngAfterViewInit(): void {
    this.visData.nodes = this.visData.nodes.filter((n: any) => n !== undefined && n !== null)
    this.visData.edges = this.visData.edges.filter((n: any) => n !== undefined && n !== null)
    console.log("Init vis data", this.visData)
    this.network = new Network(
      this.visContainer.nativeElement,
      this.visData,
      this.visConfig.getOptions()
    );
    this.network.on('click', (params: any) => {
      const node = this.visData.nodes.find((n: any) => n.id === params.nodes[0])
      if (node) {
        const ref = this.dialog.open(DetalleComponent, {
          data: node.attributes
        })
        ref.afterClosed().subscribe(result => {
          console.log("RESULT", result)
          if (result != undefined) {
            this.output.emit(result)
          }
        })
      }
    })
  }

  ngOnChanges(): void {
    if (this.network) {
      this.network.setData(this.visData)
    }
  }

  saveNetwork(): void {
    let nodes: any[] = []
    let edges: any[] = []
    Object.keys(this.network.body.nodes).forEach(key => {
      nodes.push(this.visData.nodes.find((n: any) => n.id === key))
    })
    Object.keys(this.network.body.edges).forEach(key => {
      edges.push(this.visData.edges.find((n: any) => n.id === key))
    })
    console.log("Saving network", nodes.length, edges.length)
    sessionStorage.setItem('network', JSON.stringify({ nodes, edges }))
  }

}
