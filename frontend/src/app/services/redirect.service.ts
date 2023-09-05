import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from '../models/authentication.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private _authentication!: Authentication | null;
  private _baseURL!: string;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {
    this._authenticationService.getAuthenticationAsObservable().subscribe({
      next: (authentication) => {
        if (authentication) {
          this._authentication = authentication;
          this._baseURL = '/' + this._authentication?.role.toLowerCase();
        }
      },
    });
  }

  toCard(id: string) {
    this._router.navigate([`${this._baseURL}/cards/${id}`]);
  }

  toCardsList() {
    this._router.navigate([`${this._baseURL}/cards`]);
  }

  toGame() {
    this._router.navigate(['']);
  }

  toLogin() {
    this._router.navigate(['/login']);
  }

  toPanel() {
    this._router.navigate([`${this._baseURL}/panel`]);
  }

  toUser(id: string) {
    this._router.navigate([`${this._baseURL}/users/${id}`]);
  }

  toUsersList() {
    this._router.navigate([`${this._baseURL}/users`]);
  }
}
