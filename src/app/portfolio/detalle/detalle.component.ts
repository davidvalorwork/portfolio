import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPerson } from '../models/IPerson';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  personKeys: string[] = []
  person: any = null as any

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataPerson: any,
    public dialogRef: MatDialogRef<DetalleComponent>
  ) { 
    this.person = dataPerson
    this.personKeys = Object.keys(this.person)
  }

  close() {
    this.dialogRef.close()
  }

  goToProfile(){
    window.open(`https://www.facebook.com/${this.dataPerson.id}`, '_blank')
  }

  getFriends() {
    this.dialogRef.close(this.dataPerson.id)
  }
}
