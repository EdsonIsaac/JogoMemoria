import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card/card.component';
import { DialogCardFormComponent } from './dialog-card-form/dialog-card-form.component';
import { DialogCardDeleteComponent } from './dialog-card-delete/dialog-card-delete.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CardComponent,
    DialogCardFormComponent,
    DialogCardDeleteComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CardModule { }