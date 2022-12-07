import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide!: boolean;
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showSnackBar(mensagem: string, cor: string) {
    this.snackBar.open(mensagem, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cor]
    });
  }

  submit() {
    const usuario = Object.assign({}, this.form.value);

    this.authService.login(usuario).subscribe(response => {
      this.router.navigate(['/']);
    },
    error => {
      this.showSnackBar(error.error.message, 'bg-danger');
    });
  }
}