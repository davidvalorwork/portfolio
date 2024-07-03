import { Component, ViewChild } from '@angular/core';
import { IPerson } from '../models/IPerson';
import { Neo4jService } from '../../services/neovis/neo4j.service';
import { HandleNodesService } from '../../services/neovis/handle-nodes.service';
import { VisEdge, VisNode } from 'vis-network/declarations/network/gephiParser';
import { IMiniPerson } from '../models/IMiniPerson';
import vis from 'vis-network/declarations/index-legacy-bundle';
import { IVisDataSet } from '../models/IVisDataSet';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent
  id: string = "1253330847"
  visData: IVisDataSet = { nodes: [], edges: [] }

  constructor(
    public neo4jService: Neo4jService,
    public handleNodesService: HandleNodesService
  ) {
    this.neo4jService.connect()
    this.getAll()
  }

  async getAll() {
    const allNR = await this.neo4jService.getFriends(this.id)
    console.log(allNR)
    let { nodes, relations } = this.neo4jService.handleNodesRelationsFromResponse(allNR)
    let visNodes: VisNode[] = this.handleNodesService.handleFacebookNodes(nodes)
    visNodes = [...visNodes, ...this.visData.nodes]
    relations = [...relations, ...this.visData.edges]
    nodes = this.neo4jService.filterNodes(nodes)
    relations = this.neo4jService.filterRelations(relations)
    this.visData = { nodes: visNodes, edges: relations }
  }

  async getFriends(id: string) {
    const allNR = await this.neo4jService.getFriends(id)
    if (allNR.records.length === 0) return this.apiSearch(id)
  }

  async onFacebookSearch(person: IPerson) {
    this.id = person.id
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
    if (this.visData == null)
      this.getAll()
    else this.getFriends(person.id)
  }

  async apiSearch(id: string) {
    this.searchComponent.onSubmit(id);
  }

}
