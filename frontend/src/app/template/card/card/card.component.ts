import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/service/card.service';
import { DialogCardDeleteComponent } from '../dialog-card-delete/dialog-card-delete.component';
import { DialogCardFormComponent } from '../dialog-card-form/dialog-card-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards!: Array<Card>;

  constructor(private cardService: CardService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cardService.findAll().subscribe(cards => {
      this.cards = cards;
    });
  }

  add() {
    this.dialog.open(DialogCardFormComponent, {
      width: '100%'
    })
    .afterClosed().subscribe(result => {
      if (result.status != undefined && result.status) {
        this.showSnackBar('Cartas cadastradas com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível cadastrar as cartas! ' + result.message, 'bg-danger');
      }
    });
  }

  delete (card: Card) {
    this.dialog.open(DialogCardDeleteComponent, {
      data: {
        card: card
      },
      width: '100%'
    })
    .afterClosed().subscribe(result => {
      if (result.status != undefined && result.status) {
        this.showSnackBar('Cartas excluidas com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível excluir as cartas! ' + result.message, 'bg-danger');
      }
    });
  }

  showSnackBar(mensagem: string, cor: string) {
    this.snackBar.open(mensagem, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cor]
    });
  }
}