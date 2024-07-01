import { Injectable } from '@angular/core';
import {
  Neo4jConfig,
  NeovisConfig,
  Node,
  Edge,
  LabelConfig,
  RelationshipConfig
} from 'neovis.js';
import { EdgeOptions, NodeOptions } from 'vis-network';

@Injectable({
  providedIn: 'root'
})
export class NeovisConfigService {
  config = {
    containerId: "viz",
    neo4j: {
      serverUrl: "bolt://localhost:7687",
      serverUser: "neo4j",
      serverPassword: "12341234aA@@",
    },
    visConfig:{
      nodes: {},
      edges: {}
    },
    labels: {} as any,
    relationships: {} as any,
    initialCypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
  };
  
  constructor() { 
  }

  public setNeo4jConfig(config: Neo4jConfig) {
    this.config.neo4j = {
      serverUrl: config.serverUrl as string,
      serverUser: config.serverUser as string,
      serverPassword: config.serverPassword as string,
    };
  }

  public addEdgeConfig(edge: EdgeOptions) {
    this.config.visConfig.edges = edge as any;
  }

  public addNodeConfig(node: NodeOptions) {
    this.config.visConfig.nodes = node as any;
  }

  public addLabels(labelsToAdd: { [key: string]: LabelConfig }) {
    Object.keys(labelsToAdd).forEach((key) => {
      this.config.labels[key] = labelsToAdd[key];
    });
  }

  public addRelationships(relationshipsToAdd: { [key: string]: RelationshipConfig }) {
    Object.keys(relationshipsToAdd).forEach((key) => {
      this.config.relationships[key] = relationshipsToAdd[key];
    });
  }

  public setInitialCypher(cypher: string) {
    this.config.initialCypher = cypher;
  }

  public getConfig(): NeovisConfig {
    return this.config as NeovisConfig;
  }
}
