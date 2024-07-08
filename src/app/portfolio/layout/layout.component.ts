import { Component, OnInit, ViewChild } from '@angular/core';
import { IPerson } from '../models/IPerson';
import { Neo4jService } from '../../services/neovis/neo4j.service';
import { HandleNodesService } from '../../services/neovis/handle-nodes.service';
import { VisNode } from 'vis-network/declarations/network/gephiParser';
import { IVisDataSet } from '../models/IVisDataSet';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent
  id: string = "1253330847"
  visData: IVisDataSet = { nodes: [], edges: [] }

  constructor(
    public neo4jService: Neo4jService,
    public handleNodesService: HandleNodesService
  ) {
    this.neo4jService.connect()
  }

  ngOnInit() {
    const oldNetwork = sessionStorage.getItem('network')
    console.log(oldNetwork)
    if (oldNetwork) {
      this.visData = JSON.parse(oldNetwork)
      if (this.visData.nodes.length === 0) this.getAll()
    } else {
      this.getAll()
    }
  }

  async getAll() {
    const allNR = await this.neo4jService.getFriends(this.id)
    this.addToVisData(allNR)
  }

  addToVisData(allNR: any) {
    console.log("NEO4j RESPONSE", allNR)
    let { nodes, relations } = this.neo4jService.handleNodesRelationsFromResponse(allNR)
    console.log(nodes)
    let visNodes: VisNode[] = this.handleNodesService.handleFacebookNodes(nodes)
    if (this.visData.edges.length !== 0) visNodes = [...visNodes, ...this.visData.nodes]
    if (this.visData.nodes.length !== 0) relations = [...relations, ...this.visData.edges]
    visNodes = this.neo4jService.filterNodes(visNodes)
    console.log(visNodes)
    relations = this.neo4jService.filterRelations(relations)
    this.visData = { nodes: visNodes, edges: relations }
    sessionStorage.setItem("network", JSON.stringify(this.visData))
  }

  async getFriends(id: string) {
    const allNR = await this.neo4jService.getFriends(id)
    if (allNR.records.length === 0) return this.apiSearch(id)
    this.addToVisData(allNR)
  }

  async onFacebookSearch(person: IPerson) {
    this.id = person.id
    try {
      let newP = await this.neo4jService.createPerson(person)
      if (person.friends) {
        for (let friend of person.friends) {
          try {
            newP = await this.neo4jService.createPerson(friend)
          } catch (e) { console.log("NODE", e) }
          try {
            newP = await this.neo4jService.createPersonFriend(person, friend)
          } catch (e) { console.log("RELATION", e) }
        }
      }
      this.getAll()
    } catch (err) { console.log(err) }
  }

  async apiSearch(id: string) {
    this.searchComponent.onSubmit(id);
  }

}
