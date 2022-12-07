import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { DialogUserDeleteComponent } from '../dialog-user-delete/dialog-user-delete.component';
import { DialogUserFormComponent } from '../dialog-user-form/dialog-user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSource!: MatTableDataSource<User>;
  columns: string[] = ['name', 'username', 'action'];
  users!: Array<User>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => {
      this.users = users;
      this.buildTable();
    });
  }

  add () {
    this.dialog.open(DialogUserFormComponent, {
      width: '100%'
    })
    .afterClosed().subscribe(result => {

      if (result.status != undefined && result.status) {
        this.showSnackBar('Usuário cadastrado com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível cadastrar o usuário! ' + result.message, 'bg-danger');
      }
    });
  }

  buildTable () {
    this.users = this.users.filter(user => user.username !== 'admin');
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  delete (user: User) {
    this.dialog.open(DialogUserDeleteComponent, {
      data: {
        user: user
      },
      width: '100%'
    })
    .afterClosed().subscribe(result => {

      if (result.status != undefined && result.status) {
        this.showSnackBar('Usuário excluido com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível excluir o usuário! ' + result.message, 'bg-danger');
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

  update (user: User) {
    this.dialog.open(DialogUserFormComponent, {
      data: {
        user: user
      },
      width: '100%'
    })
    .afterClosed().subscribe(result => {

      if (result.status != undefined && result.status) {
        this.showSnackBar('Usuário atualizado com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível atualizar o usuário! ' + result.message, 'bg-danger');
      }
    });
  }
}