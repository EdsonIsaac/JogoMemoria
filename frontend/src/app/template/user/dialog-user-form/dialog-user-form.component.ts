import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-user-form',
  templateUrl: './dialog-user-form.component.html',
  styleUrls: ['./dialog-user-form.component.css']
})
export class DialogUserFormComponent implements OnInit {

  currentUser!: any;
  form!: FormGroup;
  hide!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService, 
    private userService: UserService, 
    private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogUserFormComponent>) { 
    
    this.currentUser = this.authService.getCurrentUser();
    this.hide = true;
  }

  ngOnInit(): void {
    if (this.data && this.data.user) this.buildForm(this.data.user.id, this.data.user.name, this.data.user.username, this.data.user.password, this.data.user.enabled);
    else this.buildForm(null, null, null, null, null);
  }

  buildForm(id: any, name: any, username: any, password: any, enabled: any) {
    this.form = this.formBuilder.group({
      id: [id, Validators.nullValidator],
      name: [name, Validators.required],
      username: [username, Validators.required],
      password: [password, (!this.data) || (this.data && this.data.user && this.data.user.username === this.currentUser.username) ? Validators.required : Validators.nullValidator],
      enabled: [enabled, Validators.required]
    });
  }

  getUser (values: any) {
    let user = new User();

    user.id = values.id;
    user.name = values.name;
    user.username = values.username;
    user.password = values.password;
    user.enabled = values.enabled;

    return user;
  }

  submit() {
    let user = this.getUser(Object.assign({}, this.form.value));

    if (user.id) {
      this.userService.update(user).subscribe(user => {
        this.matDialogRef.close({status: true, message: 'Sucesso', user: user});
      }, 
      error => {
        this.matDialogRef.close({status: false, message: error.error[0].message});
      });
    }

    else {
      this.userService.save(user).subscribe(user => {
        this.matDialogRef.close({status: true, message: 'Sucesso', user: user});
      }, 
      error => {
        this.matDialogRef.close({status: false, message: error.error[0].message});
      });
    }
  }
}