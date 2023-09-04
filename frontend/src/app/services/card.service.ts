import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Card } from '../models/card.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _baseURL = `${environment.api}/cards`;
  private _subject = new BehaviorSubject<Card | null>(null);

  constructor(private _http: HttpClient) {}

  findAll(page: number, size: number, sort: string, direction: string) {
    return this._http.get<Page<Card>>(this._baseURL, {
      params: {
        page: page,
        size: size,
        sort: sort,
        direction: direction,
      },
    });
  }

  get() {
    return this._subject.asObservable();
  }

  set(card: Card | null) {
    this._subject.next(card);
  }
}
