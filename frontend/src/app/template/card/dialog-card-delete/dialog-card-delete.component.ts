import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-dialog-card-delete',
  templateUrl: './dialog-card-delete.component.html',
  styleUrls: ['./dialog-card-delete.component.css']
})
export class DialogCardDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService,
    private matDialogRef: MatDialogRef<DialogCardDeleteComponent>) {


  }

  ngOnInit(): void { }

  delete() {
    this.cardService.delete(this.data.card).subscribe(() => {
      this.matDialogRef.close({status: true, message: 'Sucesso'});
    },
    error => {
      this.matDialogRef.close({status: false, message: error.error[0].message});
    });
  }
}