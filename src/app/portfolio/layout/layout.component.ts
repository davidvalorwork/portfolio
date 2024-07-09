import { Component, OnInit, ViewChild } from '@angular/core';
import { IPerson } from '../models/IPerson';
import { Neo4jService } from '../../services/neovis/neo4j.service';
import { HandleNodesService } from '../../services/neovis/handle-nodes.service';
import { VisNode } from 'vis-network/declarations/network/gephiParser';
import { IVisDataSet } from '../models/IVisDataSet';
import { SearchComponent } from '../search/search.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public handleNodesService: HandleNodesService,
    public _snackbar: MatSnackBar
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
    if(this.searchComponent) this.searchComponent.loading = true
    const allNR = await this.neo4jService.getFriends(this.id)
    this.addToVisData(allNR)
    if(this.searchComponent) this.searchComponent.loading = false
  }

  addToVisData(allNR: any) {
      // Assuming handleNodesRelationsFromResponse, handleFacebookNodes, filterNodes, and filterRelations
      // are optimized and necessary, we focus on optimizing the current method's logic.
      const { nodes, relations } = this.neo4jService.handleNodesRelationsFromResponse(allNR);
      let visNodes: VisNode[] = this.neo4jService.filterNodes(
          this.handleNodesService.handleFacebookNodes(nodes).concat(this.visData.nodes)
      );
      let filteredRelations = this.neo4jService.filterRelations(relations.concat(this.visData.edges));
  
      // Only update and store in session if there's a change
      if (JSON.stringify(this.visData) !== JSON.stringify({ nodes: visNodes, edges: filteredRelations })) {
          this.visData = { nodes: visNodes, edges: filteredRelations };
          sessionStorage.setItem("network", JSON.stringify(this.visData));
      }
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
        for (let [index, friend] of person.friends.entries()) {
          try {
            newP = await this.neo4jService.createPerson(friend)
            this._snackbar.open(`Friend added ${friend.name} ${index+1}/${person.friends.length}!`, 'Close', { duration: 2000 })
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
