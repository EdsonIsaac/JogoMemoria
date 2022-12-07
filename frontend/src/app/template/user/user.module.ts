import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { DialogUserFormComponent } from './dialog-user-form/dialog-user-form.component';
import { DialogUserDeleteComponent } from './dialog-user-delete/dialog-user-delete.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    UserComponent,
    DialogUserFormComponent,
    DialogUserDeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }