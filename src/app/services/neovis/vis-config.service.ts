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
    edges: null as any,
    interaction: { hover: true },
    manipulation: {
      enabled: true,
    },
    physics: {
      enabled: true, // Mantenemos la física activada para permitir algún nivel de auto-organización
      solver: 'forceAtlas2Based', // Usamos el solver 'forceAtlas2Based' que es más adecuado para grandes cantidades de nodos
      stabilization: { // Ajustamos la estabilización para manejar mejor la inicialización de una red grande
        enabled: true,
        iterations: 1000, // Aumentamos el número de iteraciones para mejorar la estabilización inicial
        updateInterval: 25,
        onlyDynamicEdges: false,
        fit: true
      }
    },
    layout: {
      improvedLayout: false, // Activamos el layout mejorado para optimizar la distribución inicial de los nodos
      hierarchical: {
        enabled: false, // Aseguramos que el layout jerárquico esté desactivado ya que no queremos atracción hacia el centro
      }
    }
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
