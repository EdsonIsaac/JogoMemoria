import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../model/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  delete (card: Card): Observable<Card> {
    return this.http.delete<Card>(environment.serverURL + '/cards/' + card.id);
  }

  findAll (): Observable<Array<Card>> {
    return this.http.get<Array<Card>>(environment.serverURL + '/cards');
  }

  save (card: any): Observable<Card> {
    return this.http.post<Card>(environment.serverURL + '/cards', card);
  }

  update (card: any): Observable<Card> {
    return this.http.put<Card>(environment.serverURL + '/cards/' + card.id, card);
  }
}