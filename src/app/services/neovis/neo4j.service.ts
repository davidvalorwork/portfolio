import { Injectable } from '@angular/core';
import * as neo4j from 'neo4j-driver'

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  url: string = "http://localhost:7687"
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

  async createPerson(name: string, link: string): Promise<any> {
    const query = `CREATE (p:Person {name: "${name}", link: "${link}"}) RETURN p`
    return await this.runQuery(query)
  }
  
}
