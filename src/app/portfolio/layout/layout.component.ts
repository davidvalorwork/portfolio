import { Component } from '@angular/core';
import { IPerson } from '../models/IPerson';
import { Neo4jService } from '../../services/neovis/neo4j.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    public neo4jService: Neo4jService,
  ) { 
    this.neo4jService.connect()
    this.getAll()
  }

  async getAll(){
    console.log(await this.neo4jService.getAll())
  }

  async onFacebookSearch(person: IPerson) {
    console.log(person)
    await this.neo4jService.createPerson(person)
    // if(person.Friends){
    //   for(let friend of person.Friends){
    //     await this.neo4jService.createPerson(friend)
    //     await this.neo4jService.createPersonFriend(person, friend)
    //   }
    // }
  }
}
