import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-gameover',
  templateUrl: './dialog-gameover.component.html',
  styleUrls: ['./dialog-gameover.component.css']
})
export class DialogGameoverComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<DialogGameoverComponent>) { }

  ngOnInit(): void { }

  restart() {
    this.matDialogRef.close({restart: true});
  }
}