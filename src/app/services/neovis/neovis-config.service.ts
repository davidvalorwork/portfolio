import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NeovisConfigService {
  config = {
    containerId: "viz",
    neo4j: {
      serverUrl: "bolt://localhost:7687",
      serverUser: "neo4j",
      serverPassword: "12341234",
    },
    labels: {
      Character: {
        label: "name",
        value: "pagerank",
        group: "community",
      }
    },
    relationships: {
      INTERACTS: {
        value: "weight"
      }
    },
    initialCypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
  };
  
  constructor() { }

  getConfig() {

  }
}
