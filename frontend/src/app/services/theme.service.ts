import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _subject = new BehaviorSubject<string>('light');

  constructor() {
    const theme = localStorage.getItem('theme') ?? 'light';
    this._subject.next(theme);
    this.checkTheme();
  }

  get() {
    return this._subject.asObservable();
  }

  changeTheme() {
    const theme = this._subject.getValue() === 'dark' ? 'light' : 'dark';
    this._subject.next(theme);
    this.checkTheme();
  }

  checkTheme() {
    if (this._subject.getValue() === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
