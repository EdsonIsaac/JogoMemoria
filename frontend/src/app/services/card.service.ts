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

  delete(id: string) {
    return this._http.delete(`${this._baseURL}/${id}`);
  }

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

  save(card: Card, image: any) {
    const form = new FormData();

    form.append(
      'card',
      new Blob([JSON.stringify(card)], { type: 'application/json' })
    );

    if (image) {
      form.append(
        'image',
        new Blob([image], { type: 'multipart/form-data' }),
        'image.png'
      );
    }

    return this._http.post<Card>(this._baseURL, form);
  }

  set(card: Card | null) {
    this._subject.next(card);
  }
}
