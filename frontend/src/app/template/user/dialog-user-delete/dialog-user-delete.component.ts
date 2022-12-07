import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-user-delete',
  templateUrl: './dialog-user-delete.component.html',
  styleUrls: ['./dialog-user-delete.component.css']
})
export class DialogUserDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private matDialogRef: MatDialogRef<DialogUserDeleteComponent>) { 
      
  }

  ngOnInit(): void { }

  delete() {
    this.userService.delete(this.data.user).subscribe(() => {
      this.matDialogRef.close({status: true, message: 'Sucesso'});
    },
    error => {
      this.matDialogRef.close({status: false, message: error.error[0].message});
    });
  }
}