import { Injectable } from '@angular/core';
import * as neo4j from 'neo4j-driver'
import { IPerson } from '../../portfolio/models/IPerson';
import { IMiniPerson } from '../../portfolio/models/IMiniPerson';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  url: string = "bolt://localhost:7687"
  session = null as any;

  constructor() {}

  connect(): void {
    const driver = neo4j.driver(this.url, neo4j.auth.basic("neo4j", "12341234aA@@"))
    this.session = driver.session()
  }

  async runQuery(query: string): Promise<any> {
    try{
      return await this.session.run(query)
    }catch(error){
      console.log('error:', error)
    }
  }

  async getAll(){
    const query = 'MATCH (p:Person) RETURN p'
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

  async getFriends(name: string): Promise<any> {
    const query = `MATCH (p:Person {name: "${name}"})-[r:FRIEND]->(f) RETURN r, f`
    return await this.runQuery(query)
  }

  async createPersonFriend(person: IPerson, friend: IMiniPerson): Promise<any> {
    const query = `MATCH (p:Person {id: "${person.id}"}), (f:Person {id: "${friend.id}"}) MERGE (p)-[r:FRIEND]->(f) RETURN r`
    return await this.runQuery(query)
  }

  createPerson(person: IPerson | IMiniPerson): Promise<any> {
    const properties = Object.entries(person).map(([key, value]) => {
      if(key == 'friends') return 'friends: "true"';
      return `${key}: "${value}"`;
    }).join(', ');
    console.log(properties)
    const query = `MERGE (p:Person {id: "${person.id}"}) ON CREATE SET ${properties} RETURN p`;
    return this.runQuery(query)
  }
  
}
