import { Injectable } from '@angular/core';
import * as neo4j from 'neo4j-driver'
import { IPerson } from '../../portfolio/models/IPerson';
import { IMiniPerson } from '../../portfolio/models/IMiniPerson';
import { VisEdge } from 'vis-network/declarations/network/gephiParser';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  url: string = "bolt://localhost:7687"
  driver = null as any;

  constructor() { }

  connect(): void {
    this.driver = neo4j.driver(this.url, neo4j.auth.basic("neo4j", "12341234aA@@"))
    this.createIndexIfNotExist()
  }

  createIndexIfNotExist(): void {
    const query = 'CREATE INDEX IF NOT EXISTS FOR (p:Person) ON (p.id)'
    this.runQuery(query)
  }

  async runQuery(query: string): Promise<any> {
    try {
      const session = this.driver.session()
      return await session.run(query)
    } catch (error) {
      console.log('error:', error)
    }
  }

  async getAll() {
    const query = 'MATCH (p:Person)-[r:FRIEND]->(f)  RETURN p,r,f'
    return await this.runQuery(query)
  }

  async getPersonByName(name: string): Promise<any> {
    const query = `MATCH (p:Person {name: "${name}"}) RETURN p`
    return await this.runQuery(query)
  }

  async getPersonByLink(link: string): Promise<any> {
    const query = `MATCH (p:Person {link: "${link}"}) RETURN p`
    return await this.runQuery(query)
  }

  async getFriends(id: string, limit = 100): Promise<any> {
    const query = `MATCH (p:Person {id: "${id}"})-[r:FRIEND]->(f) RETURN p, r, f LIMIT ${limit}`
    return await this.runQuery(query)
  }

  createPersonFriend(person: IPerson, friend: IMiniPerson): Promise<any> {
    return this.runQuery(`
      MATCH (p:Person {id: "${person.id}"}), (f:Person {id: "${friend.id}"}) 
      MERGE (p)-[r:FRIEND]->(f) 
      RETURN p, r, f
    `)
  }

  createPerson(person: IPerson | IMiniPerson): Promise<any> {
    const properties = Object.entries(person).map(([key, value]) => {
      if (key == 'friends') return 'p.friends= "true"';
      return `p.${key}= "${value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-zA-Z0-9]/g, "")}"`;
    }).join(', ');
    return this.runQuery(`
      MERGE (p:Person {id: "${person.id}"})
        ON CREATE SET ${properties}
        ON MATCH SET ${properties}
      RETURN p
    `)
  }

  filterNodes(nodes: any[]): any[] {
    const seenIds = new Set();
    nodes = nodes.filter((n: any) => {
      if (!seenIds.has(n.id)) {
        seenIds.add(n.id);
        return true;
      }
      return false;
    });
    return nodes
  }

  filterRelations(relations: any[]): any[] {
    const seenIds = new Set();
    relations = relations.filter((r: any) => {
      if (!seenIds.has(r.id)) {
        seenIds.add(r.id);
        return true;
      }
      return false;
    });
    return relations
  }

  handleNodesRelationsFromResponse(allNR: any){
    const nodesHave: (IPerson | IMiniPerson)[] = allNR.records.map((r: any) => r._fields[0].properties)
    const nodesFriend: (IPerson | IMiniPerson)[] = allNR.records.map((r: any) => r._fields[2].properties)
    const relations: VisEdge[] = allNR.records.map((r: any) => {
      return {
        id: r._fields[1].properties.id,
        from: r._fields[0].properties.id,
        to: r._fields[2].properties.id
      }
    })
    let nodes = [...nodesHave, ...nodesFriend]
    this.filterNodes(nodes)
    return { nodes, relations }
  }

}
