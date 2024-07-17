import { Injectable } from '@angular/core';
import * as neo4j from 'neo4j-driver'
import { IPerson } from '../../portfolio/models/IPerson';
import { IMiniPerson } from '../../portfolio/models/IMiniPerson';
import { VisEdge } from 'vis-network/declarations/network/gephiParser';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  url: string = "neo4j+s://e2df0825.databases.neo4j.io:7687"
  driver = null as any;
  limit = 10;

  constructor() { }

  connect(): void {
    this.driver = neo4j.driver(this.url, neo4j.auth.basic("neo4j", "aa1NB5I7mshNItmfvr1wnSzh226LsVkJAK-MGlkdCp0"))
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

  async getFriends(id: string): Promise<any> {
    const query = `
      MATCH (p:Person {id: "${id}"})-[r:FRIEND]->(f)
      RETURN p, r, f
      LIMIT ${this.limit}
    `
    console.log("GET FRIENDS", query)
    return await this.runQuery(query)
  }

  createPersonFriend(person: IPerson, friend: IMiniPerson): Promise<any> {
    return this.runQuery(`
      MATCH (p:Person {id: "${person.id}"}), (f:Person {id: "${friend.id}"}) 
      MERGE (p)-[r:FRIEND]->(f) 
      RETURN p, r, f
    `)
  }

  createBulkPersons(persons: (IPerson | IMiniPerson)[], friend: IPerson): Promise<any> {
    const queries = persons.map((person) => {
      return this.createPerson(person, friend)
    })
    let query = queries.join(` \n `)
    let lastIndex = persons.length - 1;
    while (lastIndex >= 0 && (persons[lastIndex].id === undefined || !persons[lastIndex].id)) {
      lastIndex--;
    }
    if (lastIndex >= 0) { // Ensure there's at least one valid ID
      query += `RETURN p${persons[lastIndex].id}`;
    } else {
      // Handle the case where no valid ID is found
      console.error("No valid person ID found");
    }

    // console.log("CREATE BULK PERSONS QUERY", query)
    return this.runQuery(query)
  }

  createPerson(person: IPerson | IMiniPerson, friend: IPerson): string {
    if (person.id) {
      const properties = Object.entries(person).map(([key, value]) => {
        if (key == 'friends') return `p${person.id}.friends= "true"`;
        if (!value) value = ''
        return `p${person.id}.${key}= "${value.toString().normalize("NFD").replaceAll("\"", "").replaceAll("\n", "").replace(/[\u0300-\u036f]/g, "")}"`;
      }).join(', ');
      // TODO Error query hay que mejorar
      const query = `
      MERGE (p${person.id}:Person {id: "${person.id}"})
        ON CREATE SET ${properties}
        ON MATCH SET ${properties}
      WITH p${person.id}
      MATCH (f${person.id}:Person {id: "${friend.id}"})
      MERGE (f${person.id})-[r${person.id}:FRIEND]->(p${person.id})
    `
      console.log("CREATE PERSON QUERY", query)
      return query
    }
    return ''
  }

  createPersonNormal(person: IPerson | IMiniPerson): Promise<any> {
    const properties = Object.entries(person).map(([key, value]) => {
      if (key == 'friends') return 'p.friends= "true"';
      if (!value) value = ''
      return `p.${key}= "${value.toString().normalize("NFD").replaceAll("\"", "").replaceAll("\n", "").replace(/[\u0300-\u036f]/g, "")}"`;
    }).join(', ');
    const query = `
      MERGE (p:Person {id: "${person.id}"})
        ON CREATE SET ${properties}
        ON MATCH SET ${properties}
      RETURN p
    `
    console.log("CREATE PERSON QUERY", query)
    return this.runQuery(query)
  }

  filterNodes(nodes: any[]): any[] {
    const seenIds = new Set();
    nodes = nodes.filter((n: any) => {
      if (n.attributes) {
        if (!seenIds.has(n.attributes.id)) {
          seenIds.add(n.attributes.id);
          return true;
        }
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
      if (r.from == r.to) return false
      return false;
    });
    return relations
  }

  handleNodesRelationsFromResponse(allNR: any) {
    const nodes = new Map<string, IPerson | IMiniPerson>();
    const relations = new Set<VisEdge>();

    allNR.records.forEach((r: any) => {
      const [haveNode, , friendNode, , friendOfFriendNode] = r._fields.map((field: any) => field?.properties);
      nodes.set(haveNode.id, haveNode);
      nodes.set(friendNode.id, friendNode);
      if (friendOfFriendNode) {
        nodes.set(friendOfFriendNode.id, friendOfFriendNode);
      }

      const relation1 = {
        id: `${haveNode.id}-${friendNode.id}`,
        from: haveNode.id,
        to: friendNode.id
      };
      relations.add(relation1);

      if (friendOfFriendNode) {
        const relation2 = {
          id: `${friendNode.id}-${friendOfFriendNode.id}`,
          from: friendNode.id,
          to: friendOfFriendNode.id
        };
        relations.add(relation2);
      }
    });

    return { nodes: Array.from(nodes.values()), relations: Array.from(relations) };
  }

}
