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

  detailFunction(params: any): void {
    console.log("DETAIL", params)
    const id = 1
    const element = document.createElement('a')
    element.setAttribute('id', `editNode=${id}`)
    element.setAttribute('style', 'display: none')
  }

  ngAfterViewInit(): void {
    this.visData.nodes = this.visData.nodes.filter((n: any) => n !== undefined && n !== null)
    this.visData.edges = this.visData.edges.filter((n: any) => n !== undefined && n !== null)
    console.log("Init vis data", this.visData)
    const options = this.visConfig.getOptions()
    options.manipulation = {
      editNode: this.detailFunction.bind(this)
    }
    this.network = new Network(
      this.visContainer.nativeElement,
      this.visData,
      options
    );

    this.network.on("doubleClick", (params: any) => {
      console.log(params.nodes)
      const resp = this.dialog.open(DetalleComponent, {
        data: (this.visData.nodes.find((n: any) => n.id === params.nodes[0])).attributes,
        height: '50%',
      })
      resp.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed', result)
        if (result)
          this.output.emit(result)
      })
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
    nodes.filter((n: any) => n !== undefined && n !== null)
    edges.filter((n: any) => n !== undefined && n !== null)
    sessionStorage.setItem('network', JSON.stringify({ nodes, edges }))
  }

  factor: number = 0.1

  zoomIn(): void {
    let scale = this.network.getScale() + this.factor
    if (scale < 0) scale = 0
    let moveTo = {
      scale,
      position: this.network.getViewPosition()
    }
    this.network.moveTo(moveTo)
  }

  zoomOut(): void {
    let scale = this.network.getScale() - this.factor
    if (scale < 0) scale = 0
    let moveTo = {
      scale,
      position: this.network.getViewPosition()
    }
    this.network.moveTo(moveTo)
  }

}
