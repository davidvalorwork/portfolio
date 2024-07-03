import { Injectable } from '@angular/core';
import { EdgeOptions, NodeOptions } from 'vis-network';

@Injectable({
  providedIn: 'root'
})
export class VisConfigService {
  neo4j = {
    serverUrl: "bolt://localhost:7687",
    serverUser: "neo4j",
    serverPassword: "12341234aA@@",
  }

  options = {
    nodes: null as any,
    edges: null as any
  }

  constructor() {
  }
  
  public addEdgeConfig(edgeConfig: EdgeOptions): void {
    this.options.edges = edgeConfig;
  }

  public addNodeConfig(nodeConfig: NodeOptions): void {
    this.options.nodes = nodeConfig;
  }

  public getOptions(): any {
    return this.options;
  }
}
