import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/service/card.service';

declare var $: any;

@Component({
  selector: 'app-dialog-card-form',
  templateUrl: './dialog-card-form.component.html',
  styleUrls: ['./dialog-card-form.component.css']
})
export class DialogCardFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService, 
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<DialogCardFormComponent>) { 

      
  }

  ngOnInit(): void {
    if (this.data && this.data.card) this.buildForm(this.data.card.id);
    else this.buildForm(null);
  }
  
  buildForm(id: any) {
    this.form = this.formBuilder.group({
      id: [id, Validators.nullValidator]
    });
  }

  cardOneChange() {
    $('#labelCardOne').html($('#cardOne')[0].value);
    let card = $('#cardOne')[0].files[0];
    let img = $('#imgCardOne');

    this.read_image(img, card);
  }

  cardTwoChange() {
    $('#labelCardTwo').html($('#cardTwo')[0].value);
    let card = $('#cardTwo')[0].files[0];
    let img = $('#imgCardTwo');

    this.read_image(img, card);
  }

  getCard(values: any) {
    let card = new Card();

    card.id = values.id;
    card.cardOne = $('#imgCardOne').attr('src');
    card.cardTwo = $('#imgCardTwo').attr('src');
  
    return card;
  }

  read_image (img: any, card: any) {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      $(img).attr('src', fileReader.result);
    }

    fileReader.readAsDataURL(card);
  }

  submit() {
    let card = this.getCard(Object.assign({}, this.form.value));

    if (card.id) {
      this.cardService.update(card).subscribe(card => {
        this.matDialogRef.close({status: true, message: 'Sucesso', card: card});
      },
      error => {
        this.matDialogRef.close({status: false, message: error.error[0].message});
      });
    }

    else {
      this.cardService.save(card).subscribe(card => {
        this.matDialogRef.close({status: true, message: 'Sucesso', card: card});
      },
      error => {
        this.matDialogRef.close({status: false, message: error.error[0].message});
      });
    }
  }
}